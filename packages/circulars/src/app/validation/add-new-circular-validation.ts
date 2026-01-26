import { object, string, InferType, mixed, array } from "yup";

export const AddNewCircularSchema = object({
  name: string()
    .required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s]+$/, "CircularNameArMustBeInArabicWords")
    .typeError("InputFieldIsRequried"),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "CircularNameEnMustBeInEnglishWords")
    .typeError("InputFieldIsRequried"),
  number: string().required("InputFieldIsRequried"),
  approvalId: string().required("InputFieldIsRequried"),
  attachments: mixed()
    .test("minLength", "InputFieldIsRequried", (value) => {
      return value && value.length >= 1;
    })
    .test("fileSize", "FileSizeMustBeLessThan10MB", (value) => {
      if (!value || value.length === 0) return true;
      return Array.from(value).every(
        (file: any) => file.size <= 10 * 1024 * 1024
      );
    }),
  fromDate: string()
    .nullable()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  toDate: string()
    .nullable()
    .notRequired()
    .test({
      name: "toDate",
      message: "ToDateMustBeAfterFromDate",
      test: function (value: any) {
        if (this.parent.toDate) {
          let fromDate = new Date(this.parent.fromDate);
          let toDate = new Date(value);
          if (toDate.getTime() <= fromDate.getTime()) {
            return false;
          }
        }
        return true;
      },
    }),
  accreditationDate: string().required("InputFieldIsRequried"),
  issuerId: string().required("InputFieldIsRequried"),
  documentClass: string().nullable().notRequired(),
  enforcementId: string().required("InputFieldIsRequried"),
  documentAbout: string()
  .required("InputFieldIsRequried")
  .matches(/^[\u0600-\u06FF0-9\s,.\؟?،]+$/, "DocumentAboutMustBeInArabic")
  .typeError("InputFieldIsRequried"),
  documentAboutEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "DocumentAboutMustBeInEnglish")
    .typeError("InputFieldIsRequried"),
  details: string().nullable().notRequired(),
  orgsConcerned: array().of(string()).notRequired(),
  mainInvolvedOrgNames: array().of(string()).notRequired(),
});

export type AddNewCircularProps = InferType<typeof AddNewCircularSchema>;
