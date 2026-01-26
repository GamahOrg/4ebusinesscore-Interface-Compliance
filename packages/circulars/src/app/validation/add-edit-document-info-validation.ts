import {
    object,
    string,
    InferType,
    number
  } from "yup";
  
  export const AddEditDocumentInfoSchema = object({
    documentNumber:number().required("InputFieldIsRequried").typeError("YouMustEnterNumber"),
    accreditationDate: string().required("InputFieldIsRequried"),
    issuer:string().required("InputFieldIsRequried"),
    documentClass:string().required("InputFieldIsRequried"),
    enforcement: string().required("InputFieldIsRequried"),
    source: string().required("InputFieldIsRequried"),
    editionNumber: number().required("InputFieldIsRequried").typeError("YouMustEnterNumber"),
    editionDate: string().required("InputFieldIsRequried"),
    documentAbout: string().required("InputFieldIsRequried"),
  });
  
  export type AddEditDocumentInfoProps = InferType<typeof AddEditDocumentInfoSchema>;
  