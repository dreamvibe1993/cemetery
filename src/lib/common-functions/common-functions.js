import imageCompression from "browser-image-compression";

export const userToModel = (userData) => {
  userData.born = returnDDMMYYYY(userData?.born);
  userData.died = returnDDMMYYYY(userData?.died);
  return userData;
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
    console.trace(e)
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
