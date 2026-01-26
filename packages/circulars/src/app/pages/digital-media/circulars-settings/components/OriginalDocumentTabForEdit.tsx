import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import {
  AddCircularProps,
  AddCircularSchema,
} from "../../../../validation/add-circular-validation";
import { useDispatch, useSelector } from "react-redux";
import { ManagementHierarchyPopup } from "../popup/ManagementHierarchyPopup";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { EmployeesHierarchyPopup } from "../popup/EmployeesHierarchyPopup";
import { editCircular, fetchCircular } from "../../../../redux/circulars-slice";
import { RootState } from "../../../../redux/store";
import { CircularsRootUrl } from "@4eplatform/shared/apis/circulars";

function OriginalDocumentTabForEdit({
  circularId = "",
  setCircularId = "",
}: {
  circularId?: string;
  setCircularId?: any;
}) {
  let intl = useIntl();
  let navigate = useNavigate();
  let location = useLocation();
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
  let [publicationType, setPublicationType] = useState("public");
  let [status, setStatus] = useState("Publish");
  const [modalEmployeeShow, setModalEmployeeShow] = useState<boolean>(false);
  let [employeeIds, setEmployeeIds] = useState<string[]>([]);
  const [modalManagementShow, setModalManagementShow] =
    useState<boolean>(false);
  const getIconSrc = (fileName: string, file: any) => {
    if (
      fileName?.endsWith(".png") ||
      fileName?.endsWith(".jpg") ||
      fileName?.endsWith(".jpeg") ||
      fileName?.endsWith(".jfif") ||
      fileName?.endsWith(".webp")
    ) {
      return fileName?.includes("wwwroot")
        ? CircularsRootUrl + fileName
        : URL.createObjectURL(file);
    } else if (fileName?.endsWith(".pdf")) {
      return "/media/pmo/pdfIcon.png";
    } else if (fileName?.endsWith(".doc") || fileName?.endsWith(".docx")) {
      return "/media/pmo/wordIcon2.jpg";
    } else if (fileName?.endsWith(".xls") || fileName?.endsWith(".xlsx")) {
      return "/media/pmo/excelIcon2.jpg";
    } else if (fileName?.endsWith(".txt")) {
      return "/media/pmo/textIcon.png";
    } else if (
      fileName?.endsWith(".mp4") ||
      fileName?.endsWith(".webm") ||
      fileName?.endsWith(".avi") ||
      fileName?.endsWith(".mkv") ||
      fileName?.endsWith(".flv") ||
      fileName?.endsWith(".ts")
    ) {
      return "/media/pmo/video.png";
    } else if (
      fileName?.endsWith(".ppt") ||
      fileName?.endsWith(".pptx") ||
      fileName?.endsWith(".pptm") ||
      fileName?.endsWith(".pps") ||
      fileName?.endsWith(".ppsx") ||
      fileName?.endsWith(".ppsm")
    ) {
      return "/media/pmo/powerPointIcon.png";
    }
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFileForAttachments, setSelectedFileForAttachments] =
    useState<any>([]);
  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    setSelectedFileForAttachments(file);
  };
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<AddCircularProps>({
    resolver: yupResolver(AddCircularSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let language: string = intl.locale;
  let { id } = useParams();
  let dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchCircular(id) as any);
    }
  }, [id, dispatch]);
  let circularDetails = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language === "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language === "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };
  let [orgIds, setOrgIds] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      setValue("Approval", circularDetails?.approval);
      setValue(
        "FromDate",
        moment(circularDetails?.fromDate).format("YYYY-MM-DD"),
      );
      if (circularDetails?.toDate) {
        setValue(
          "ToDate",
          moment(circularDetails?.toDate).format("YYYY-MM-DD"),
        );
      } else {
        setValue("ToDate", "");
      }
      setValue("Name", circularDetails?.name);
      setValue("Number", circularDetails?.number);
      if (circularDetails?.orgs?.length > 0) {
        setOrgIds(circularDetails?.orgs);
      }
      if (circularDetails?.users?.length > 0) {
        setEmployeeIds(circularDetails?.users);
      }
      setPublicationType(
        circularDetails?.publicationType === 0
          ? "public"
          : circularDetails?.publicationType === 1
          ? "private"
          : "secret",
      );
      setStatus(circularDetails?.ispublished ? "Publish" : "stop");
      setSelectedFileForAttachments({
        name: circularDetails?.attachments[0]?.filePath,
      });
    }
  }, [circularDetails, id, setValue]);
  let handleEditCircular = async (formValues: AddCircularProps) => {
    if (selectedFileForAttachments?.name === "") {
      setError("Attachments", {
        type: "custom",
        message: "ThisFelidIsRequired",
      });
      return;
    }
    if (publicationType === "secret" && employeeIds?.length === 0) {
      showSuccessAlert(false, "YouMustSelectEmployees", intl);
      return;
    }
    if (publicationType === "private" && orgIds?.length === 0) {
      showSuccessAlert(false, "YouMustSelectOrgs", intl);
      return;
    }
    let formData = new FormData();
    formData.append("id", id as string);
    formData.append("PutCircularCommandDto.Name", formValues?.Name);
    formData.append(
      "PutCircularCommandDto.Number",
      formValues?.Number?.toString(),
    );
    formData.append("PutCircularCommandDto.Approval", formValues?.Approval);
    if (formValues?.ToDate) {
      formData.append(
        "PutCircularCommandDto.ToDate",
        moment(formValues?.ToDate as string)
          .add(1, "days")
          .toISOString(),
      );
    }
    formData.append(
      "PutCircularCommandDto.FromDate",
      moment(formValues?.FromDate as string)
        .add(1, "days")
        .toISOString(),
    );
    if (selectedFileForAttachments?.name?.includes("wwwroot")) {
      formData.append("Attachments", selectedFileForAttachments?.name);
    } else {
      formData.append("Attachments", selectedFileForAttachments);
    }
    if (employeeIds?.length > 0 && publicationType === "secret") {
      employeeIds
        ?.filter((item) => {
          return item !== undefined;
        })
        ?.forEach((id) => {
          formData.append("PutCircularCommandDto.Users", id);
        });
    }
    if (orgIds?.length > 0 && publicationType === "private") {
      orgIds?.forEach((id) => {
        formData.append("PutCircularCommandDto.Orgs", id);
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
      "PutCircularCommandDto.Ispublished",
      status === "stop" ? "false" : "true",
    );
    formData.append("PutCircularCommandDto.Details", circularDetails?.details);
    setLoading(true);
    try {
      await dispatch(editCircular(formData) as any).then((res: any) => {
        if (res?.payload?.statusEnum === 1) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            // dispatch(fetchCircular(id) as any);
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
        } else {
          showSuccessAlert(false, res?.payload?.message, intl, () => {
            setLoading(false);
          });
        }
      });
    } catch (error) {
      console.error("Error during editing basic data:", error);
    }
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit(handleEditCircular)}>
        <div className="row mb-3">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="CircularName"
              >
                {intl.formatMessage({
                  id: "CircularName",
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
                    id: "CircularName",
                  })}
                  {...register("Name")}
                />
                {DisplayErrorMessage(errors?.Name?.message, intl)}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="Accreditation"
              >
                {intl.formatMessage({
                  id: "Accreditation",
                })}
              </label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa-solid fa-certificate special"></i>
                  </span>
                </div>
                <input
                  type="text"
                  id="Accreditation"
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({
                    id: "Accreditation",
                  })}
                  {...register("Approval")}
                />
                {DisplayErrorMessage(errors?.Approval?.message, intl)}
              </div>
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="CircularNumber"
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
                  id="CircularNumber"
                  className="form-control form-control-solid"
                  placeholder={intl.formatMessage({
                    id: "DocumentNumber",
                  })}
                  {...register("Number")}
                />
                {DisplayErrorMessage(errors?.Number?.message, intl)}
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700 required"
                htmlFor="Date"
              >
                {intl.formatMessage({
                  id: "FromDate",
                })}
              </label>
              <input
                type="date"
                id="Date"
                className="form-control form-control-solid"
                {...register("FromDate")}
              />
              {DisplayErrorMessage(errors?.FromDate?.message, intl)}
            </div>
          </div>
          <div className="col-12 col-sm-12 col-md-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700"
                htmlFor="Date"
              >
                {intl.formatMessage({
                  id: "ToDate",
                })}
              </label>
              <input
                type="date"
                id="Date"
                className="form-control form-control-solid"
                {...register("ToDate")}
              />
              {DisplayErrorMessage(errors?.ToDate?.message, intl)}
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-lg-12 mb-2 pt-2 pb-3">
            <label className="form-label px-2  fontSz-6 required">
              {intl.formatMessage({ id: "DownloadFile" })}
            </label>
            <div className="notice d-flex bg-light-primary rounded border-primary border border-dashed p-5 h-80px">
              <label
                htmlFor="DownloadFile"
                className="form-label  dropzone-select  uploadFile-style inputAreaHeight"
              >
                <div role="button" className="d-flex align-items-center">
                  {selectedFileForAttachments?.name ? (
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
                                selectedFileForAttachments?.name,
                                selectedFileForAttachments,
                              )}
                              onError={(e: any) =>
                                (e.target.src = "/media/logos/logo-sm.png")
                              }
                              className={selectedFileForAttachments?.name}
                            />
                            <div className="mx-1">
                              {selectedFileForAttachments?.name?.includes(
                                "wwwroot",
                              )
                                ? selectedFileForAttachments?.name
                                    ?.split("/")
                                    ?.slice(-1)[0]
                                : selectedFileForAttachments?.name}
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
                    accept="image/*"
                    type="file"
                    id="DownloadFile"
                    name="DownloadFile"
                    onChange={handleFileInputChange}
                    placeholder={intl.formatMessage({ id: "FileUpload" })}
                    className="dropzone-select  uploadFile-style inputAreaHeight d-none w-100"
                  />
                </div>
              </div>
            </div>
            {DisplayErrorMessage(errors?.Attachments?.message, intl)}
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
                  name="public"
                  id="public"
                  checked={publicationType === "public"}
                  onClick={() => setPublicationType("public")}
                />
                <label className="form-check-label" htmlFor="public">
                  {intl.formatMessage({ id: "Public" })}
                </label>
              </div>
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="private"
                  id="private"
                  onClick={() => setPublicationType("private")}
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
                  name="secret"
                  id="stop"
                  checked={publicationType === "secret"}
                  onClick={() => setPublicationType("secret")}
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
                  name="publish"
                  id="publish"
                  checked={status === "Publish"}
                  onClick={() => setStatus("Publish")}
                />
                <label className="form-check-label" htmlFor="publish">
                  {intl.formatMessage({ id: "Publish" })}
                </label>
              </div>
              <div className="form-check form-check-success form-check-sm form-check-custom ">
                <input
                  className="form-check-input"
                  type="radio"
                  name="stop"
                  id="stop"
                  onClick={() => setStatus("stop")}
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
                  type="reset"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                {!loading ? (
                  <button
                    type="submit"
                    className="btn btn-primary mx-1 text-center w-50"
                    style={{ border: "none" }}
                  >
                    {intl.formatMessage({ id: "Save" })}
                  </button>
                ) : (
                  <Button variant="success" disabled className="px-15 w-50">
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
                )}
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
        <ManagementHierarchyPopup
          show={modalManagementShow}
          orgIds={orgIds}
          setOrgIds={setOrgIds}
          handleClose={() => {
            setModalManagementShow(false);
          }}
        />
      </div>
      <EmployeesHierarchyPopup
        show={modalEmployeeShow}
        handleClose={() => setModalEmployeeShow(false)}
        employeeIds={employeeIds}
        setEmployeeIds={setEmployeeIds}
      />
    </Fragment>
  );
}

export default OriginalDocumentTabForEdit;
