import { keyframes } from "styled-components/macro";

export const DropDown = (finalTopCoords) => keyframes`
    0% {
        top: -1000px;
    }
    100% {
        top: ${finalTopCoords};
        transform: translateY(-${finalTopCoords});
    }
`;
