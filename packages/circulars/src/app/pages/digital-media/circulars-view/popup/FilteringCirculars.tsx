import { ChangeEvent, FC, useState, useEffect, useCallback } from "react";
import { useIntl } from "react-intl";
import { Modal } from "react-bootstrap";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useDispatch, useSelector } from "react-redux";
import { ManagementHierarchyWithSearchPopup } from "../../circulars-settings/popup/ManagementHierarchyWithSearchPopup";
import { RootState } from "../../../../redux/store";
import { fetchLkApproval } from "../../../../redux/circular-lookups-slice";
import Select from "react-select";
import { fetchAllCircularIssuer } from "../../../../redux/circulars-slice";
import { searchSelectStylesModeStyles } from "@4eplatform/shared/functions/searchSelectStylesModeStyles";

type PopupProps = {
  showAdd: boolean;
  handleClose: () => void;
  pageSize?: number;
  tabName?: string;
  setFilterParams: any;
  setHandleCancel?: any;
  filterParams?: any;
};

interface ChildProps {
  setHandleCancel: React.Dispatch<React.SetStateAction<(() => void) | null>>;
}

export const FilteringCirculars: FC<PopupProps> = ({
  showAdd,
  handleClose,
  setFilterParams,
  setHandleCancel,
  filterParams,
}) => {
  const intl = useIntl();
  let darkMode = localStorage.getItem("Theme") == "dark" ? true : false;
  let dispatch = useDispatch();
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let [firstMount, setFirstMount] = useState(true);
  let [orgConcernedNames, setOrgConcernedNames] = useState<any>([]);
  let [orgConcernedId, setOrgConcernedId] = useState<any>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState<any>({
    name: "",
    number: "",
    approvalId: "",
    accreditationDate: "",
    orgConcerned: [],
    taggedWords: "",
  });
  useEffect(() => {
    if (orgConcernedId.length) {
      setFilter((prevFilter: any) => ({
        ...prevFilter,
        orgConcerned: orgConcernedId,
      }));
    }
  }, [orgConcernedId]);
  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter: any) => ({ ...prevFilter, [name]: value }));
  };
  const handleApplyFilter = async (e: React.FormEvent) => {
    e.preventDefault();
    const filterValues = Object.fromEntries(
      Object.entries(filter).filter(
        ([, value]) =>
          value !== "" && !(Array.isArray(value) && value.length === 0),
      ),
    );

    if (Object.keys(filterValues).length === 0) {
      setFilterParams({});
    } else {
      setFilterParams(filterValues);
    }

    showSuccessAlert(true, "FilteredSuccessfully", intl, () => {});
    handleClose();
  };
  const handleCancel = useCallback(() => {
    setFilter({
      name: "",
      number: "",
      approvalId: "",
      accreditationDate: "",
      orgConcerned: [],
      taggedWords: "",
    });
    setFilterParams({});
    setOrgConcernedNames([]);
    setOrgConcernedId([]);
  }, [setFilterParams, setOrgConcernedNames, setOrgConcernedId]);

  useEffect(() => {
    setHandleCancel(() => handleCancel);
  }, [setHandleCancel, handleCancel]);

  useEffect(() => {
    dispatch(fetchLkApproval({}) as any);
    dispatch(fetchAllCircularIssuer({}) as any);
  }, [dispatch]);

  let [selectedIssuer, setSelectedIssuer] = useState<any>();

  let allCircularIssuer = useSelector((state: RootState) => {
    return state?.circulars?.allCircularIssuer;
  });

  const circularIssuersOptions = allCircularIssuer?.map((issuer: any) => ({
    value: issuer?.id,
    label: issuer?.nameAr,
  }));

  return (
    <>
      <Modal
        centered
        show={showAdd}
        onHide={handleClose}
        size="xl"
        style={{
          zIndex: 9999,
        }}
      >
        <Modal.Header
          closeButton
          style={{
            alignItems: intl.locale === "ar" ? "flex-start" : "end",
            flexDirection: intl.locale === "en" ? "column-reverse" : "row",
          }}
        >
          <Modal.Title className="w-100 d-flex align-items-center justify-content-center">
            <h3 className="card-title d-flex justify-content-center align-items-center flex-column">
              <span className="card-label fs-4 my-5">
                {" "}
                {intl.formatMessage({ id: "DataFiltering" })}
              </span>
              <span className="mt-1 fw-semibold fs-6 text-muted my-5">
                {intl.formatMessage({ id: "PleaseEnterTheFollowingData" })}{" "}
              </span>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-5 mx-4">
          <div className="row ">
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="mb-4">
                <label htmlFor="VisitorName" className="mb-2">
                  {intl.formatMessage({ id: "CircularName" })}
                </label>
                <div className="input-group position-relative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fas fa-user fs-2"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="VisitorName"
                    name="name"
                    value={filter?.name}
                    onChange={handleFilterChange}
                    placeholder={intl.formatMessage({ id: "CircularName" })}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="mb-4">
                <label htmlFor="CircularNumber" className="mb-2">
                  {intl.formatMessage({ id: "DocumentNumber" })}
                </label>
                <div className="input-group position-relative">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <i className="fa-solid fa-hashtag special"></i>
                    </span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    id="CircularNumber"
                    name="number"
                    value={filter?.number}
                    onChange={handleFilterChange}
                    placeholder={intl.formatMessage({ id: "DocumentNumber" })}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="mb-3">
                <label className="fs-6 fw-bold mb-2 " htmlFor="MainInvolvedOrg">
                  {intl.formatMessage({ id: "MainInvolvedOrg" })}
                </label>
                <div className="input-group ">
                  <input
                    readOnly
                    disabled
                    className="form-control"
                    placeholder={intl.formatMessage({
                      id: "MainInvolvedOrg",
                    })}
                    id="MainInvolvedOrg"
                    name="orgConcerned"
                    onChange={handleFilterChange}
                    value={orgConcernedNames?.join(",")}
                  />
                  <div className="h-110 d-flex" role="button">
                    <span
                      className="input-group-text"
                      onClick={() => {
                        setModalHShow(true);
                        setFirstMount(false);
                      }}
                    >
                      <i className="bi bi-diagram-3 fs-3 text-muted"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <div className="d-flex flex-column mb-5 fv-row">
                <label className="d-flex align text-gray-600-items-center fs-8 fw-bold mb-2">
                  <span className="">
                    {intl.formatMessage({ id: "Issuer" })}
                  </span>
                </label>
                <Select
                  id="issuerId"
                  name="issuerId"
                  classNamePrefix="react-select"
                  placeholder={intl.formatMessage({
                    id: "SelectIssuer",
                  })}
                  options={circularIssuersOptions}
                  className="react-select__container bg-light"
                  styles={searchSelectStylesModeStyles(darkMode)}
                  isClearable={true}
                  onChange={(selectedOption) => {
                    setFilter((prevFilter: any) => ({
                      ...prevFilter,
                      issuerId: selectedOption ? selectedOption.value : "",
                    }));
                    setSelectedIssuer(selectedOption);
                  }}
                  value={selectedIssuer}
                  noOptionsMessage={() =>
                    intl.formatMessage({
                      id: "NotAvailableCircularSources",
                    })
                  }
                />
              </div>
            </div>

            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                {intl.formatMessage({
                  id: "ApprovalDate",
                })}
              </label>
              <input
                className="form-control form-control-solid"
                type="date"
                placeholder={intl.formatMessage({ id: "ApprovalDate" })}
                onChange={handleFilterChange}
                value={filter?.accreditationDate}
                name="accreditationDate"
              />
            </div>
            <div className="col-md-12 col-lg-4 col-12 mb-3">
              <label className="mb-2">
                {intl.formatMessage({
                  id: "Tags",
                })}
              </label>
              <input
                className="form-control form-control-solid"
                type="text"
                placeholder={intl.formatMessage({ id: "Tags" })}
                onChange={handleFilterChange}
                value={filter?.taggedWords}
                name="taggedWords"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex pt-12">
            <button
              type="reset"
              className="btn btn-light me-3"
              onClick={() => {
                handleClose();
                handleCancel();
              }}
            >
              {intl.formatMessage({ id: "Cancel" })}
            </button>
            <button
              type="submit"
              className="btn btn-success"
              onClick={(event) => {
                handleApplyFilter(event);
              }}
            >
              <span className="indicator-label">
                {" "}
                {intl.formatMessage({ id: "Agree" })}
              </span>
            </button>
          </div>
        </Modal.Footer>
      </Modal>

      <ManagementHierarchyWithSearchPopup
        show={modalHShow}
        orgIds={orgConcernedId}
        setOrgIds={setOrgConcernedId}
        orgNames={orgConcernedNames}
        setOrgNames={setOrgConcernedNames}
        handleClose={() => {
          setModalHShow(false);
        }}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </>
  );
};
