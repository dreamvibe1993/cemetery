import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import PMML from "../../media/audio/zemfira-pmml.mp3";

import { Preloader } from "../../components/App/Preloader";
import { TombChatLogs } from "../../components/Tomb/TombChatLogs";
import { setGravesLoadingOver } from "../../redux/graves/gravesReducer";
import { FadeIn } from "../../configs/css/animations";
import { useLoadGraves } from "../../services/hooks/api/graves/useLoadGraves";
import { deviceMax } from "../../configs/css/breakpoints";
import { ServiceButton } from "../../components/css/sc-components/ScComponents";
import { RoundUserPic } from "../../components/App/RoundUserPic/RoundUserPic";
import { showError } from "../../services/errors/showError";
import { routes } from "../../configs/urls/app/app-urls";
import { Gifts } from "../../components/Tomb/Gifts";
import { DonateGift } from "../../components/Tomb/DonateGift";
import { Picture } from "../../components/App/Picture/Picture";
import { Gallery } from "../../components/App/Gallery";

export const Tomb = () => {
  const [getGraves, cancelGetGravesRequest] = useLoadGraves();
  const { graves, isGravesLoading } = useSelector((state) => state.graves);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = React.useState(null);
  const [grave, setGrave] = React.useState(null);

  const { isAuth } = useSelector((state) => state.user);
  const [isDonateOpen, setDonateOpen] = React.useState(false);
  // const [isSongPlaying, setSongPlaying] = React.useState(false);
  const [isGiftsOpen, setGiftsOpen] = React.useState(false);
  const [isGalleryOpen, setGalleryOpen] = React.useState(false);
  const [isClicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    getGraves();
    return () => {
      cancelGetGravesRequest();
    }; // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const urlSP = new URLSearchParams(window.location.search);
    const graveId = urlSP.get("graveId");
    if (!graveId) {
      setRedirect("/");
    } else {
      const grave = graves.find((grave) => grave?._id === graveId);
      if (grave) {
        setGrave(grave);
        dispatch(setGravesLoadingOver);
      }
    }
  }, [dispatch, graves]);

  // React.useEffect(() => {
  //   return () => {
  //     if (song.current) song.current.pause();
  //   };
  // }, []);

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

  const openDonateGift = () => {
    if (!isAuth)
      return showError({
        message: "Please log in or create your account to donate.",
      });
    setDonateOpen(true);
  };

  const closeDonateGift = () => {
    setDonateOpen(false);
    getGraves();
  };

  const openGifts = () => {
    setGiftsOpen(true);
  };

  const closeGifts = () => {
    setGiftsOpen(false);
    getGraves();
  };

  const tellToComeBackLater = () => {
    showError({ message: "Coming soon!" });
  };

  const backToGYard = () => {
    setRedirect("/");
  };

  const showUserProfile = (userId) => {
    if (!userId) return;
    setRedirect(routes.profile.origin + "/?id=" + userId);
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isGravesLoading) return <Preloader />;

  return (
    <>
      {isGalleryOpen && <Gallery src={isGalleryOpen} onClose={hidePhoto} />}
      {isGiftsOpen && <Gifts onClose={closeGifts} grave={grave} />}
      {isDonateOpen && <DonateGift onClose={closeDonateGift} grave={grave} />}
      <Monument>
        <MainInfoCont>
          <FirstRow>
            <Name>{grave?.name}</Name>
            <CreatorCredsContainer>
              <BuriedBy>is buried by:</BuriedBy>
              <RoundUserPic
                src={grave?.madeBy?.picture}
                onClick={() => showUserProfile(grave?.madeBy?.id)}
              />
            </CreatorCredsContainer>
          </FirstRow>
          <TopBar>
            <DateLiving>
              {grave?.born} - {grave?.died}
            </DateLiving>
            <ServiceButtonsWrapper>
              <ServiceButton onClick={backToGYard}>BACK</ServiceButton>
              <ServiceButton onClick={openDonateGift}>DONATE</ServiceButton>
              <ServiceButton onClick={openGifts}>GIFTS</ServiceButton>
              <ServiceButton onClick={tellToComeBackLater}>MUSIC</ServiceButton>
            </ServiceButtonsWrapper>
          </TopBar>
          <PaddingWrapper>
            <PhotoCont ref={photoContRef}>
              <PhotoContPhotosWrapper
                onMouseMove={(e) => move(e)}
                onMouseDown={(e) => captureClick(e)}
                onMouseUp={releaseClick}
                onMouseLeave={releaseClick}
                draggable={false}
              >
                {grave?.photos.map((src, i) => {
                  return (
                    <Picture src={src} key={src + i} showPhoto={showPhoto} />
                  );
                })}
              </PhotoContPhotosWrapper>
            </PhotoCont>
          </PaddingWrapper>
          <LastWordsContainer>
            this person's last words were:
          </LastWordsContainer>
          <LastWords>
            <LogDiagSign>&gt; </LogDiagSign>
            {grave?.lastWords}
          </LastWords>
        </MainInfoCont>
        <TombChatLogs grave={grave} />
      </Monument>
    </>
  );
};

const PaddingWrapper = styled.div`
  padding: 0px 20px;
  background-color: ${(p) => p.theme.contrastB.rgba(0.2)};
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

const BuriedBy = styled.span`
  margin-right: 10px;
  opacity: 0.8;
`;

const CreatorCredsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const FirstRow = styled.div`
  max-height: 50px;
  display: flex;
  margin-bottom: 10px;
`;

const LogDiagSign = styled.span`
  color: ${(p) => p.theme.secondaryB.hex};
`;

const LastWordsContainer = styled.div`
  padding: 15px 0px;
`;

const ServiceButtonsWrapper = styled.div`
  display: flex;
  & > * {
    &:not(:last-child) {
      margin-right: 10px;
    }
  }
  @media ${deviceMax.mobileL} {
    padding: 0;
    flex-wrap: wrap;
    justify-content: flex-end;
    & > * {
      width: 45%;
      margin-bottom: 5px;
      margin-left: 5px;
      &:not(:last-child) {
        margin-right: 0px;
      }
    }
  }
`;

const Text = styled.span`
  text-align: center;
  display: block;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 10px;
  svg {
    transition: all 0.2s linear;
    cursor: pointer;
    height: 100%;
    width: 60px;
    border-radius: 50%;
    &:hover {
      background-color: ${(p) => p.theme.contrastB.rgba(0.06)};
      box-shadow: 0px 0px 19px 5px ${(p) => p.theme.contrastB.rgba(0.1)};
    }
  }
`;

const MainInfoCont = styled.div`
  background-color: ${(p) => p.theme.contrastB.rgba(0.1)};
  padding: 20px;
`;

const LastWords = styled(Text)`
  font-size: 30px;
  text-align: left;
`;

const DateLiving = styled(Text)`
  font-size: 20px;
  flex: 1;
  text-align: left;
  padding-right: 10px;
`;

const Name = styled(Text)`
  font-size: 40px;
  flex: 1;
  text-align: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  @media ${deviceMax.mobileL} {
    font-size: 30px;
  }
`;

const Monument = styled.div`
  width: 60vw;
  min-width: 650px;
  background-color: ${(p) => p.theme.primary.rgba(1)};
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
  box-shadow: 0px 0px 20px 1px ${(p) => p.theme.contrastB.rgba(0.2)};
  /* position: relative; */
  /* z-index: 999; */
  animation: ${FadeIn} 0.2s linear forwards;
  @media ${deviceMax.mobileL} {
    width: 100vw;
    min-width: auto;
    padding: 10px;
  }
`;
