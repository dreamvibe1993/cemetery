import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

// import PMML from "../../media/audio/zemfira-pmml.mp3";

import { DonateGift } from "../../components/Gifts/DonateGift";
import { reloadGraves } from "../../api/graves";
import { TombPhotos } from "../TombPhotos";
import { ServiceButton } from "../css/sc-components/ScComponents";
import { showError } from "../../services/errors/showError";
import { Gifts } from "../Gifts";
import { colors } from "../../configs/css/colors";
import { useSelector } from "react-redux";

export const TombInfo = ({ grave }) => {
  const { isAuth } = useSelector((state) => state.user);
  const [isDonateOpen, setDonateOpen] = React.useState(false);
  // const [isSongPlaying, setSongPlaying] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);
  const [isGiftsOpen, setGiftsOpen] = React.useState(false);

  // const song = React.useRef(new Audio(PMML));

  const openDonateGift = () => {
    if (!isAuth)
      return showError({
        message: "Please log in or create your account to donate.",
      });
    setDonateOpen(true);
  };

  const closeDonateGift = () => {
    setDonateOpen(false);
    reloadGraves();
  };

  const openGifts = () => {
    setGiftsOpen(true);
  };

  const closeGifts = () => {
    setGiftsOpen(false);
    reloadGraves();
  };

  /*
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
  */

  const tellToComeBackLater = () => {
    showError({ message: "Coming soon!" });
  };

  const backToGYard = () => {
    setRedirect("/");
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <>
      {isGiftsOpen && <Gifts onClose={closeGifts} grave={grave} />}
      <MainInfoCont>
        {isDonateOpen && <DonateGift onClose={closeDonateGift} grave={grave} />}
        <Name>{grave?.name}</Name>
        <TopBar>
          <DateLiving>
            {grave?.born} - {grave?.died}
          </DateLiving>
          <ServiceButtonsWrapper>
            <ServiceButton onClick={backToGYard}>
              BACK TO CEMETERY
            </ServiceButton>
            <ServiceButton onClick={openDonateGift}>DONATE</ServiceButton>
            <ServiceButton onClick={openGifts}>GIFTS</ServiceButton>
            <ServiceButton onClick={tellToComeBackLater}>MUSIC</ServiceButton>
          </ServiceButtonsWrapper>
        </TopBar>
        <TombPhotos grave={grave} />
        <LastWordsContainer>this person's last words were:</LastWordsContainer>
        <LastWords>
          <LogDiagSign>&gt; </LogDiagSign>
          {grave?.lastWords}
        </LastWords>
      </MainInfoCont>
    </>
  );
};

const LogDiagSign = styled.span`
  color: ${colors.secondaryB.hex};
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
      background-color: rgba(0, 0, 0, 0.06);
      box-shadow: 0px 0px 19px 5px rgba(0, 0, 0, 0.1);
    }
  }
`;

const MainInfoCont = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
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
`;

const Name = styled(Text)`
  font-size: 40px;
  flex: 1;
  text-align: left;
`;