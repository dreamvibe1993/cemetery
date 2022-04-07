import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { DropDown, FadeIn } from "../../../configs/css/animations";
import { ServiceButton } from "../../css/sc-components/ScComponents";

import { localStorageFields } from "../../../configs/local-storage/fields";
import { Logo } from "../../App/Logo/Logo";
import { ColorTheme } from "../../HOCs/AuthWrapper/AuthWrapper";
import { deviceMax } from "../../../configs/css/breakpoints";

export const GreetingsScreen = ({ onClose = () => {} }) => {
  let navigate = useNavigate();
  const { colorSet } = React.useContext(ColorTheme);

  const [animation, setAnimation] = React.useState(0);

  const redirectToAuth = (e) => {
    navigate("/auth");
  };

  const redirectToAbout = () => {
    navigate("/about");
  };

  const animationOut = () => {
    setAnimation(1);
    localStorage.setItem(localStorageFields.isFirstTimeLaunched, false);
    onClose();
  };

  return (
    <FixedCont onClick={animationOut}>
      <CloseButtonWrapper>
        <ServiceButton onClick={animationOut}>CLOSE</ServiceButton>
      </CloseButtonWrapper>
      <GreetingModal animation={animation}>
        <Logo color={colorSet.primary.hex} />
        <Announcement>
          <br />
          &nbsp;
          <br />
          Our dead are never dead to us until we have forgotten them.
        </Announcement>
        <Buttons>
          <ServiceButton onClick={redirectToAuth}>
            LOGIN / CREATE ACCOUNT
          </ServiceButton>
          <ServiceButton onClick={redirectToAbout}>ABOUT</ServiceButton>
        </Buttons>
      </GreetingModal>
    </FixedCont>
  );
};

const CloseButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;

const GreetingModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  animation: ${FadeIn} 1s ease-in-out forwards;
`;

const Announcement = styled.span`
  font-size: 28px;
  flex: 1;
  margin-bottom: 50px;
  color: ${(p) => p.theme.primary.hex};
  @media ${deviceMax.mobileL} {
    display: block;
    width: 100%;
  }
`;

const FixedCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999 !important;
  background-color: ${(p) => p.theme.contrastB.rgba(0.9)};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  & > * {
    &:not(:last-child) {
      margin-bottom: 20px;
    }
  }
`;
