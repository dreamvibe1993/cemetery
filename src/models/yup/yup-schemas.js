import * as yup from "yup";

//сообщения писать в required

export const graveSchema = yup.object().shape({
  photos: yup
    .array()
    .min(1, "Please add a photo.")
    .max(4, "Please delete some pictures. Max number is 4."),
  lastWords: yup
    .string()
    .max(32, "Maximum length is 32. Please be more brief."),
  died: yup.date().required(),
  born: yup.date().required(),
  name: yup.string().required().min(2),
});

export const giftSchema = yup.object().shape({
  name: yup.string().required("name is requred").min(2).max(15),
  gift: yup.string("choose a gift please").required("choose a gift please"),
  wish: yup.string().max(30),
});

export const loginSchema = yup.object().shape({
  email: yup.string().email().required("Email is strongly required"),
  password: yup
    .string()
    .required("Password is strongly required!")
    .min(8, "Minimum length is 8 symbols."),
});

export const regSchema = yup.object().shape({
  passwordConfirm: yup
    .string()
    .required("Please confirm your password")
    .min(8, "Minimum length is 8 symbols.")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  password: yup
    .string()
    .required("Password is strongly required!")
    .min(8, "Minimum length is 8 symbols."),
  email: yup.string().email().required("Email is strongly required"),
  name: yup
    .string()
    .required("Please provide us your name.")
    .max(10, "10 symbols is maximum."),
});
