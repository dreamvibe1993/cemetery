import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";
import { logInUser } from "../../../api/user";

import { ServiceButton } from "../../../components/css/sc-components/ScComponents";
import { setUserAuth } from "../../../redux/user/userReducer";
import { loginSchema } from "../../../models/yup/yup-schemas";

export const LogIn = () => {
  const dispatch = useDispatch();

  const [error, setError] = React.useState("");
  const [errorM, setErrorM] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmailInput = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  const logIn = () => {
    const toValidate = {
      email,
      password,
    };
    loginSchema
      .validate(toValidate)
      .then((val) => {
        dispatch(setUserAuth(null));
        logInUser(email, password);
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        setError(err.path);
        setErrorM(err.message);
      });
  };

  return (
    <>
      <RelativeWrap>
        <LoginInput
          type="email"
          placeholder="e-mail"
          required
          onChange={(e) => handleEmailInput(e)}
          err={error === "email"}
        ></LoginInput>
        {error === "email" && <ErrMessage>{errorM}</ErrMessage>}
      </RelativeWrap>
      <RelativeWrap>
        <PasswordInput
          type="password"
          placeholder="password"
          required
          onChange={(e) => handlePasswordInput(e)}
          err={error === "password"}
        ></PasswordInput>
        {error === "password" && <ErrMessage>{errorM}</ErrMessage>}
      </RelativeWrap>

      <LOGIN onClick={logIn}>LOGIN</LOGIN>
    </>
  );
};

const RelativeWrap = styled.div`
  position: relative;
  width: auto;
`;

const ErrMessage = styled.span`
  position: absolute;
  bottom: 2px;
  left: 10px;
  font-size: 12px;
  color: rgba(168, 50, 50, 1);
`;

const LOGIN = styled(ServiceButton)`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 430px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  margin-bottom: 20px;
  padding: 5px 10px;
  color: #fff;
  font-size: 16px;
  border: ${(p) => (p.err ? "1px solid rgba(168, 50, 50,.9)" : "none")};
`;

const PasswordInput = styled(Input)``;

const LoginInput = styled(Input)``;
