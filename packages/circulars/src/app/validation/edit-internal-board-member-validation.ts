import { object, string, InferType } from "yup";

export const EditInternalBoardMemberSchema = object({
  userId: string().required("InputFieldIsRequried"),
  lkPositionId: string().required("InputFieldIsRequried"),
  memberword:string().notRequired(),
  startDate: string().notRequired(),

  endDate: string()
    .notRequired()

});

export type EditInternalBoardMemberProps = InferType<
  typeof EditInternalBoardMemberSchema
>;
