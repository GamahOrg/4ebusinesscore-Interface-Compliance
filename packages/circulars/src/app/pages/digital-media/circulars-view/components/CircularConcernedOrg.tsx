import { FC } from "react";
import { useIntl } from "react-intl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

type CircularConcernedOrgProps = {
  count: any;
  names: any;
};

export const CircularConcernedOrg: FC<CircularConcernedOrgProps> = ({
  count,
  names,
}) => {
  const intl = useIntl();

  const renderTooltip = (props: any) => (
    <Tooltip
      id="button-tooltip"
      className="menu-rounded menu-gray-800 fw-bold w-150px p-0"
      {...props}
    >
      {names?.map((name: any, index: number) => {
        return (
          <p key={index} className="menu-link px-3 text-dark pe-none my-2">
            {intl.locale === "ar" &&
              (name.orgConcernedNameAr
                ? name.orgConcernedNameAr
                : intl.formatMessage({ id: "NotFound" }))}
            {intl.locale === "en" &&
              (name.orgConcernedNameEn
                ? name.orgConcernedNameEn
                : intl.formatMessage({ id: "NotFound" }))}
          </p>
        );
      })}
    </Tooltip>
  );

  return (
    <div className="card-toolbar text-center">
      <div className="me-n3">
        <OverlayTrigger
          placement="bottom"
          delay={{ show: 250, hide: 400 }}
          overlay={renderTooltip}
        >
          <button className="btn btn-sm btn-icon btn-transparent">
            {`${count}`}
          </button>
        </OverlayTrigger>
      </div>
    </div>
  );
};
