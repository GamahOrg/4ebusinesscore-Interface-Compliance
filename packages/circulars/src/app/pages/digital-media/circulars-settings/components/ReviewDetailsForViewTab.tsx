import { Fragment , useEffect } from "react";
import { useIntl } from "react-intl";
import {fetchCircular } from "../../../../redux/circulars-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useParams } from "react-router";
function ReviewDetailsForViewTab() {
  let intl = useIntl();
  const {id} = useParams()
  useEffect(() => {
    dispatch(fetchCircular(id) as any);
  }, [id]);
  let dispatch = useDispatch();
  let circular = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  return (
    <Fragment>
      <div className="row mb-5">
        <div className="col-12">
          <label htmlFor="title" className=" mb-5 fw-semibold fs-6">
            {" "}
            {intl.formatMessage({ id: "SpecificTitleForPost" })}{" "}
          </label>
          <textarea
            id="title"
            rows={5}
            readOnly
            className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
            value={circular?.details || intl.formatMessage({id:"NotFound"})}

          ></textarea>
        </div>
      </div>
    </Fragment>
  );
}

export default ReviewDetailsForViewTab;
