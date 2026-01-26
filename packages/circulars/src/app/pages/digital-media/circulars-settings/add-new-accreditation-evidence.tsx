import { Fragment, useState } from "react";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
import { useIntl } from "react-intl";
import { AccreditationEvidence } from "./accreditation-evidence/accreditation-evidence";
import { CreateNewAccreditationEvidencePopup } from "./accreditation-evidence/create-new-accreditation-evidence-popup";
function AccreditationEvidenceHome() {
  let location = useLocation();
  const intl = useIntl();
  const [showAdded, setShowAdded] = useState<boolean>(false);
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
  const breadcrumbItems = [
    {
      path: `/circulars-settings`,
      defaultName: "CircularsSettings",
      name: cardName,
    },
    { path: ``, defaultName: "AccreditationEvidenceHome", name: "" },
  ];
    const [pageIndex, setPageIndex] = useState(1);
    const [pageSize, setPageSize] = useState(10);
  return (
    <Fragment>
      <div className="d-flex flex-stack flex-wrap flex-sm-nowrap justify-content-between align-items-center">
        <DynamicToolbar
          defaultTitle={"AccreditationEvidenceHome"}
          fixedTitle={true}
          extraTitle={""}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardId={cardId}
          cardOption={cardName}
        />
        <div className="d-flex align-items-center py-3 py-md-1">
          <div className="d-flex justify-content-center">
            <div
              className="btn btn-bg-white btn-active-color-primary dark-link-toolbar"
              onClick={() => {
                setShowAdded(true);
              }}
            >
              {intl.formatMessage({ id: "AddNewAccreditationEvidence" })}{" "}
            </div>
          </div>
        </div>
      </div>
      <AccreditationEvidence 
      pageIndex = {pageIndex} 
      pageSize = {pageSize}
      setPageIndex = {setPageIndex}
      setPageSize = {setPageSize}
      />
      {showAdded ? (
        <CreateNewAccreditationEvidencePopup
          handleClose={() => {
            setShowAdded(false);
          }}
        show={showAdded}
        pageIndex = {pageIndex} 
        pageSize = {pageSize}
        setPageIndex = {setPageIndex}
        setPageSize = {setPageSize}
        />
      ) : (
        ""
      )}
    </Fragment>
  );
}

export default AccreditationEvidenceHome;
