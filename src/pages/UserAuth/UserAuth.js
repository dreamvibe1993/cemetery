import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { createUser, logInUser, logOutUser } from "../../api/user";

import { ReactComponent as Logo } from "../../media/svg/logo.svg";
import { ReactComponent as Cross } from "../../media/svg/cross.svg";

import { Preloader } from "../../components/Preloader";
import { ServiceButton } from "../../components/css/sc-components/ScComponents";
import { loginSchema, regSchema } from "../../models/yup/yup-schemas";
import { setUserAuth } from "../../redux/user/userReducer";
import { Navigate } from "react-router-dom";

export const UserAuth = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isSignInOpen, setSignInOpen] = React.useState(false);

  const [logEmail, setLogEmail] = React.useState("");
  const [logPass, setLogPass] = React.useState("");

  const [regEmail, setRegEmail] = React.useState("");
  const [regPass, setRegPass] = React.useState("");
  const [regUName, setRegUName] = React.useState("");

  const [error, setError] = React.useState("");
  const [errorM, setErrorM] = React.useState("");

  const [redirect, setRedirect] = React.useState("");

  const handleLoginEmailInput = (e) => {
    setError("");
    setLogEmail(e.target.value);
  };
  const handleLoginPasswordInput = (e) => {
    setError("");
    setLogPass(e.target.value);
  };
  const handleRegUsernameInput = (e) => {
    setError("");
    setRegUName(e.target.value);
  };
  const handleRegEmailInput = (e) => {
    setError("");
    setRegEmail(e.target.value);
  };
  const handleRegPasswordInput = (e) => {
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

  const redirectToHome = () => {
    setRedirect("/");
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isAuth === null) {
    return (
      <ContentContainer>
        <UserAuthContainer>
          <CrossSVGWrapper>
            <Cross onClick={redirectToHome} />
          </CrossSVGWrapper>
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
          <CrossSVGWrapper>
            <Cross onClick={redirectToHome} />
          </CrossSVGWrapper>
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
        <CrossSVGWrapper>
          <Cross onClick={redirectToHome} />
        </CrossSVGWrapper>
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

const CrossSVGWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  cursor: pointer;
  svg {
    width: 14px;
  }
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

const LOGIN = styled(ServiceButton)`
  margin-top: 20px;
`;
const SIGNIN = styled(ServiceButton)`
  margin-top: 20px;
`;
const LOGOUT = styled(ServiceButton)`
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
  position: relative;
`;
