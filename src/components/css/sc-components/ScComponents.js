import styled from "styled-components/macro";
import { colors } from "../../../configs/css/colors";

export const MainContainer = styled.div`
  padding: 20px;
`;

export const ServiceButton = styled.button`
  transition: background-color 0.2s linear;
  padding: 10px;
  background-color: ${colors.secondaryB.rgba(0.8)};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #fff;
  border: none;
  cursor: pointer;
  position: relative;
  &:active {
    background-color: ${colors.secondaryB.rgba(1)};
  }
`;

export const NavButton = styled(ServiceButton)`
  height: 100%;
`;

export const Input = styled.input`
  width: 430px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  padding: 5px 10px;
  color: #fff;
  font-size: 16px;
  border: ${(p) => (p.err ? "1px solid rgba(168, 50, 50,.9)" : "none")};
`;
