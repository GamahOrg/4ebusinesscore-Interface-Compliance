import { FC, Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Modal } from "react-bootstrap";
import {
  fetchLastMessage,
  updateMessage,
} from "../../../../redux/message-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import {
  WelcomeMessageSchema,
  WelcomeMessageSchemaProps,
} from "../../news-setting/validation/welcome-message-validation";
interface Iprop {
  handleClose: () => void;
  show: boolean;
  pageIndex?: any;
  pageSize?: any;
}

export const AddWelcomeMessagePopup: FC<Iprop> = ({
  handleClose,
  show,
  pageIndex,
  pageSize,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<WelcomeMessageSchemaProps>({
    resolver: yupResolver(WelcomeMessageSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    dispatch(fetchLastMessage({}) as any);
  }, [dispatch]);

  const { lastMessage } = useSelector((state: any) => state.message);

  useEffect(() => {
    if (lastMessage) {
      setValue("descriptionAr", lastMessage?.descriptionAr);
      setValue("descriptionEn", lastMessage?.descriptionEn);
    }
  }, [lastMessage]);

  const onSubmit = async (data: any) => {
    await dispatch(updateMessage(data) as any).then((res: any) => {
      if (res?.payload?.message === "UpdatedSuccessfully") {
        showSuccessAlert(true, "AddedSuccessfully", intl);
        handleClose();
      } else {
        showSuccessAlert(false, res?.payload?.message, intl);
      }
    });
  };

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
      <Modal
        show={show}
        onHide={handleClose}
        size="xl"
        centered
        style={{
          zIndex: 9999,
        }}
      >
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
                    {intl.formatMessage({ id: "AddWelcomeMessage" })}
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
                <legend>{intl.formatMessage({ id: "WelcomeMessage" })}</legend>
                <div className="row mb-5">
                  <div className="col-lg-6 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="outputName"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "MessageInArabic" })}
                    </label>
                    <div className="input-group input-group-solid">
                      <textarea
                        {...register("descriptionAr")}
                        id="outputName"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "MessageInArabic",
                        })}
                        rows={5}
                      />
                    </div>
                    {DisplayErrorMessage(errors?.descriptionAr?.message, intl)}
                  </div>
                  <div className="col-lg-6 mb-2 pt-2 pb-3">
                    <label
                      htmlFor="outputName"
                      className="form-label px-2 fontSz-6"
                    >
                      {intl.formatMessage({ id: "MessageInEnglish" })}
                    </label>
                    <div className="input-group input-group-solid">
                      <textarea
                        {...register("descriptionEn")}
                        id="outputName"
                        className="form-control"
                        placeholder={intl.formatMessage({
                          id: "MessageInEnglish",
                        })}
                        rows={5}
                      />
                    </div>
                    {DisplayErrorMessage(errors?.descriptionEn?.message, intl)}
                  </div>
                </div>
              </fieldset>
              <div className="d-flex flex-center flex-row-fluid pt-12 gap-4 mb-5">
                <button
                  type="reset"
                  className="btn btn-light px-15"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button type="submit" className="btn btn-success px-15">
                  <span className="indicator-label">
                    {intl.formatMessage({ id: "Add" })}
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
