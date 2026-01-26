import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLkApproval } from "../../../../redux/circular-lookups-slice";
import { useIntl } from "react-intl";
import { SystemPagination } from "@4eplatform/shared/components/SystemPagination";
import { RootState } from "../../../../redux/store";
import { AccreditationEvidenceActions } from "./Actions";

type AccreditationEvidenceProps = {
  pageIndex?: any;
  pageSize?: any;
  setPageSize?: any;
  setPageIndex?: any;
};
export const AccreditationEvidence: FC<AccreditationEvidenceProps> = ({
  pageIndex,
  pageSize,
  setPageSize,
  setPageIndex,
}) => {
  const intl = useIntl();

  const dispatch = useDispatch();
  useEffect(() => {
    let params = {
      pageSize: pageSize,
      pageNumber: pageIndex,
    };
    dispatch(fetchLkApproval(params) as any);
  }, [pageIndex, pageSize, dispatch]);

  let approvals = useSelector((state: RootState) => {
    return state?.circularLookups?.approvals;
  });

  let totalPages = useSelector((state: RootState) => {
    return state?.circularLookups?.totalPages;
  });

  let totalItems = useSelector((state: RootState) => {
    return state?.circularLookups?.totalItems;
  });

  return (
    <>
      <div
        id="kt_content_container"
        className="d-flex flex-column-fluid align-items-start container-xxl p-0"
      >
        <div className="content flex-row-fluid" id="kt_content">
          <div
            className="flex-lg-row-fluid"
            data-select2-id="select2-data-129-tmo1"
          >
            <div className="card mb-5 mb-xl-8">
              <div className="card-body py-3">
                <div className="table-responsive">
                  <table
                    className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 dark-table-head my-5"
                    id="REGA-WS-caseList"
                  >
                    <thead>
                      <tr className="fw-bolder text-muted">
                        <th className="min-w-50px">
                          {intl.formatMessage({ id: "M" })}
                        </th>
                        <th className="min-w-250px d-flex justify-content-start">
                          {intl.formatMessage({ id: "NameInArabic" })}
                        </th>
                        <th className="min-w-150px text-center">
                          {intl.formatMessage({ id: "NameInEnglish" })}
                        </th>
                        <th className="min-w-100px text-center">
                          {intl.formatMessage({ id: "TheProcedures" })}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvals?.length > 0 &&
                        approvals?.map((item: any, index: number = 1) => (
                          <tr key={item.id}>
                            <td>
                              <div>
                                {(pageIndex - 1) * pageSize + index + 1}
                              </div>
                            </td>

                            <td>
                              <div className="d-flex align-items-center">
                                <div className="d-flex justify-content-start flex-column">
                                  <div className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                    {item.nameAr}
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="text-center">
                              <div className="text-dark fw-bolder text-hover-primary mb-1 fs-6">
                                {item.nameEn}
                              </div>
                            </td>
                            <td className="text-center">
                              <AccreditationEvidenceActions
                                id={item?.id}
                                pageIndex={pageIndex}
                                pageSize={pageSize}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  {approvals?.length ? (
                    <SystemPagination
                      pageIndex={pageIndex}
                      pageSize={pageSize}
                      setPageIndex={setPageIndex}
                      setPageSize={setPageSize}
                      totalPages={totalPages}
                      totalItems={totalItems}
                    />
                  ) : (
                    <div className="d-flex fw-bolder justify-content-center align-items-center">
                      {intl.formatMessage({ id: "No_data_yet" })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
