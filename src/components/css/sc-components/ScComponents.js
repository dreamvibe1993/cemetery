import styled from "styled-components/macro";

export const MainContainer = styled.div`
  width: 900px;
  height: 900px;
  background-color: ${(p) => p.bgCol || "rgb(49, 46, 68)"};
  box-shadow: 0px 10px 100px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;


export const ServiceButton = styled.button`
  width: 33%;
  height: 40px;
  background-color: #23a0b0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #fff;
  border: none;
  cursor: pointer;
  &:active {
    background-color: #1d8491;
  }
`;