import React from "react";
import styled from "styled-components/macro";
import { Grave } from "../Grave";

export const CemetaryGrid = () => {
  return (
    <CemetaryGridContainer>
      <Cell><Grave /></Cell>
      <Cell></Cell>
      <Cell><Grave /></Cell>
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
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.1);
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CemetaryGridContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #1C3C1A;
  display: grid;
  grid-template-columns: 181px 181px 181px 181px;
  grid-template-rows: 243px 243px 243px;
  grid-gap: 5px;
  padding: 10px;
`;
