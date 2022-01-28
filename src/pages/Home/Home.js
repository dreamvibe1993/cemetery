import React from "react";
import styled from "styled-components/macro";
import { CemetaryGrid } from "../CemetaryGrid";

export const Home = () => {
  return (
    <HomeContainer>
      <CemetaryGrid />
    </HomeContainer>
  );
};

const HomeContainer = styled.div`
  width: 800px;
  height: 800px;
  background-color: rgb(49, 46, 68);
  box-shadow: 0px 10px 100px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;
