import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Select from "react-select";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AddRelatedDocumentProps,
  AddRelatedDocumentSchema,
} from "../../../../validation/add-related-document-validation";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { fetchAllCircularNumbers } from "../../../../redux/circulars-slice";
import {
  editRelatedDocument,
  fetchAllRelatedDocumentsByCircularId,
  fetchSourceNumberByCircularIssuerIdAndDate,
} from "../../../../redux/circulars-related-documents-slice";
import { fetchLkIssuer } from "../../../../redux/circular-lookups-slice";
import { useNavigate, useLocation } from "react-router-dom";

export const NewRelatedDocumentsTabForEdit = ({ circularId }: any) => {
  let relatedDocuments = useSelector((state: RootState) => {
    return state?.circularsRelatedDocuments?.relatedDocuments;
  });
  let navigate = useNavigate();
  const intl = useIntl();
  let location = useLocation();
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
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

  useEffect(() => {
    let params = {
      pageSize: 100000,
      pageNumber: 1,
    };
    dispatch(fetchLkIssuer(params) as any);
  }, [dispatch]);
  useEffect(() => {
    if (circularId !== "") {
      dispatch(fetchAllCircularNumbers({ circularId }) as any);
    }
  }, [circularId, dispatch]);
  let [selectedIssuer, setSelectedIssuer] = useState<any>();

  let [selectedCircularNumbers, setSelectedCircularNumbers] = useState<any>([]);
  let [circularNumbersFromIssuers, setCircularNumbersFromIssuers] =
    useState<any>([]);
  let [circularNumbersFromDate, setCircularNumbersFromDate] = useState<any>([]);

  useEffect(() => {
    if (selectedIssuer?.value) {
      dispatch(
        fetchSourceNumberByCircularIssuerIdAndDate({
          circularIssuerId: selectedIssuer?.value,
          circularId,
        }) as any,
      ).then((res: any) => {
        setCircularNumbersFromIssuers(res?.payload?.result?.circularNumber);
      });
    }
  }, [selectedIssuer?.value, circularId, dispatch]);
  useEffect(() => {
    setSelectedCircularNumbers(
      relatedDocuments?.map((document: any) => {
        return {
          label: document?.circularNumber,
          value: document?.circularNumber,
        };
      }),
    );
  }, [relatedDocuments]);

  useEffect(() => {
    if (formValues?.date) {
      dispatch(
        fetchSourceNumberByCircularIssuerIdAndDate({
          date: new Date(formValues.date).toISOString(),
          circularId,
        }) as any,
      ).then((res: any) => {
        setCircularNumbersFromDate(res?.payload?.result?.circularNumber || []);
      });
    }
  }, [formValues.date, dispatch, circularId]);
  let [filteredCircularNumbers, setFilteredCircularNumbers] = useState<any>([]);

  let circularNumbers = useSelector((state: RootState) => {
    return state?.circulars?.allCircularNumbers?.circularNumbers;
  });
  let issuers = useSelector((state: RootState) => {
    return state?.circularLookups?.issuers;
  });
  let [
    filteredCircularNumbersFromDateAndIssuer,
    setFilteredCircularNumbersFromDateAndIssuer,
  ] = useState<any>([]);
  useEffect(() => {
    if (selectedIssuer?.value && formValues?.date) {
      dispatch(
        fetchSourceNumberByCircularIssuerIdAndDate({
          circularIssuerId: selectedIssuer?.value,
          date: moment(formValues?.date)?.toISOString(),
          circularId,
        }) as any,
      ).then((res: any) => {
        setFilteredCircularNumbersFromDateAndIssuer(
          res?.payload?.result?.circularNumber,
        );
      });
    }
  }, [formValues?.date, selectedIssuer?.value, circularId, dispatch]);
  useEffect(() => {
    if (!selectedIssuer?.value && !formValues.date) {
      setFilteredCircularNumbers(circularNumbers);
    } else if (selectedIssuer?.value && formValues?.date) {
      setFilteredCircularNumbers(filteredCircularNumbersFromDateAndIssuer);
    } else if (selectedIssuer?.value) {
      setFilteredCircularNumbers(circularNumbersFromIssuers);
    } else if (formValues?.date) {
      setFilteredCircularNumbers(circularNumbersFromDate);
    } else {
    }
  }, [
    selectedIssuer,
    circularNumbers,
    formValues.date,
    circularNumbersFromDate,
    circularNumbersFromIssuers,
    filteredCircularNumbersFromDateAndIssuer,
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
  }, [selectedCircularNumbers, setValue, trigger]);
  const [circularNumberOptions, setCircularNumberOptions] = useState([]);
  useEffect(() => {
    setCircularNumberOptions(
      filteredCircularNumbers?.map((number: number) => ({
        value: number,
        label: number,
      })),
    );
  }, [filteredCircularNumbers, selectedIssuer, formValues.date]);

  const circularIssuersOptions = issuers?.map((issuer: any) => ({
    value: issuer?.id,
    label: language === "ar" ? issuer?.nameAr : issuer?.nameEn,
  }));
  let handleAddRelatedDocument = async () => {
    let formData = new FormData();
    formData.append("circularId", circularId as string);
    selectedCircularNumbers?.forEach((item: any) => {
      formData.append("circularNumber", item?.value);
    });
    if (selectedCircularNumbers?.length === 0) {
      navigate("/circulars-settings", {
        state: { cardName, serviceName: cardName, cardId },
      });
      return;
    }
    try {
      await dispatch(editRelatedDocument(formData) as any).then((res: any) => {
        if (
          res?.payload?.statusEnum === 1 &&
          res?.payload?.message === "UpdatedSuccessfully"
        ) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            navigate("/circulars-settings", { state: { cardId, cardName } });
            setSelectedCircularNumbers([]);
            setValue("Number", []);
            dispatch(fetchAllRelatedDocumentsByCircularId(circularId) as any);
          });
        } else if (res?.payload?.message?.includes("but")) {
          showSuccessAlert(
            false,
            "Can'tBeAddedBecauseThere'sADuplicationInCircularNumberForSameCircular",
            intl,
            () => {},
          );
        } else if (res?.payload?.message?.includes("updateSuccessfully")) {
          showSuccessAlert(true, "updatedSuccessfully", intl, () => {});
        } else {
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      });
    } catch (error) {
      console.error("Error during editing basic data:", error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleAddRelatedDocument)}>
        <div className="row mb-3">
          <div className="col-12 col-sm-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700"
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
                    className="fornm-control form-control-solid"
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
            {DisplayErrorMessage(errors?.Number?.message, intl, language)}
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
                <span className="">{intl.formatMessage({ id: "Issuer" })}</span>
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
        </div>
        <div className="row mb-5">
          <div className="mt-5 mb-5 col-12 col-lg-12 mx-auto">
            <div className="outputCard card-diff-toolbar w-100 mt-3 d-flex justify-content-end">
              <div className="d-flex justify-content-center align-items-center w-sm-50 w-100">
                <button
                  className="btn btn-secondary mx-1 text-center w-50"
                  onClick={() => {
                    navigate("/circulars-settings", {
                      state: { cardId, cardName, serviceName: cardName },
                    });
                  }}
                >
                  {intl.formatMessage({ id: "Cancel" })}
                </button>
                <button
                  type="submit"
                  className="btn btn-success mx-1 text-center w-50"
                  style={{ border: "none" }}
                >
                  {intl.formatMessage({ id: "Add" })}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};
