import React from "react";
import styled from "styled-components/macro";
import { FadeIn } from "../../../configs/css/animations";

export const Backdrop = ({onClick = () => {}}) => {
    return <BackdropItself onClick={onClick}></BackdropItself>
}


const BackdropItself = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${p => p.theme.contrastB.rgba(0.7)};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  animation: ${FadeIn} .2s linear forwards;
`;