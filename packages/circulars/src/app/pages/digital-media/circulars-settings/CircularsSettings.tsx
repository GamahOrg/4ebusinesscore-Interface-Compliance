/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { useIntl } from "react-intl";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import { Link, useLocation } from "react-router-dom";
import CircularsHome from "./components/circulars-home";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { AddWelcomeMessagePopup } from "./popup/AddWelcomeMessagePopup";

const CircularsSettings = () => {
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  const intl = useIntl();
  let location = useLocation();
  let cardName = location?.state?.cardTitle || location?.state?.serviceName;
  let cardId = location?.state?.cardId;
  const [modalWShow, setModalWShow] = useState<boolean>(false);
  const breadcrumbItems = [
    { path: ``, defaultName: "CircularsSettings", name: cardName },
  ];

  return (
    <>
      <div className="d-flex flex-stack flex-wrap flex-sm-nowrap justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle={"CircularsSettings"}
          fixedTitle={true}
          extraTitle={""}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardId={cardId}
          cardOption={cardName}
        />
        <div className="d-flex align-items-center py-3 py-md-1">
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="btn btn-bg-white btn-active-color-primary"
                data-kt-menu-trigger="click"
                data-kt-menu-placement="bottom-end"
                onClick={() => setModalWShow(true)}
              >
                {intl.formatMessage({ id: "AddWelcomeMessage" })}
              </button>
            </div>
            <div>
              <Link
                to="/circulars-settings/IssuingAuthority"
                state={{ cardId: cardId, cardName: cardName }}
              >
                <button
                  className="btn btn-success"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  {intl.formatMessage({ id: "IssuingAuthorityHome" })}
                </button>
              </Link>
            </div>
            <div>
              <Link
                to="/circulars-settings/AccreditationEvidence"
                state={{ cardId: cardId, cardName: cardName }}
              >
                <button
                  className="btn btn-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  {intl.formatMessage({ id: "AccreditationEvidenceHome" })}
                </button>
              </Link>
            </div>
            <div>
              <Link
                to="/circulars-settings/AddCirculars"
                state={{ cardId: cardId, cardName: cardName }}
              >
                <button
                  className="btn btn-bg-white btn-active-color-primary"
                  data-kt-menu-trigger="click"
                  data-kt-menu-placement="bottom-end"
                >
                  {intl.formatMessage({ id: "AddNewDocument" })}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <CircularsHome />

      <div className="modal fade" aria-hidden="true">
        <ManagementHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
      <div className="modal fade" aria-hidden="true">
        <AddWelcomeMessagePopup
          show={modalWShow}
          handleClose={() => setModalWShow(false)}
        />
      </div>
    </>
  );
};

export default CircularsSettings;
