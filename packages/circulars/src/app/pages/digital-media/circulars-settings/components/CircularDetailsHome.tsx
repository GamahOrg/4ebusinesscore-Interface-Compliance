import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import OriginalDocumentForViewTab from "./OriginalDocumentForViewTab";
import ReviewDetailsForViewTab from "./ReviewDetailsForViewTab";
import ViewDetailsTab from "./ViewDetailsTab";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRelatedDocumentsByCircularId } from "../../../../redux/circulars-related-documents-slice";
import { RootState } from "../../../../redux/store";
import moment from "moment";
import "moment/locale/ar";
import { fetchCircular } from "../../../../redux/circulars-slice";

function CircularDetailsHome() {
  let intl = useIntl();
  let [searchParams, setSearchParams] = useSearchParams();
  let location = useLocation();
  let { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(fetchCircular(id) as any);
      dispatch(fetchAllRelatedDocumentsByCircularId(id) as any);
    }
  }, [dispatch, id]);
  let relatedDocuments = useSelector((state: RootState) => {
    return state?.circularsRelatedDocuments?.relatedDocuments;
  });
  let circularDetails = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  let language = intl.locale;
  function gregorianToHijri(gregorianDate: string) {
    const dayOfYear = Math.floor(
      (new Date(gregorianDate).getTime() -
        new Date(new Date().getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24),
    );
    const hijriDate =
      ((new Date(gregorianDate).getFullYear() - 621.5643) * 365.24225 +
        dayOfYear) /
      354.36707;
    const hijriYear = Math.floor(hijriDate);
    const hijriMonth = Math.ceil(
      ((hijriDate - Math.floor(hijriDate)) * 354.36707) / 29.530589,
    );
    const hijriDay =
      Math.floor(
        ((hijriDate - Math.floor(hijriDate)) * 354.36707) % 29.530589,
      ) - 2;

    return `${hijriYear}/${hijriMonth}/${hijriDay}`;
  }

  const gregorianDate = circularDetails?.accreditationDate as any;
  const hijriDate = gregorianToHijri(gregorianDate);
  return (
    <Fragment>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12  col-lg-4 col-md-4">
            <div className="row flex-column">
              <div className="card mb-3 mb-xl-9 h-fit p-8 ">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <div className="d-flex align-items-baseline">
                    <i className="far fa-file-alt  fs-4 my-0  d-block h-100 dark-color-icon text-dark"></i>
                    <span className="fs-5  my-0 d-block h-100 fw-bolder mx-4">
                      {intl.formatMessage({ id: "DocumentInformation" })}
                    </span>
                  </div>
                </div>
                <div className="mb-4">
                  {(circularDetails?.approvalNameAr ||
                    circularDetails?.approvalNameEn ||
                    circularDetails?.number ||
                    circularDetails?.accreditationDate) && (
                    <div className="d-flex align-items-baseline">
                      <i className="far fa-check-square dark-color-icon text-dark"></i>
                      <p className="dark-color-title text-dark mb-2 mx-2">
                        {intl.formatMessage({ id: "AccreditationProofs" })}
                      </p>
                    </div>
                  )}
                  {/* الاعتماااد */}
                  {(language === "ar"
                    ? circularDetails?.approvalNameAr
                    : circularDetails?.approvalNameEn) && (
                    <>
                      <div className="h-fit mb-2 mx-6">
                        <span className="mx-1 dark-color-des">
                          {language === "ar"
                            ? circularDetails?.approvalNameAr
                            : circularDetails?.approvalNameEn}
                        </span>
                      </div>
                    </>
                  )}
                  {circularDetails?.number && (
                    <div className="h-fit mb-2 mx-6">
                      <span className="mx-1 dark-color-des">
                        {" "}
                        {intl.formatMessage({ id: "DocumentNumber" })}
                      </span>
                      :
                      <span className="mx-2 dark-color-des">
                        {circularDetails?.number}
                      </span>
                    </div>
                  )}
                  {circularDetails?.accreditationDate && (
                    <div className="h-fit mb-2 mx-6">
                      <span className="mx-1 dark-color-des">
                        {" "}
                        {intl.formatMessage({ id: "AccreditationDate" })}
                      </span>
                      :
                      <span className="mx-2 dark-color-des">
                        <span className="mx-2">
                          {moment
                            .tz(circularDetails?.accreditationDate, "UTC")
                            .tz(
                              Intl.DateTimeFormat().resolvedOptions().timeZone,
                            )
                            .format("YYYY/MM/DD")}{" "}
                          {intl.locale === "ar" ? "م" : ""}
                          {" - "}
                          {circularDetails?.accreditationDateHijri}{" "}
                          {intl.locale === "ar" ? "هـ" : ""}
                        </span>
                      </span>
                    </div>
                  )}
                </div>
                {(circularDetails?.approvalNameAr ||
                  circularDetails?.approvalNameEn ||
                  circularDetails?.number ||
                  circularDetails?.accreditationDate) && (
                  <hr className="my-6" />
                )}
                {/* جهة الاصدار */}
                {(language === "ar"
                  ? circularDetails?.issuerNameAr
                  : circularDetails?.issuerNameEn) && (
                  <>
                    <div>
                      <div className="d-flex align-items-baseline">
                        <i className="far fa-building dark-color-icon text-dark"></i>
                        <span className="dark-color-title mb-2 mx-2 text-dark">
                          {intl.formatMessage({ id: "Issuer" })}
                        </span>
                      </div>
                      <div className="h-fit mb-2 mx-6">
                        <span className="dark-color-des">
                          {language === "ar"
                            ? circularDetails?.issuerNameAr
                            : circularDetails?.issuerNameEn}
                        </span>
                      </div>
                    </div>
                    <hr className="my-6" />
                  </>
                )}
                {/* فئة الوثيق */}
                {circularDetails?.documentClass && (
                  <>
                    <div>
                      <div className="d-flex align-items-baseline">
                        <i className="far fa-file dark-color-icon text-dark"></i>
                        <span className="dark-color-title mb-2 mx-2  text-dark">
                          {intl.formatMessage({ id: "DocumentClass" })}
                        </span>
                      </div>
                      <div className="h-fit mb-2 mx-6">
                        <span className="dark-color-des">
                          {circularDetails?.documentClass}
                        </span>
                      </div>
                    </div>
                    <hr className="my-6" />
                  </>
                )}

                {/* النفاذ */}
                {(language === "ar"
                  ? circularDetails?.enforcementNameAr
                  : circularDetails?.enforcementNameEn) && (
                  <>
                    <div>
                      <div className="d-flex align-items-baseline">
                        <i className="far fa-folder dark-color-icon text-dark"></i>
                        <span className="dark-color-title mb-2 mx-2 text-dark">
                          {intl.formatMessage({ id: "Enforcement" })}
                        </span>
                      </div>
                      <div className="h-fit mb-2 mx-6">
                        <span className="dark-color-des">
                          {language === "ar"
                            ? circularDetails?.enforcementNameAr
                            : circularDetails?.enforcementNameEn}
                        </span>
                      </div>
                    </div>
                    <hr className="my-6" />
                  </>
                )}
                {/* نبذة الوثيقة */}
                {circularDetails?.documentAbout && (
                  <>
                    <div>
                      <div className="d-flex align-items-baseline">
                        <i className="far fa-file-code dark-color-icon text-dark"></i>
                        <span className="dark-color-title mb-2 mx-2 text-dark">
                          {intl.formatMessage({ id: "DocumentAbout" })}
                        </span>
                      </div>
                      <div className="h-fit mb-2 mx-6">
                        <span className="dark-color-des">
                          {circularDetails?.documentAbout}
                        </span>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="card mb-3 mb-xl-9 h-fit p-8">
                <div className="d-flex align-items-center mb-5">
                  <i className="far fa-file-alt  fs-4 my-0  d-block h-100 dark-color-icon text-dark"></i>
                  <span className="fs-5  my-0 d-block h-100 fw-bolder mx-4">
                    {intl.formatMessage({ id: "LinksToExternalPlatforms" })}
                  </span>
                </div>
                <div className="h-fit mb-2 mx-6">
                  <div className="mb-3 fs-5 text-primary">
                    <span className="mx-2">
                      <i className="fa-solid fs-5 fa-link"></i>
                    </span>
                    <a
                      href="https://www.boe.gov.sa/ar/Pages/default.aspx"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {intl.formatMessage({ id: "ExpertPanel" })}
                    </a>
                  </div>
                  <div className="mb-3 fs-5 text-primary">
                    <span className="mx-2">
                      <i className="fa-solid fs-5 fa-link"></i>
                    </span>
                    <a
                      href="https://www.moi.gov.sa/wps/portal/Home/Home/!ut/p/z1/04_Sj9CPykssy0xPLMnMz0vMAfIjo8ziLQPdnT08TIy83Q0dzQwcPc2N_A08TQ3dPY30wwkpiAJKG-AAjgZA_VFgJc7ujh4m5j4GBhY-7qYGno4eoUGWgcbGBo7GUAV4zCjIjTDIdFRUBAApuVo7/dz/d5/L0lDUmlTUSEhL3dHa0FKRnNBLzROV3FpQSEhL2Fy/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {intl.formatMessage({ id: "MinistryOfInterior" })}
                    </a>
                  </div>
                  <div className="mb-3 fs-5 text-primary">
                    <span className="mx-2">
                      <i className="fa-solid fs-5 fa-link"></i>
                    </span>
                    <a
                      href="https://ncar.gov.sa/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {intl.formatMessage({ id: "DocumentsAndArchivesCente" })}
                    </a>
                  </div>
                </div>
              </div>
              {relatedDocuments?.length > 0 ? (
                <div className="card mb-3 mb-xl-9 h-fit p-8">
                  <div className="d-flex align-items-center mb-5">
                    <i className="far fa-file-alt  fs-4 my-0  d-block h-100 dark-color-icon text-dark"></i>
                    <span className="fs-5  my-0 d-block h-100 fw-bolder mx-4">
                      {intl.formatMessage({ id: "RelatedDocuments" })}
                    </span>
                  </div>
                  <div>
                    {relatedDocuments?.map((item: any, index: number) => {
                      let {
                        id,
                        circularName,
                        circularNumber,
                        date,
                        issuerNameEn,
                        issuerNameAr,
                      } = item;
                      const isLastItem = index === relatedDocuments.length - 1;
                      const hijriDateForAbout = gregorianToHijri(date);
                      return (
                        <Fragment key={id}>
                          <div>
                            <div className="d-flex align-items-baseline">
                              <i className="far fa-file dark-color-icon text-dark"></i>
                              {circularName && (
                                <span className="dark-color-title mb-2 mx-2 text-dark">
                                  {circularName}
                                </span>
                              )}
                            </div>
                            <div className="h-fit mb-2 mx-6">
                              {circularNumber && (
                                <span className="dark-color-des">
                                  {" "}
                                  {intl.formatMessage({
                                    id: "ByNumber",
                                  })}{" "}
                                  {circularNumber}
                                </span>
                              )}
                              {date && (
                                <span className="dark-color-des">
                                  {" "}
                                  {intl.formatMessage({ id: "ByDate" })}{" "}
                                  <span className="mx-2">
                                    {moment
                                      .tz(date, "UTC")
                                      .tz(
                                        Intl.DateTimeFormat().resolvedOptions()
                                          .timeZone,
                                      )
                                      .format("YYYY/MM/DD")}{" "}
                                    {intl.locale === "ar" ? "م" : ""}
                                    {" - "}
                                    {hijriDateForAbout}{" "}
                                    {intl.locale === "ar" ? "هـ" : ""}
                                  </span>
                                </span>
                              )}
                            </div>
                            {(language === "ar"
                              ? issuerNameAr
                              : issuerNameEn) && (
                              <>
                                <div>
                                  <div className="d-flex align-items-baseline">
                                    <i className="far fa-building dark-color-icon text-dark"></i>
                                    <span className="dark-color-title mb-2 mx-2 text-dark">
                                      {intl.formatMessage({ id: "Issuer" })}
                                    </span>
                                    <span>:</span>
                                    <span className="dark-color-des mx-2">
                                      {language === "ar"
                                        ? issuerNameAr
                                        : issuerNameEn}
                                    </span>
                                  </div>
                                </div>
                                <hr className="my-6" />
                              </>
                            )}
                          </div>
                          {!isLastItem && <hr className="my-6" />}
                        </Fragment>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-12 col-lg-8 col-md-8 ">
            <div className="card mb-3 mb-xl-9 h-850px">
              <div className="card-body pt-7 pb-0">
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
                        searchParams.get("tabName") === "view-details"
                          ? " active"
                          : ""
                      }`}
                      onClick={() => {
                        searchParams.set("tabName", "view-details");
                        setSearchParams(searchParams);
                      }}
                    >
                      {" "}
                      {intl.formatMessage({ id: "CircularCase" })}
                    </button>
                  </ul>
                </div>
                {searchParams.get("tabName") === "original-document" ||
                location.search === "" ? (
                  <OriginalDocumentForViewTab />
                ) : (
                  <></>
                )}
                {searchParams.get("tabName") === "review-details" ? (
                  <ReviewDetailsForViewTab />
                ) : (
                  <></>
                )}
                {searchParams.get("tabName") === "view-details" ? (
                  <ViewDetailsTab />
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

export default CircularDetailsHome;
