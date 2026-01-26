import { Fragment, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { AddPopup } from "@4eplatform/shared/src/popups/AddPopup";
import { editCircular, fetchCircular } from "../../../../redux/circulars-slice";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function NewReviewDetailsTabForEdit({
  circularId = "",
  details,
  setDetails,
}: {
  circularId?: string;
  details?: string;
  setDetails?: any;
}) {
  let intl = useIntl();
  const [modalAddShow, setModalAddShow] = useState<boolean>(false);
  let location = useLocation();
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let circular = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  useEffect(() => {
    if (circular?.details) {
      setDetails(circular?.details);
    }
  }, [circular]);
  let editCircularHandler = async () => {
    let formData = new FormData();
    formData.append("id", circularId);
    formData.append("PutCircularCommandDto.Name", circular?.name as string);
    formData.append("PutCircularCommandDto.NameEn", circular?.nameEn as string);
    formData.append(
      "PutCircularCommandDto.Number",
      circular?.number?.toString() as string,
    );
    formData.append(
      "PutCircularCommandDto.ApprovalId",
      circular?.approvalId as string,
    );
    circular?.orgsConcernedData
      ?.map((item: any) => {
        return item?.orgConcernedId;
      })
      .forEach((id: any) => {
        formData.append("PutCircularCommandDto.OrgsConcerned", id);
      });
    formData.append(
      "PutCircularCommandDto.IssuerId",
      circular?.issuerId as string,
    );
    if (circular?.documentClass) {
      formData.append(
        "PutCircularCommandDto.DocumentClass",
        circular?.documentClass,
      );
    }
    formData.append(
      "PutCircularCommandDto.EnforcementId",
      circular?.enforcementId as string,
    );
    formData.append(
      "PutCircularCommandDto.DocumentAbout",
      circular?.documentAbout as string,
    );
    formData.append(
      "PutCircularCommandDto.AccreditationDate",
      moment(circular?.accreditationDate).add(1, "days")?.toISOString(),
    );
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
    formData.append("PutCircularCommandDto.Details", details as string);
    formData.append(
      "PutCircularCommandDto.PublicationType",
      circular?.publicationType?.toString() as string,
    );
    formData.append(
      "PutCircularCommandDto.IsArchived",
      circular?.isArchived ? "true" : "false",
    );
    formData.append(
      "PutCircularCommandDto.Ispublished",
      circular?.ispublished ? "true" : "false",
    );
    if ((circular?.attachments?.length as any) > 0) {
      circular?.attachments?.forEach((attachment: any) => {
        formData.append(
          "PutCircularCommandDto.Attachments",
          attachment?.filePath,
        );
      });
    }
    if ((circular?.userData?.length as any) > 0) {
      circular?.userData?.forEach((user: any) => {
        formData.append("PutCircularCommandDto.Users", user?.userId);
      });
    }
    if ((circular?.orgsData?.length as any) > 0) {
      circular?.orgsData?.forEach((org: any) => {
        formData.append("PutCircularCommandDto.Orgs", org?.orgId);
      });
    }
    try {
      await dispatch(editCircular(formData) as any).then((res: any) => {
        if (res?.payload?.statusEnum == 1) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            dispatch(fetchCircular(circularId) as any);
          });
        } else if (res?.payload?.message == "Circular name already exists.") {
          showSuccessAlert(false, "CircularNameMustBeUnique", intl, () => {});
        } else if (res?.payload?.message == '["Number must be unique"]') {
          showSuccessAlert(false, "CircularNumberMustBeUnique", intl, () => {});
        } else if (res?.payload?.message) {
          showSuccessAlert(false, res?.payload?.message, intl);
        }
      });
    } catch (error) {}
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
              value={details}
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
                  onClick={() => {
                    navigate("/circulars-settings", {
                      state: { cardId, cardName, serviceName: cardName },
                    });
                  }}
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

export default NewReviewDetailsTabForEdit;
