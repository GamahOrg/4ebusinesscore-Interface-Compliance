import { object, string, InferType } from "yup";
export const editAccreditationEvidenceSchema = object({
  nameAr: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[\u0600-\u06FF\s]+$/,
      "SectornameMustContainOnlyArabicCharacters"
    ),
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "SectornameMustContainOnlyEnglishCharacters"),
});

export type EditAccreditationEvidenceProps = InferType<
  typeof editAccreditationEvidenceSchema
>;
