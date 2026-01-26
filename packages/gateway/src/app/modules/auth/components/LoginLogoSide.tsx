import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
// import { fetchPlatform } from "../../../../app/slices/platform-slice/platform-slice";
import { RootState } from "../../../../app/store/store";
import { PlatformRootUrl } from "@4eplatform/shared/apis/system_setting";
import { toAbsoluteUrl } from "../../../helpers";

function LoginLogoSide() {
  // useEffect(() => {
  //   dispatch(fetchPlatform() as any);
  // }, [dispatch]);

  let platforms = useSelector((state: RootState) => {
    return state?.Platform?.data;
  });
  useEffect(() => {
    document.title = platforms?.webTitle;
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription?.setAttribute("content", platforms?.webDescription);
    }

    // Remove existing favicons
    document.querySelectorAll("link[rel='icon']").forEach((el) => el.remove());

    // Create a new favicon element
    const newFavicon = document.createElement("link");
    newFavicon.rel = "icon";
    newFavicon.type = "image/png";

    // Set initial favicon URL
    const iconUrl =
      platforms?.iconTitle !== ""
        ? `${PlatformRootUrl}${platforms?.iconTitle}`
        : toAbsoluteUrl("/media/theme-img/iconTitle.webp");

    newFavicon.href = iconUrl;

    // Attach error handler BEFORE appending
    newFavicon.onerror = () => {
      // Remove broken favicon
      newFavicon.remove();

      // Create and append fallback favicon
      const fallbackFavicon = document.createElement("link");
      fallbackFavicon.rel = "icon";
      fallbackFavicon.type = "image/png";
      fallbackFavicon.href = toAbsoluteUrl("/media/theme-img/iconTitle.webp");

      document.head.appendChild(fallbackFavicon);
    };

    // Append to <head>
    document.head.appendChild(newFavicon);
  }, [platforms]);

  return (
    <Fragment>
      {/* <div className="d-flex flex-column flex-center w-100">
        <div className="text-white fw-bolder text-center mb-7 d-flex align-items-center "> */}
      <div className="d-flex flex-column flex-center w-100">
        <div className="start-0 p-3" style={{ top: "-293px" }}>
          {/* {intl.locale == "ar" ? ( */}
          <img
            alt="Logo"
            src={
              platforms?.webCoverLogin &&
              platforms?.webCoverLogin !== " " &&
              platforms?.webCoverLogin !== "null"
                ? `${PlatformRootUrl}${platforms?.webCoverLogin}`
                : toAbsoluteUrl("/media/theme-img/logo-login-ar.png")
            }
            className="logo-default h-lg-150px h-sm-100 w-100"
            style={{
              objectFit: "cover",
              height: "250px",
              width: "100%",
              borderRadius: "16px",
            }}
          />
          {/* ) : (
            <img
              alt="Logo"
              src={toAbsoluteUrl("/media/theme-img/logo-login-en.png")}
              className="logo-default  h-lg-300px h-sm-100 w-100"
            />
          )} */}
        </div>
        {/*<div className="text-white fw-bolder text-center mb-7   rega-login-text">
          الهيئة العامة للعقار
           </div>*/}
      </div>
    </Fragment>
  );
}

export default LoginLogoSide;
