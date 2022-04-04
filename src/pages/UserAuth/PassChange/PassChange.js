import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import styled from "styled-components/macro";
import { resetPassword } from "../../../api/user";

import { ServiceButton } from "../../../components/css/sc-components/ScComponents";
import { routes } from "../../../configs/urls/app/app-urls";
import { passChangeSchema } from "../../../models/yup/yup-schemas";
import { setNotification } from "../../../redux/app/appReducer";
import { showError } from "../../../services/errors/showError";

export const PassChange = () => {
  const dispatch = useDispatch();
  const [newPassword, setNewPassword] = React.useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = React.useState("");

  const [error, setError] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [token, setToken] = React.useState(null);
  const [redirect, setRedirect] = React.useState(null);

  const handleNewPasswordInput = (e) => {
    setError("");
    setNewPassword(e.target.value);
  };
  const handleNewPasswordConfirmInput = (e) => {
    setError("");
    setNewPasswordConfirm(e.target.value);
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resetToken = params.get("token");
    if (resetToken) setToken(resetToken);
    else setRedirect(routes.auth.origin);
  }, []);

  const changeUserPassword = () => {
    const toValidate = { newPassword, newPasswordConfirm };
    passChangeSchema
      .validate(toValidate)
      .then((validated) => {
        resetPassword({
          password: validated.newPassword,
          passwordConfirm: validated.newPasswordConfirm,
          token,
        }).then(() => {
          dispatch(
            setNotification({
              text: "Password has been changed successfuly! Please log in!",
              withOptions: false,
            })
          );
          setRedirect("/auth");
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

  if (redirect) return <Navigate to={redirect} />;

  return (
    <>
      <PassChangeSection open={true}>
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
  color: ${p => p.theme.error.rgba(1)};;
`;

const CHANGE = styled(ServiceButton)`
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
  border: ${(p) => (p.err ? "1px solid rgba(168, 50, 50,.9)" : "none")};
`;

const PasswordInput = styled(Input)``;
