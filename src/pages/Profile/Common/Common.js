import styled from "styled-components/macro";
import { FadeIn } from "../../../configs/css/animations";
import { colors } from "../../../configs/css/colors";

export const ProfileContainer = styled.div`
  padding: 20px;
  padding-bottom: 0px;
  width: 66vw;
  background-color: ${colors.primary.rgba(1)};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  animation: ${FadeIn} 0.2s linear forwards;
  border: 1px solid #000;
`;