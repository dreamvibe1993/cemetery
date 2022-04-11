import React from "react";
import styled from "styled-components/macro";

import QuestionMark from "../../../media/img/common/question-mark.png"

export const RoundUserPic = ({src, onClick = () => {}}) => {
  return (
    <UserPicWrappa onClick={onClick}>
      <UserPic src={src || QuestionMark} crossOrigin="anonymous"/>
    </UserPicWrappa>
  );
};


const UserPic = styled.img`
  object-fit: cover;
  height: 100%;
  width: 100%;
`;

const UserPicWrappa = styled.div`
  height: 40px;
  overflow: hidden;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 0px 0px 2px ${p => p.theme.contrastB.rgba(0.2)};
`;