import React from "react";
import styled from "styled-components/macro";

import GrassPattern from "../../media/img/grave/grass-p-2.png";

import { Grave } from "../Grave";
import { Tooltip } from "../Tooltip";

export const CemetaryGrid = () => {
  return (
    <CemetaryGridContainer>
      <Tooltip content="This grave belongs to Test Test. Click to visit." direction="bottom">
        <Cell>
          <Grave />
        </Cell>
      </Tooltip>
      <Cell></Cell>
      <Cell>
        <Grave />
      </Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
      <Cell></Cell>
    </CemetaryGridContainer>
  );
};

const Cell = styled.div`
  width: 100%;
  height: 100%;
  transition: all 0.2s linear;
  background-color: #183516;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(${GrassPattern}) repeat;
  background-size: 50%;
  position: relative;
  cursor: pointer;
  &:hover {
    &::after {
      transition: all 0.2s linear;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
  &::after {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
`;

const CemetaryGridContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #1c3c1a;
  display: grid;
  grid-template-columns: 210px 210px 210px 210px;
  grid-template-rows: 280px 280px 280px;
  padding: 10px;
`;
