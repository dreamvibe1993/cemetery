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

const c = 2; // x, y

export const Floating = keyframes`
    0% {
        transform: translate(${c * 0}%, ${c * 0}%);
    }
    50% {
        transform: translate(${c * 0}%, ${c * 1}%);
    }
    100% {
        transform: translate(${c * 0}%, ${c * 0}%);
    }
`;
