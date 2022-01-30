import * as yup from "yup";

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
  name: yup.string().required().min(2).max(15),
  gift: yup.string().required(),
  wish: yup.string().required().min(2).max(30),
});
