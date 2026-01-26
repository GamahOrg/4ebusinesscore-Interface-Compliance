import { useState, useEffect, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { MasterLayout } from "../../app/layout/MasterLayout";
import { Loader } from "@4eplatform/shared/src/components/loader";
import { PageNotFound } from "@4eplatform/shared/src/components/404";
import { risksLoadRoutes } from "../services/dynamicRoutes/risksLoadRoutes";
import { useIntl } from "react-intl";
// import { HomeWorkspace } from "../pages/home-workspace";

const DynamicComponentsWrapper = lazy(
  () => import("./DynamicComponentsWrapper")
);
// const HomeWorkspace = lazy(() => import("../pages/home-workspace"));

const PrivateRoutes = () => {
  const [components, setComponents] = useState<any>();

  let intl = useIntl();
  let languageData = intl.locale;
  useEffect(() => {
    document.documentElement.lang = languageData;
    document.documentElement.dir = languageData === "ar" ? "rtl" : "ltr";
  }, [languageData]);

  const fetchComponents = async () => {
    try {
      const loadedComponents = await risksLoadRoutes();
      setComponents(loadedComponents);
    } catch (error) {
      console.error("Error loading components:", error);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return (
    <Suspense
    // fallback={<Loader />}
    >
      <Routes>
        <Route element={<MasterLayout />}>
          {/* <Route index path="/" element={<HomeWorkspace />} /> */}
          <Route path="/loading" element={<Loader />} />
          <Route path="/404" element={<PageNotFound />} />

          <Route
            path="/*"
            element={<DynamicComponentsWrapper components={components} />}
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export { PrivateRoutes };
