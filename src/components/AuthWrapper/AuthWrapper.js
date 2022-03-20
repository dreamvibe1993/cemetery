import React from "react";
import { getUser } from "../../api/user";

export const AuthWrapper = ({ children }) => {
  
  React.useEffect(() => {
    getUser();
  }, []);

  return children;
};
