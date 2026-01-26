import { object, string, InferType } from "yup";
export const accreditationEvidenceSchema = object({
  NameAr: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[\u0600-\u06FF\s]+$/,
      "SectornameMustContainOnlyArabicCharacters"
    ),
  NameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "SectornameMustContainOnlyEnglishCharacters"),
});

export type AccreditationEvidenceProps = InferType<
  typeof accreditationEvidenceSchema
>;
