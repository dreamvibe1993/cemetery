import React from "react";
import styled from "styled-components/macro";
import StonePattern from '../../media/img/grave/stone-p-2.png'
import GrassPattern from '../../media/img/grave/grass-p.png'

export const Grave = () => {
  return (
    <GraveCont>
      <Monument />
      <GraveGrass />
    </GraveCont>
  );
};

const Monument = styled.div`
  width: 100%;
  height: 20px;
  background-color: #A29B9B;
  box-shadow: 0px 20px 10px 0px rgba(0, 0, 0, 0.2);
`;

const GraveCont = styled.div`
  background-color: gray;
  width: 60%;
  height: 70%;
  position: relative;
  padding: 20px;
  padding-top: 5px;
  /* background: url(${StonePattern}) repeat; */
  background-size: 60px 60px;
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.2);
`;

const GraveGrass = styled.div`
  background-color: green;
  width: 100%;
  height: 85%;
  box-shadow: inset 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  /* background: url(${GrassPattern}) repeat; */
`;
