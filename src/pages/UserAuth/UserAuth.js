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
  const [errorM, setErrorM] = React.useState("");

  const handleLoginEmailInput = (e) => {
    console.log(e.target.value);
    setError("");
    setLogEmail(e.target.value);
  };
  const handleLoginPasswordInput = (e) => {
    console.log(e.target.value);
    setError("");
    setLogPass(e.target.value);
  };
  const handleRegUsernameInput = (e) => {
    console.log(e.target.value);
    setError("");
    setRegUName(e.target.value);
  };
  const handleRegEmailInput = (e) => {
    console.log(e.target.value);
    setError("");
    setRegEmail(e.target.value);
  };
  const handleRegPasswordInput = (e) => {
    console.log(e.target.value);
    setError("");
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
        setErrorM(err.message);
        console.log(JSON.stringify(err, null, 1));
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
        <RelativeWrap>
          <LoginInput
            type="email"
            placeholder="e-mail"
            required
            onChange={(e) => handleLoginEmailInput(e)}
            err={error === "loginEmail"}
          ></LoginInput>
          {error === "loginEmail" && <ErrMessage>{errorM}</ErrMessage>}
        </RelativeWrap>
        <RelativeWrap>
          <PasswordInput
            type="password"
            placeholder="password"
            required
            onChange={(e) => handleLoginPasswordInput(e)}
            err={error === "loginPass"}
          ></PasswordInput>
          {error === "loginPass" && <ErrMessage>{errorM}</ErrMessage>}
        </RelativeWrap>
        <LOGIN>LOGIN</LOGIN>
        <SignInSection open={isSignInOpen}>
          <RelativeWrap>
            <LoginInput
              type="text"
              placeholder="username"
              required
              onChange={(e) => handleRegUsernameInput(e)}
              err={error === "regUsername"}
            ></LoginInput>
            {error === "regUsername" && <ErrMessage>{errorM}</ErrMessage>}
          </RelativeWrap>
          <RelativeWrap>
            <LoginInput
              type="email"
              placeholder="e-mail"
              required
              onChange={(e) => handleRegEmailInput(e)}
              err={error === "regEmail"}
            ></LoginInput>
            {error === "regEmail" && <ErrMessage>{errorM}</ErrMessage>}
          </RelativeWrap>
          <RelativeWrap>
            <PasswordInput
              type="password"
              placeholder="password"
              required
              onChange={(e) => handleRegPasswordInput(e)}
              err={error === "regPass"}
            ></PasswordInput>
            {error === "regPass" && <ErrMessage>{errorM}</ErrMessage>}
          </RelativeWrap>
        </SignInSection>
        <SIGNIN onClick={isSignInOpen ? signInUser : openSignInSection}>
          SIGN IN
        </SIGNIN>
      </UserAuthContainer>
    </ContentContainer>
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
