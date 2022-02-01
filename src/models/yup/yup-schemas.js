import * as yup from "yup";

//сообщения писать в required

export const graveSchema = yup.object().shape({
  name: yup.string().required().min(2),
  dateB: yup.date().required(),
  dateD: yup.date().required(),
  lWords: yup.string().max(32, "максимум 32 буквы. давай лаконичнее"),
  song: yup.string().required("выбери песню а"),
  pics: yup
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
  loginEmail: yup.string().email().required("email is strongly required"),
  loginPass: yup
    .string()
    .required("password is strongly required")
    .min(5, "need a longer password")
    .max(10, "easy. 5-15 symbols is enough"),
});

export const regSchema = yup.object().shape({
  regPass: yup
    .string()
    .required("password is strongly required")
    .min(5, "need a longer password")
    .max(15, "easy. 5-15 symbols is enough"),
  regUsername: yup
    .string()
    .required("please let us know how to address you")
    .max(10, "easy. 0-10 symbols is enough"),
  regEmail: yup.string().email().required("email is strongly required"),
});
