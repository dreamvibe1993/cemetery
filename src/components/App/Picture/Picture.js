import React from "react";
import styled from "styled-components/macro";

import { ReactComponent as Eye } from "../../../media/svg/eye.svg";
import QuestionMark from "../../../media/img/common/question-mark.png";

import { Preloader } from "../../../components/App/Preloader";
import { ServiceButton } from "../../css/sc-components/ScComponents";

export const Picture = ({
  src,
  showPhoto = () => {},
  sizes = { width: 160, height: 290 },
}) => {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <PhotoWrapper sizes={sizes}>
      <PreloaderCont style={{ visibility: isLoading ? "visible" : "hidden" }}>
        <Preloader notFixed={true}/>
      </PreloaderCont>
      <PhotoButton
        onClick={(e) => {
          e.preventDefault();
          showPhoto(src);
        }}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <ServiceButton>
          <Eye />
        </ServiceButton>
      </PhotoButton>
      <Photo
        src={src || QuestionMark}
        draggable={false}
        onLoad={() => setLoading(false)}
        crossOrigin="anonymous"
      />
    </PhotoWrapper>
  );
};

const PreloaderCont = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(p) => p.theme.contrastB.rgba(0.2)};
  position: absolute;
  top: 0;
  left: 0;
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: ${(p) => p.sizes.width}px;
  height: ${(p) => p.sizes.height}px;
  overflow: hidden;
  border-radius: 2px;
  display: flex;
  justify-content: center;
  border: 1px solid ${(p) => p.theme.contrastB.hex};
`;

const PhotoButton = styled.div`
  position: absolute;
  bottom: 10px;
  left: 10px;
  background-color: ${(p) => p.theme.contrastB.rgba(0.2)};
  cursor: pointer;
  transition: opacity 0.2s linear;
  z-index: 10;
  border-radius: 5px;
  button {
    padding: 5px 5px;
    background-color: ${(p) => p.theme.secondaryB.rgba(0.3)};
    border-radius: 5px;
    &:hover {
      background-color: ${(p) => p.theme.secondaryB.rgba(1)};
    }
  }
  svg {
    height: 30px;
  }
`;

const Photo = styled.img`
  object-fit: cover;
  height: 100%;
  pointer-events: none;
  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;
