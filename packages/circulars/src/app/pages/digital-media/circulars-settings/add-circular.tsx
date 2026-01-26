import  { Fragment } from "react";
import AddCircularHome from "./components/AddCircularHome";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
import { useLocation } from "react-router-dom";
function AddCircular() {
  let location = useLocation()
  let cardName = location?.state?.cardName
  let cardId = location?.state?.cardId
  const breadcrumbItems = [
    { path: `/circulars-settings`, defaultName: 'CircularsSettings', name: cardName},
    { path: ``, defaultName: 'AddNewCircular', name: ""},
  ]
  return (
    <Fragment>
      <DynamicToolbar
      defaultTitle={"AddNewCircular"} 
      fixedTitle={true} 
      extraTitle={""}
        breadcrumbItems={breadcrumbItems} 
        showWorkspace={true} 
        cardId={cardId}
        cardOption={cardName} />
      <AddCircularHome />
    </Fragment>
  );
}

export default AddCircular;
