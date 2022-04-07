import styled from "styled-components/macro";
import { deviceMax } from "../../../configs/css/breakpoints";

export const MainContainer = styled.div`
  padding: 20px;
`;

export const ServiceButton = styled.button`
  transition: background-color 0.2s linear;
  padding: 10px;
  background-color: ${p => p.theme.contrastA.rgba(0.8)};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: ${p => p.theme.textColor.hex};
  border: none;
  cursor: pointer;
  position: relative;
  font-family: inherit;
  &:active {
    background-color: ${p => p.theme.contrastA.rgba(1)};
  }
  &:hover {
    background-color: ${p => p.theme.contrastA.rgba(0.5)};
  }
`;

export const NavButton = styled(ServiceButton)`
  height: 100%;
  @media ${deviceMax.mobileL} {
    font-size: 20px;
  }
`;

export const Input = styled.input`
  width: 430px;
  height: 40px;
  background-color: ${p => p.theme.contrastB.rgba(0.2)};
  border: none;
  padding: 5px 10px;
  color: ${p => p.theme.textColor.hex};
  font-size: 16px;
  border: ${(p) => (p.err ? "1px solid rgba(168, 50, 50,.9)" : "none")};
  @media ${deviceMax.mobileL} {
    width: 100%;
  }
`;
