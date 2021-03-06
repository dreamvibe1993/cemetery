import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { logInMe } from "../../../api/user";

import {
  Input,
  ServiceButton,
} from "../../../components/css/sc-components/ScComponents";
import { setUserAuth } from "../../../redux/user/userReducer";
import { loginSchema } from "../../../models/yup/yup-schemas";
import { showError } from "../../../services/errors/showError";
import { deviceMax } from "../../../configs/css/breakpoints";

export const LogIn = ({ onForgotPassword = () => {} }) => {
  const { notification } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [error, setError] = React.useState("");
  const [errorM, setErrorM] = React.useState("");

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    if (notification.text) onForgotPassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notification]);

  const handleEmailInput = (e) => {
    setError("");
    setEmail(e.target.value);
  };

  const handlePasswordInput = (e) => {
    setError("");
    setPassword(e.target.value);
  };

  const logIn = (e) => {
    e.preventDefault();
    const toValidate = {
      email,
      password,
    };
    loginSchema
      .validate(toValidate)
      .then(async (val) => {
        dispatch(setUserAuth(null));
        logInMe(email, password);
      })
      .catch((err) => {
        onForgotPassword();
        console.error(err);
        console.trace(err);
        setError(err.path);
        setErrorM(err.message);
        showError(err);
      });
  };

  return (
    <Form onSubmit={(e) => logIn(e)}>
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

      <LOGIN type="submit">LOGIN</LOGIN>
    </Form>
  );
};

const Form = styled.form``;

const RelativeWrap = styled.div`
  position: relative;
  width: auto;
  input {
    margin-bottom: 20px;
  }
`;

const ErrMessage = styled.span`
  position: absolute;
  bottom: 2px;
  left: 10px;
  font-size: 12px;
  color: ${p => p.theme.error.rgba(1)};
  @media ${deviceMax.mobileL} {
    width: 120%;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const LOGIN = styled(ServiceButton)`
  margin: 0 auto;
  margin-top: 20px;
`;

const PasswordInput = styled(Input)``;

const LoginInput = styled(Input)``;
