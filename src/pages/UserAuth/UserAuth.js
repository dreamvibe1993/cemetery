import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { createUser, logInUser, logOutUser } from "../../api/user";
import { Preloader } from "../../components/Preloader";
import { ReactComponent as Logo } from "../../media/svg/logo.svg";
import { loginSchema, regSchema } from "../../models/yup/yup-schemas";
import { setUserAuth } from "../../redux/user/userReducer";

export const UserAuth = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isSignInOpen, setSignInOpen] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

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

  const closeSignInSection = () => {
    setSignInOpen(true);
  };

  const createUserAcc = () => {
    const toValidate = {
      regPass: regPass,
      regUsername: regUName,
      regEmail: regEmail,
    };
    regSchema
      .validate(toValidate)
      .then((val) => {
        createUser(regEmail, regPass, regUName).then(() => {
          closeSignInSection();
        });
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        setError(err.path);
        setErrorM(err.message);
      });
  };

  const logIn = () => {
    const toValidate = {
      loginPass: logPass,
      loginEmail: logEmail,
    };
    loginSchema
      .validate(toValidate)
      .then((val) => {
        dispatch(setUserAuth(null));
        logInUser(logEmail, logPass);
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        setError(err.path);
        setErrorM(err.message);
      });
  };

  const logOut = () => {
    dispatch(setUserAuth(null));
    logOutUser();
  };

  if (isAuth === null) {
    return (
      <ContentContainer>
        <UserAuthContainer>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <Preloader />
        </UserAuthContainer>
      </ContentContainer>
    );
  }

  if (isAuth === true)
    return (
      <ContentContainer>
        <UserAuthContainer>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <Title>Hey {user.username}!</Title>
          <LOGOUT onClick={logOut}>LOGOUT</LOGOUT>
        </UserAuthContainer>
      </ContentContainer>
    );

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
        <LOGIN onClick={logIn}>LOGIN</LOGIN>
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
        <SIGNIN onClick={isSignInOpen ? createUserAcc : openSignInSection}>
          CREATE AN ACCOUNT
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
  cursor: pointer;
  &:active {
    background-color: #1d8491;
  }
`;

const LOGIN = styled(Button)`
  margin-top: 20px;
`;
const SIGNIN = styled(Button)`
  margin-top: 20px;
`;

const LOGOUT = styled(Button)`
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
