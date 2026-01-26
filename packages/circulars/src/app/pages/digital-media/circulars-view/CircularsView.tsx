/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import { ManagementHierarchyPopup } from "@4eplatform/shared/src/popups/ManagementHierarchyPopup";
import CircularsViewHome from "./components/circulars-view-home";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

const CircularsView = () => {
  const [modalHShow, setModalHShow] = useState<boolean>(false);
  let location = useLocation();
  let cardName = location?.state?.cardTitle;
  let cardId = location?.state?.cardId;
  const breadcrumbItems = [
    { path: ``, defaultName: "CircularsView", name: "" },
  ];
  return (
    <>
      <div className="d-flex flex-stack flex-wrap flex-sm-nowrap ">
        <DynamicToolbar
          defaultTitle={"CircularsView"}
          fixedTitle={true}
          extraTitle={""}
          breadcrumbItems={breadcrumbItems}
          showWorkspace={true}
          cardId={cardId}
          cardOption={cardName}
        />
      </div>
      <CircularsViewHome />

      <div className="modal fade" aria-hidden="true">
        <ManagementHierarchyPopup
          show={modalHShow}
          handleClose={() => setModalHShow(false)}
        />
      </div>
    </>
  );
};

export default CircularsView;
