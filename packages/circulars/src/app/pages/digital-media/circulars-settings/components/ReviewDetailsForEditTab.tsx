import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { EditPopup } from "@4eplatform/shared/src/popups/EditPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { editCircular } from "../../../../redux/circulars-slice";
import moment from "moment";
import { useNavigate, useParams, useLocation } from "react-router-dom";
function ReviewDetailsForEditTab() {
  let intl = useIntl();
  let { id } = useParams();
  let navigate = useNavigate();
  let location = useLocation();
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
  let dispatch = useDispatch();
  let [makeEdit, setMakeEdit] = useState(false);
  let [showEdit, setShowEdit] = useState(true);
  let [details, setDetails] = useState("");
  const [modalEditShow, setModalEditShow] = useState<boolean>(false);
  let circular = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  useEffect(() => {
    setDetails(circular?.details);
  }, [circular]);
  let editCircularHandler = async () => {
    let formData = new FormData();
    formData.append("id", id as any);
    formData.append("PutCircularCommandDto.Name", circular?.name);
    formData.append(
      "PutCircularCommandDto.Number",
      circular?.number?.toString(),
    );
    formData.append("PutCircularCommandDto.Approval", circular?.approval);
    formData.append(
      "PutCircularCommandDto.FromDate",
      moment(circular?.fromDate).add(1, "days")?.toISOString(),
    );
    if (circular?.toDate) {
      formData.append(
        "PutCircularCommandDto.ToDate",
        moment(circular?.toDate).add(1, "days")?.toISOString(),
      );
    }
    formData.append("PutCircularCommandDto.Details", details);
    formData.append(
      "PutCircularCommandDto.PublicationType",
      circular?.publicationType?.toString(),
    );
    formData.append(
      "PutCircularCommandDto.Ispublished",
      circular?.ispublished ? "true" : "false",
    );
    if (circular?.attachments?.length > 0) {
      circular?.attachments?.forEach((attachment: any) => {
        formData.append(
          "PutCircularCommandDto.Attachments",
          attachment?.filePath,
        );
      });
    }
    if (circular?.userData?.length > 0) {
      circular?.userData?.forEach((user: any) => {
        formData.append("PutCircularCommandDto.Users", user?.userId);
      });
    }
    if (circular?.orgsData?.length > 0) {
      circular?.orgsData?.forEach((org: any) => {
        formData.append("PutCircularCommandDto.Orgs", org?.orgId);
      });
    }
    try {
      await dispatch(editCircular(formData) as any).then((res: any) => {
        if (res?.payload?.statusEnum == 1) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            // dispatch(fetchCircular(id) as any)
            navigate("/circulars-settings", {
              state: { cardId, cardName, serviceName: cardName },
            });
          });
        } else if (res?.payload?.message == "Circular name already exists.") {
          showSuccessAlert(false, "CircularNameMustBeUnique", intl, () => {});
        } else if (res?.payload?.message == '["Number must be unique"]') {
          showSuccessAlert(false, "CircularNumberMustBeUnique", intl, () => {});
        } else {
          showSuccessAlert(false, res?.payload?.message, intl);
        }
      });
    } catch (error) {
      console.error("Error during editing basic data:", error);
    }
  };

  return (
    <Fragment>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="row mb-5">
          {showEdit ? (
            <>
              <div className="mb-5 col-12 col-lg-12 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                  <div className="d-flex align-items-center w-50 justify-content-end">
                    <div
                      className="btn btn-secondary mx-1 text-center w-5"
                      style={{ border: "none" }}
                      onClick={() => {
                        setMakeEdit(true);
                        setShowEdit(false);
                      }}
                    >
                      <i className="fa-regular fa-pen-to-square fs-4"></i>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div className="row mb-5">
          <div className="col-12">
            <label htmlFor="title" className=" mb-5 fw-semibold fs-6">
              {" "}
              {intl.formatMessage({ id: "SpecificTitleForPost" })}{" "}
            </label>
            <textarea
              id="title"
              rows={5}
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              value={details}
              readOnly={!makeEdit}
              onChange={(e) => {
                setDetails(e?.target?.value);
              }}
            ></textarea>
          </div>
        </div>
        {!showEdit ? (
          <>
            {" "}
            <div className="row mb-5">
              <div className="mt-5 mb-5 col-12 col-lg-12 mx-auto">
                <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
                  <div className="d-flex justify-content-center align-items-center w-35">
                    <button
                      className="btn btn-secondary mx-1 text-center w-75"
                      type="reset"
                    >
                      {intl.formatMessage({ id: "Cancel" })}
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary mx-1 text-center w-75"
                      style={{ border: "none" }}
                      onClick={() => {
                        editCircularHandler();
                      }}
                    >
                      {intl.formatMessage({ id: "Save" })}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </form>
      <EditPopup handleCloseEdit={setModalEditShow} showEdit={modalEditShow} />
    </Fragment>
  );
}

export default ReviewDetailsForEditTab;
