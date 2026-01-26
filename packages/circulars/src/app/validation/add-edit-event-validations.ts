import { string, object, array } from "yup";

const urlRegex = new RegExp(
  /^(https?:\/\/)?(www\.)?[\w-]+(\.[\w.-]+)+([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i
);

export const AddEditEventValidations = object().shape({
  Name: string().required("ThisFelidIsRequired").matches(/^[\u0600-\u06FF\s]+$/, "EventNameArMustBeInArabicWords").typeError("InputFieldIsRequried"),
  SectorId: string().required("ThisFelidIsRequired"),
  TargetGroup: string().required("ThisFelidIsRequired"),
  StartDate: string().required("StartDateIsRequired"),
  EndDate: string().required("EndDateIsRequired"),
  MainImageUrl: string().required("ThisFelidIsRequired"),
  UrlLocation: string().test({
      name: "UrlLocation",
      message: "InvalidURLFormat",
      test: function (value: any) {
        if(value){
        return  urlRegex.test(value)
        }
        else {
        return true;
        }
  
      },
    })
    .notRequired().nullable(),
  Location: string().notRequired().nullable(),
  LocationDetails: string().notRequired().nullable(),
  RegisterationUrl: string().test({
      name: "RegisterationUrl",
      message: "InvalidURLFormat",
      test: function (value: any) {
        if(value){
        return urlRegex.test(value)
        }
        else {
        return true;
        }
  
      },
    }).notRequired().nullable(),
  Description: string().required("ThisFelidIsRequired"),

  EventAgenda: array()
    .of(
      object().shape({
        startDate: string().required("StartDateIsRequired"),
        endDate: string().required("EndDateIsRequired"),
        timePeriods: array()
          .of(
            object().shape({
              startTime: string().required("StartTimeIsRequired"),
              endTime: string().required("EndTimeIsRequired"),
              details: string().required("ThisFelidIsRequired"),
            })
          )
          .required("AtLeastOneTimePeriodIsRequired")
          .min(1, "AtLeastOneTimePeriodIsRequired"),
      })
    )
    .nullable()
    .notRequired(),
    NameEn:string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "EventNameEnMustBeInEnglishWords").typeError("InputFieldIsRequried"),
});
