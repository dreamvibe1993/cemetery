import React from "react";
import styled from "styled-components/macro";
import { deviceMax } from "../../../configs/css/breakpoints";

export const Grave = ({grave}) => {
  return (
    <GraveCont>
      <UserPhoto src={grave.photos[0]} crossOrigin="anonymous"/>
    </GraveCont>
  );
};

const UserPhoto = styled.img`
  object-fit: cover;  
  width: 100%;
  height: 100%;
`;

const GraveCont = styled.div`
  background-color: ${p => p.theme.secondaryB.rgba(.3)};
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  overflow: hidden;
  background-size: 60px 60px;
  border: 1px solid ${p => p.theme.contrastB.hex};
  @media ${deviceMax.mobileL} {
    padding: 0;
  }
`;
