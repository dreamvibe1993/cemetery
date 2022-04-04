import React from "react";
import styled from "styled-components/macro";
import { createMyProfile } from "../../../api/user";

import { ServiceButton } from "../../../components/css/sc-components/ScComponents";
import { regSchema } from "../../../models/yup/yup-schemas";
import { showError } from "../../../services/errors/showError";

export const SignIn = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isSignInOpen, setSignInOpen] = React.useState(false);

  const openSignInSection = () => {
    setSignInOpen(true);
  };

  const closeSignInSection = () => {
    setSignInOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  };

  const handleUsernameInput = (e) => {
    setError("");
    setName(e.target.value);
  };
  const handleEmailInput = (e) => {
    setError("");
    setEmail(e.target.value);
  };
  const handlePasswordInput = (e) => {
    setError("");
    setPassword(e.target.value);
  };
  const handlePasswordConfirmInput = (e) => {
    setError("");
    setPasswordConfirm(e.target.value);
  };

  const createUserAcc = (e) => {
    e.preventDefault();
    const toValidate = {
      name,
      email,
      password,
      passwordConfirm,
    };
    regSchema
      .validate(toValidate)
      .then(() => {
        createMyProfile(name, email, password, passwordConfirm).then(() => {
          closeSignInSection();
        });
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        setError(err.path);
        setErrorMessage(err.message);
        showError(err);
      });
  };

  return (
    <Form onSubmit={(e) => createUserAcc(e)}>
      <SignInSection open={isSignInOpen}>
        <RelativeWrap>
          <LoginInput
            type="text"
            placeholder="username"
            required
            value={name}
            onChange={(e) => handleUsernameInput(e)}
            err={error === "name"}
          ></LoginInput>
          {error === "name" && <ErrMessage>{errorMessage}</ErrMessage>}
        </RelativeWrap>
        <RelativeWrap>
          <LoginInput
            type="email"
            placeholder="e-mail"
            required
            value={email}
            onChange={(e) => handleEmailInput(e)}
            err={error === "email"}
          ></LoginInput>
          {error === "email" && <ErrMessage>{errorMessage}</ErrMessage>}
        </RelativeWrap>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="password"
            required
            value={password}
            onChange={(e) => handlePasswordInput(e)}
            err={error === "password"}
          ></PasswordInput>
          {error === "password" && <ErrMessage>{errorMessage}</ErrMessage>}
        </RelativeWrap>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="confirm your password"
            required
            value={passwordConfirm}
            onChange={(e) => handlePasswordConfirmInput(e)}
            err={error === "passwordConfirm"}
          ></PasswordInput>
          {error === "passwordConfirm" && (
            <ErrMessage>{errorMessage}</ErrMessage>
          )}
        </RelativeWrap>
      </SignInSection>
      <SIGNIN
        type={isSignInOpen ? "submit" : "button"}
        onClick={openSignInSection}
      >
        CREATE AN ACCOUNT
      </SIGNIN>
    </Form>
  );
};

const Form = styled.form``;

const SignInSection = styled.div`
  transition: height 0.3s linear, padding-top 0.3s linear,
    opacity 0.3s 0.4s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${(p) => (p.open ? "40px" : "0px")};
  height: ${(p) => (p.open ? "280px" : "0px")};
  opacity: ${(p) => (p.open ? "1" : "0")};
  overflow: hidden;
`;

const RelativeWrap = styled.div`
  position: relative;
  width: auto;
`;

const ErrMessage = styled.span`
  position: absolute;
  bottom: 2px;
  left: 10px;
  font-size: 12px;
  color: ${p => p.theme.error.rgba(1)};;
`;

const SIGNIN = styled(ServiceButton)`
  margin: 0 auto;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 430px;
  height: 40px;
  background-color: ${p => p.theme.contrastB.rgba(0.2)};
  border: none;
  margin-bottom: 20px;
  padding: 5px 10px;
  color: ${p => p.theme.textColor.hex};
  font-size: 16px;
  border: 1px solid ${(p) => (p.err ? p.theme.error.rgba(1) : "none")};
`;

const PasswordInput = styled(Input)``;

const LoginInput = styled(Input)``;
