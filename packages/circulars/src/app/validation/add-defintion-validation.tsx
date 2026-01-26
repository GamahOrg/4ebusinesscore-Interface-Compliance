import { object, string, InferType } from "yup";

export const AddDefintionSchema = object({
  description: string().notRequired(),
  slogan: string().notRequired(),
});

export type AddDefintionsProps = InferType<typeof AddDefintionSchema>;
