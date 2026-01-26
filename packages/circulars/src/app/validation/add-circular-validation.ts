import { object, string, InferType, number } from "yup";

export const AddCircularSchema = object({
  Name: string().required("InputFieldIsRequried"),
  Number: number().typeError("MustBeNumber").required("InputFieldIsRequried"),
  Approval: string().required("InputFieldIsRequried"),
  Attachments:string().notRequired(),
  FromDate: string()
    .nullable()
    .required("InputFieldIsRequried")
    .typeError("InputFieldIsRequried"),
  ToDate: string()
    .nullable()
    .notRequired()
    .test({
      name: "ToDate",
      message: "ToDateMustBeAfterFromDate",
      test: function (value: any) {
        if (this.parent.ToDate) {
          let fromDate = new Date(this.parent.FromDate);
          let toDate = new Date(value);
          return toDate?.getTime() >= fromDate?.getTime();
        } else {
          return true;
        }
      },
    }),
  Details: string().notRequired(),
});

export type AddCircularProps = InferType<typeof AddCircularSchema>;
