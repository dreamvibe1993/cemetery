import React from "react";
import styled from "styled-components/macro";
import { ColorTheme } from "../../../App";
import { FadeIn } from "../../../configs/css/animations";
import { ServiceButton } from "../../css/sc-components/ScComponents";

export const Gallery = ({ src, onClose = () => {} }) => {
  const picRef = React.useRef(null);
  const [x, setX] = React.useState(0);
  const [y, setY] = React.useState(40);
  const [scale, setScale] = React.useState(1);

  const [isMouseKeyPressed, setMouseKeyPressed] = React.useState(false);
  const [isLoading, setLoading] = React.useState(true);

  const TouchStartCoordsX = React.useRef(null);
  const TouchStartCoordsY = React.useRef(null);

  const endLoading = () => {
    setLoading(false);
  };

  const handleStart = (e) => {
    TouchStartCoordsX.current = e.clientX - x || e?.touches[0]?.clientX - x;
    TouchStartCoordsY.current = e.clientY - y || e?.touches[0]?.clientY - y;
    setMouseKeyPressed(true);
  };

  const handleMove = (e) => {
    if (!picRef.current) return;
    if (!isMouseKeyPressed) return;
    const clientX = e.clientX || e?.touches[0]?.clientX;
    const clientY = e.clientY || e?.touches[0]?.clientY;
    const touchPositionCoordX = clientX - TouchStartCoordsX.current; // Getting coords of the place where elem was touched.
    const touchPositionCoordY = clientY - TouchStartCoordsY.current; // Getting coords of the place where elem was touched.
    setX(touchPositionCoordX);
    setY(touchPositionCoordY);
  };

  const handleEnd = () => {
    setMouseKeyPressed(false);
  };

  const zoomIn = () => {
    setScale((prev) => prev + 0.1);
  };

  const zoomOut = () => {
    setScale((prev) => prev - 0.1);
  };

  return (
    <PictureGallery fixedHeight={window.innerHeight}>
      <TopPanel>
        <ServiceButton onClick={onClose}>CLOSE</ServiceButton>
      </TopPanel>
      <PreloaderContainer
        style={{ visibility: isLoading ? "visible" : "hidden" }}
      >
        {/* <Preloader /> */}
      </PreloaderContainer>
      <PicContainer
        draggable="false"
        onTouchMove={(e) => handleMove(e)}
        onTouchStart={(e) => handleStart(e)}
        onMouseDown={(e) => handleStart(e)}
        onMouseMove={(e) => handleMove(e)}
        onMouseUp={(e) => handleEnd(e)}
        onMouseLeave={(e) => handleEnd(e)}
        ref={picRef}
        style={{
          transform: `translate(${x + "px"}, ${y + "px"}) scale(${scale})`, //x y
        }}
      >
        <Pic
          src={src}
          onLoad={endLoading}
          style={{ visibility: !isLoading ? "visible" : "hidden" }}
        />
      </PicContainer>
      <ButtonsPanel>
        <ZoomIn onClick={zoomOut}>-</ZoomIn>
        <ZoomOut onClick={zoomIn}>+</ZoomOut>
      </ButtonsPanel>
    </PictureGallery>
  );
};

const PreloaderContainer = styled.div`
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const PicContainer = styled.div`
  cursor: grab;
  height: 100%;
  &:active {
    cursor: grabbing;
  }
`;

const TopPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 99999999999;
  padding: 20px 0px 0px 20px;
  svg {
    cursor: pointer;
    background-color: ${(p) => p.theme.contrastB.rgba(0.2)};
    box-shadow: 0px 0px 20px 20px ${(p) => p.theme.contrastB.rgba(0.2)};
  }
`;

const Button = styled.div`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 0.5;
  transition: all 0.1s linear;
  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  cursor: pointer;
  font-size: 36px;
  font-weight: bolder;
  padding-top: 5px;
  &:active {
    opacity: 1;
  }
`;

const ZoomIn = styled(Button)`
  background-color: ${(p) => p.theme.secondaryB.hex};
`;

const ZoomOut = styled(Button)`
  background-color: ${(p) => p.theme.secondaryB.hex};
`;

const ButtonsPanel = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 160px;
  border-radius: 35px;
  background-color: ${(p) => p.theme.white.rgba(0.5)};
  padding: 5px 5px;
`;

const Pic = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  pointer-events: none;
`;

const PictureGallery = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1001;
  background-color: ${(p) => p.theme.contrastB.rgba(0.9)};
  animation: ${FadeIn} 0.2s linear forwards;
`;
