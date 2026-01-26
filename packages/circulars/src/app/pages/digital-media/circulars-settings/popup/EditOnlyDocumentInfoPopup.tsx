import { FC , useEffect , useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Swal from "sweetalert2";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getDocumentInfo , addDocumentInfo } from "../../../../redux/document-info-slice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { ResponseStatus } from "@4eplatform/shared/enums/enums";
import { useParams } from "react-router";
import moment from "moment";
import {  fetchCircular } from "../../../../redux/circulars-slice";
import { AddEditDocumentInfoProps } from "../../../../validation/add-edit-document-info-validation"; 
import { AddEditDocumentInfoSchema } from "../../../../validation/add-edit-document-info-validation"; 
type EditPopupProps = {
  showEdit?: any;
  handleCloseEdit?: any;

};

export const EditDocumentInfoPopup: FC<EditPopupProps> = ({
  showEdit,
  handleCloseEdit,
}) => {
  const intl = useIntl();
  const dispatch = useDispatch()
  let [accreditation, setAccreditation] = useState<string | undefined>("");
  const {id} = useParams()
   useEffect(() => {
    dispatch(getDocumentInfo(id) as any);
    dispatch(fetchCircular(id) as any);
  }, [dispatch]);
  let documentInfoDetails = useSelector((state: RootState) => {
    return state?.documentInfo?.documentInfo;
  });
  let circularDetails = useSelector((state: RootState) => {
    return state?.circulars?.circular;
  });
  //post documentInfo
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AddEditDocumentInfoProps>({
    resolver: yupResolver(AddEditDocumentInfoSchema),
    mode: "all",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setAccreditation(circularDetails?.approval|| "");
  }, [circularDetails , id]);

  useEffect(() => {
    setValue("documentNumber", documentInfoDetails?.documentNumber);
    setValue("issuer", documentInfoDetails?.issuer);
    setValue("documentClass", documentInfoDetails?.documentClass);
    setValue("accreditationDate",documentInfoDetails?.accreditationDate? moment(documentInfoDetails?.accreditationDate).format("YYYY-MM-DD") : "");
    setValue("enforcement", documentInfoDetails?.enforcement);
    setValue("source", documentInfoDetails?.source);
    setValue("editionNumber", documentInfoDetails?.editionNumber);
    setValue("documentAbout", documentInfoDetails?.documentAbout);
    setValue("editionDate", documentInfoDetails?.editionDate ?moment( documentInfoDetails?.editionDate).format("YYYY-MM-DD") : "")
  }, [documentInfoDetails , dispatch ]);
 
  let language: string = intl.locale;
  const DisplayErrorMessage = (error: any, intl: any) => {
    return (
      <div
        className="invalid-feedback"
        style={{
          display: error ? "block" : "none",
          width: "100%",
          textAlign: language == "ar" ? "right" : "left",
        }}
      >
        <p
          style={{
            width: "100%",
            textAlign: language == "ar" ? "right" : "left",
          }}
        >
          {error
            ? intl.formatMessage({
                id: error,
              })
            : ""}
        </p>
      </div>
    );
  };
  const showSuccessAlert = (success: boolean, text: string) => {
    Swal.fire({
      text: text,
      icon: success == true ? "success" : "error",
      heightAuto: false,
      buttonsStyling: false,
      confirmButtonText: intl.formatMessage({ id: "Agree" }),
      customClass: {
        confirmButton: "btn btn-primary",
      },
    });
  };
  const handleAddDocumentInfo = async (formValues: AddEditDocumentInfoProps) => {
    let formdata = new FormData();
    formdata.append("CircularId", id || "");
    formdata.append("Accreditation", accreditation || "");
    formdata.append("DocumentNumber", formValues?.documentNumber?.toString() || "");
    formdata.append("AccreditationDate", formValues?.accreditationDate);
    formdata.append("Issuer", formValues?.issuer);
    formdata.append("DocumentClass", formValues?.documentClass);
    formdata.append("Enforcement", formValues?.enforcement);
    formdata.append("Source", formValues?.source);
    formdata.append("EditionNumber", formValues?.editionNumber?.toString()||"");
    formdata.append("DocumentAbout", formValues?.documentAbout || "");
    formdata.append("EditionDate", formValues?.editionDate);
   
    try{
      const result = await dispatch(
        addDocumentInfo(formdata) as any
      ).then((res:any)=>{
        if (
          res?.payload?.statusEnum == ResponseStatus.SavedSuccessfully
        ) {
          showSuccessAlert(true, intl.formatMessage({ id: "ModifiedSuccessfully" }));
          dispatch(getDocumentInfo(id) as any);
          handleCloseEdit();
          reset();
        } else if (res?.payload.message == "[\"DocumentNumber must be unique\"]"){
          showSuccessAlert(false, intl.formatMessage({ id: "DocumentNumberMustBeUnique" }));
        }
        else {
          showSuccessAlert(false, res?.payload?.message);
        }
      })

    }catch(error){
      console.error("Error during ADD:", error);
    }
  };

  return (
    <>
      <div className="modal-dialog ">
        <Modal centered show={showEdit} onHide={handleCloseEdit} size="lg">
          <Modal.Header
            closeButton
            style={{
              alignItems: intl.locale == "ar" ? "flex-start" : "center",
              flexDirection: intl.locale == "en" ? "column-reverse" : "row",
            }}
          >
            <Modal.Title></Modal.Title>
          </Modal.Header>

          <form
            onSubmit={handleSubmit(handleAddDocumentInfo)}
          >
            <Modal.Body>
              <Row className="justify-content-center mt-5 mb-10">
                <div className="text-center">
                  <h3> {intl.formatMessage({ id: "DocumentInformation" })} </h3>
                </div>
              </Row>
              <div className="row mb-3 d-flex">
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="Accreditation"
                    >
                      {intl.formatMessage({
                        id: "Accreditation",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-certificate special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="Accreditation"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "Accreditation",
                        })}
                        value={accreditation} 
                        disabled   
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="DocumentNumber"
                    >
                      {intl.formatMessage({
                        id: "DocumentNumber",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-hashtag special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="DocumentNumber"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "DocumentNumber",
                        })}
                        {...register("documentNumber")}
                      />
   {DisplayErrorMessage(errors?.documentNumber?.message, intl)}
                    </div>
                  </div>
                
                </div>
          
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="AccreditationDate"
                    >
                      {intl.formatMessage({
                        id: "AccreditationDate",
                      })}
                    </label>
                    <input
                      type="date"
                      id="AccreditationDate"
                      className="form-control form-control-solid"
                      {...register("accreditationDate")}
                    />
                     {DisplayErrorMessage(errors?.accreditationDate?.message, intl)}
                  </div>
                </div>
              </div>
              <div className="row mb-3 d-flex ">
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="Issuer"
                    >
                      {intl.formatMessage({
                        id: "Issuer",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-building special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="Issuer"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "Issuer",
                        })}
                        {...register("issuer")}
                      />
                       {DisplayErrorMessage(errors?.issuer?.message, intl)}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="DocumentClass"
                    >
                      {intl.formatMessage({
                        id: "DocumentClass",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-file special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="DocumentClass"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "DocumentClass",
                        })}
                        {...register("documentClass")}
                      />
                       {DisplayErrorMessage(errors?.documentClass?.message, intl)}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="Enforcement"
                    >
                      {intl.formatMessage({
                        id: "Enforcement",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-signal special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="Enforcement"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "Enforcement",
                        })}
                        {...register("enforcement")}
                      />
                      {DisplayErrorMessage(errors?.enforcement?.message, intl)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-3 d-flex">
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="Source"
                    >
                      {intl.formatMessage({
                        id: "Source",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-user-tie special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="Source"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "Source",
                        })}
                        {...register("source")}
                      />
                       {DisplayErrorMessage(errors?.source?.message, intl)}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="EditionNumber"
                    >
                      {intl.formatMessage({
                        id: "EditionNumber",
                      })}
                    </label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i className="fa-solid fa-hashtag special"></i>
                        </span>
                      </div>
                      <input
                        type="text"
                        id="EditionNumber"
                        className="form-control form-control-solid"
                        placeholder={intl.formatMessage({
                          id: "EditionNumber",
                        })}
                        {...register("editionNumber")}
                      />
                        {DisplayErrorMessage(errors?.editionNumber?.message, intl)}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-sm-3 col-md-4">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="EditionDate"
                    >
                      {intl.formatMessage({
                        id: "EditionDate",
                      })}
                    </label>
                    <input
                      type="date"
                      id="EditionDate"
                      className="form-control form-control-solid"
                      {...register("editionDate")}
                    />
                       {DisplayErrorMessage(errors?.editionDate?.message, intl)}
                  </div>
                </div>
              </div>
              <div className="row mb-5">
                <div className="col-12">
                  <label
                    htmlFor="DocumentAbout"
                    className=" mb-5 fw-semibold fs-6 required"
                  >
                    {" "}
                    {intl.formatMessage({ id: "DocumentAbout" })}{" "}
                  </label>
                  <textarea
                    id="DocumentAbout"
                    rows={4}
                    className="form-control form-control-lg form-control-solid mb-3 mb-lg-2"
                    placeholder={intl.formatMessage({ id: "DocumentAbout" })}
                    {...register("documentAbout")}
                  ></textarea>
                     {DisplayErrorMessage(errors?.documentAbout?.message, intl)}
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="justify-content-center py-2">
              <div className="row">
                <div className="col-12 col-lg-7 mx-auto mb-10 mt-5">
                  <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-center">
                    <div className="d-flex justify-content-center align-items-center w-100">
                      <button
                        type="reset"
                        className="btn btn-secondary me-3 w-100"
                        onClick={handleCloseEdit}
                      >
                        {intl.formatMessage({ id: "Cancel" })}
                      </button>

                      <button
                        type="submit"
                        // onClick={() => {
                        //   handleCloseEdit();
                        //   showSuccessAlert();
                        // }}
                        className="  btn btn-primary me-5 w-100 "
                      >
                        <span className="indicator-label">
                          {intl.formatMessage({ id: "Save" })}
                        </span>
                        <span className="indicator-progress">
                          {intl.formatMessage({ id: "Edit" })}
                          <span className="spinner-border spinner-border-sm align-middle ms-2"></span>{" "}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Footer>
          </form>
        </Modal>
      </div>
    </>
  );
};
