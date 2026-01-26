import { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Select from "react-select";
import { showSuccessAlert } from "@4eplatform/shared/services/helper";
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
  addRelatedDocument,
  fetchSourceNumberByCircularIssuerIdAndDate,
} from "../../../../redux/circulars-related-documents-slice";
import { useLocation } from "react-router-dom";
import DisplayErrorMessage from "@4eplatform/shared/functions/displayErrorMessage";
import { useNavigate } from "react-router-dom";
import { fetchLkIssuer } from "../../../../redux/circular-lookups-slice";
export const NewRelatedDocumentsTab = ({ circularId, setCircularId }: any) => {
  const intl = useIntl();
  let location = useLocation();
  let cardName = location?.state?.cardName;
  let cardId = location?.state?.cardId;
  let navigate = useNavigate();
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
  let issuers = useSelector((state: RootState) => {
    return state?.circularLookups?.issuers;
  });
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
  }, [formValues.date, circularId, dispatch]);

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
  }, [formValues?.date, selectedIssuer?.value, dispatch, circularId]);
  let [filteredCircularNumbers, setFilteredCircularNumbers] = useState<any>([]);

  let circularNumbers = useSelector((state: RootState) => {
    return state?.circulars?.allCircularNumbers?.circularNumbers;
  });
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
  }, [selectedCircularNumbers, trigger, setValue]);
  const [circularNumberOptions, setCircularNumberOptions] = useState<any>([]);
  useEffect(() => {
    setCircularNumberOptions(
      Array.isArray(filteredCircularNumbers)
        ? filteredCircularNumbers?.map((number: any) => ({
            value: number,
            label: number,
          }))
        : [],
    );
  }, [filteredCircularNumbers, selectedIssuer, formValues.date]);
  const circularIssuersOptions = issuers?.map((issuer: any) => ({
    value: issuer?.id,
    label: language === "ar" ? issuer?.nameAr : issuer?.nameEn,
  }));
  let handleAddRelatedDocument = async () => {
    let body = {
      circularId,
      circularNumber: selectedCircularNumbers?.map((item: any) => {
        return item?.value;
      }),
    };
    if (circularId === "") {
      showSuccessAlert(
        false,
        "YouMustFillCircularDetailsAtFirst",
        intl,
        () => {},
      );
      return;
    }
    if (selectedCircularNumbers?.length === 0) {
      navigate("/circulars-settings", {
        state: { cardName, serviceName: cardName, cardId },
      });
      return;
    }
    try {
      await dispatch(addRelatedDocument(body) as any).then((res: any) => {
        if (
          res?.payload?.statusEnum === 1 &&
          res?.payload?.message === "AddedSuccessfully"
        ) {
          showSuccessAlert(true, "AddedSuccessfully", intl, () => {
            setSelectedCircularNumbers([]);
            setValue("Number", []);
            navigate("/circulars-settings", {
              state: { cardName, serviceName: cardName, cardId },
            });
          });
        } else if (res?.payload?.message?.includes("but")) {
          showSuccessAlert(
            false,
            "Can'tBeAddedBecauseThere'sADuplicationInCircularNumberForSameCircular",
            intl,
            () => {},
          );
        } else if (res?.payload?.message) {
          showSuccessAlert(false, res?.payload?.message, intl, () => {});
        }
      });
    } catch (error) {}
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleAddRelatedDocument)}>
        <div className="row mb-3">
          <div className="col-12 col-sm-6">
            <div className="mb-2 pt-2 pb-3 ">
              <label
                className="form-label px-2  fs-6 text-gray-700"
                htmlFor="DocumentNumber"
              >
                {intl.formatMessage({
                  id: "DocumentNumber",
                })}
              </label>
              <Controller
                name="Number" // change later
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    id="DocumentNumber"
                    className="react-select__container"
                    classNamePrefix="react-select"
                    placeholder={intl.formatMessage({
                      id: "SelectDocumentNumber",
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
                name="Issuer" // change later
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
