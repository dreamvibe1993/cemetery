import React from "react";
import styled from "styled-components/macro";
import { colorsGreen } from "../../../configs/css/colors";

export const Grave = ({grave}) => {
  return (
    <GraveCont>
      <UserPhoto src={grave.photos[0]} />
    </GraveCont>
  );
};

const UserPhoto = styled.img`
  object-fit: cover;  
  width: 100%;
  height: 100%;
`;

const GraveCont = styled.div`
  background-color: ${colorsGreen.secondaryB.rgba(.3)};
  width: 100%;
  height: 100%;
  position: relative;
  padding: 20px;
  overflow: hidden;
  background-size: 60px 60px;
  /* box-shadow: 1px 1px 40px 5px rgba(0, 0, 0, 0.1); */
  border: 1px solid #000;
`;
