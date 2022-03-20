import React from "react";
import styled from "styled-components/macro";
import { getUser } from "../../api/user";

export const AuthWrapper = ({ children }) => {
//   React.useEffect(() => {
//     getUser().then((res) => {
//       console.log(res);
//     });
//   }, []);
  return children;
};
