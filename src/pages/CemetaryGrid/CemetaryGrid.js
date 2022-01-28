import React from "react";
import styled from "styled-components/macro";

export const CemetaryGrid = () => {
  return (
    <CemetaryGridContainer>
      <Cell class="grid-item">1</Cell>
      <Cell class="grid-item">2</Cell>
      <Cell class="grid-item">3</Cell>
      <Cell class="grid-item">4</Cell>
      <Cell class="grid-item">5</Cell>
      <Cell class="grid-item">6</Cell>
      <Cell class="grid-item">7</Cell>
      <Cell class="grid-item">8</Cell>
      <Cell class="grid-item">9</Cell>
    </CemetaryGridContainer>
  );
};

const Cell = styled.div`
  width: 100%;
  height: 100%;
  background-color: royalblue;
`;

const CemetaryGridContainer = styled.div`
  height: 100%;
  width: 100%;
  background-color: #183516;
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 5px;
  padding: 10px;
`;
