import { object, string, InferType, mixed, array } from "yup";

export const AddRelatedDocumentSchema = object({
  Number: array()
    .of(mixed())
    .notRequired().nullable(),
  Issuer: string().notRequired(),
  Source: string().notRequired(),
  date: string().notRequired(),
});

export type AddRelatedDocumentProps = InferType<
  typeof AddRelatedDocumentSchema
>;
