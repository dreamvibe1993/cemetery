export const userToModel = (userData) => {
  userData.born = returnDDMMYYYY(userData.born);
  userData.died = returnDDMMYYYY(userData.died);
  return userData;
};

export const returnDDMMYYYY = (date) => {
  if (!date) return;
  let options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };
  let formatted = new Date(date).toLocaleDateString("ru-RU", options);
  return formatted;
};
