import { Fragment, useState , useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation, useSearchParams } from "react-router-dom";
import OriginalDocumentTab from "./OriginalDocumentTab";
import ReviewDetailsTab from "./ReviewDetailsTab";
import { EditDocumentInformationPopup } from "../popup/EditDocumentInformationPopup";
import { AddRelatedDocumentPopup } from "../popup/AddRelatedDocumentPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { getDocumentInfo } from "../../../../redux/document-info-slice";
import { fetchAllRelatedDocumentsByCircularId } from "../../../../redux/circulars-related-documents-slice";
import { CircularRelatedDocumentModel } from "../../../../model/circulars/circular-related-document-model";
import moment from "moment";
import {fetchCircular } from "../../../../redux/circulars-slice";
function AddCircularHome() {
  let intl = useIntl();
  let [circularId,setCircularId]=useState("")
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const dispatch = useDispatch()
  useEffect(() => {
    if(circularId){
      dispatch(fetchCircular(circularId) as any);
      dispatch(getDocumentInfo(circularId) as any);
      dispatch(fetchAllRelatedDocumentsByCircularId(circularId) as any)
    }
  }, [dispatch,circularId]);

  let documentInfoDetails = useSelector((state: RootState) => {
    return state?.documentInfo?.documentInfo;
  });
  let relatedDocuments=useSelector((state: RootState) => {
    return state?.circularsRelatedDocuments?.relatedDocuments;
  })
  let circularDetails = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  let [circular,setCircular]=useState<any>({})
  let [newRelatedDocuments,setNewRelatedDocuments]=useState<any>([])
  useEffect(()=>{
    if(circularId){
      setCircular(circularDetails)
    }
    else {
      setCircular({})
    }
  },[circularId,circularDetails])
  useEffect(()=>{
    if(circularId){
      setNewRelatedDocuments(relatedDocuments)
    }
    else {
      setNewRelatedDocuments([])
    }
  },[circularId,relatedDocuments])
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
                    :<span className="mx-2">{circular?.approval}</span>
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "DocumentNumber" })}
                    </span>
                    :<span className="mx-2">{documentInfoDetails?.documentNumber || "" }</span>
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "AccreditationDate" })}
                    </span>
                    :<span className="mx-2">
                      {documentInfoDetails?.accreditationDate ?moment(documentInfoDetails?.accreditationDate).format("YYYY/MM/DD") : ""}
                      </span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Issuer" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span>{documentInfoDetails?.issuer}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "DocumentClass" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <div className="mb-2">{documentInfoDetails?.documentClass}</div>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Enforcement" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span>{documentInfoDetails?.enforcement}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "DocumentAbout" })}
                  </p>
                  <div className="text-muted h-fit mb-2">
                    <span>{documentInfoDetails?.documentAbout}</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="fw-bold mb-3">
                    {intl.formatMessage({ id: "Source" })}
                  </p>
                  <div className="text-muted h-fit mb-2">{documentInfoDetails?.source}</div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "EditionNumber" })}
                    </span>
                    :<span className="mx-2">{documentInfoDetails?.editionNumber || ""}</span>
                  </div>
                  <div className="text-muted h-fit mb-2">
                    <span className="mx-1">
                      {" "}
                      {intl.formatMessage({ id: "EditionDate" })}
                    </span>
                    :<span className="mx-2">
                      {documentInfoDetails?.editionDate ? moment(documentInfoDetails?.editionDate).format("YYYY/MM/DD") : ""}
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
                  :
                  <span className="mx-2">{documentInfoDetails?.issuer}</span>
                  <span className="mx-1">
                    {" "}
                    {intl.formatMessage({
                      id: "DocumentNumber",
                    })}
                  </span>
                  :<span className="mx-2">{documentInfoDetails?.documentNumber}</span>
                </div>
                <div className="text-muted h-fit mb-2">
                  <span className="mx-1">
                    {" "}
                    {intl.formatMessage({ id: "DecisionDate" })}
                  </span>
                  :<span className="mx-2">
                  {documentInfoDetails?.editionDate ? moment(documentInfoDetails?.editionDate).format("YYYY/MM/DD") : ""}
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
                  {newRelatedDocuments?.map((item:CircularRelatedDocumentModel) => {
                    let {id, date,circularName,circularNumber } = item;
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
                            :<span className="mx-2">{moment(date).format("YYYY-MM-DD")}</span>
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
            <div className="card mb-3 mb-xl-9">
              <div className="card-body pt-7 pb-0">
                <h4 className="mb-6">
                  {intl.formatMessage({ id: "AddNewCircular" })}
                </h4>

                <div className="row d-flex overflow-auto h-66px">
                  <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-semibold flex-nowrap mb-10">
                    <button
                      className={`btn rounded-0 bg-transparent btn-active-color-primary border-0 ms-6 pe-3 fw-bolder  border border-bottom border-white border-2 border-active-primary  ${
                        searchParams.get("tabName") == "original-document" ||
                        location.search == ""
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
                        searchParams.get("tabName") == "review-details"
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
                {searchParams.get("tabName") == "original-document" ||
                location.search == "" ? (
                  <OriginalDocumentTab {...{
                    circularId,
                    setCircularId
                  }}/>
                ) : (
                  <></>
                )}
                {searchParams.get("tabName") == "review-details" ? (
                  <ReviewDetailsTab {...{
                    circularId,
                    setCircularId
                  }}/>
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
        circularId = {circularId}
      />
      <AddRelatedDocumentPopup
        showEdit={showAddModal}
        handleCloseEdit={() => {
          setShowAddModal(false);
        }}
        circularId = {circularId}
      />
    </Fragment>
  );
}

export default AddCircularHome;
