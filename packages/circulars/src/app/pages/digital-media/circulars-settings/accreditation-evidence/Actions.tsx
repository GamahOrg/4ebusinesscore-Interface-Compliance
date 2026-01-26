import { FC, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { useIntl } from "react-intl";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import {
  deleteLkApproval,
  fetchLkApproval,
} from "../../../../redux/circular-lookups-slice";
import { ResponseStatus } from "../../../../partials/response-status";
import { KTSVG } from "@4eplatform/gateway/src/app/helpers";
import { DeletePopup } from "./DeletePopup";
import { EditAccreditationEvidencePopup } from "./edit-accreditation-evidence-popup";

interface IAction {
  id: string;
  pageIndex?:any;
  pageSize?:any;
}

export const AccreditationEvidenceActions: FC<IAction> = ({ id, pageIndex,
  pageSize}) => {
  const intl = useIntl();
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const showSuccessAlert = (status: boolean, text: string) => {
    Swal.fire({
      text: text,
      icon: status === true ? "success" : "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const dispatch = useDispatch();
  const handleDeletion = async () => {
    try {
      const deleteResult = await dispatch(deleteLkApproval(id) as any);
      if (
        deleteResult?.payload?.message === "DeletedSuccessfully" &&
        deleteResult?.payload?.statusEnum === ResponseStatus.SavedSuccessfully
      ) {
        let params = {
          pageSize: pageSize,
          pageNumber: pageIndex,
        };
        dispatch(fetchLkApproval(params) as any);
        showSuccessAlert(
          true,
          intl.formatMessage({ id: "DeletedSuccessfully" })
        );
        setShowDelete(false);
      } else {
        showSuccessAlert(false, deleteResult?.payload?.message);
      }
    } catch (error) {
      showSuccessAlert(false, error as string);
    }
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
        <Dropdown.Menu>
          <Dropdown.Item as="button" 
          onClick={() => setShowEdit(true)}
          >
            <div className="menu-link px-3 text-primary">
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen087.svg" />
              </span>
              {intl.formatMessage({ id: "Edit" })}
            </div>
          </Dropdown.Item>

          <Dropdown.Item as="button" onClick={() => setShowDelete(true)}>
            <div className="menu-link px-3 text-danger">
              <span className="svg-icon svg-icon-3 mx-2">
                <KTSVG path="/media/icons/duotune/general/gen088.svg" />
              </span>
              {intl.formatMessage({ id: "Delete" })}
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {showDelete ? (
        <DeletePopup
          cancelFun={() => {
            setShowDelete(false);
          }}
          confirm={() => {
            handleDeletion();
          }}
        />
      ) : (
        ""
      )}
      {showEdit ? (
        <EditAccreditationEvidencePopup
          show={showEdit}
          id={id}
          handleCloseEdit={() => {
            setShowEdit(false);
          }}
        />
      ) : (
        ""
      )}
    </>
  );
};
