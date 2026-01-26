import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { EmployeesHierarchyPopup } from "../popup/EmployeesHierarchyPopup";
import moment from "moment-hijri";
import { CircularsRootUrl } from "@4eplatform/shared/apis/circulars";
import { useNavigate, useLocation } from "react-router-dom";
import { editCircular, fetchCircular } from "../../../../redux/circulars-slice";
import {
  AddNewCircularProps,
  AddNewCircularSchema,
} from "../../../../validation/add-new-circular-validation";
import convertNullString from "@4eplatform/shared/functions/convertNullString";
import { RootState } from "../../../../redux/store";
import getIconSrc from "@4eplatform/shared/functions/getIconSrc";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { ManagementHierarchyWithSearchPopup } from "../popup/ManagementHierarchyWithSearchPopup";
import {
  fetchLkIssuer,
  fetchLkEnforcement,
  fetchLkApproval,
} from "../../../../redux/circular-lookups-slice";
import { LookupModel } from "../../../../model/circulars/lockups-model";
import HijriDateInput from "./HijriDateInput";

function NewOriginalDocumentTabForEdit({
  circularId = "",
}: {
  circularId?: string;
}) {
  let intl = useIntl();
  const [searchTerm, setSearchTerm] = useState("");
  let navigate = useNavigate();
  let location = useLocation();
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
  let [orgNames, setOrgNames] = useState<any>([]);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [involvedOrgNames, setInvolvedOrgNames] = useState<any>([]);
  let [involvedOrgIds, setInvolvedOrgIds] = useState<any>([]);
  let [publicationType, setPublicationType] = useState("public");
  let [status, setStatus] = useState("Publish");
  const [modalEmployeeShow, setModalEmployeeShow] = useState<boolean>(false);
  let [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [modalManagementShow, setModalManagementShow] =
    useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useForm<AddNewCircularProps>({
    resolver: yupResolver(AddNewCircularSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  let language: string = intl.locale;
  let dispatch = useDispatch();
  let [orgIds, setOrgIds] = useState<string[]>([]);
  useEffect(() => {
    let params = {
      pageSize: 100000,
      pageNumber: 1,
    };
    dispatch(fetchLkIssuer(params) as any);
    dispatch(fetchLkEnforcement({}) as any);
    dispatch(fetchLkApproval(params) as any);
  }, [dispatch]);
  let issuers = useSelector((state: RootState) => {
    return state?.circularLookups?.issuers;
  });
  let enforcements = useSelector((state: RootState) => {
    return state?.circularLookups?.enforcements;
  });
  let approvals = useSelector((state: RootState) => {
    return state?.circularLookups?.approvals;
  });
  let [firstMount, setFirstMount] = useState(true);
  useEffect(() => {
    if (!firstMount) {
      setValue("orgsConcerned", involvedOrgIds);
      setValue("mainInvolvedOrgNames", involvedOrgNames);
      trigger("orgsConcerned");
      trigger("mainInvolvedOrgNames");
    }
  }, [involvedOrgIds, setValue, trigger, firstMount, involvedOrgNames]);
  useEffect(() => {
    if (circularId) {
      dispatch(fetchCircular(circularId) as any);
    }
  }, [circularId, dispatch]);

  let handleEditCircular = async (formValues: AddNewCircularProps) => {
    if (publicationType === "secret" && employeeIds?.length === 0) {
      showSuccessAlert(false, "YouMustSelectEmployees", intl);
      return;
    }
    if (publicationType === "private" && orgIds?.length === 0) {
      showSuccessAlert(false, "YouMustSelectOrgs", intl);
      return;
    }

    if (
      new Date() > new Date(moment(formValues.toDate).format("YYYY-MM-DD")) &&
      status !== "stop"
    ) {
      showSuccessAlert(
        false,
        "TheStatusCannotBeConvertedToPublishedAndTheDateHasExpired",
        intl,
      );
      return;
    }
    let formData = new FormData();
    formData.append("id", circularId);
    formData.append("putCircularCommandDto.Name", formValues?.name);
    formData.append("putCircularCommandDto.NameEn", formValues?.nameEn);
    formData.append("putCircularCommandDto.Number", formValues?.number);
    formData.append("putCircularCommandDto.ApprovalId", formValues?.approvalId);
    formData.append("putCircularCommandDto.IssuerId", formValues?.issuerId);
    if (convertNullString(formValues?.documentClass as string) !== "") {
      formData.append(
        "putCircularCommandDto.DocumentClass",
        formValues?.documentClass as string,
      );
    }
    formData.append(
      "putCircularCommandDto.EnforcementId",
      formValues?.enforcementId,
    );

    formData.append(
      "putCircularCommandDto.DocumentAbout",
      formValues?.documentAbout,
    );

    formData.append(
      "putCircularCommandDto.DocumentAboutEn",
      formValues?.documentAboutEn,
    );

    if (convertNullString(circular?.details) !== "") {
      formData.append("PutCircularCommandDto.Details", circular?.details);
    }

    if (formValues?.attachments?.length) {
      Array.from(formValues?.attachments)?.forEach((attachment: any) => {
        if (attachment?.size === 1) {
          formData.append(
            "putCircularCommandDto.Attachments",
            attachment?.path,
          );
        } else {
          formData.append("putCircularCommandDto.Attachments", attachment);
        }
      });
    }
    if (formValues?.orgsConcerned?.length) {
      formValues?.orgsConcerned?.forEach((orgId: any) => {
        formData.append("PutCircularCommandDto.OrgsConcerned", orgId);
      });
    }
    if (employeeIds?.length > 0 && publicationType === "secret") {
      employeeIds
        ?.filter((item) => {
          return item !== undefined;
        })
        ?.forEach((id) => {
          formData.append("putCircularCommandDto.Users", id);
        });
    }
    if (orgIds?.length > 0 && publicationType === "private") {
      orgIds?.forEach((id) => {
        formData.append("putCircularCommandDto.Orgs", id);
      });
    }
    formData.append(
      "PutCircularCommandDto.PublicationType",
      publicationType === "public"
        ? "0"
        : publicationType === "private"
        ? "1"
        : "2",
    );
    formData.append(
      "putCircularCommandDto.Ispublished",
      status === "stop" ? "false" : "true",
    );
    formData.append(
      "putCircularCommandDto.IsArchived",
      circular?.isArchived ? "true" : "false",
    );
    if (formValues.toDate) {
      formData.append("putCircularCommandDto.ToDate", formValues.toDate);
    }
    formData.append("putCircularCommandDto.FromDate", formValues?.fromDate);

    formData.append(
      "putCircularCommandDto.AccreditationDate",
      moment(formValues?.accreditationDate, "iYYYY-iMM-iDD").format(
        "YYYY-MM-DD",
      ),
    );
    setLoading(true);
    try {
      await dispatch(editCircular(formData) as any).then((res: any) => {
        if (res?.payload?.statusEnum === 1) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            setLoading(false);
            navigate("/circulars-settings", {
              state: { cardId, cardName, serviceName: cardName },
            });
          });
        } else if (res?.payload?.message === "Circular name already exists.") {
          showSuccessAlert(false, "CircularNameMustBeUnique", intl, () => {
            setLoading(false);
          });
        } else if (res?.payload?.message === '["Number must be unique"]') {
          showSuccessAlert(false, "CircularNumberMustBeUnique", intl, () => {
            setLoading(false);
          });
        } else if (
          res?.payload?.message === `[\"From date cannot be in the past\"]`
        ) {
          showSuccessAlert(false, "CircularDateMustBeInFuture", intl, () => {
            setLoading(false);
          });
        } else if (res?.payload?.message) {
          showSuccessAlert(false, res?.payload?.message, intl, () => {
            setLoading(false);
          });
        }
      });
    } catch (error) {}
  };
  let circular = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  useEffect(() => {
    if (circularId) {
      setValue("name", circular?.name as string);
      setValue("nameEn", circular?.nameEn as string);
      setValue("issuerId", circular?.issuerId as string);
      setValue("number", circular?.number?.toString() as string);
      setValue("enforcementId", circular?.enforcementId as string);
      setValue("documentAbout", circular?.documentAbout as string);
      setValue("documentAboutEn", circular?.documentAboutEn as string);
      setValue("documentClass", circular?.documentClass);
      setValue("approvalId", circular?.approvalId as string);
      setValue(
        "accreditationDate",
        moment(circular?.accreditationDateHijri)
          ?.locale("en")
          .format("YYYY-MM-DD") as string,
      );

      setValue(
        "fromDate",
        moment(circular?.fromDate).locale("en").format("YYYY-MM-DD"),
      );
      if (circular?.toDate) {
        setValue(
          "toDate",
          moment(circular?.toDate).locale("en").format("YYYY-MM-DD"),
        );
      } else {
        setValue("toDate", "");
      }
      if ((circular?.orgs?.length as any) > 0) {
        setOrgIds(circular?.orgs as any);
      }
      if ((circular?.users?.length as any) > 0) {
        setEmployeeIds(circular?.users as any);
      }
      setPublicationType(
        circular?.publicationType === 0
          ? "public"
          : circular?.publicationType === 1
          ? "private"
          : "secret",
      );
      setStatus(circular?.ispublished ? "Publish" : "stop");
      setValue(
        "orgsConcerned",
        circular?.orgsConcernedData?.map((item: any) => {
          return item?.orgConcernedId;
        }) as string[],
      );
      setValue(
        "mainInvolvedOrgNames",
        language === "ar"
          ? (circular?.orgsConcernedData?.map((item: any) => {
              return item?.orgConcernedNameAr;
            }) as string[])
          : (circular?.orgsConcernedData?.map((item: any) => {
              return item?.orgConcernedNameEn;
            }) as string[]),
      );
      setInvolvedOrgIds(
        (circular?.orgsConcernedData?.map((item: any) => {
          return item?.orgConcernedId;
        }) as string[]) || [],
      );
      setInvolvedOrgNames(
        language === "ar"
          ? (circular?.orgsConcernedData?.map((item: any) => {
              return item?.orgConcernedNameAr;
            }) as string[]) || []
          : (circular?.orgsConcernedData?.map((item: any) => {
              return item?.orgConcernedNameEn;
            }) as string[]) || [],
      );
      setValue("documentAbout", circular?.documentAbout as string);
      if (circular?.documentAbout) {
        setValue("documentClass", circular?.documentClass);
      }
      setValue(
        "attachments",
        circular?.attachments?.map((attachment: any) => {
          return {
            name: attachment?.fileName,
            path: attachment?.filePath,
            size: 1,
          };
        }),
      );
    }
  }, [circularId, circular, setValue, language]);

  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleEditCircular)}>
        <div className="row mb-3">
          <div className="col-12 col-sm-12 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="CircularName"
              >
                {intl.formatMessage({
                  id: "CircularNameInArabic",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-upload special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="CircularName"
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({
                    id: "CircularNameInArabic",
                  })}
                  {...register("name")}
                />
                {DisplayErrorMessage(errors?.name?.message, intl, language)}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="CircularNameEn"
              >
                {intl.formatMessage({
                  id: "CircularNameInEnglish",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fas fa-upload special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="CircularNameEn"
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({
                    id: "CircularNameInEnglish",
                  })}
                  {...register("nameEn")}
                />
                {DisplayErrorMessage(errors?.nameEn?.message, intl, language)}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="AccreditationProofs"
              >
                {intl.formatMessage({
                  id: "AccreditationProofs",
                })}
              </label>
              <select
                id={`AccreditationProofs`}
                defaultValue={""}
                className="form-select form-select-solid"
                {...register("approvalId")}
              >
                <option value={""} disabled>
                  {intl.formatMessage({
                    id: "Choose",
                  })}
                </option>
                {approvals?.map((approval: LookupModel) => (
                  <option value={approval?.id} key={approval?.id}>
                    {language === "ar" ? approval?.nameAr : approval?.nameEn}
                  </option>
                ))}
              </select>
              {DisplayErrorMessage(errors?.approvalId?.message, intl, language)}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="DocumentNumber"
              >
                {intl.formatMessage({
                  id: "DocumentNumber",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-hashtag special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="DocumentNumber"
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({
                    id: "DocumentNumber",
                  })}
                  {...register("number")}
                />
                {DisplayErrorMessage(errors?.number?.message, intl, language)}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="EstablishedDateFrom"
              >
                {intl.formatMessage({
                  id: "EstablishedDateFrom",
                })}
              </label>
              <input
                type="date"
                id="Date"
                className="form-control form-control-solid"
                {...register("fromDate")}
                min={formValues?.fromDate}
              />
              {DisplayErrorMessage(errors?.fromDate?.message, intl, language)}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700"
                htmlFor="EstablishedDateTo"
              >
                {intl.formatMessage({
                  id: "EstablishedDateTo",
                })}
              </label>
              <input
                type="date"
                id="EstablishedDateTo"
                className="form-control form-control-solid"
                {...register("toDate")}
                min={formValues?.fromDate}
              />
              {DisplayErrorMessage(errors?.toDate?.message, intl, language)}
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 mb-2 pt-2 pb-3">
            <label className="form-label px-2  fontSz-6 required">
              {intl.formatMessage({ id: "DownloadFile" })}
            </label>
            <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
              <label
                htmlFor="DownloadFile"
                className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
              >
                <div role="button" className="d-flex align-items-center">
                  {formValues?.attachments &&
                  Array.from(formValues?.attachments as FileList)[0]?.name ? (
                    <>
                      <div>
                        <ul className="d-flex align-items-center">
                          <li className="d-flex align-items-center mx-2 position-relative">
                            <img
                              alt="pic"
                              style={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "50%",
                              }}
                              src={getIconSrc(
                                formValues?.attachments?.length
                                  ? Array.from(
                                      formValues?.attachments as FileList,
                                    )[0]?.name
                                  : "",
                                formValues?.attachments?.length
                                  ? Array.from(formValues?.attachments)[0]
                                  : "",
                                CircularsRootUrl,
                              )}
                              onError={(e: any) => {
                                if (
                                  !e.target.src.includes(
                                    "/media/avatars/300-3.webp",
                                  )
                                ) {
                                  e.target.src = "/media/avatars/300-3.webp";
                                }
                              }}
                              // onError={(e: any) =>
                              //   (e.target.src = getIconSrcError(
                              //     formValues?.attachments?.length
                              //       ? (Array.from(
                              //           formValues?.attachments as FileList
                              //         )[0]?.name as string)
                              //       : ""
                              //   ))
                              // }
                            />
                            <div className="mx-1">
                              {formValues?.attachments &&
                                Array.from(
                                  formValues?.attachments as FileList,
                                )[0]?.name}
                            </div>
                          </li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <>
                      <img
                        alt="pic"
                        style={{
                          width: "50px",
                          display: "inline-block",
                          marginLeft: "10px",
                        }}
                        src="/media/pmo/uploadFile.png"
                        className="img-fluid"
                      />
                      <div
                        className="row py-auto"
                        style={{ position: "relative", top: "-7px" }}
                      >
                        <span className="text-primary fw-bolder">
                          {intl.formatMessage({
                            id: "QuickFileUploader",
                          })}
                        </span>
                        <span>
                          {" "}
                          {intl.formatMessage({
                            id: "DragAndDropOrChooseFilesFromComputer",
                          })}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </label>
              <div
                className="dropzone dropzone-queue "
                id="kt_dropzonejs_example_3"
              >
                <div className="dropzone-panel">
                  <input
                    type="file"
                    id="DownloadFile"
                    {...register("attachments")}
                    placeholder={intl.formatMessage({ id: "FileUpload" })}
                    className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                  />
                </div>
              </div>
            </div>
            {DisplayErrorMessage(errors?.attachments?.message, intl, language)}
          </div>
        </div>
        <div className="row mb-9">
          <div className="col-12 col-sm-4 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="AccreditationDate"
              >
                {intl.formatMessage({
                  id: "AccreditationDate",
                })}
              </label>
              <Controller
                control={control}
                name="accreditationDate"
                render={({ field }) => (
                  <HijriDateInput
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                  />
                )}
              />
              {DisplayErrorMessage(
                errors?.accreditationDate?.message,
                intl,
                language,
              )}
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="Issuer"
              >
                {intl.formatMessage({
                  id: "Issuer",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-building special"></i>
                  </span>
                </div>
                <select
                  id={`Issuer`}
                  defaultValue={""}
                  className="form-select form-select-solid"
                  {...register("issuerId")}
                >
                  <option value={""} disabled>
                    {intl.formatMessage({
                      id: "Choose",
                    })}
                  </option>
                  {issuers?.map((issuer: LookupModel) => (
                    <option value={issuer?.id} key={issuer?.id}>
                      {language === "ar" ? issuer?.nameAr : issuer?.nameEn}
                    </option>
                  ))}
                </select>
                {DisplayErrorMessage(errors?.issuerId?.message, intl, language)}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700"
                htmlFor="DocumentClass"
              >
                {intl.formatMessage({
                  id: "DocumentClass",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-file special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="DocumentClass"
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({
                    id: "DocumentClass",
                  })}
                  {...register("documentClass")}
                />
                {DisplayErrorMessage(
                  errors?.documentClass?.message,
                  intl,
                  language,
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-4 col-md-4">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="Enforcement"
              >
                {intl.formatMessage({
                  id: "Enforcement",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-signal special"></i>
                  </span>
                </div>
                <select
                  id={`Enforcement`}
                  defaultValue={""}
                  className="form-select form-select-solid"
                  {...register("enforcementId")}
                >
                  <option value={""} disabled>
                    {intl.formatMessage({
                      id: "Choose",
                    })}
                  </option>
                  {enforcements?.map((enforcement: LookupModel) => (
                    <option value={enforcement?.id} key={enforcement?.id}>
                      {language === "ar"
                        ? enforcement?.nameAr
                        : enforcement?.nameEn}
                    </option>
                  ))}
                </select>
                {DisplayErrorMessage(
                  errors?.enforcementId?.message,
                  intl,
                  language,
                )}
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-12 col-md-4">
            <div className="mb-2 pt-2 pb-3">
              <label className="fs-6 fw-bold mb-2" htmlFor="MainInvolvedOrg">
                {intl.formatMessage({ id: "MainInvolvedOrg" })}
              </label>
              <div className="input-group ">
                <input
                  readOnly
                  disabled
                  className="form-control"
                  placeholder={intl.formatMessage({
                    id: "MainInvolvedOrg",
                  })}
                  id="MainInvolvedOrg"
                  defaultValue={formValues?.mainInvolvedOrgNames?.join(",")}
                />
                <div className="h-110 d-flex" role="button">
                  <span
                    className="input-group-text"
                    onClick={() => {
                      setModalHShow(true);
                      setFirstMount(false);
                    }}
                  >
                    <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                  </span>
                </div>
              </div>
            </div>
            {/* {DisplayErrorMessage(
              errors?.orgsConcerned?.message,
              intl,
              language
            )} */}
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12">
            <label
              htmlFor="DocumentAbout"
              className=" mb-5 fw-semibold fs-6 required"
            >
              {" "}
              {intl.formatMessage({ id: "DocumentAbout" })}{" "}
            </label>
            <textarea
              id="DocumentAbout"
              rows={4}
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "DocumentAbout" })}
              {...register("documentAbout")}
            ></textarea>
            {DisplayErrorMessage(
              errors?.documentAbout?.message,
              intl,
              language,
            )}
          </div>
        </div>

        <div className="row mb-5">
          <div className="col-12">
            <label
              htmlFor="DocumentAbout"
              className=" mb-5 fw-semibold fs-6 required"
            >
              {" "}
              {intl.formatMessage({ id: "DocumentAboutInEnglish" })}{" "}
            </label>
            <textarea
              id="DocumentAbout"
              rows={4}
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "DocumentAbout" })}
              {...register("documentAboutEn")}
            ></textarea>
            {DisplayErrorMessage(
              errors?.documentAboutEn?.message,
              intl,
              language,
            )}
          </div>
        </div>

        <div className="row mb-9">
          <div className="col-6 col-sm-6 col-md-6 mt-4">
            <label
              htmlFor="PublicationType"
              className="form-label px-2  fontSz-6 required"
            >
              {intl.formatMessage({ id: "PublicationType" })}
            </label>
            <div className="d-flex justify-content-around py-3 filed_background">
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="PublicationType"
                  id="public"
                  checked={publicationType === "public"}
                  onChange={() => setPublicationType("public")}
                />
                <label className="form-check-label" htmlFor="public">
                  {intl.formatMessage({ id: "Public" })}
                </label>
              </div>
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="PublicationType"
                  id="private"
                  onChange={() => setPublicationType("private")}
                  checked={publicationType === "private"}
                />
                <label className="form-check-label" htmlFor="private">
                  {intl.formatMessage({ id: "Private" })}
                </label>
              </div>
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="PublicationType"
                  id="stop"
                  checked={publicationType === "secret"}
                  onChange={() => setPublicationType("secret")}
                />
                <label className="form-check-label" htmlFor="secret">
                  {intl.formatMessage({ id: "Secret" })}
                </label>
              </div>
            </div>
          </div>
          <div className="col-6 col-sm-6 col-md-6 mt-4">
            <label
              htmlFor="Status"
              className="form-label px-2  fontSz-6 required"
            >
              {intl.formatMessage({ id: "Status" })}
            </label>
            <div className="d-flex justify-content-around py-3 filed_background">
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Status"
                  id="publish"
                  checked={status === "Publish"}
                  onChange={() => setStatus("Publish")}
                />
                <label className="form-check-label" htmlFor="publish">
                  {intl.formatMessage({ id: "Publish" })}
                </label>
              </div>
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="Status"
                  id="stop"
                  onChange={() => setStatus("stop")}
                  checked={status === "stop"}
                />
                <label className="form-check-label" htmlFor="stop">
                  {intl.formatMessage({ id: "Stop" })}
                </label>
              </div>
            </div>
          </div>
        </div>
        {publicationType === "private" ? (
          <>
            <div
              className="btn btn-success mx-1 text-center "
              onClick={() => {
                setModalManagementShow(true);
              }}
            >
              <span className="mx-3">+</span>
              {intl.formatMessage({ id: "AddManagementsToACircular" })}{" "}
            </div>
          </>
        ) : (
          <></>
        )}
        {publicationType === "secret" ? (
          <>
            <div
              className="btn btn-success mx-1 text-center "
              onClick={() => {
                setModalEmployeeShow(true);
              }}
            >
              <span className="mx-3">+</span>
              {intl.formatMessage({ id: "AddPeopleToACircular" })}{" "}
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="row mb-5">
          <div className="mt-5 mb-5 col-12 col-lg-12 mx-auto">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
              <div className="d-flex justify-content-center align-items-center w-sm-50 w-100">
                <button
                  className="btn btn-secondary mx-1 text-center w-50"
                  onClick={() => {
                    navigate("/circulars-settings", {
                      state: { cardId, cardName, serviceName: cardName },
                    });
                  }}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                {/* {(!loading ) ? ( */}
                <button
                  type="submit"
                  className="btn btn-success mx-1 text-center w-50"
                  style={{ border: "none" }}
                  // disabled={!isValid || loading}
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
                {/* ) : ( */}
                {/* <Button variant="success" disabled className="px-15 w-50">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="mx-2"
                    />
                    <span>{intl.formatMessage({ id: "Adding" })}</span>
                  </Button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </form>
      <div
        className="modal fade"
        id="rega_modal_departmental_organizational_structure"
        aria-hidden="true"
      >
        <ManagementHierarchyWithSearchPopup
          show={modalManagementShow}
          orgIds={orgIds}
          orgNames={orgNames}
          setOrgNames={setOrgNames}
          setOrgIds={setOrgIds}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleClose={() => {
            setModalManagementShow(false);
            setSearchTerm("");
          }}
        />
      </div>
      <EmployeesHierarchyPopup
        show={modalEmployeeShow}
        handleClose={() => setModalEmployeeShow(false)}
        employeeIds={employeeIds}
        setEmployeeIds={setEmployeeIds}
      />
      <ManagementHierarchyWithSearchPopup
        show={modalHShow}
        orgIds={involvedOrgIds}
        setOrgIds={setInvolvedOrgIds}
        orgNames={involvedOrgNames}
        setOrgNames={setInvolvedOrgNames}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleClose={() => {
          setModalHShow(false);
          setSearchTerm("");
        }}
      />
    </Fragment>
  );
}

export default NewOriginalDocumentTabForEdit;
