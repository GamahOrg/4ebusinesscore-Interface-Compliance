import { FC, useState } from "react";
import { useIntl } from "react-intl";
import { DeletePopup } from "@4eplatform/shared/src/popups/DeletePopup";
import Dropdown from "react-bootstrap/Dropdown";
import { ButtonGroup } from "react-bootstrap";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import ShowCirculars from "../popup/ShowCirculars";
import EditCirculars from "../popup/EditCirculars";
import { Link } from "react-router-dom";
type ActionProps = {
  id: Number;
};

export const Actions: FC<ActionProps & { showAllActions: boolean }> = ({
  id,
  showAllActions,
}) => {
  const intl = useIntl();
  const [modalSShow, setModalSShow] = useState<boolean>(false);
  const [modalDShow, setModalDShow] = useState<boolean>(false);
  const [modalEShow, setModalEShow] = useState<boolean>(false);

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
          {showAllActions && (
            <>
              <Link to={`/circulars-settings/circular-details/${id}`}>
                <Dropdown.Item as="button">
                  <a className="menu-link px-3 text-muted">
                    <span className="svg-icon svg-icon-3 mx-2">
                      <i className="fa-solid fa-eye"></i>
                    </span>{" "}
                    {intl.formatMessage({ id: "Show" })}
                  </a>
                </Dropdown.Item>
              </Link>
              <Dropdown.Item
                as="button"
                onClick={(event) => {
                  event.preventDefault();
                  setModalEShow(true);
                }}
              >
                <Link to={`/circulars-settings/edit-circular/${id}`}>
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

          {!showAllActions && (
            <Dropdown.Item
              as="button"
              onClick={(event) => {
                event.preventDefault();
                setModalSShow(true);
              }}
            >
              <Link to="/commitment-compliance/show-evaluation-preparation">
                <a className="menu-link px-3 text-muted">
                  <span className="svg-icon svg-icon-3 mx-2">
                    <i className="fa-solid fa-eye"></i>
                  </span>{" "}
                  {intl.formatMessage({ id: "Show" })}
                </a>
              </Link>
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
      <div className="modal fade" aria-hidden="true">
        <DeletePopup
          showDelete={modalDShow}
          handleCloseDelete={() => setModalDShow(false)}
        />

        <ShowCirculars
          show={modalSShow}
          handleClose={() => setModalSShow(false)}
        />

        <EditCirculars
          show={modalEShow}
          handleClose={() => setModalEShow(false)}
        />
      </div>
    </>
  );
};
