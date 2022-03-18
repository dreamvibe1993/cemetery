import styled from "styled-components/macro";
import { colors } from "../../../configs/css/colors";

export const MainContainer = styled.div`
  padding: 20px;
`;

export const ServiceButton = styled.button`
  transition: background-color 0.2s linear;
  padding: 10px;
  background-color: ${colors.secondaryB.rgba(.8)};
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #fff;
  border: none;
  cursor: pointer;
  &:active {
    background-color: ${colors.secondaryB.rgba(1)};
  }
`;

export const NavButton = styled(ServiceButton)`
  height: 100%;
`;
