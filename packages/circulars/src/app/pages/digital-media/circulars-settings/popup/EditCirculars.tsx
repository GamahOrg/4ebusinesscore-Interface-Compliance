import React, { useRef } from "react";
import { useIntl } from "react-intl";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { SavePopup } from "@4eplatform/shared/src/popups/SavePopup";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import { EmployeeHierarchyPopup } from "@4eplatform/shared/src/popups/EmployeeHierarchyPopup";

type ExProps = {
  show?: any;
  handleClose?: any;
};

const EditCirculars: React.FC<ExProps> = ({ show, handleClose }) => {
  const intl = useIntl();
  const [modalShow, setModalShow] = useState<boolean>(false);
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const [code, setCode] = useState("2");
  const [standard, setStandard] = useState(" مراجعة مستندات الصرف");
  const [assignedTo, setAssignedTo] = useState("علي محمد علي");
  const [management, setManagement] = useState("الإدارة المالية");
  const [offerTo, setOfferTo] = useState("السيد محمد علي");

  const [fromDate, setFromDate] = useState("2023-11-09");
  const [toDate, setToDate] = useState("2024-11-10");
  return (
    <div className="modal-dialog modal-dialog-centered mw-850px">
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <div className="card">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <div className="card-header w-100 px-1 d-flex justify-content-center pb-2  border-bottom-0 mt-10">
              <Modal.Title>
                <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
                  <span className="card-label fs-4 my-5">
                    {intl.formatMessage({ id: "EditStanderd" })}
                  </span>
                </h3>
              </Modal.Title>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="row gy-5 pb-4 mt-3">
              <div className="col-md-6">
                <div>
                  <label
                    htmlFor="Owner"
                    className="form-label mx-2 px-2 fw-bolder"
                  >
                    {intl.formatMessage({ id: "Code" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa-solid fa-file fs-5"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="Owner"
                      id="Owner"
                      placeholder={intl.formatMessage({
                        id: "Code",
                      })}
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="Owner"
                  className="form-label mx-2 px-2 fw-bolder"
                >
                  {intl.formatMessage({ id: "Management" })}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user-cog special"></i>
                    </span>
                  </div>
                  <input
                    className="form-control form-control-solid"
                    placeholder={intl.formatMessage({
                      id: "SelectManagement",
                    })}
                    value={management}
                    onChange={(e) => setManagement(e.target.value)}
                  />
                  <div className="input-group-prepend h-100 d-flex">
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={() => {
                        setModalHShow(true);
                      }}
                    >
                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="Owner"
                  className="form-label mx-2 px-2 fw-bolder"
                >
                  {intl.formatMessage({ id: "AssignedTo" })}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user special"></i>
                    </span>
                  </div>
                  <input
                    className="form-control form-control-solid"
                    placeholder={intl.formatMessage({
                      id: "AssignedTo",
                    })}
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                  />
                  <div className="input-group-prepend h-100 d-flex">
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={() => {
                        setModalEShow(true);
                      }}
                    >
                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    htmlFor="Owner"
                    className="form-label mx-2 px-2 fw-bolder"
                  >
                    {intl.formatMessage({ id: "Circular" })}
                  </label>
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fa-solid fa-ring fs-5"></i>
                      </span>
                    </div>
                    <input
                      type="text"
                      className="form-control"
                      name="Owner"
                      id="Owner"
                      placeholder={intl.formatMessage({
                        id: "Circular",
                      })}
                      value={standard}
                      onChange={(e) => setStandard(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <label
                  htmlFor="Owner"
                  className="form-label mx-2 px-2 fw-bolder"
                >
                  {intl.formatMessage({ id: "OfferTo" })}
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user special"></i>
                    </span>
                  </div>
                  <input
                    className="form-control form-control-solid"
                    placeholder={intl.formatMessage({
                      id: "OfferTo",
                    })}
                    value={offerTo}
                    onChange={(e) => setOfferTo(e.target.value)}
                  />
                  <div className="input-group-prepend h-100 d-flex">
                    <span
                      className="input-group-text cursor-pointer"
                      onClick={() => {
                        setModalEShow(true);
                      }}
                    >
                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    htmlFor="From"
                    className="form-label mx-2 px-2 fw-bolder"
                  >
                    {intl.formatMessage({ id: "FromDate" })}
                  </label>

                  <input
                    type="date"
                    className="form-control form-control-solid d-flex"
                    value={fromDate} // Set the value from state
                    onChange={(e) => setFromDate(e.target.value)} // Update state on change
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div>
                  <label
                    htmlFor="From"
                    className="form-label mx-2 px-2 fw-bolder"
                  >
                    {intl.formatMessage({ id: "ToDate" })}
                  </label>

                  <input
                    type="date"
                    className="form-control form-control-solid d-flex"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center align-items-center mt-10 gap-5">
            <div>
              <a
                className="btn btn-secondary mx-1 text-center"
                onClick={(event) => {
                  event.preventDefault();
                  handleClose();
                }}
              >
                {intl.formatMessage({ id: "Cancel" })}
              </a>
              <button
                type="button"
                className="btn btn-primary mx-1 text-center"
                style={{ border: "none" }}
                onClick={(event) => {
                  event.preventDefault();
                  handleClose();
                  setModalShow(true);
                }}
              >
                {intl.formatMessage({ id: "Save" })}
              </button>
            </div>
          </Modal.Footer>
        </div>
      </Modal>
      <div className="modal fade" id="Rega_modal_save" aria-hidden="true">
        <SavePopup show={modalShow} handleClose={() => setModalShow(false)} />
      </div>
      <ManagementHierarchyPopup
        show={modalHShow}
        handleClose={() => setModalHShow(false)}
      />
      <EmployeeHierarchyPopup
        show={modalEShow}
        handleClose={() => setModalEShow(false)}
      />
    </div>
  );
};

export default EditCirculars;
