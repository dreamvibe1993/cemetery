import React from "react";
import styled from "styled-components/macro";
import { MainContainer } from "../../sc-components/ScComponents";

import PMML from "../../media/audio/zemfira-pmml.mp3";

import { ReactComponent as Eye } from "../../media/svg/eye.svg";
import { ReactComponent as Donate } from "../../media/svg/donate.svg";
import { ReactComponent as ChevroneLeft } from "../../media/svg/chevrone.svg";
import { ReactComponent as Play } from "../../media/svg/play.svg";
import { ReactComponent as Pause } from "../../media/svg/pause.svg";

import { Gallery } from "../../components/Gallery";
import { Gifts } from "../../components/Gifts";
import { DonateGift } from "../../components/Gifts/DonateGift";
import { Navigate } from "react-router-dom";
import { Tooltip } from "../../components/Tooltip";
import { useSelector } from "react-redux";
import { Preloader } from "../../components/Preloader";
import { loadUsers } from "../../api/user";

export const Tomb = () => {
  const { users } = useSelector((state) => state.user);

  const [isClicked, setClicked] = React.useState(false);
  const [isGalleryOpen, setGalleryOpen] = React.useState(false);
  const [isGiftsOpen, setGiftsOpen] = React.useState(false);
  const [isDonateOpen, setDonateOpen] = React.useState(false);
  const [isSongPlaying, setSongPlaying] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);
  const [isLoading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const photoContRef = React.useRef(null);
  const x = React.useRef(0);
  const song = React.useRef(new Audio(PMML));

  React.useEffect(() => {
    if (!users) {
      loadUsers();
      return;
    } else {
      setLoading(false);
    }
    const urlSP = new URLSearchParams(window.location.search);
    const userId = urlSP.get("userId");
    const user = users.find((user) => user.id === userId);
    if (!user) {
      setRedirect("/");
    } else {
      setUser(user);
    }
  }, [users]);

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

  const hidePhoto = () => {
    setGalleryOpen(false);
  };

  const openGifts = () => {
    setGiftsOpen(true);
  };

  const closeGifts = () => {
    setGiftsOpen(false);
  };

  const openDonateGift = () => {
    setDonateOpen(true);
  };

  const closeDonateGift = () => {
    setDonateOpen(false);
  };

  const backToGYard = () => {
    setRedirect("/");
  };

  const playSong = () => {
    if (!song.current) return;
    if (!song.current.paused) {
      song.current.pause();
      setSongPlaying(false);
    } else {
      song.current.play();
      setSongPlaying(true);
    }
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isLoading)
    return (
      <MainContainer bgCol="rgb(49, 46, 68)">
        <LoadingContainer>
          <Preloader />
        </LoadingContainer>
      </MainContainer>
    );

  return (
    <>
      {isDonateOpen && <DonateGift onClose={closeDonateGift} user={user} />}
      {isGiftsOpen && <Gifts onClose={closeGifts} user={user} />}
      {isGalleryOpen && <Gallery src={isGalleryOpen} onClose={hidePhoto} />}
      <MainContainer>
        <TopPanel>
          <ChevroneLeft onClick={backToGYard} />
        </TopPanel>
        <Monument>
          <MainInfoCont>
            <TopBar>
              <Tooltip
                content={
                  "Leave something on the grave \nto honor the deceased."
                }
                direction="left"
              >
                <Donate onClick={openDonateGift} />
              </Tooltip>
              <Name>{user?.name}</Name>
              <Tooltip
                content={
                  "Listen to the song this person bequeathed to play at their funeral."
                }
                direction="right"
              >
                {isSongPlaying ? (
                  <Pause onClick={playSong} />
                ) : (
                  <Play onClick={playSong} />
                )}
              </Tooltip>
            </TopBar>
            <PhotoCont ref={photoContRef}>
              <PhotoContPhotosWrapper
                onMouseMove={(e) => move(e)}
                onMouseDown={(e) => captureClick(e)}
                onMouseUp={releaseClick}
                onMouseLeave={releaseClick}
                draggable={false}
              >
                {user?.photos.map((src, i) => {
                  return (
                    <Picture src={src} key={src + i} showPhoto={showPhoto} />
                  );
                })}
              </PhotoContPhotosWrapper>
            </PhotoCont>
            <DateLiving>
              {user?.born} - {user?.died}
            </DateLiving>
            <LastWords>{user?.lastWords}</LastWords>
          </MainInfoCont>
          <LogsCont>
            <Log>
              {user?.chatLogs.map((entry, i) => {
                return <LogEntry key={entry + i}>&gt; {entry}</LogEntry>;
              })}
            </Log>
          </LogsCont>
          <Tooltip
            content={"Gifts people left to honor the person laying here."}
            direction="top"
          >
            <OpenGiftsButton onClick={openGifts}>
              <span>Gifts</span>
            </OpenGiftsButton>
          </Tooltip>
        </Monument>
      </MainContainer>
    </>
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

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 999;
  padding: 40px 0px 0px 20px;
  svg {
    cursor: pointer;
    transition: all 0.2s linear;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.1);
    }
  }
`;
const TopBar = styled.div`
  display: flex;
  height: 60px;
  justify-content: space-around;
  align-items: center;
  svg {
    transition: all 0.2s linear;
    cursor: pointer;
    height: 100%;
    width: 60px;
    border-radius: 50%;
    &:hover {
      background-color: rgba(0, 0, 0, 0.06);
      box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.1);
    }
  }
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
  object-fit: cover;
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

const Name = styled(Text)`
  font-size: 40px;
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
