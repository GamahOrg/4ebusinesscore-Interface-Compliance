import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import OriginalDocumentForEditTab from "./OriginalDocumentForEditTab";
import ReviewDetailsForEditTab from "./ReviewDetailsForEditTab";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getDocumentInfo } from "../../../../redux/document-info-slice";
import { fetchAllRelatedDocumentsByCircularId } from "../../../../redux/circulars-related-documents-slice";
import moment from "moment";
import { EditDocumentInfoPopup } from "../popup/EditOnlyDocumentInfoPopup";
import { EditRelatedDocumentPopup } from "../popup/EditRelatedDocumentPopup";
import { fetchCircular } from "../../../../redux/circulars-slice";

function EditCircularHome() {
  let intl = useIntl();
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchCircular(id) as any);
      dispatch(getDocumentInfo(id) as any);
      dispatch(fetchAllRelatedDocumentsByCircularId(id) as any);
    }
  }, [dispatch, id]);
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  let relatedDocuments = useSelector((state: RootState) => {
    return state?.circularsRelatedDocuments?.relatedDocuments;
  });
  let documentInfoDetails = useSelector((state: RootState) => {
    return state?.documentInfo?.documentInfo;
  });
  let circularDetails = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  return (
    <Fragment>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12  col-lg-4 col-md-4">
            <div className="row flex-column">
              <div className="card mb-3 mb-xl-9 h-fit p-8 ">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="w-60 d-flex align-items-center">
                    <i className="fa-solid fa-circle-info  fs-4 my-0 text-success d-block h-100"></i>
                    <span className="fs-4 my-0 d-block h-100 fw-bolder mx-4">
                      {intl.formatMessage({ id: "DocumentInformation" })}
                    </span>
                  </div>
                  <div className="w-fit ">
                    <i
                      onClick={() => {
                        setShowEditModal(true);
                      }}
                      className="fa-regular fa-pen-to-square text-muted fs-4 cursor-pointer"
                    ></i>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Accreditation" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "Accreditation" })}
                    </span>
                    :
                    <span className="mx-2">
                      {circularDetails?.approval ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "DocumentNumber" })}
                    </span>
                    :
                    <span className="mx-2">
                      {documentInfoDetails?.documentNumber ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "AccreditationDate" })}
                    </span>
                    :
                    <span className="mx-2">
                      {documentInfoDetails?.accreditationDate
                        ? moment(documentInfoDetails?.accreditationDate).format(
                            "YYYY/MM/DD",
                          )
                        : intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Issuer" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span>
                      {documentInfoDetails?.issuer ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "DocumentClass" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <div className="mb-2">
                      {documentInfoDetails?.documentClass ||
                        intl.formatMessage({ id: "NotFound" })}
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Enforcement" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span>
                      {documentInfoDetails?.enforcement ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "DocumentAbout" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span>
                      {documentInfoDetails?.documentAbout ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Source" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    {documentInfoDetails?.source ||
                      intl.formatMessage({ id: "NotFound" })}
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "EditionNumber" })}
                    </span>
                    :
                    <span className="mx-2">
                      {documentInfoDetails?.editionNumber ||
                        intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "EditionDate" })}
                    </span>
                    :
                    <span className="mx-2">
                      {documentInfoDetails?.editionDate
                        ? moment(documentInfoDetails?.editionDate).format(
                            "YYYY/MM/DD",
                          )
                        : intl.formatMessage({ id: "NotFound" })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="card mb-3 mb-xl-9 h-fit p-6">
                <div className="d-flex align-items-center justify-content-between h-50px mb-4">
                  <div className="w-60 d-flex align-items-center">
                    <i className="fa-solid fa-file fs-4 my-0 text-success d-block h-100"></i>
                    <span className="fs-4 my-0 d-block h-100 fw-bolder mx-4">
                      {intl.formatMessage({ id: "DocumentDetail" })}
                    </span>
                  </div>
                </div>
                <p className="text-muted mb-3">
                  {documentInfoDetails?.documentAbout}
                </p>
                <div className="text-muted h-fit mb-2">
                  <span className="mx-1">
                    {" "}
                    {intl.formatMessage({
                      id: "Issuer",
                    })}
                  </span>
                  :<span className="mx-2">{documentInfoDetails?.issuer}</span>
                  <span className="mx-1">
                    {" "}
                    {intl.formatMessage({
                      id: "DocumentNumber",
                    })}
                  </span>
                  :
                  <span className="mx-2">
                    {documentInfoDetails?.documentNumber}
                  </span>
                </div>
                <div className="text-muted h-fit mb-2">
                  <span className="mx-1">
                    {" "}
                    {intl.formatMessage({ id: "DecisionDate" })}
                  </span>
                  :
                  <span className="mx-2">
                    {documentInfoDetails?.editionDate
                      ? moment(documentInfoDetails?.editionDate).format(
                          "YYYY/MM/DD",
                        )
                      : ""}
                  </span>
                </div>
              </div>
              <div className="card mb-3 mb-xl-9 h-fit p-8">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="w-60 d-flex align-items-center">
                    <i className="fa-solid fa-file fs-4 my-0 text-success d-block h-100"></i>
                    <span className="fs-4 my-0 d-block h-100 fw-bolder mx-4">
                      {intl.formatMessage({ id: "RelatedDocuments" })}
                    </span>
                  </div>
                  <div className="w-fit ">
                    <i
                      onClick={() => {
                        setShowAddModal(true);
                      }}
                      className="fa-regular fa-pen-to-square text-muted fs-4 cursor-pointer"
                    ></i>
                  </div>
                </div>
                <ul>
                  {relatedDocuments?.map((item: any) => {
                    let { id, date, circularName, circularNumber } = item;
                    return (
                      <Fragment key={id}>
                        <li className="mb-2">{circularName}</li>
                        <div className="mb-5">
                          {" "}
                          <div className="text-muted h-fit mb-2">
                            <span className="mx-1">
                              {" "}
                              {intl.formatMessage({ id: "RoyalDecreeNo" })}
                            </span>
                            :<span className="mx-2">{circularNumber}</span>
                          </div>
                          <div className="text-muted h-fit mb-2">
                            <span className="mx-1">
                              {" "}
                              {intl.formatMessage({ id: "DecisionDate" })}
                            </span>
                            :
                            <span className="mx-2">
                              {moment(date).format("YYYY-MM-DD")}
                            </span>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8 col-md-8 ">
            <div className="card mb-3 mb-xl-9 ">
              <div className="card-body pt-7 pb-0">
                <div className="row d-flex">
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
                  </ul>
                </div>
                {searchParams.get("tabName") === "original-document" ||
                location.search === "" ? (
                  <OriginalDocumentForEditTab />
                ) : (
                  <></>
                )}
                {searchParams.get("tabName") === "review-details" ? (
                  <ReviewDetailsForEditTab />
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <EditDocumentInfoPopup
        showEdit={showEditModal}
        handleCloseEdit={() => {
          setShowEditModal(false);
        }}
      />
      <EditRelatedDocumentPopup
        showEdit={showAddModal}
        handleCloseEdit={() => {
          setShowAddModal(false);
        }}
        circularId={id}
      />
    </Fragment>
  );
}

export default EditCircularHome;
