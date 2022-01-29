import styled from "styled-components/macro";

export const MainContainer = styled.div`
  width: 900px;
  height: 900px;
  background-color: ${(p) => p.bgCol || "rgb(49, 46, 68)"};
  box-shadow: 0px 10px 100px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;
