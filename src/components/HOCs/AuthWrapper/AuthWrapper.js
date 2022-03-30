import React from "react";
import { getMe } from "../../../api/user";

export const AuthWrapper = ({ children }) => {
  
  React.useEffect(() => {
    getMe();
  }, []);

  return children;
};
