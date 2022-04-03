import React from "react";
import { useDispatch } from "react-redux";
import { getMe } from "../../../api/user";

export const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch()
  
  React.useEffect(() => {
    getMe()
  }, [dispatch]);

  return children;
};
