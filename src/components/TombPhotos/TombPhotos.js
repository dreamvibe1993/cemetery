import React from "react";
import styled from "styled-components/macro";


import { Gallery } from "../../components/Gallery";
import { Picture } from "../Picture/Picture";


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
    <PaddingWrapper>
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
    </PaddingWrapper>
  );
};

const PaddingWrapper = styled.div`
  padding: 0px 20px;
  background-color: rgba(0, 0, 0, 0.2);
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
