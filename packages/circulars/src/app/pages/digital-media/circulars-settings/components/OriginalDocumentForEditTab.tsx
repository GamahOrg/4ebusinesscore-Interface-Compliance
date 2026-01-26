import { Fragment, useRef, useState } from "react";
import { useIntl } from "react-intl";
import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";
import OriginalDocumentTabForEdit from "./OriginalDocumentTabForEdit";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { CircularsRootUrl } from "@4eplatform/shared/apis/circulars";
import { useReactToPrint } from "react-to-print";

function OriginalDocumentForEditTab() {
  let intl = useIntl();
  let circularDetails = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  const [showInputs, setShowInputs] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
  });
  return (
    <Fragment>
      <div className="row mb-5">
        <div className="mb-5 col-12 col-lg-12 mx-auto">
          <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
            <div className="d-flex justify-content-center align-items-center w-75">
              <a
                rel="noreferrer"
                className="btn btn-primary mx-1 text-center w-50"
                target="_blank"
                href={`${CircularsRootUrl}${circularDetails?.attachments[0]?.filePath}`}
                download
              >
                <i className="fa-solid fa-download ms-3"></i>
                {intl.formatMessage({ id: "DownloadFile" })}
              </a>
              <div
                className="btn btn-success mx-1 text-center w-40"
                style={{ border: "none" }}
                onClick={async () => {
                  await handlePrint();
                }}
              >
                <i className="bi bi-printer ms-3"></i>
                {intl.formatMessage({ id: "Print" })}
              </div>
              {!showInputs && (
                <div
                  className="btn btn-secondary mx-1 text-center w-10"
                  style={{ border: "none" }}
                  onClick={() => {
                    setShowInputs(!showInputs);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square fs-5 ms-3"></i>
                </div>
              )}
            </div>
          </div>
        </div>
        <br />
        {showInputs ? (
          <>
            <OriginalDocumentTabForEdit />
          </>
        ) : (
          <div className="h-400px w-100">
            <img
              alt="pic"
              src={`${CircularsRootUrl}${circularDetails?.attachments[0]?.filePath}`}
              className="d-block h-100 w-100"
              style={{ objectFit: "cover" }}
              onError={(e: any) => (e.target.src = "/media/logos/logo-sm.png")}
            />
          </div>
        )}
      </div>
      <div className="d-none">
        <div ref={contentRef}>
          <div className="d-flex align-items-center justify-content-center">
            <div
              className="w-100 position-relative mt-5"
              style={{ minHeight: "1000px" }}
            >
              <img
                alt="pic"
                src={`${CircularsRootUrl}${circularDetails?.attachments[0]?.filePath}`}
                className="d-block w-100"
                style={{ objectFit: "contain", minHeight: "1000px" }}
                onError={(e: any) =>
                  (e.target.src = "/media/logos/logo-sm.png")
                }
              />
              <div
                className="watermark h-100 w-100"
                style={{ backgroundImage: `url("/media/logos/logo-sm.png")` }}
              ></div>
            </div>
          </div>
        </div>
        <div style={{ pageBreakAfter: "always" }}></div>
      </div>
      <EditPopup
        handleCloseEdit={() => {
          setShowEdit(!showEdit);
          setShowInputs(!showInputs);
        }}
        showEdit={showEdit}
      />
    </Fragment>
  );
}

export default OriginalDocumentForEditTab;
