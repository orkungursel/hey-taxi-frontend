import * as yup from "yup";

export const emailValidator = yup
  .string()
  .email("Invalid email address")
  .required("Required");

export const passwordValidator = yup
  .string()
  .required("Required")
  .min(6, "Password is too short - should be 6 chars minimum.")
  .max(50, "Password is too long - should be 50 chars maximum.");
