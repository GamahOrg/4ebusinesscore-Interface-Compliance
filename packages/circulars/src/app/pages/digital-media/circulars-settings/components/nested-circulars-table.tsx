import { useIntl } from "react-intl";
import { TableActions } from "./TableActions";
import moment from "moment";
import { Link, useLocation } from "react-router-dom";
import { CircularConcernedOrg } from "./CircularConcernedOrg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const Item = ({ id, children, title }: any) => (
  <OverlayTrigger overlay={<Tooltip id={id}>{title}</Tooltip>}>
    <p
      className="text-truncate"
      style={{
        maxWidth: "200px",
      }}
    >
      {children}
    </p>
  </OverlayTrigger>
);
const NestedCircularsTable = ({
  circulars,
  orgIdOrUserId,
}: {
  circulars: any;
  orgIdOrUserId?: string;
}) => {
  const intl = useIntl();
  const getPuplishTypeStyle = (type: string) => {
    switch (type) {
      case "نشر":
        return "badge-light-success";
      case "ايقاف":
        return "badge-light-danger";
      default:
        return "badge-light-primary";
    }
  };

  const location = useLocation();
  let cardName = location?.state?.cardTitle || location?.state?.serviceName;
  return (
    <>
      <div className="table-responsive">
        <table
          id="kt_project_users_table"
          className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder"
        >
          <thead className="fs-7 text-gray-400 ">
            <tr className="text-center">
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "DocumentNumber" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "CircularName" })}
              </th>
              <th className="min-w-100px px-0 ">
                {intl.formatMessage({ id: "FromPublishDate" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "ToPublishDate" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "ApprovalDate" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "MainInvolvedOrg" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "SourceView" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "PublishStatus" })}
              </th>
              <th className="min-w-100px px-0  ">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>

          <tbody>
            {circulars?.map((circular: any) => (
              <tr className="text-center" key={circular?.id}>
                <td className="px-0">
                  <Link
                    state={{ cardName: cardName }}
                    to={
                      location.pathname?.includes("circulars-view")
                        ? `/circulars-view/circular-details/${circular?.id}`
                        : `/circulars-settings/circular-details/${circular?.id}`
                    }
                  >
                    {" "}
                    {circular?.number}{" "}
                  </Link>
                </td>
                <td className="px-0">
                  {" "}
                  <Link
                    className="d-flex justify-content-center"
                    state={{ cardName: cardName }}
                    to={
                      location.pathname?.includes("circulars-view")
                        ? `/circulars-view/circular-details/${circular?.id}`
                        : `/circulars-settings/circular-details/${circular?.id}`
                    }
                  >
                    {" "}
                    <Item id={circular?.name} title={circular?.name}>
                      {circular?.name}
                    </Item>{" "}
                  </Link>
                </td>
                <td className="px-0">
                  {circular?.fromDate
                    ? moment(circular?.fromDate).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </td>
                <td className="px-0">
                  {circular?.toDate
                    ? moment(circular?.toDate).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </td>
                <td className="px-0">
                  {circular?.accreditationDate
                    ? moment(circular?.accreditationDate).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
                </td>
                <td className="px-0">
                  {circular?.orgsConcerned?.length ? (
                    <CircularConcernedOrg
                      count={circular?.orgsConcerned?.length}
                      names={circular?.orgsConcerned}
                    />
                  ) : (
                    intl.formatMessage({ id: "---" })
                  )}
                </td>
                <td className="px-0">
                  {intl.locale === "ar" &&
                    (circular?.issuerNameAr
                      ? circular?.issuerNameAr
                      : intl.formatMessage({ id: "NotFound" }))}
                  {intl.locale === "en" &&
                    (circular?.issuerNameEn
                      ? circular?.issuerNameEn
                      : intl.formatMessage({ id: "NotFound" }))}
                </td>
                <td className="px-0">
                  <div
                    className={`badge ${getPuplishTypeStyle(
                      circular?.ispublished ? "نشر" : "ايقاف",
                    )}`}
                  >
                    {circular?.ispublished ? "نشر" : "ايقاف"}
                  </div>
                </td>
                <td className="px-0">
                  <TableActions
                    orgIdOrUserId={orgIdOrUserId}
                    circular={circular}
                    isCircular={circular?.isArchived ? false : true}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default NestedCircularsTable;
