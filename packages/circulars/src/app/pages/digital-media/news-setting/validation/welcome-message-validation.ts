import { object, string, InferType } from "yup";
export const WelcomeMessageSchema = object({
  descriptionAr: string()
    .required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s]+$/, "WelcomeMessageOnlyArabicCharacters"),
  descriptionEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "WelcomeMessageOnlyEnglishCharacters"),
});

export type WelcomeMessageSchemaProps = InferType<typeof WelcomeMessageSchema>;
