import React from "react";
import styled from "styled-components/macro";

import { ReactComponent as Eye } from "../../media/svg/eye.svg";

import { Gallery } from "../../components/Gallery";
import { Preloader } from "../../components/Preloader";

export const TombPhotos = ({ grave }) => {
  const [isClicked, setClicked] = React.useState(false);
  const [isGalleryOpen, setGalleryOpen] = React.useState(false);

  const photoContRef = React.useRef(null);
  const x = React.useRef(0);

  const hidePhoto = () => {
    setGalleryOpen(false);
  };

  const captureClick = (e) => {
    x.current = e.clientX + x.current;
    setClicked(true);
  };

  const releaseClick = () => {
    x.current = photoContRef.current.scrollLeft;
    setClicked(false);
  };

  const move = (e) => {
    if (!isClicked || !photoContRef.current) return;
    photoContRef.current.scrollTo(x.current - e.clientX, 0);
  };

  const showPhoto = (src) => {
    setGalleryOpen(src);
  };

  return (
    <PhotoCont ref={photoContRef}>
      {isGalleryOpen && <Gallery src={isGalleryOpen} onClose={hidePhoto} />}
      <PhotoContPhotosWrapper
        onMouseMove={(e) => move(e)}
        onMouseDown={(e) => captureClick(e)}
        onMouseUp={releaseClick}
        onMouseLeave={releaseClick}
        draggable={false}
      >
        {grave?.photos.map((src, i) => {
          return <Picture src={src} key={src + i} showPhoto={showPhoto} />;
        })}
      </PhotoContPhotosWrapper>
    </PhotoCont>
  );
};

const Picture = ({ src, showPhoto = () => {} }) => {
  const [isLoading, setLoading] = React.useState(true);

  return (
    <PhotoWrapper>
      <PreloaderCont style={{ visibility: isLoading ? "visible" : "hidden" }}>
        <Preloader />
      </PreloaderCont>
      <PhotoButton
        onClick={() => showPhoto(src)}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <Eye />
      </PhotoButton>
      <Photo src={src} draggable={false} onLoad={() => setLoading(false)} />
    </PhotoWrapper>
  );
};

const PreloaderCont = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
`;

const PhotoWrapper = styled.div`
  position: relative;
  width: 163px;
  height: 290px;
  overflow: hidden;
  border-radius: 15px;
  display: flex;
  justify-content: center;
`;

const PhotoButton = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  height: 20%;
  background-color: rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 10px 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s linear;
  &:hover {
    opacity: 1;
  }
  svg {
    height: 100%;
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

const PhotoContPhotosWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  cursor: grab;
  width: fit-content;
  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  &:active {
    cursor: grabbing;
  }
  & > * {
    &:not(:last-child) {
      margin-right: 20px;
    }
  }
`;

const PhotoCont = styled.div`
  max-height: 330px;
  padding: 20px 0;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
`;
