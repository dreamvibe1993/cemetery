import styled from "styled-components/macro";

export const MainContainer = styled.div`
  background-color: ${(p) => p.bgCol || "rgb(49, 46, 68)"};
  box-shadow: 0px 10px 100px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

export const ServiceButton = styled.button`
  transition: background-color 0.2s linear;
  padding: 10px;
  background-color: #11535c;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #fff;
  border: none;
  cursor: pointer;
  &:active {
    background-color: #0b353b;
  }
`;

export const NavButton = styled(ServiceButton)`
  height: 100%;
`;
