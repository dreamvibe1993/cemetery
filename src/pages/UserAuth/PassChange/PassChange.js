import React from "react";
import styled from "styled-components/macro";
import { createUser } from "../../../api/user";

import { ServiceButton } from "../../../components/css/sc-components/ScComponents";
import { regSchema } from "../../../models/yup/yup-schemas";
import { showError } from "../../../services/errors/showError";

export const PassChange = () => {
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

  const handlePasswordInput = (e) => {
    setError("");
    setPassword(e.target.value);
  };
  const handlePasswordConfirmInput = (e) => {
    setError("");
    setPasswordConfirm(e.target.value);
  };

  const createUserAcc = () => {
    const toValidate = {
      name,
      email,
      password,
      passwordConfirm,
    };
    regSchema
      .validate(toValidate)
      .then(() => {
        createUser(name, email, password, passwordConfirm).then(() => {
          closeSignInSection();
        });
      })
      .catch((err) => {
        console.log(JSON.parse(JSON.stringify(err)));
        console.error(err);
        console.trace(err);
        setError(err.path);
        setErrorMessage(err.message);
        showError(err);
      });
  };

  return (
    <>
      <SignInSection open={true}>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="current password"
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
            placeholder="new password"
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
            placeholder="confirm your new password"
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
      <SIGNIN onClick={isSignInOpen ? createUserAcc : openSignInSection}>
        CHANGE
      </SIGNIN>
    </>
  );
};

const SignInSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${(p) => (p.open ? "40px" : "0px")};
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
  color: rgba(168, 50, 50, 1);
`;

const SIGNIN = styled(ServiceButton)`
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
