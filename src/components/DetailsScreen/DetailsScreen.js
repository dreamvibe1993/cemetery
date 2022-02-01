import React from "react";
import styled from "styled-components/macro";

export const DetailsScreen = ({ onClose = () => {} }) => {
  return <FixedCont onClick={onClose}></FixedCont>;
};

const FixedCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999 !important;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 40px;
`;
