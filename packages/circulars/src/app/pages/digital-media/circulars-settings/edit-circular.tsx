import { Fragment } from "react";
import EditCircularHome from "./components/EditCircularHome";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
function EditCircular() {
  let location = useLocation()
  let cardName = location?.state?.cardName
  const breadcrumbItems = [
    { path: `/circulars-settings`, defaultName: 'CircularsSettings', name: cardName},
    { path: ``, defaultName: 'EditCircular', name: ""},
  ]
  return (
    <Fragment>
      <DynamicToolbar
      defaultTitle={"EditCircular"} 
      fixedTitle={true} 
      extraTitle={""}
        breadcrumbItems={breadcrumbItems} 
        showWorkspace={true} 
        cardOption={cardName} />
      <EditCircularHome />
    </Fragment>
  );
}

export default EditCircular;
