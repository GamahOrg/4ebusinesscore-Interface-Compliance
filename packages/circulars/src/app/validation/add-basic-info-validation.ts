import { object, string, InferType } from "yup";
let ArabicRegex=/^(?!.*[a-zA-Z])[\u0600-\u06FF\s\d:'";,.]+$/
let EnglishRegex=/^(?!.*[\u0600-\u06FF])[\w\d:'",\s]+$/
export const AddBasicInfoSchema = object({
  AuthorityLogo: string().required("InputFieldIsRequried"),
  NameAr: string()
    .required("InputFieldIsRequried")
    .matches(/^[\u0600-\u06FF\s]+$/, "NameMustBeInArabicWords"),
  NameEn: string()
    .required("InputFieldIsRequried")
    .matches(/^[a-zA-Z\s]+$/, "NameMustBeInEnglishWords"),
  PhoneNumber: string()
    .matches(/^(5)([0-9]{8})$/, "InvalidPhone"),
    
  Email: string()
    .notRequired(),
  Website: string()
    .required("InputFieldIsRequried")
    .matches(
      /^(https?:\/\/)?(www\.)?([a-zA-Z0-9-]+\.){1,}[a-zA-Z]{2,}(\/.*)?$/,
      "InvalidUrl"
    ),
  AddressArabic: string()
    .required("InputFieldIsRequried")
    .matches(/^(?!.*[a-zA-Z])[\u0600-\u06FF\s\d:'";,.]+$/, {
      message: "NameMustBeInArabicWords",
    }),
  AddressEnglish: string()
    .required("InputFieldIsRequried")
    .matches(/^(?!.*[\u0600-\u06FF])[\w\d:'",\s]+$/, {
      message: "NameMustBeInEnglishWords",
    }),
  AboutArabic: string().nullable()
  .test({
    name: "AboutArabic",
    message: "NameMustBeInArabicWords",
    test: function (value: any) {
        if(value){
          return  ArabicRegex.test(value)
        }
        else {
          return true;
        }

    },
  }),
  AboutEnglish: string().nullable()
    .test({
      name: "AboutEnglish",
      message: "NameMustBeInEnglishWords",
      test: function (value: any) {
          if(value){
            return  EnglishRegex.test(value)
          }
          else {
            return true;
          }
  
      },
    })
    ,
});

export type AddBasicInfoProps = InferType<typeof AddBasicInfoSchema>;
