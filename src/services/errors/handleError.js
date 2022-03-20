import { showError } from "./showError";

export const handleError = (e) => {
  console.error(e);
  console.trace(e);
  const error = e?.response?.data || e;
  showError(error);
  throw new Error(error?.message);
};
