import React from "react";
import styled from "styled-components/macro";
import { CemetaryGrid } from "../../components/CemetaryGrid";
import { MainContainer } from "../../sc-components/ScComponents";

export const Home = () => {
  return (
    <MainContainer bgCol="rgb(49, 46, 68)">
      <CemetaryGrid />
    </MainContainer>
  );
};



