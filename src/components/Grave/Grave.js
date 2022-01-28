import React from "react";
import styled from "styled-components/macro";

export const Grave = () => {
  return (
    <GraveCont>
      <GraveGrass />
    </GraveCont>
  );
};

const GraveCont = styled.div`
  background-color: gray;
  width: 60%;
  height: 70%;
  position: relative;
  padding: 20px;
`;

const GraveGrass = styled.div`
  background-color: green;
  width: 100%;
  height: 100%;
`;
