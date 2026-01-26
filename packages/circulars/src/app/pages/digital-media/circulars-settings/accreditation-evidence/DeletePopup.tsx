import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type DeletePopupProps = {
  cancelFun: () => void;
  confirm: () => void;
};

export const DeletePopup: FC<DeletePopupProps> = ({ cancelFun, confirm }) => {
  const intl = useIntl();

  return (
    <div
      className="modal  fade creatForm show"
      role="dialog"
      style={{ paddingRight: "10px", display: "block" }}
    >
      <div className="modal-dialog modal-xl" style={{ width: "80%" }}>
        <div className="modal-dialog modal-dialog-centered mw-650px">
          <Modal centered show={true}>
            <Modal.Header
              onClick={() => {
                cancelFun();
              }}
              closeButton
              style={{
                alignItems: intl.locale === "ar" ? "flex-start" : "end",
                flexDirection: intl.locale === "en" ? "column-reverse" : "row",
              }}
            >
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row className="justify-content-center my-5 pb-4">
                <div className="text-center">
                  <h3> {intl.formatMessage({ id: "ConfirmDeletion" })}</h3>
                </div>
              </Row>

              <Row className="justify-content-center mb-5">
                <div className="text-center">
                  <h5>
                    {intl.formatMessage({ id: "AreYouSureToDeleteThisItem" })}
                  </h5>
                </div>
              </Row>
            </Modal.Body>

            <Modal.Footer className="justify-content-center py-2">
              <div className="row">
                <div className="col-12 col-lg-7 mx-auto my-2 pb-2">
                  <div className="outputCard card-diff-toolbar w-100 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <button
                        type="reset"
                        className="btn btn-secondary me-3 w-100"
                        onClick={cancelFun}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>
                      <div
                        onClick={() => {
                          confirm();
                        }}
                        className="  btn btn-danger me-5 w-100 "
                      >
                        <span className="indicator-label">
                          {intl.formatMessage({ id: "Delete" })}
                        </span>
                        <span className="indicator-progress">
                          {intl.formatMessage({ id: "Deleting" })}
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};
