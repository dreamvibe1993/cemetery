import React from "react";
import styled from "styled-components/macro";
import { createUser } from "../../../api/user";

import { ServiceButton } from "../../../components/css/sc-components/ScComponents";
import { passChangeSchema } from "../../../models/yup/yup-schemas";
import { showError } from "../../../services/errors/showError";

export const PassChange = () => {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const handleCurrentPasswordInput = (e) => {
    setError("");
    setCurrentPassword(e.target.value);
  };
  const handleNewPasswordInput = (e) => {
    setError("");
    setNewPassword(e.target.value);
  };
  const handleNewPasswordConfirmInput = (e) => {
    setError("");
    setNewPasswordConfirm(e.target.value);
  };

  const changeUserPassword = () => {
    const toValidate = { currentPassword, newPassword, newPasswordConfirm };
    passChangeSchema
      .validate(toValidate)
      .then((validated) => {
        // createUser(validated).then(
        //   () => {}
        // );
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
      <PassChangeSection open={true}>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="current password"
            required
            value={currentPassword}
            onChange={(e) => handleCurrentPasswordInput(e)}
            err={error === "password"}
          ></PasswordInput>
          {error === "password" && <ErrMessage>{errorMessage}</ErrMessage>}
        </RelativeWrap>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="new password"
            required
            value={newPassword}
            onChange={(e) => handleNewPasswordInput(e)}
            err={error === "password"}
          ></PasswordInput>
          {error === "password" && <ErrMessage>{errorMessage}</ErrMessage>}
        </RelativeWrap>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="confirm your new password"
            required
            value={newPasswordConfirm}
            onChange={(e) => handleNewPasswordConfirmInput(e)}
            err={error === "passwordConfirm"}
          ></PasswordInput>
          {error === "passwordConfirm" && (
            <ErrMessage>{errorMessage}</ErrMessage>
          )}
        </RelativeWrap>
      </PassChangeSection>
      <CHANGE onClick={changeUserPassword}>CHANGE</CHANGE>
    </>
  );
};

const PassChangeSection = styled.div`
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

const CHANGE = styled(ServiceButton)`
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
