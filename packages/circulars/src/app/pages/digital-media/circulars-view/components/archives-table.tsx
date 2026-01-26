import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import moment from "moment";
import { fetchAllArchivedCircularsPublic } from "../../../../redux/circulars-slice";
import { Link, useLocation } from "react-router-dom";
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
const ArchivesTable = ({ searchParams, filterParams }: any) => {
  const intl = useIntl();
  let dispatch = useDispatch();
  let publicArchivedCirculars = useSelector((state: RootState) => {
    return state?.circulars?.publicArchivedCirculars;
  });
  const [pageSize, setPageSize] = useState<number>(5);
  const [pageIndex, setPageIndex] = useState<number>(1);
  const totalPages = useSelector((state: RootState) => {
    return state?.circulars?.paginationForPublicArchivedCirculars?.totalPages;
  });
  const totalItems = useSelector((state: RootState) => {
    return state?.circulars?.paginationForPublicArchivedCirculars?.totalItems;
  });

  useEffect(() => {
    let params = {
      pageSize,
      pageNumber: pageIndex,
      IsArchived: true,
      IsPublished: true,
      search: searchParams,
      ...filterParams,
    };
    dispatch(fetchAllArchivedCircularsPublic(params) as any);
  }, [pageIndex, pageSize, searchParams, filterParams, dispatch]);

  const location = useLocation();
  let cardName = location?.state?.cardTitle || location?.state?.serviceName;

  return (
    <>
      <div className="table-responsive">
        <table
          id="kt_project_users_table"
          className="table table-row-bordered table-row-dashed gy-4 align-middle fw-bolder"
        >
          <thead className="fs-7 text-gray-400 text-uppercase">
            <tr className="text-center">
              <th className="min-w-100px px-0">
                {intl.formatMessage({ id: "DocumentNumber" })}
              </th>
              <th className="min-w-100px px-0">
                {intl.formatMessage({ id: "CircularName" })}
              </th>
              <th className="min-w-100px px-0">
                {intl.formatMessage({ id: "ApprovalDate" })}
              </th>
              <th className="min-w-100px px-0">
                {intl.formatMessage({ id: "SourceView" })}
              </th>
              <th className="min-w-100px px-0">
                {intl.formatMessage({ id: "Procedures" })}
              </th>
            </tr>
          </thead>

          <tbody>
            {publicArchivedCirculars?.map((circular: any) => (
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
                  {circular?.accreditationDate
                    ? moment(circular?.accreditationDate).format("YYYY-MM-DD")
                    : intl.formatMessage({ id: "NotFound" })}
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
                  <Link
                    state={{ cardName: cardName }}
                    to={
                      location.pathname?.includes("circulars-view")
                        ? `/circulars-view/circular-details/${circular?.id}`
                        : `/circulars-settings/circular-details/${circular?.id}`
                    }
                  >
                    <div className="menu-link px-3 text-muted text-hover-gblue">
                      <span className="svg-icon svg-icon-3 mx-2">
                        <i className="fa-solid fa-eye"></i>
                      </span>{" "}
                      {intl.formatMessage({ id: "Show" })}
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {publicArchivedCirculars?.length === 0 ||
          (publicArchivedCirculars == null && (
            <div className="text-center fw-bold my-5">
              {intl.formatMessage({ id: "NoCircularFound" })}
            </div>
          ))}
        {totalPages !== 0 && (
          <SystemPagination
            totalPages={totalPages}
            totalItems={totalItems}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        )}
      </div>
    </>
  );
};
export default ArchivesTable;
