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
