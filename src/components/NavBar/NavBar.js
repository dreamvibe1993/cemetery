import React from "react";
import styled from "styled-components/macro";

import { NavButton } from "../css/sc-components/ScComponents";
import { ReactComponent as Logo } from "../../media/svg/logo.svg";

export const TopNavBar = () => {
  return (
    <NavBar>
      <Logo />
      <NavButton>Log in || Sign in</NavButton>
    </NavBar>
  );
};

const NavBar = styled.div`
  position: fixed;
  background-color: rgb(32, 20, 56);
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
  }
`;
