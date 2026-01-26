import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import EditNewCircularHome from "./components/EditNewCircularHome";
function EditNewCircular() {
  let location = useLocation();
  let cardName = location?.state?.cardName;
  const breadcrumbItems = [
    {
      path: `/circulars-settings`,
      defaultName: "CircularsSettings",
      name: cardName,
    },
    { path: ``, defaultName: "EditCircular", name: "" },
  ];
  return (
    <Fragment>
      <DynamicToolbar
        defaultTitle={"EditCircular"}
        fixedTitle={true}
        extraTitle={""}
        breadcrumbItems={breadcrumbItems}
        showWorkspace={true}
        cardOption={cardName}
      />
      <EditNewCircularHome />
    </Fragment>
  );
}

export default EditNewCircular;
