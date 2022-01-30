import imageCompression from "browser-image-compression";
import { v4 as uuidv4 } from 'uuid';
import { backModel } from "../../models/backModel";

export const convertToFrontModel = (userData) => {
  for (let key in backModel) {
    if (!userData[key]) {
      userData[key] = backModel[key]
    }
  }

  userData.born = returnDDMMYYYY(userData?.born);
  userData.died = returnDDMMYYYY(userData?.died);
  return userData;
};

export const convertToBackModel = ({ data, photoLinks }) => {
  const converted = {
    born: new Date(data.dateB).toISOString(),
    died: new Date(data.dateD).toISOString(),
    gifts: {
      candies: [],
      btc: [],
      vodka: [],
    },
    chatLogs: [],
    graveCellNum: data.cellN,
    id: uuidv4(),
    lastWords: data.lWords,
    photos: photoLinks,
    name: data.name,
    songs: [data.song]
  };
  for (let key in converted) {
    if(!converted[key]) {
      throw new Error(`Back model is not consistent! No ${key} value provided! JSON: ` + JSON.stringify(converted, null, 1));
    }
  }
  return converted;
};

export const returnDDMMYYYY = (date) => {
  if (!date) date = new Date().toISOString();
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  return new Date(date).toLocaleDateString("ru-RU", options);
};

export const compressPhotos = async (e) => {
  let files = [...e.target.files];
  if (!files.length) return;
  try {
    files = await Promise.all(
      files.map(
        async (item) =>
          await imageCompression(item, {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 900,
            useWebWorker: true,
          })
      )
    );
  } catch (e) {
    alert("35: " + e);
    console.error(e);
    console.trace(e);
  }
  if (!files.length) {
    alert("No photos been compressed");
    return;
  }
  return files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
    id: URL.createObjectURL(file),
  }));
};
