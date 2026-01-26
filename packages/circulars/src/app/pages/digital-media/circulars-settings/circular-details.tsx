import { Fragment } from "react";
import CircularDetailsHome from "./components/CircularDetailsHome";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";

function CircularDetails() {
  let location = useLocation()
  let cardName = location?.state?.cardName
  const breadcrumbItems = [
    { path: `/circulars-settings`, defaultName: 'CircularsSettings', name: cardName},
    { path: ``, defaultName: 'CircularDetails', name: ""},
  ]
  return (
    <Fragment>
      <DynamicToolbar
      defaultTitle={"CircularDetails"} 
      fixedTitle={true} 
      extraTitle={""}
        breadcrumbItems={breadcrumbItems} 
        showWorkspace={true} 
        cardOption={cardName} />
      <CircularDetailsHome />
    </Fragment>
  );
}

export default CircularDetails;
