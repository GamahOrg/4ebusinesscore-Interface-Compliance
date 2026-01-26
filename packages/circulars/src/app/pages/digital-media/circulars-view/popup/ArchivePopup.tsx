import { FC } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

type ArchivePopupProps = {
  id?: string | number | undefined;
  handleArchive?: any;
  additionalData?: {};
  showArchive?: any;
  handleCloseArchive?: any;
};

export const ArchivePopup: FC<ArchivePopupProps> = ({
  showArchive,
  handleCloseArchive,
  id = 0,
  handleArchive = null,
}) => {
  const intl = useIntl();

  const archiveHandler = async() => {
    await handleArchive();
    handleCloseArchive();
  }
  return (
    <div className="modal-dialog modal-dialog-centered ">
      <Modal centered show={showArchive} onHide={handleCloseArchive}>
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale == "ar" ? "flex-start" : "center",
            flexDirection: intl.locale == "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center my-5 pb-4">
            <div className="text-center">
              <h3> {intl.formatMessage({ id: "ConfirmArchiving" })}</h3>
            </div>
          </Row>
          <Row className="justify-content-center mb-5">
            <div className="text-center">
              <h5>
                {intl.formatMessage({ id: "AreYouSureToArchiveThisItem" })}
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
                    onClick={handleCloseArchive}
                  >
                    {intl.formatMessage({ id: "Cancel" })}
                  </button>
                  <div
                    onClick={archiveHandler}
                    className="  btn btn-info me-5 w-100 "
                  >
                    <span className="indicator-label">
                      {intl.formatMessage({ id: "Archive" })}
                    </span>
                    <span className="indicator-progress">
                      {intl.formatMessage({ id: "Archiving" })}
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
  );
};
