import React from "react";
import styled from "styled-components/macro";
import StonePattern from "../../media/img/grave/stone-p-2.png";
import UserPic from "../../media/img/common/user_photo.png";
import { colors } from "../../configs/css/colors";

export const Grave = () => {
  return (
    <GraveCont>
      <UserPhoto src={UserPic} />
    </GraveCont>
  );
};

const UserPhoto = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const GraveCont = styled.div`
  background-color: ${colors.secondaryB.rgba(.3)};
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  /* background: url(${StonePattern}) repeat; */
  overflow: hidden;
  background-size: 60px 60px;
  box-shadow: 1px 1px 40px 5px rgba(0, 0, 0, 0.1);
`;
