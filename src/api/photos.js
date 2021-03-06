import axios from "axios";
import { handleError } from "../services/errors/handleError";

export const updatePhotos = async (photos, url) => {
  const formData = new FormData();
  photos.forEach((file) => {
    formData.append("multi-files", file.file, file.file.name);
  });
  photos = formData;
  return await axios
    .post(url, formData, {
      withCredentials: true,
      headers: { "Content-type": "multipart/form-data" },
    })
    .catch((e) => {
      handleError(e);
    });
};
