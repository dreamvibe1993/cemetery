import React from "react";
import styled from "styled-components/macro";

import { ReactComponent as Logo } from "../../media/svg/logo.svg";

export const TutorialModal = ({ onClose = () => {} }) => {
  return (
    <DonateGiftCont onClick={onClose}>
      <Logo />
      <Announcement>

        <br />
        &nbsp;
        <br />
        Для продолжения, нажми в любое место (на мониторе).
      </Announcement>
    </DonateGiftCont>
  );
};

const Announcement = styled.span`
  font-size: 28px;
  flex: 1;
`;

const DonateGiftCont = styled.div`
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
