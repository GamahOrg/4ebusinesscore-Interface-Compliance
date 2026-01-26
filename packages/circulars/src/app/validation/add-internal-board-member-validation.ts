import { object, string, InferType } from "yup";

export const AddInternalBoardMemberSchema = object({
  userId: string().required("InputFieldIsRequried"),
  lkPositionId: string().required("InputFieldIsRequried"),
  memberword:string().notRequired(),
  startDate: string().required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried")
    .test({
      name: "startDate",
      message: "StartDateMustBeBeforeOrEqualToEndDate",
      test: function (value) {
        const endDate = this.parent.endDate;
        const startDate = this.parent.startDate;
        if (!endDate) {
          return true;
        }
        return new Date(startDate) <= new Date(endDate);
      },
    })
    .test({
      name: "startDate",
      message: "StartDateMustBeAfterOrEqualToday",
      test: function (value: any) {
        const today = new Date();
        const startDate = new Date(value);
        const differenceInMillis = startDate.getTime() - today.getTime();
        const differenceInDays = differenceInMillis / (1000 * 60 * 60 * 24);
        return differenceInDays >= -1;
      },
    }),
  endDate: string()
    .notRequired()
});

export type AddInternalBoardMemberProps = InferType<
  typeof AddInternalBoardMemberSchema
>;
