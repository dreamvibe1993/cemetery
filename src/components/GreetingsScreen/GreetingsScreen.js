import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { DropDown } from "../css/animations";
import { ServiceButton } from "../css/sc-components/ScComponents";

import { ReactComponent as Logo } from "../../media/svg/logo.svg";

export const GreetingsScreen = ({ onClose = () => {} }) => {
  let navigate = useNavigate();

  const [animation, setAnimation] = React.useState(0);
  const timerID = React.useRef(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(timerID.current);
    };
  }, []);

  const redirectToAuth = (e) => {
    navigate("/auth");
  };

  const animationOut = () => {
    setAnimation(1);
    timerID.current = setTimeout(() => {
      onClose();
    }, 700);
  };

  return (
    <FixedCont onClick={animationOut}>
      <GreetingModal animation={animation}>
        <Logo />
        <Announcement>
          <br />
          &nbsp;
          <br />
          Для продолжения, нажми в любое место.
        </Announcement>
        <ServiceButton onClick={redirectToAuth}>LOGIN / CREATE ACCOUNT</ServiceButton>
      </GreetingModal>
    </FixedCont>
  );
};

const GreetingModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${DropDown} 0.7s ease-in-out
    ${(p) => p.animation === 1 && "reverse"};
`;

const Announcement = styled.span`
  font-size: 28px;
  flex: 1;
  margin-bottom: 50px;
`;

const FixedCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999 !important;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
`;
