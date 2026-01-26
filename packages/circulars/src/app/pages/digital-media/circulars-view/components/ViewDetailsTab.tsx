import { Fragment, useEffect } from "react";
import { useIntl } from "react-intl";
import { fetchCircular } from "../../../../redux/circulars-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useParams } from "react-router";
function ViewDetailsTab() {
  let intl = useIntl();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchCircular(id) as any);
  }, [id]);
  let dispatch = useDispatch();
  let circular = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  let language = intl.locale;
  return (
    <Fragment>
      <div className="row mb-5">
        <div className="col-12 mb-3">
          <b className=" mb-5 fw-semibold fs-6">
            {" "}
            {intl.formatMessage({ id: "PublicationType" })}{" "}
          </b>
          <p className="text-muted fs-5">
            {circular?.publicationType === 0
              ? intl.formatMessage({ id: "General" })
              : circular?.publicationType === 1
                ? intl.formatMessage({ id: "Private" })
                : circular?.publicationType === 2
                  ? intl.formatMessage({ id: "Secret" })
                  : intl.formatMessage({ id: "NotFound" })}
          </p>
        </div>
        <div className="col-12">
          {circular?.publicationType === 0 ||
            circular?.publicationType === 1 ? (
            <b className="mb-5 fw-semibold fs-6">
              {intl.formatMessage({ id: "SpecializedManagements" })}
            </b>
          ) : circular?.publicationType === 2 ? (
            <b className="mb-5 fw-semibold fs-6">
              {intl.formatMessage({ id: "CircularPeople" })}
            </b>
          ) : null}

          {circular?.publicationType == 0 ? (
            <>
              <p className="text-muted fs-5">
                {intl.formatMessage({ id: "AllOrgs" })}
              </p>
            </>
          ) : circular?.publicationType == 1 ? (
            <>
              {circular?.orgsData.map((org: any) => (
                <p className="text-muted fs-5" key={org.id}>
                  {language === "ar" ? org?.orgNameAr : org?.orgNameEn}
                </p>
              ))}
            </>
          ) : circular?.publicationType == 2 ?
            (
              <>
                {circular?.userData?.map((user) => (
                  <p className="text-muted fs-5" key={user?.userId}>
                    {user?.fullName}
                  </p>
                ))}
              </>
            )
            : ""}
        </div>
      </div>
    </Fragment>
  );
}

export default ViewDetailsTab;
