import { keyframes } from "styled-components/macro";

export const DropDown = (startTopCoords, finalTopCoords) => keyframes`
    0% {
        top: ${startTopCoords || "-1000"}px;
    }
    100% {
        top: ${finalTopCoords}px;
        /* transform: translateY(-${finalTopCoords}); */
    }
`;

export const FadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;
