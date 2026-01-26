import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { editCircular, fetchCircular } from "../../../../redux/circulars-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import moment from "moment";
function ReviewDetailsTab({
  circularId = "",
  setCircularId = "",
}: {
  circularId?: string;
  setCircularId?: any;
}) {
  let intl = useIntl();
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  let dispatch = useDispatch();
  let circular = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });

  useEffect(() => {
    dispatch(fetchCircular(circularId) as any);
  }, [circularId]);
  let [details, setDetails] = useState("");
  let editCircularHandler = async () => {
    let formData = new FormData();
    formData.append("id", circularId);
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
            setCircularId(res?.payload?.result);
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
        <div className="row mb-6">
          <div className="col-12">
            <label htmlFor="title" className=" mb-5 fw-semibold fs-6">
              {" "}
              {intl.formatMessage({ id: "SpecificTitleForPost" })}{" "}
            </label>
            <textarea
              id="title"
              rows={5}
              onChange={(e) => {
                setDetails(e?.target?.value);
              }}
              className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
              placeholder={intl.formatMessage({ id: "PleaseAddInfo" })}
            ></textarea>
          </div>
        </div>
        <div className="row mb-5">
          <div className="mt-5 mb-5 col-12 col-lg-12 mx-auto">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
              <div className="d-flex justify-content-center align-items-center w-sm-50 w-100">
                <button
                  className="btn btn-secondary mx-1 text-center w-50"
                  type="reset"
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="button"
                  className="btn btn-success mx-1 text-center w-50"
                  style={{ border: "none" }}
                  onClick={() => {
                    editCircularHandler();
                  }}
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      <AddPopup
        show={modalAddShow}
        handleClose={() => setModalAddShow(false)}
      />
    </Fragment>
  );
}

export default ReviewDetailsTab;
