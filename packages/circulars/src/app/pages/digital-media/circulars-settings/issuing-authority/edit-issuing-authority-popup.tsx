import { FC, Fragment, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResponseStatus } from "../../../../partials/response-status";
import { Modal } from "react-bootstrap";
import {
  editLkIssuer,
  fetchLkIssuer,
  getOneLkIssuer,
} from "../../../../redux/circular-lookups-slice";
import { RootState } from "../../../../redux/store";
import {
  EditAccreditationEvidenceProps,
  editAccreditationEvidenceSchema,
} from "../../news-setting/validation/edit-accreditation-evidence-validation";

interface Iprop {
  handleCloseEdit: () => void;
  id: string;
  show: boolean;
}

export const EditIssuingAuthorityPopup: FC<Iprop> = ({
  handleCloseEdit,
  id,
  show,
}) => {
  const [pageIndex] = useState(1);
  const [pageSize] = useState(10);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<EditAccreditationEvidenceProps>({
    resolver: yupResolver(editAccreditationEvidenceSchema),
    mode: "all",
    reValidateMode: "onChange",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneLkIssuer(id) as any);
  }, [dispatch, id]);

  let issuer = useSelector((state: RootState) => {
    return state?.circularLookups?.issuer;
  });

  useEffect(() => {
    setValue("nameAr", issuer?.nameAr || "");
    setValue("nameEn", issuer?.nameEn || "");
  }, [issuer, setValue]);

  const showSuccessAlert = (status: boolean, text: string) => {
    Swal.fire({
      text: intl.formatMessage({ id: text }),
      icon: status ? "success" : "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: { confirmButton: "btn btn-primary" },
    });
  };
  const onSubmit = async (data: any) => {
    data = {
      id: id,
      nameAr: data.nameAr,
      nameEn: data.nameEn,
    };
    try {
      await dispatch(editLkIssuer(data) as any)
        .then((result: any) => {
          if (
            result?.payload?.message === "UpdatedSuccessfully" &&
            result?.payload?.statusEnum === ResponseStatus.SavedSuccessfully
          ) {
            showSuccessAlert(true, result?.payload?.message);
            let params = {
              pageSize: pageSize,
              pageNumber: pageIndex,
            };
            dispatch(fetchLkIssuer(params) as any);
            handleCloseEdit();
          } else {
            showSuccessAlert(false, result?.payload?.message);
          }
        })
        .catch((err: any) => {
          showSuccessAlert(false, err?.payload?.message);
        });
    } catch (error) {
      showSuccessAlert(false, error as string);
    }
  };

  const intl = useIntl();

  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
        }}
      >
        <p className="mb-0">
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };
  return (
    <Fragment>
      <Modal show={show} onHide={handleCloseEdit} size="xl" centered style={{
        zIndex: 9999, 
            }} >
        <div className="card scroll-y ">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale === "ar" ? "flex-start" : "end",
              flexDirection: intl.locale === "en" ? "column-reverse" : "row",
            }}
            className="pb-0 border-bottom-0"
          >
            <div className="card-header  d-flex justify-content-center w-100 px-4 border-bottom-0">
              <Modal.Title id="contained-modal-title-vcenter">
                <div className="mb-9 text-center">
                  <h1 className="mb-3">
                    {intl.formatMessage({ id: "UpdateAccreditationEvidence" })}
                  </h1>
                  <span className="text-muted fs-6">
                    {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}
                  </span>
                </div>
              </Modal.Title>
            </div>
          </Modal.Header>

          <div className="d-flex flex-column">
            <form onSubmit={handleSubmit(onSubmit as any)}>
              <fieldset className="Regafieldset m-5">
                <legend>
                  {intl.formatMessage({ id: "AccreditationEvidenceData" })}
                </legend>
                <div className="row mb-5">
                  <div className="col-lg-6 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="outputName"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "NameInArabic" })}
                    </label>
                    <div className="input-group input-group-solid">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-tag-fill special"></i>
                        </span>
                      </div>
                      <input
                        {...register("nameAr")}
                        id="outputName"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "NameInArabic",
                        })}
                      />
                    </div>
                    {DisplayErrorMessage(errors?.nameAr?.message, intl)}
                  </div>
                  <div className="col-lg-6 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="outputName"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "NameInEnglish" })}
                    </label>
                    <div className="input-group input-group-solid">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="bi bi-tag-fill special"></i>
                        </span>
                      </div>
                      <input
                        {...register("nameEn")}
                        id="outputName"
                        type="text"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "NameInEnglish",
                        })}
                      />
                    </div>
                    {DisplayErrorMessage(errors?.nameEn?.message, intl)}
                  </div>
                </div>
              </fieldset>
              <div className="d-flex flex-center flex-row-fluid pt-12 gap-4 mb-5">
                <button
                  type="reset"
                  className="btn btn-light px-15"
                  onClick={() => {
                    handleCloseEdit();
                  }}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button type="submit" className="btn btn-success px-15">
                  <span className="indicator-label">
                    {intl.formatMessage({ id: "Edit" })}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
};
