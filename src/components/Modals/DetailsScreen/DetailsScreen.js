import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";
import { ServiceButton } from "../../css/sc-components/ScComponents";
import { ReactComponent as Logo } from "../../../media/svg/logo-2.svg";

export const DetailsScreen = ({ onClose = () => {} }) => {
  let navigate = useNavigate();

  const redirectToAuth = (e) => {
    navigate("/auth");
  };

  return (
    <FixedCont onClick={onClose}>
      <TipsContainer>
        <Announcement>
          Здесь будет раздел с разными подсказами, помощью и так далее.
        </Announcement>
        <br />
        &nbsp;
        <br />
        <Announcement>
          Не знаешь как? Найдешь ответ здесь.
        </Announcement>
        <br />
        &nbsp;
        <br />{" "}
        <Announcement>
          А пока можешь залогиниться или зарегаться...
        </Announcement>
        <br />
        &nbsp;
        <br />
        <ServiceButton onClick={(e) => redirectToAuth(e)}>AUTH</ServiceButton>
      </TipsContainer>
    </FixedCont>
  );
};

const TipsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Announcement = styled.span`
  font-size: 28px;
  flex: 1;
`;

const FixedCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999 !important;
  background-color: ${p => p.theme.contrastB.rgba(0.7)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 40px;
`;
