import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { getUser, logOutUser } from "../../api/user";

import { ReactComponent as Logo } from "../../media/svg/logo.svg";
import { ReactComponent as Cross } from "../../media/svg/cross.svg";

import { Preloader } from "../../components/Preloader";
import { ServiceButton } from "../../components/css/sc-components/ScComponents";
import { setUserAuth } from "../../redux/user/userReducer";
import { Navigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { LogIn } from "./LogIn/LogIn";

export const UserAuth = () => {
  const { isAuth, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = React.useState("");

  const logOut = () => {
    dispatch(setUserAuth(null));
    logOutUser();
  };

  const redirectToHome = () => {
    setRedirect("/");
  };

  React.useEffect(() => {
    getUser();
  }, []);

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
        <LogIn />
        <SignIn />
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

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LOGOUT = styled(ServiceButton)`
  margin-top: 20px;
`;

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
