import { Fragment } from "react";
import CircularDetailsHome from "./components/CircularDetailsHome";
import { useLocation } from "react-router-dom";
import DynamicToolbar from "@4eplatform/shared/components/DynamicToolbar";
function CircularDetails() {
  let location = useLocation()
  let cardName = location?.state?.cardTitle
  let cardId = location?.state?.cardId
  const breadcrumbItems = [
    { path: `/circulars-view`, defaultName: 'CircularsView', name: cardName },
    { path: ``, defaultName: 'CircularDetails', name: "" },
  ]
  return (
    <Fragment>
      <DynamicToolbar defaultTitle={"CircularDetails"} fixedTitle={true} extraTitle={""} breadcrumbItems={breadcrumbItems} showWorkspace={true} cardId={cardId} cardOption={cardName} />
      <CircularDetailsHome />
    </Fragment>
  );
}

export default CircularDetails;
