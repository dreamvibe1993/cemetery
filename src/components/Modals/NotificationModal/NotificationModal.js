import React from "react";
import styled, { css } from "styled-components/macro";

import { useDispatch, useSelector } from "react-redux";
import { DropDown } from "../../../configs/css/animations";
import { colorsGreen } from "../../../configs/css/colors";
import { ServiceButton } from "../../css/sc-components/ScComponents";
import {
  setAnswerToNotif,
  setNotificationToDefault,
} from "../../../redux/app/appReducer";

export const NotificationModal = ({ children }) => {
  const dispatch = useDispatch();
  const { notification } = useSelector((state) => state.app);

  const handleOptionClick = (meaning) => {
    dispatch(setAnswerToNotif(meaning));
  };

  const handleBackdropClick = () => {
    dispatch(setNotificationToDefault());
  };

  return (
    <>
      <BackdropScreen
        appear={notification.text}
        onClick={handleBackdropClick}
      />
      <Modal appear={notification.text}>
        {notification.text}
        {notification.withOptions && (
          <Buttons>
            {notification.options.map((op, i) => {
              return (
                <ServiceButton
                  key={op + i}
                  onClick={() => handleOptionClick(op.meaning)}
                >
                  {op.text}
                </ServiceButton>
              );
            })}
          </Buttons>
        )}
      </Modal>
      {children}
    </>
  );
};

const BackdropScreen = styled.div`
  transition: opacity 0.4s 0.2s linear, display 0.4s 0.2s linear;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: ${(p) => (p.appear ? 1 : 0)};
  display: ${(p) => (p.appear ? "block" : "none")};
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  & > * {
    font-size: 18px;
  }
`;

const DropDownAnim = css`
  animation: ${DropDown(-250, 10)} 0.3s ease-in-out forwards;
`;

const Modal = styled.div`
  font-size: 20px;
  padding: 20px;
  position: fixed;
  z-index: 1001;
  top: -250px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${colorsGreen.contrastA.hex};
  box-shadow: 0px 2px 5px 5px rgba(0, 0, 0, 0.1);
  ${(p) => p.appear && DropDownAnim}
`;
