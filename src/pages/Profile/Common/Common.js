import styled from "styled-components/macro";
import { FadeIn } from "../../../configs/css/animations";
import { deviceMax } from "../../../configs/css/breakpoints";

export const ProfileContainer = styled.form`
  padding: 20px;
  padding-bottom: 0px;
  width: 66vw;
  background-color: ${p => p.theme.primary.rgba(1)};
  display: flex;
  flex-direction: column;
  max-width: 600px;
  animation: ${FadeIn} 0.2s linear forwards;
  border: 1px solid ${p => p.theme.contrastB.hex};
  @media ${deviceMax.mobileL} {
    max-width: unset;
    width: calc(100vw - 20px);
  }
`;
