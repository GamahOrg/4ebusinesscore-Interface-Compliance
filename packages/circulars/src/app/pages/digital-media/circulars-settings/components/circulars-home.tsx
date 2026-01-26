import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useIntl } from "react-intl";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import CurrentCircularsTable from "./current-circulars-table";
import ArchivesTable from "./archives-table";
import NestedAccording from "./nested-according";
import { RiFilter2Fill } from "react-icons/ri";
import { getCurrentSystemLanguage } from "@4eplatform/gateway/src/app/partials/functions/language";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { FilteringCirculars } from "../popup/FilteringCirculars";
import {
  fetchAllArchivedCircularsPrivate,
  fetchAllArchivedConfidentialCirculars,
  fetchAllCircularsPrivate,
  fetchAllConfidentialCirculars,
} from "../../../../redux/circulars-slice";

const CircularsHome = () => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [showCircularsFilter, setShowCircularsFilter] = useState(false);
  const [filterParams, setFilterParams] = useState<any>({});
  const [handleCancel, setHandleCancel] = useState<(() => void) | null>(null);
  //Private Currect
  const privateCirculars = useSelector((state: RootState) => {
    return state?.circulars?.privateCirculars;
  });

  const [pageSizePrivateCirculars, setPageSizePrivateCirculars] =
    useState<number>(5);
  const [pageIndexPrivateCirculars, setPageIndexPrivateCirculars] =
    useState<number>(1);
  const totalPagesPrivateCirculars = useSelector((state: RootState) => {
    return state?.circulars?.paginationForPrivateCirculars?.totalPages;
  });
  const totalItemsPrivateCirculars = useSelector((state: RootState) => {
    return state?.circulars?.paginationForPrivateCirculars?.totalItems;
  });

  useEffect(() => {
    let params = {
      pageSize: pageSizePrivateCirculars,
      pageNumber: pageIndexPrivateCirculars,
      search: searchTerm,
      ...filterParams,
    };
    dispatch(fetchAllCircularsPrivate(params) as any);
  }, [
    pageIndexPrivateCirculars,
    pageSizePrivateCirculars,
    searchTerm,
    filterParams,
    dispatch,
  ]);

  //Private Archived
  const privateArchivedCirculars = useSelector((state: RootState) => {
    return state?.circulars?.privateArchivedCirculars;
  });
  const [
    pageSizePrivateArchivedCirculars,
    setPageSizePrivateArchivedCirculars,
  ] = useState<number>(5);
  const [
    pageIndexPrivateArchivedCirculars,
    setPageIndexPrivateArchivedCirculars,
  ] = useState<number>(1);
  const totalPagesPrivateArchivedCirculars = useSelector((state: RootState) => {
    return state?.circulars?.paginationForPrivateArchivedCirculars?.totalPages;
  });
  const totalItemsPrivateArchivedCirculars = useSelector((state: RootState) => {
    return state?.circulars?.paginationForPrivateArchivedCirculars?.totalItems;
  });

  useEffect(() => {
    let params = {
      pageSize: pageSizePrivateArchivedCirculars,
      pageNumber: pageIndexPrivateArchivedCirculars,
      IsArchived: true,
      search: searchTerm,
      ...filterParams,
    };
    dispatch(fetchAllArchivedCircularsPrivate(params) as any);
  }, [
    pageIndexPrivateArchivedCirculars,
    pageSizePrivateArchivedCirculars,
    searchTerm,
    filterParams,
    dispatch,
  ]);

  //Confidential Current
  const confidentialCirculars = useSelector((state: RootState) => {
    return state?.circulars?.confidentialCirculars;
  });
  const [pageSizeConfidentialCirculars, setPageSizeConfidentialCirculars] =
    useState<number>(5);
  const [pageIndexConfidentialCirculars, setPageIndexConfidentialCirculars] =
    useState<number>(1);
  const totalPagesConfidentialCirculars = useSelector((state: RootState) => {
    return state?.circulars?.paginationForConfidentialCirculars?.totalPages;
  });
  const totalItemsConfidentialCirculars = useSelector((state: RootState) => {
    return state?.circulars?.paginationForConfidentialCirculars?.totalItems;
  });

  useEffect(() => {
    let params = {
      pageSize: pageSizeConfidentialCirculars,
      pageNumber: pageIndexConfidentialCirculars,
      search: searchTerm,
      ...filterParams,
    };
    dispatch(fetchAllConfidentialCirculars(params) as any);
  }, [
    pageIndexConfidentialCirculars,
    pageSizeConfidentialCirculars,
    searchTerm,
    filterParams,
    dispatch,
  ]);

  //Confidential Archived
  const confidentialArchivedCirculars = useSelector((state: RootState) => {
    return state?.circulars?.confidentialArchivedCirculars;
  });
  const [
    pageSizeConfidentialArchivedCirculars,
    setPageSizeConfidentialArchivedCirculars,
  ] = useState<number>(5);
  const [
    pageIndexConfidentialArchivedCirculars,
    setPageIndexConfidentialArchivedCirculars,
  ] = useState<number>(1);
  const totalPagesConfidentialArchivedCirculars = useSelector(
    (state: RootState) => {
      return state?.circulars?.paginationForConfidentialArchivedCirculars
        ?.totalPages;
    },
  );
  const totalItemsConfidentialArchivedCirculars = useSelector(
    (state: RootState) => {
      return state?.circulars?.paginationForConfidentialArchivedCirculars
        ?.totalItems;
    },
  );

  useEffect(() => {
    let params = {
      pageSize: pageSizeConfidentialArchivedCirculars,
      pageNumber: pageIndexConfidentialArchivedCirculars,
      IsArchived: true,
      search: searchTerm,
      ...filterParams,
    };
    dispatch(fetchAllArchivedConfidentialCirculars(params) as any);
  }, [
    pageIndexConfidentialArchivedCirculars,
    pageSizeConfidentialArchivedCirculars,
    searchTerm,
    filterParams,
    dispatch,
  ]);

  const accordionData = [
    {
      id: "1",
      title: "General",
      content: (
        <CurrentCircularsTable
          searchParams={searchTerm}
          filterParams={filterParams}
        />
      ),
    },
    {
      id: "2",
      title: "Private",
      content: (
        <NestedAccording
          type="Private"
          circualrsData={privateCirculars}
          paginationProps={{
            totalPages: totalPagesPrivateCirculars,
            totalItems: totalItemsPrivateCirculars,
            pageIndex: pageIndexPrivateCirculars,
            pageSize: pageSizePrivateCirculars,
            setPageIndex: setPageIndexPrivateCirculars,
            setPageSize: setPageSizePrivateCirculars,
          }}
        />
      ),
    },
    {
      id: "3",
      title: "Confidential",
      content: (
        <NestedAccording
          type="Confidential"
          circualrsData={confidentialCirculars}
          paginationProps={{
            totalPages: totalPagesConfidentialCirculars,
            totalItems: totalItemsConfidentialCirculars,
            pageIndex: pageIndexConfidentialCirculars,
            pageSize: pageSizeConfidentialCirculars,
            setPageIndex: setPageIndexConfidentialCirculars,
            setPageSize: setPageSizeConfidentialCirculars,
          }}
        />
      ),
    },
  ];

  const archivesData = [
    {
      id: "1",
      title: "General",
      content: (
        <ArchivesTable searchParams={searchTerm} filterParams={filterParams} />
      ),
    },
    {
      id: "2",
      title: "Private",
      content: (
        <NestedAccording
          circualrsData={privateArchivedCirculars}
          paginationProps={{
            totalPages: totalPagesPrivateArchivedCirculars,
            totalItems: totalItemsPrivateArchivedCirculars,
            pageIndex: pageIndexPrivateArchivedCirculars,
            pageSize: pageSizePrivateArchivedCirculars,
            setPageIndex: setPageIndexPrivateArchivedCirculars,
            setPageSize: setPageSizePrivateArchivedCirculars,
          }}
        />
      ),
    },
    {
      id: "3",
      title: "Confidential",
      content: (
        <NestedAccording
          circualrsData={confidentialArchivedCirculars}
          paginationProps={{
            totalPages: totalPagesConfidentialArchivedCirculars,
            totalItems: totalItemsConfidentialArchivedCirculars,
            pageIndex: pageIndexConfidentialArchivedCirculars,
            pageSize: pageSizeConfidentialArchivedCirculars,
            setPageIndex: setPageIndexConfidentialArchivedCirculars,
            setPageSize: setPageSizeConfidentialArchivedCirculars,
          }}
        />
      ),
    },
  ];
  const [activeKey, setActiveKey] = useState("first");
  const [activeKey2, setActiveKey2] = useState("first");
  const [activeKey3, setActiveKey3] = useState("first");

  const triggerChildCancel = () => {
    if (handleCancel) {
      handleCancel();
    }
  };

  return (
    <>
      <div className="card card-xl-stretch mb-xl-8">
        <div className="card-body pt-0 mt-8">
          <h3 className="fs-2"> {intl.formatMessage({ id: "Circulars" })}</h3>
          <p className="mt-2 fs-5 text-muted">
            {intl.formatMessage({ id: "StandardsTable" })}
          </p>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Row>
              <Nav
                variant="underline"
                activeKey={activeKey}
                onSelect={(selectedKey) => setActiveKey(selectedKey || "")}
                className="standard"
              >
                <Nav.Item>
                  <Nav.Link
                    eventKey="first"
                    className={`fw-bolder fs-5 ${
                      activeKey === "first"
                        ? "text-primary border-bottom border-3 border-primary"
                        : "text-muted"
                    }`}
                    onClick={() => {
                      setSearchTerm("");
                      setFilterParams({});
                      triggerChildCancel();
                    }}
                  >
                    {intl.formatMessage({ id: "CurrentStandards" })}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    eventKey="second"
                    className={`fw-bolder fs-5 ${
                      activeKey === "second"
                        ? "text-primary border-bottom border-3 border-primary"
                        : "text-muted"
                    }`}
                    onClick={() => {
                      setSearchTerm("");
                      setFilterParams({});
                      triggerChildCancel();
                    }}
                  >
                    {intl.formatMessage({ id: "Archives" })}
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Row>
                      <Nav
                        variant="default"
                        activeKey={activeKey2}
                        onSelect={(selectedKey) =>
                          setActiveKey2(selectedKey || "")
                        }
                        className="standard"
                      >
                        <Nav.Item className="mb-10">
                          <Nav.Link
                            eventKey="first"
                            className={`fw-bolder fs-5 ${
                              activeKey2 === "first"
                                ? "text-primary border-bottom border-3 border-primary"
                                : "text-muted"
                            }`}
                            onClick={() => {
                              setSearchTerm("");
                              setFilterParams({});
                              triggerChildCancel();
                            }}
                          >
                            {intl.formatMessage({ id: "General" })}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="second"
                            className={`fw-bolder fs-5 ${
                              activeKey2 === "second"
                                ? "text-primary border-bottom border-3 border-primary"
                                : "text-muted"
                            }`}
                            onClick={() => {
                              setSearchTerm("");
                              setFilterParams({});
                              triggerChildCancel();
                            }}
                          >
                            {intl.formatMessage({ id: "Private" })}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="third"
                            className={`fw-bolder fs-5 ${
                              activeKey2 === "third"
                                ? "text-primary border-bottom border-3 border-primary"
                                : "text-muted"
                            }`}
                            onClick={() => {
                              setSearchTerm("");
                              setFilterParams({});
                              triggerChildCancel();
                            }}
                          >
                            {intl.formatMessage({ id: "Confidential" })}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <div className="card-title">
                          <div className="d-flex justify-content-between  align-content-center flex-wrap mb-7">
                            <div className="d-flex align-items-center position-relative my-1">
                              <span
                                className={`svg-icon svg-icon-1 position-absolute ${
                                  getCurrentSystemLanguage() === "ar"
                                    ? "me-6"
                                    : "ms-6"
                                }`}
                              >
                                <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                              </span>
                              <input
                                type="text"
                                data-kt-filemanager-table-filter="search"
                                className={`form-control form-control-solid w-250px ${
                                  getCurrentSystemLanguage() === "ar"
                                    ? "pe-15"
                                    : "ps-15"
                                }`}
                                placeholder={intl.formatMessage({
                                  id: "SearchInTheCirculars",
                                })}
                                value={searchTerm}
                                onChange={(e) => {
                                  setSearchTerm(e?.target?.value);
                                }}
                              />
                            </div>
                            <div
                              className="btn w-auto btn-custom text-white btn-flex   fw-bolder"
                              // data-bs-toggle="modal"
                              style={{ backgroundColor: "#A1A5B7" }}
                              // data-bs-target="#Rega_modal_filter"
                              onClick={() => {
                                setShowCircularsFilter(true);
                              }}
                            >
                              <RiFilter2Fill
                                size={17}
                                className="me-3 text-white"
                              />{" "}
                              {intl.formatMessage({ id: "Filtering" })}
                            </div>
                          </div>
                        </div>
                        <Tab.Pane eventKey="first">
                          {accordionData[0].content}
                        </Tab.Pane>

                        <Tab.Pane eventKey="second">
                          {accordionData[1].content}
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                          {accordionData[2].content}
                        </Tab.Pane>
                      </Tab.Content>
                    </Row>
                  </Tab.Container>
                </Tab.Pane>

                <Tab.Pane eventKey="second">
                  <Tab.Container
                    id="left-tabs-example"
                    defaultActiveKey="first"
                  >
                    <Row>
                      <Nav
                        variant="default"
                        activeKey={activeKey}
                        onSelect={(selectedKey) =>
                          setActiveKey3(selectedKey || "")
                        }
                        className="standard"
                      >
                        <Nav.Item className="mb-10">
                          <Nav.Link
                            eventKey="first"
                            className={`fw-bolder fs-5 ${
                              activeKey3 === "first"
                                ? "text-primary border-bottom border-3 border-primary"
                                : "text-muted"
                            }`}
                            onClick={() => {
                              setSearchTerm("");
                              setFilterParams({});
                              triggerChildCancel();
                            }}
                          >
                            {intl.formatMessage({ id: "General" })}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="second"
                            className={`fw-bolder fs-5 ${
                              activeKey3 === "second"
                                ? "text-primary border-bottom border-3 border-primary"
                                : "text-muted"
                            }`}
                            onClick={() => {
                              setSearchTerm("");
                              setFilterParams({});
                              triggerChildCancel();
                            }}
                          >
                            {intl.formatMessage({ id: "Private" })}
                          </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link
                            eventKey="third"
                            className={`fw-bolder fs-5 ${
                              activeKey3 === "third"
                                ? "text-primary border-bottom border-3 border-primary"
                                : "text-muted"
                            }`}
                            onClick={() => {
                              setSearchTerm("");
                              setFilterParams({});
                              triggerChildCancel();
                            }}
                          >
                            {intl.formatMessage({ id: "Confidential" })}
                          </Nav.Link>
                        </Nav.Item>
                      </Nav>
                      <Tab.Content>
                        <div className="card-title">
                          <div className="d-flex justify-content-between  align-content-center flex-wrap mb-7">
                            <div className="d-flex align-items-center position-relative my-1">
                              <span
                                className={`svg-icon svg-icon-1 position-absolute ${
                                  getCurrentSystemLanguage() === "ar"
                                    ? "me-6"
                                    : "ms-6"
                                }`}
                              >
                                <KTSVG path="/media/icons/duotune/general/gen114_search.svg" />
                              </span>
                              <input
                                type="text"
                                data-kt-filemanager-table-filter="search"
                                className={`form-control form-control-solid w-250px ${
                                  getCurrentSystemLanguage() === "ar"
                                    ? "pe-15"
                                    : "ps-15"
                                }`}
                                placeholder={intl.formatMessage({
                                  id: "SearchInTheCirculars",
                                })}
                                value={searchTerm}
                                onChange={(e) => {
                                  setSearchTerm(e?.target?.value);
                                }}
                              />
                            </div>
                            <div
                              className="btn w-auto btn-custom text-white btn-flex   fw-bolder"
                              // data-bs-toggle="modal"
                              style={{ backgroundColor: "#A1A5B7" }}
                              // data-bs-target="#Rega_modal_filter"
                              onClick={() => {
                                setShowCircularsFilter(true);
                              }}
                            >
                              <RiFilter2Fill
                                size={17}
                                className="me-3 text-white"
                              />{" "}
                              {intl.formatMessage({ id: "Filtering" })}
                            </div>
                          </div>
                        </div>
                        <Tab.Pane eventKey="first">
                          {archivesData[0].content}
                        </Tab.Pane>

                        <Tab.Pane eventKey="second">
                          {archivesData[1].content}
                        </Tab.Pane>

                        <Tab.Pane eventKey="third">
                          {archivesData[2].content}
                        </Tab.Pane>
                      </Tab.Content>
                    </Row>
                  </Tab.Container>
                </Tab.Pane>
              </Tab.Content>
            </Row>
          </Tab.Container>
        </div>
      </div>
      <FilteringCirculars
        showAdd={showCircularsFilter}
        handleClose={() => {
          setShowCircularsFilter(false);
        }}
        setFilterParams={setFilterParams}
        setHandleCancel={setHandleCancel}
        filterParams={filterParams}
      />
    </>
  );
};
export default CircularsHome;
