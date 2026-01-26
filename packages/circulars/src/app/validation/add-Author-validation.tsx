import { object, string, InferType } from "yup";
export const authorSchema = object({
  nameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z ]+$/, "AuthornameMustContainOnlyEnglishCharacters"),
  nameAr: string()
    .required("InputFieldIsRequried")
    .matches(/^[ء-ي ]+$/, "AuthornameMustContainOnlyArabicCharacters"),
    email: string()
    .required("InputFieldIsRequried")
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      "InvalidEmail"
    ),
    address: string().required("InputFieldIsRequried"),
    phoneNumber: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(\+9665|9665|\+9665|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
      "InvalidPhone"
    ),
    jobTitle: string().required("InputFieldIsRequried"),
    jobLocation: string().required("InputFieldIsRequried"),
});

export type authorProps = InferType<typeof authorSchema>;