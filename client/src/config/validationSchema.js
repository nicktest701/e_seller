import { number, object, string } from "yup";

export const waecValidationSchema = () => {
  return object().shape({
    categoryType: object().shape({
      voucherType: string().required("Required*"),
    }),
    quantity: number()
      .required("Required*")
      .max(1000, "Max Quantity is 1000")
      .min(1, "Quantity should be 1 or more!"),
    email: string().trim().required("Required*").email("Invalid email address"),
    phoneNumber: string()
      .trim()
      .required("Required*")
      .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  });
};

export const universityValidationSchema = () => {
  return object().shape({
    categoryType: object().shape({
      voucherType: string().required("Required*"),
    }),
    quantity: number()
      .required("Required*")
      .max(1000, "Max Quantity is 1000")
      .min(1, "Quantity should be 1 or more!"),
    fullName: string().trim().required("Required*"),
    email: string().trim().required("Required*").email("Invalid email address"),
    phoneNumber: string()
      .trim()
      .required("Required*")
      .matches(/^(\+\d{1,3})?\(?\d{3}\)?\d{3}\d{4}$/, "Invalid Phone number"),
  });
};
