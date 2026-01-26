import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  archiveCircular,
  deleteCircular,
  fetchAllArchivedCircularsPrivate,
  fetchAllArchivedCircularsPublic,
  fetchAllArchivedConfidentialCirculars,
  fetchAllCircularsPrivate,
  fetchAllCircularsPublic,
  fetchAllConfidentialCirculars,
} from "../../../../redux/circulars-slice";
import { useLocation } from "react-router-dom";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { ArchivePopup } from "../popup/ArchivePopup";
import { UnArchivePopup } from "../popup/UnArchivePopup";

type ActionProps = {
  circular: any;
};

export const TableActions: FC<ActionProps & { isCircular: boolean }> = ({
  circular,
  isCircular,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [modalSShow, setModalSShow] = useState<boolean>(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalAShow, setModalAShow] = useState<boolean>(false);
  const [modalUAShow, setModalUAShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);
  const location = useLocation();
  let cardName = location?.state?.cardTitle || location?.state?.serviceName;

  //static params for the fetchAll api call
  const params = {
    pageSize: 5,
    pageNumber: 1,
  };
  const handleDelete = () => {
    dispatch(deleteCircular(circular?.id) as any).then((res: any) => {
      if (res?.payload?.statusEnum == 1) {
        switch (circular?.publicationType) {
          case 0:
            dispatch(fetchAllCircularsPublic(params) as any);
            break;
          case 1:
            dispatch(fetchAllCircularsPrivate(params) as any);
            break;
          case 2:
            dispatch(fetchAllConfidentialCirculars(params) as any);
            break;
          default:
            break;
        }
        showSuccessAlert(true, "DeletedSuccessfully", intl);
      } else {
        showSuccessAlert(false, res?.payload?.message, intl);
      }
    });
  };

  const handleArchive = () => {
    let formData = new FormData();
    formData.append("CircularId", circular?.id as any);
    formData.append("IsArchived", isCircular ? "true" : "false");
    dispatch(archiveCircular(formData) as any).then((res: any) => {
      if (isCircular == true) {
        if (res?.payload?.statusEnum == 1) {
          showSuccessAlert(true, "ArchivedSuccessfully", intl);
          switch (circular?.publicationType) {
            case 0:
              dispatch(fetchAllCircularsPublic(params) as any);
              dispatch(fetchAllArchivedCircularsPublic(params) as any);
              break;
            case 1:
              dispatch(fetchAllCircularsPrivate(params) as any);
              dispatch(fetchAllArchivedCircularsPrivate(params) as any);
              break;
            case 2:
              dispatch(fetchAllConfidentialCirculars(params) as any);
              dispatch(fetchAllArchivedConfidentialCirculars(params) as any);
              break;
            default:
              break;
          }
        } else {
          showSuccessAlert(false, res?.payload?.message, intl);
        }
      } else if (isCircular == false) {
        if (res?.payload?.statusEnum == 1) {
          showSuccessAlert(true, "UnArchivedSuccessfully", intl);
          switch (circular?.publicationType) {
            case 0:
              dispatch(fetchAllCircularsPublic(params) as any);
              dispatch(fetchAllArchivedCircularsPublic(params) as any);
              break;
            case 1:
              dispatch(fetchAllCircularsPrivate(params) as any);
              dispatch(fetchAllArchivedCircularsPrivate(params) as any);
              break;
            case 2:
              dispatch(fetchAllConfidentialCirculars(params) as any);
              dispatch(fetchAllArchivedConfidentialCirculars(params) as any);
              break;
            default:
              break;
          }
        } else {
          showSuccessAlert(false, res?.payload?.message, intl);
        }
      }
    });
  };

  return (
    <>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          split
          variant="none"
          className=" p-0 text-center"
          id="dropdown-custom-2"
        >
          <i className="bi bi-three-dots fs-2" style={{ color: "#7e8299" }}></i>
        </Dropdown.Toggle>
        <Dropdown.Menu className="py-0">
          <>
            <Link
              state={{ cardName: cardName }}
              to={
                location.pathname?.includes("circulars-view")
                  ? `/circulars-view/circular-details/${circular?.id}`
                  : `/circulars-settings/circular-details/${circular?.id}`
              }
            >
              <Dropdown.Item as="button">
                <a className="menu-link px-3 text-muted">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="fa-solid fa-eye"></i>
                  </span>{" "}
                  {intl.formatMessage({ id: "Show" })}
                </a>
              </Dropdown.Item>
            </Link>
            {isCircular && location.pathname == "/circulars-settings" && (
              <>
                <Dropdown.Item
                  as="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setModalEShow(true);
                  }}
                >
                  <Link
                    to={`/circulars-settings/edit-circular/${circular?.id}`}
                  >
                    <a className="menu-link px-3 text-primary">
                      <span className="svg-icon svg-icon-3 mx-2">
                        <KTSVG path="/media/icons/duotune/general/gen087.svg" />
                      </span>{" "}
                      {intl.formatMessage({ id: "Edit" })}
                    </a>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item
                  as="button"
                  onClick={(event) => {
                    event.preventDefault();
                    setModalDShow(true);
                  }}
                >
                  <a className="menu-link px-3 text-danger">
                    <span className="svg-icon svg-icon-3 mx-2">
                      <KTSVG path="/media/icons/duotune/general/gen088.svg" />
                    </span>{" "}
                    {intl.formatMessage({ id: "Delete" })}
                  </a>
                </Dropdown.Item>
              </>
            )}
          </>
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          showDelete={modalDShow}
          handleCloseDelete={() => setModalDShow(false)}
          handleDelete={handleDelete}
        />
        <ArchivePopup
          showArchive={modalAShow}
          handleCloseArchive={() => setModalAShow(false)}
          handleArchive={handleArchive}
        />
        <UnArchivePopup
          showUnArchive={modalUAShow}
          handleCloseUnArchive={() => setModalUAShow(false)}
          handleUnArchive={handleArchive}
        />
        {/* <ShowCirculars
          show={modalSShow}
          handleClose={() => setModalSShow(false)}
        /> */}
        {/* <EditCirculars
          show={modalEShow}
          handleClose={() => setModalEShow(false)}
        /> */}
      </div>
    </>
  );
};
