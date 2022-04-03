import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { getMe, logOutMe } from "../../api/user";

import { ReactComponent as Logo } from "../../media/svg/logo-2.svg";
import { ReactComponent as Cross } from "../../media/svg/cross.svg";

import { Preloader } from "../../components/App/Preloader";
import { ServiceButton } from "../../components/css/sc-components/ScComponents";
import { setUserAuth, setUserLoading } from "../../redux/user/userReducer";
import { Navigate } from "react-router-dom";
import { SignIn } from "./SignIn";
import { LogIn } from "./LogIn/LogIn";
import { FadeIn } from "../../configs/css/animations";
import { FPassEmailModal } from "../../components/Modals/FPassEmailModal";
import { colors } from "../../configs/css/colors";

export const UserAuth = () => {
  const { isAuth, user } = useSelector((state) => state.user);
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
`;

const Title = styled.span`
  font-size: 36px;
  margin-bottom: 20px;
`;

const UserAuthContainer = styled.div`
  padding: 40px 20px;
  width: 900px;
  margin: 10px auto;
  background-color: ${colors.primary.hex};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  border: 1px solid #000;
`;
