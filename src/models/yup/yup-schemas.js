import * as yup from "yup";

//сообщения писать в required

export const graveSchema = yup.object().shape({
  name: yup.string().required().min(2),
  born: yup.date().required(),
  died: yup.date().required(),
  lastWords: yup.string().max(32, "максимум 32 буквы. давай лаконичнее"),
  photos: yup
    .array()
    .min(1, "добавь фотку а")
    .max(
      4,
      "воу паринь палехче у меня нет стока денек чтобы хранить всё это фотографическое искусство. удаляй пока не станет 4"
    ),
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
