import {
    object,
    string,
    InferType,
  } from "yup";
  
  export const AddExternalBoardMemberSchema = object({
    fullName: string().required("InputFieldIsRequried"),
    email: string()
      .notRequired(),

    job:string().required("InputFieldIsRequried"),
    destinationName:string().required("InputFieldIsRequried"),
    memberword:string().notRequired(),
    lkPositionId:string().required("InputFieldIsRequried"),
    startDate: string().notRequired(),

  endDate: string()
    .notRequired()
  });
  
  export type AddExternalBoardMemberProps = InferType<typeof AddExternalBoardMemberSchema>;
  