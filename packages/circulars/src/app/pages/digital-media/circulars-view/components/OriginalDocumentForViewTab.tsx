import { Fragment } from "react";
import { RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { CircularsRootUrl } from "@4eplatform/shared/apis/circulars";
import { toAbsoluteUrl } from "@4eplatform/gateway/src/app/helpers";
import { useIntl } from "react-intl";
function OriginalDocumentForViewTab() {
  const circularDetails = useSelector(
    (state: RootState) => state?.circulars?.circular
  );
  const url = `${CircularsRootUrl}${circularDetails?.attachments[0]?.filePath}`;
  const filePath = `${circularDetails?.attachments[0]?.filePath}`;
  const fileName = `${circularDetails?.attachments[0]?.fileName}`;
  const intl = useIntl();
  return (
    <Fragment>
      <div className="row mb-5">
        <div className="mb-5 col-12 col-lg-12 mx-auto">
          {filePath?.endsWith(".pdf") ? (
            <embed
              type="application/pdf"
              src={url}
              style={{ width: "100%", height: "700px", borderRadius: "15px" }}
            />
          ) : filePath?.endsWith(".mp4") ||
            filePath?.endsWith(".webm") ||
            filePath?.endsWith(".avi") ||
            filePath?.endsWith(".mkv") ||
            filePath?.endsWith(".flv") ||
            filePath?.endsWith(".ts") ? (
            <>
              <iframe
                src={url}
                style={{ width: "100%", height: "750px", borderRadius: "15px" }}
                allowFullScreen
              />
            </>
          ) : filePath?.endsWith(".doc") || filePath?.endsWith(".docx") ? (
            <>
              <div className="fs-6 pb-3 px-1">
                {intl.formatMessage({ id: "ThisPluginNotSupported" })}{" "}
                <a href={url} download={fileName} target="_blank">
                  {intl.formatMessage({ id: "DownloadTheFile" })}
                </a>
              </div>
            </>
          ) : filePath?.endsWith(".xls") || filePath?.endsWith(".xlsx") ? (
            <>
              <div className="fs-6 pb-3 px-1">
                {intl.formatMessage({ id: "ThisPluginNotSupported" })}{" "}
                <a href={url} download={fileName} target="_blank">
                  {intl.formatMessage({ id: "DownloadTheFile" })}
                </a>
              </div>
            </>
          ) : filePath?.endsWith(".txt") ? (
            <>
              <div className="fs-6 pb-3 px-1">
                {intl.formatMessage({ id: "ThisPluginNotSupported" })}{" "}
                <a href={url} download={fileName}  target="_blank">
                  {intl.formatMessage({ id: "DownloadTheFile" })}
                </a>
              </div>
            </>
          ) : filePath?.endsWith(".ppt") ||
            filePath?.endsWith(".pptx") ||
            filePath?.endsWith(".pptm") ||
            filePath?.endsWith(".pps") ||
            filePath?.endsWith(".ppsx") ||
            filePath?.endsWith(".ppsm") ? (
            <>
              <div className="fs-6 pb-3 px-1">
                {intl.formatMessage({ id: "ThisPluginNotSupported" })}{" "}
                <a href={url} download={fileName}  target="_blank">
                  {intl.formatMessage({ id: "DownloadTheFile" })}
                </a>
              </div>
            </>
          ) : (
            <div className="h-400px w-100 my-5">
              <img
                src={url}
                alt="لا يوجد مستند للعرض"
                className="d-block h-100 w-100"
                onError={(e: any) =>
                  (e.target.src = toAbsoluteUrl(`/media/logoo.jpeg`))
                }
              />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default OriginalDocumentForViewTab;
