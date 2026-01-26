import { Fragment, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import NewOriginalDocumentTabForEdit from "./NewOriginalDocumentTabForEdit";
import NewReviewDetailsTabForEdit from "./NewReviewDetailsTabForEdit";
import { NewRelatedDocumentsTabForEdit } from "./NewRelatedDocumentsTabForEdit";

function EditNewCircularHome() {
  let intl = useIntl();
  let { id: circularId } = useParams();
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  let [details, setDetails] = useState("");
  return (
    <Fragment>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="card mb-3 mb-xl-9">
              <div className="card-body pt-7 pb-0">
                <h4 className="mb-6">
                  {intl.formatMessage({ id: "EditCircular" })}
                </h4>

                <div className="row d-flex overflow-auto h-66px">
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
                  <NewOriginalDocumentTabForEdit
                    {...{
                      circularId,
                    }}
                  />
                ) : (
                  <></>
                )}
                {searchParams.get("tabName") === "review-details" ? (
                  <NewReviewDetailsTabForEdit
                    {...{
                      circularId,
                      details,
                      setDetails
                    }}
                  />
                ) : searchParams.get("tabName") === "related-documents" ? (
                  <NewRelatedDocumentsTabForEdit
                    {...{
                      circularId,
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
    </Fragment>
  );
}

export default EditNewCircularHome;
