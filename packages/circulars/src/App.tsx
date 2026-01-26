import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./app/redux/store";

import CircularsSettings from "./app/pages/digital-media/circulars-settings/CircularsSettings";
import CircularsView from "./app/pages/digital-media/circulars-view/CircularsView";
import CircularSettingsDetails from "./app/pages/digital-media/circulars-settings/circular-details";
import CircularViewDetails from "./app/pages/digital-media/circulars-view/circular-details";
import AddNewCircular from "./app/pages/digital-media/circulars-settings/add-new-circular";
import EditNewCircular from "./app/pages/digital-media/circulars-settings/edit-new-circular";
import AccreditationEvidenceHome from "./app/pages/digital-media/circulars-settings/add-new-accreditation-evidence";
import IssuingAuthorityHome from "./app/pages/digital-media/circulars-settings/add-new-issuing -authority";
import { DynamicWorkSpace } from "@npm-react/react-redux-routing";
function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<DynamicWorkSpace />} />
        <Route path="/circulars-settings" element={<CircularsSettings />} />
        <Route
          path="/circulars-settings/AddCirculars"
          element={<AddNewCircular />}
        />
        <Route
          path="/circulars-settings/AccreditationEvidence"
          element={<AccreditationEvidenceHome />}
        />
        <Route
          path="/circulars-settings/IssuingAuthority"
          element={<IssuingAuthorityHome />}
        />
        <Route
          path="/circulars-settings/edit-circular/:id"
          element={<EditNewCircular />}
        />

        <Route
          path="/circulars-settings/circular-details/:id"
          element={<CircularSettingsDetails />}
        />
        <Route path="/circulars-view" element={<CircularsView />} />
        <Route
          path="/circulars-view/circular-details/:id"
          element={<CircularViewDetails />}
        />
      </Routes>
    </Provider>
  );
}

export default App;
