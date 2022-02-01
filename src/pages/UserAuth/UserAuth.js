import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as Logo } from "../../media/svg/logo.svg";
import { regSchema } from "../../models/yup/yup-schemas";

export const UserAuth = () => {
  const [isSignInOpen, setSignInOpen] = React.useState(false);

  const [logEmail, setLogEmail] = React.useState("");
  const [logPass, setLogPass] = React.useState("");

  const [regEmail, setRegEmail] = React.useState("");
  const [regPass, setRegPass] = React.useState("");
  const [regUName, setRegUName] = React.useState("");

  const [error, setError] = React.useState("");

  const handleLoginEmailInput = (e) => {
    console.log(e.target.value);
    setLogEmail(e.target.value);
  };
  const handleLoginPasswordInput = (e) => {
    console.log(e.target.value);
    setLogPass(e.target.value);
  };
  const handleRegUsernameInput = (e) => {
    console.log(e.target.value);
    setRegUName(e.target.value);
  };
  const handleRegEmailInput = (e) => {
    console.log(e.target.value);
    setRegEmail(e.target.value);
  };
  const handleRegPasswordInput = (e) => {
    console.log(e.target.value);
    setRegPass(e.target.value);
  };

  const openSignInSection = () => {
    setSignInOpen(true);
  };

  const signInUser = () => {
    const toValidate = {
      regPass: regPass,
      regUsername: regUName,
      regEmail: regEmail,
    };
    regSchema
      .validate(toValidate)
      .then((val) => {
        console.log(val);
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        setError(err.path);
        console.log(err.path);
      });
    console.log("signin");
  };

  return (
    <ContentContainer>
      <UserAuthContainer>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Title>Not authorized yet?</Title>
        <LoginInput
          type="email"
          placeholder="e-mail"
          required
          onChange={(e) => handleLoginEmailInput(e)}
          err={error === "loginEmail"}
        ></LoginInput>
        <PasswordInput
          type="password"
          placeholder="password"
          required
          onChange={(e) => handleLoginPasswordInput(e)}
          err={error === "loginPass"}
        ></PasswordInput>
        <LOGIN>LOGIN</LOGIN>
        <SignInSection open={isSignInOpen}>
          <LoginInput
            type="text"
            placeholder="username"
            required
            onChange={(e) => handleRegUsernameInput(e)}
            err={error === "regUsername"}
          ></LoginInput>
          <LoginInput
            type="email"
            placeholder="e-mail"
            required
            onChange={(e) => handleRegEmailInput(e)}
            err={error === "regEmail"}
          ></LoginInput>
          <PasswordInput
            type="password"
            placeholder="password"
            required
            onChange={(e) => handleRegPasswordInput(e)}
            err={error === "regPass"}
          ></PasswordInput>
        </SignInSection>
        <SIGNIN onClick={isSignInOpen ? signInUser : openSignInSection}>
          SIGN IN
        </SIGNIN>
      </UserAuthContainer>
    </ContentContainer>
  );
};

const SignInSection = styled.div`
  transition: height 0.3s linear, padding-top 0.3s linear,
    opacity 0.3s 0.4s linear;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: ${(p) => (p.open ? "40px" : "0px")};
  height: ${(p) => (p.open ? "220px" : "0px")};
  opacity: ${(p) => (p.open ? "1" : "0")};
  overflow: hidden;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 33%;
  height: 40px;
  background-color: #23a0b0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #fff;
  border: none;
`;

const LOGIN = styled(Button)`
  margin-top: 20px;
`;
const SIGNIN = styled(Button)`
  margin-top: 20px;
`;

const Input = styled.input`
  width: 50%;
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

const LogoWrapper = styled.div`
  width: 33%;
  margin-bottom: 20px;
  svg {
    height: 100%;
    width: 100%;
  }
`;

const Title = styled.span`
  font-size: 36px;
  margin-bottom: 20px;
`;

const UserAuthContainer = styled.div`
  padding: 40px 20px;
  width: 900px;
  margin: 10px auto;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
