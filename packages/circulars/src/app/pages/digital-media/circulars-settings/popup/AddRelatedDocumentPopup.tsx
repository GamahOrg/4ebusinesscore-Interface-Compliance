import { FC, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { Row } from "react-bootstrap";
import Select from "react-select";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Modal from "react-bootstrap/Modal";
import {
  AddRelatedDocumentProps,
  AddRelatedDocumentSchema,
} from "../../../../validation/add-related-document-validation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import {
  fetchAllCircularIssuer,
  fetchAllCircularNumbers,
  fetchAllCircularSource,
} from "../../../../redux/circulars-slice";
import {
  addRelatedDocument,
  fetchAllRelatedDocumentsByCircularId,
  fetchIssuerNumberSourceByDate,
  fetchNumberIssuerByCircularSource,
  fetchSourceNumberByCircularIssuer,
} from "../../../../redux/circulars-related-documents-slice";

type EditPopupProps = {
  showEdit?: any;
  handleCloseEdit?: any;
  id?: number;
  circularId?: string;
};

export const AddRelatedDocumentPopup: FC<EditPopupProps> = ({
  showEdit,
  handleCloseEdit,
  id,
  circularId,
}) => {
  const intl = useIntl();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    trigger,
    control,
    formState: { errors },
  } = useForm<AddRelatedDocumentProps>({
    resolver: yupResolver(AddRelatedDocumentSchema),
    mode: "all",
    reValidateMode: "onSubmit",
  });
  let formValues = watch();
  let dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(fetchAllCircularIssuer({}) as any);
    dispatch(fetchAllCircularSource({}) as any);
    dispatch(fetchAllCircularNumbers({}) as any);
  }, []);
  let [selectedIssuer, setSelectedIssuer] = useState<any>();
  let [selectedSource, setSelectedSource] = useState<any>();

  let [selectedCircularNumbers, setSelectedCircularNumbers] = useState<any>([]);
  let [circularNumbersFromIssuers, setCircularNumbersFromIssuers] =
    useState<any>([]);
  let [circularNumbersFromSources, setCircularNumbersFromSources] =
    useState<any>([]);
  let [circularNumbersFromDate, setCircularNumbersFromDate] = useState<any>([]);
  useEffect(() => {
    if (selectedIssuer?.value) {
      dispatch(
        fetchSourceNumberByCircularIssuer(selectedIssuer?.value) as any,
      ).then((res: any) => {
        setCircularNumbersFromIssuers(res?.payload?.result?.circularNumber);
      });
    }
  }, [selectedIssuer?.value]);
  useEffect(() => {
    if (selectedSource?.value) {
      dispatch(
        fetchNumberIssuerByCircularSource(selectedSource?.value) as any,
      ).then((res: any) => {
        setCircularNumbersFromSources(res?.payload?.result?.circularNumber);
      });
    }
  }, [selectedSource?.value]);

  useEffect(() => {
    if (formValues?.date) {
      dispatch(
        fetchIssuerNumberSourceByDate({
          date: new Date(formValues.date).toISOString(),
        }) as any,
      ).then((res: any) => {
        setCircularNumbersFromDate(res?.payload?.result?.circularNumber || []);
      });
    }
  }, [formValues.date]);
  let [filteredCircularNumbers, setFilteredCircularNumbers] = useState<any>([]);

  let circularNumbers = useSelector((state: RootState) => {
    return state?.circulars?.allCircularNumbers?.circularNumbers;
  });
  let circularIssuers = useSelector((state: RootState) => {
    return state?.circulars?.allCircularIssuer?.issuers;
  });
  let circularSources = useSelector((state: RootState) => {
    return state?.circulars?.allCircularSources?.sources;
  });
  useEffect(() => {
    if (!selectedIssuer?.value && !selectedSource?.value && !formValues.date) {
      setFilteredCircularNumbers(circularNumbers);
    } else {
      let filteredNumbers = new Set([
        ...circularNumbersFromDate,
        ...circularNumbersFromIssuers,
        ...circularNumbersFromSources,
      ]);
      setFilteredCircularNumbers(Array.from(filteredNumbers));
    }
  }, [
    selectedIssuer,
    selectedSource,
    circularNumbers,
    formValues.date,
    circularNumbersFromDate,
    circularNumbersFromIssuers,
    circularNumbersFromSources,
  ]);
  useEffect(() => {
    if (selectedCircularNumbers?.length) {
      setValue(
        "Number",
        selectedCircularNumbers?.map((item: any) => {
          return item?.value;
        }),
      );
      trigger("Number");
    }
  }, [selectedCircularNumbers]);
  const [circularNumberOptions, setCircularNumberOptions] = useState([]);
  useEffect(() => {
    setCircularNumberOptions(
      filteredCircularNumbers?.map((number: any) => ({
        value: number,
        label: number,
      })),
    );
  }, [
    filteredCircularNumbers,
    selectedIssuer,
    selectedSource,
    formValues.date,
  ]);
  const circularIssuersOptions = circularIssuers?.map((issuer: any) => ({
    value: issuer,
    label: issuer,
  }));
  const circularSourcesOptions = circularSources?.map((source: any) => ({
    value: source,
    label: source,
  }));
  let handleAddRelatedDocument = async () => {
    let body = {
      circularId,
      circularNumber: selectedCircularNumbers?.map((item: any) => {
        return item?.value;
      }),
    };
    try {
      await dispatch(addRelatedDocument(body) as any).then((res: any) => {
        if (
          res?.payload?.statusEnum == 1 &&
          res?.payload?.message == "Related document added successfully."
        ) {
          handleCloseEdit();
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            setSelectedCircularNumbers([]);
            setValue("Number", []);
            dispatch(fetchAllRelatedDocumentsByCircularId(circularId) as any);
          });
        } else if (res?.payload?.message?.includes("but")) {
          showSuccessAlert(
            false,
            "Can'tBeAddedBecauseThere'sADuplicationInCircularNumberForSameCircular",
            intl,
            () => {
              handleCloseEdit();
            },
          );
        } else {
          handleCloseEdit();
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      });
    } catch (error) {
      console.error("Error during editing basic data:", error);
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

          <form onSubmit={handleSubmit(handleAddRelatedDocument)}>
            <Modal.Body>
              <Row className="justify-content-center mt-5 mb-10">
                <div className="text-center">
                  <h3> {intl.formatMessage({ id: "AddRelateDocument" })} </h3>
                </div>
              </Row>
              <div className="row mb-3">
                <div className="col-12 col-sm-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700 required"
                      htmlFor="CircularNumber"
                    >
                      {intl.formatMessage({
                        id: "DocumentNumber",
                      })}
                    </label>
                    <Controller
                      name="Number"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="userName"
                          className="react-select__container"
                          classNamePrefix="react-select"
                          placeholder={intl.formatMessage({
                            id: "SelectCircularNumber",
                          })}
                          options={circularNumberOptions}
                          isClearable={true}
                          onChange={(selectedOption) =>
                            setSelectedCircularNumbers(selectedOption)
                          }
                          isMulti
                          value={selectedCircularNumbers}
                          noOptionsMessage={() =>
                            intl.formatMessage({
                              id: "NotAvailableCircularNumbers",
                            })
                          }
                        />
                      )}
                    />
                  </div>
                  {DisplayErrorMessage(errors?.Number?.message, intl)}
                </div>
                <div className="col-12 col-sm-6">
                  <div className="mb-2 pt-2 pb-3 ">
                    <label
                      className="form-label px-2  fs-6 text-gray-700"
                      htmlFor="Date"
                    >
                      {intl.formatMessage({
                        id: "Date",
                      })}
                    </label>
                    <input
                      type="date"
                      id="Date"
                      className="form-control form-control-solid"
                      {...register("date")}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-12 mb-5">
                  <div className="d-flex flex-column mb-5 fv-row">
                    <label className="d-flex align text-gray-600-items-center fs-8 fw-bold mb-2">
                      <span className="">
                        {intl.formatMessage({ id: "Issuer" })}
                      </span>
                    </label>
                    <Controller
                      name="Issuer"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="userName"
                          className="react-select__container"
                          classNamePrefix="react-select"
                          placeholder={intl.formatMessage({
                            id: "SelectIssuer",
                          })}
                          options={circularIssuersOptions}
                          isClearable={true}
                          onChange={(selectedOption) =>
                            setSelectedIssuer(selectedOption)
                          }
                          value={selectedIssuer}
                          noOptionsMessage={() =>
                            intl.formatMessage({
                              id: "NotAvailableCircularSources",
                            })
                          }
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="col-sm-6 col-12 mb-5">
                  <div className="d-flex flex-column mb-5 fv-row">
                    <label className="d-flex align text-gray-600-items-center fs-8 fw-bold mb-2">
                      <span className="">
                        {intl.formatMessage({ id: "Source" })}
                      </span>
                    </label>
                    <Controller
                      name="Source"
                      control={control}
                      render={({ field }) => (
                        <Select
                          {...field}
                          id="source"
                          className="react-select__container"
                          classNamePrefix="react-select"
                          placeholder={intl.formatMessage({
                            id: "SelectSource",
                          })}
                          options={circularSourcesOptions}
                          isClearable={true}
                          onChange={(selectedOption) =>
                            setSelectedSource(selectedOption)
                          }
                          value={selectedSource}
                          noOptionsMessage={() =>
                            intl.formatMessage({
                              id: "NotAvailableCircularSources",
                            })
                          }
                        />
                      )}
                    />
                  </div>
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
                        className="  btn btn-success me-5 w-100 "
                      >
                        <span className="indicator-label">
                          {intl.formatMessage({ id: "Save" })}
                        </span>
                        <span className="indicator-progress">
                          {intl.formatMessage({ id: "Add" })}
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
