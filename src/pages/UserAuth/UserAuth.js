import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { getMe, logOutMe } from "../../api/user";

import { ReactComponent as Cross } from "../../media/svg/cross.svg";

import { Preloader } from "../../components/App/Preloader";
import { ServiceButton } from "../../components/css/sc-components/ScComponents";
import { setUserAuth } from "../../redux/user/userReducer";
import { Navigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { LogIn } from "./LogIn/LogIn";
import { FadeIn } from "../../configs/css/animations";
import { FPassEmailModal } from "../../components/Modals/FPassEmailModal";
import { Logo } from "../../components/App/Logo/Logo";
import { deviceMax } from "../../configs/css/breakpoints";

export const UserAuth = () => {
  const { isAuth, user, isUserLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = React.useState("");
  const [isForgotPass, setForgotPass] = React.useState(false);
  const [isEmailModalShown, setEmailModalShown] = React.useState(false);

  const logOut = () => {
    dispatch(setUserAuth(null));
    logOutMe();
  };

  const redirectToHome = () => {
    setRedirect("/");
  };

  React.useEffect(() => {
    getMe();
  }, [dispatch]);

  const showForgotPassButton = () => {
    setForgotPass(true);
  };

  const summonEmailModal = () => {
    setEmailModalShown(true);
  };

  const closeEmailModal = () => {
    setEmailModalShown(false);
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isAuth === null) {
    return <Preloader />;
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
      {isEmailModalShown && <FPassEmailModal onClose={closeEmailModal} />}
      <UserAuthContainer>
        <CrossSVGWrapper>
          <Cross onClick={redirectToHome} />
        </CrossSVGWrapper>
        {isForgotPass && (
          <ForgotPassWrapper>
            <ServiceButton onClick={summonEmailModal}>
              I FORGOT MY PASSWORD
            </ServiceButton>
          </ForgotPassWrapper>
        )}
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Title>Not authorized yet?</Title>
        <LogIn onForgotPassword={showForgotPassButton} />
        <SignIn />
      </UserAuthContainer>
    </ContentContainer>
  );
};

const ForgotPassWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 20px;
  animation: ${FadeIn} 0.2s linear forwards;
  @media ${deviceMax.mobileL} {
    left: unset;
    button {
      width: 70px;
      padding: 0px;
    }
  }
`;

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
  animation: ${FadeIn} 0.2s linear forwards;
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
  @media ${deviceMax.tablet} {
    width: 22%;
  }
`;

const Title = styled.span`
  font-size: 36px;
  margin-bottom: 20px;
  @media ${deviceMax.mobileL} {
    font-size: 24px;
  }
`;

const UserAuthContainer = styled.div`
  padding: 40px 20px;
  width: 900px;
  margin: 10px auto;
  background-color: ${(p) => p.theme.primary.hex};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  border: 1px solid ${p => p.theme.contrastB.hex};
  @media ${deviceMax.mobileL} {
    width: calc(100vw - 20px);
    padding: 20px 0px;
  }
  @media ${deviceMax.tablet} {
    width: calc(100vw - 20px);
    padding: 20px 0px;
  }
`;
