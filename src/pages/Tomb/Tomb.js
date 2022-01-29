import React from "react";
import styled from "styled-components/macro";
import { MainContainer } from "../../sc-components/ScComponents";
import Deceased from "../../img/common/user_photo.png";

export const Tomb = () => {
  const [isClicked, setClicked] = React.useState(false);

  const photoContRef = React.useRef(null);
  const x = React.useRef(0);

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

  return (
    <MainContainer>
      <Monument>
        <MainInfoCont>
          <Name>Test Test</Name>
          <PhotoCont ref={photoContRef}>
            <PhotoContPhotosWrapper
              onMouseMove={(e) => move(e)}
              onMouseDown={(e) => captureClick(e)}
              onMouseUp={releaseClick}
              onMouseLeave={releaseClick}
              draggable={false}
            >
              <Photo src={Deceased} draggable={false} />
              <Photo src={Deceased} draggable={false} />
              <Photo src={Deceased} draggable={false} />
              <Photo src={Deceased} draggable={false} />
              <Photo src={Deceased} draggable={false} />
              <Photo src={Deceased} draggable={false} />
              <Photo src={Deceased} draggable={false} />
            </PhotoContPhotosWrapper>
          </PhotoCont>
          <DateLiving>19.19.1999 - 19.19.1999</DateLiving>
          <LastWords>Perfect time to die you filthy bastards!</LastWords>
        </MainInfoCont>
        <LogsCont>
          <Log>
            <LogEntry>&gt; Lisa left 1.25 BTC for Test Test.</LogEntry>
            <LogEntry>&gt; Mark left left a Candy for Test Test.</LogEntry>
            <LogEntry>
              &gt; Cynthia left a message: RIP God rest your soul ashes to ashes
              dust to dust ashes to ashes dust to dust ashes to ashes dust to
              dust
            </LogEntry>
            <LogEntry>&gt; Lisa left 1.25 BTC for Test Test.</LogEntry>
          </Log>
        </LogsCont>
        <OpenGiftsButton>
          <span>Gifts</span>
        </OpenGiftsButton>
      </Monument>
    </MainContainer>
  );
};

const MainInfoCont = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const OpenGiftsButton = styled.div`
  transition: all 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 24px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const LogEntry = styled.span`
  display: block;
`;

const Log = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  padding: 10px;
  max-height: 236px;
  overflow-y: auto;
`;

const Text = styled.span`
  text-align: center;
  display: block;
`;

const Photo = styled.img`
  object-fit: contain;
  height: 100%;
  pointer-events: none;
  user-select: none;
  -khtml-user-select: none;
  -o-user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
`;

const LogsCont = styled.span`
  flex: 1;
  margin-top: 5px;
`; //left a candy; left 1.25 btc

const LastWords = styled(Text)`
  font-size: 30px;
`;

const DateLiving = styled(Text)`
  font-size: 45px;
  margin-top: 15px;
`;

const PhotoContPhotosWrapper = styled.div`
  display: flex;
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
`;

const Name = styled(Text)`
  font-size: 60px;
`;

const Monument = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-color: gray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
