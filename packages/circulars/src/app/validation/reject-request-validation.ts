import { object, string, InferType, number } from "yup";
export const RejectRequestSchema = object({
  comment: string().required("InputFieldIsRequried"),
});

export type RejectRequestSchema = InferType<typeof RejectRequestSchema>;
