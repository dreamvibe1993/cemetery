import React from "react";
import styled from "styled-components/macro";

import { NavButton } from "../css/sc-components/ScComponents";
import { ReactComponent as Logo } from "../../media/svg/logo.svg";
import { colors } from "../../configs/css/colors";
import { useNavigate } from "react-router-dom";

export const TopNavBar = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <NavBar>
      <Logo onClick={goHome} />
      <NavButton>auth</NavButton>
    </NavBar>
  );
};

const NavBar = styled.div`
  position: fixed;
  background-color: ${colors.primary.rgba(0.6)};
  z-index: 999;
  height: 75px;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 2px 0px 50px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
  * {
    text-transform: lowercase;
    font-size: 25px;
  }
  svg {
    height: 100%;
    width: 100px;
    fill: ${colors.secondaryB.hex};
    cursor: pointer;
  }
`;
