import { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useSearchParams } from "react-router-dom";
import { EditDocumentInformationPopup } from "../popup/EditDocumentInformationPopup";
import { AddRelatedDocumentPopup } from "../popup/AddRelatedDocumentPopup";
import NewOriginalDocumentTab from "./NewOriginalDocumentTab";
import NewReviewDetailsTab from "./NewReviewDetailsTab";
import { NewRelatedDocumentsTab } from "./NewRelatedDocumentsTab";

function AddNewCircularHome() {
  let intl = useIntl();
  let [circularId, setCircularId] = useState("");
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  let [circular, setCircular] = useState<any>({});
  let [details, setDetails] = useState("");
  const [selectedFileForAttachments, setSelectedFileForAttachments] =
  useState<any>([]);
  return (
    <Fragment>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="card mb-3 mb-xl-9">
              <div className="card-body pt-7 pb-0">
                <h4 className="mb-6">
                  {intl.formatMessage({ id: "AddNewCircular" })}
                </h4>

                <div className="row d-flex overflow-auto ">
                  <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-10">
                    <button
                      className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6 pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                        searchParams.get("tabName") === "original-document" ||
                        location.search === ""
                          ? "active"
                          : ""
                      }`}
                      onClick={() => {
                        searchParams.set("tabName", "original-document");
                        setSearchParams(searchParams);
                      }}
                    >
                      {" "}
                      {intl.formatMessage({ id: "OriginalDocument" })}
                    </button>
                    <button
                      className={` btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6  pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                        searchParams.get("tabName") === "review-details"
                          ? " active"
                          : ""
                      }`}
                      onClick={() => {
                        searchParams.set("tabName", "review-details");
                        setSearchParams(searchParams);
                      }}
                    >
                      {" "}
                      {intl.formatMessage({ id: "CircularText" })}
                    </button>
                    <button
                      className={` btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6  pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                        searchParams.get("tabName") === "related-documents"
                          ? " active"
                          : ""
                      }`}
                      onClick={() => {
                        searchParams.set("tabName", "related-documents");
                        setSearchParams(searchParams);
                      }}
                    >
                      {" "}
                      {intl.formatMessage({ id: "RelatedDocuments" })}
                    </button>
                  </ul>
                </div>
                {searchParams.get("tabName") === "original-document" ||
                location.search === "" ? (
                  <NewOriginalDocumentTab
                    {...{
                      circularId,
                      setCircularId,
                      circular,
                      setCircular,
                      setSelectedFileForAttachments,
                      selectedFileForAttachments
                    }}
                  />
                ) : (
                  <></>
                )}
                {searchParams.get("tabName") === "review-details" ? (
                  <NewReviewDetailsTab
                    {...{
                      circularId,
                      setCircularId,
                      circular,
                      setCircular,
                      details,
                      setDetails
                    }}
                  />
                ) : searchParams.get("tabName") === "related-documents" ? (
                  <NewRelatedDocumentsTab
                    {...{
                      circularId,
                      setCircularId,
                      circular,
                      setCircular
                    }}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditDocumentInformationPopup
        showEdit={showEditModal}
        handleCloseEdit={() => {
          setShowEditModal(false);
        }}
        circularId={circularId}
      />
      <AddRelatedDocumentPopup
        showEdit={showAddModal}
        handleCloseEdit={() => {
          setShowAddModal(false);
        }}
        circularId={circularId}
      />
    </Fragment>
  );
}

export default AddNewCircularHome;
