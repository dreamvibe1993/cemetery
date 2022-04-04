import styled from "styled-components/macro";
import { FadeIn } from "../../../configs/css/animations";
import { colorsGreen } from "../../../configs/css/colors";

export const ProfileContainer = styled.form`
  padding: 20px;
  padding-bottom: 0px;
  width: 66vw;
  background-color: ${colorsGreen.primary.rgba(1)};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  animation: ${FadeIn} 0.2s linear forwards;
  border: 1px solid #000;
`;
