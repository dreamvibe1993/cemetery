import React from "react";
import styled from "styled-components/macro";

import PMML from "../../media/audio/zemfira-pmml.mp3";

import { ReactComponent as Donate } from "../../media/svg/donate.svg";
import { ReactComponent as Play } from "../../media/svg/play.svg";
import { ReactComponent as Pause } from "../../media/svg/pause.svg";

import { DonateGift } from "../../components/Gifts/DonateGift";
import { Tooltip } from "../../components/Tooltip";
import { reloadGraves } from "../../api/graves";
import { TombPhotos } from "../TombPhotos";

export const TombInfo = ({ grave }) => {
  const [isDonateOpen, setDonateOpen] = React.useState(false);
  const [isSongPlaying, setSongPlaying] = React.useState(false);

  const song = React.useRef(new Audio(PMML));

  const openDonateGift = () => {
    setDonateOpen(true);
  };

  const closeDonateGift = () => {
    setDonateOpen(false);
    reloadGraves();
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

  return (
    <MainInfoCont>
      {isDonateOpen && <DonateGift onClose={closeDonateGift} grave={grave} />}
      <TopBar>
        <Tooltip
          content={"Leave something on the grave \nto honor the deceased."}
          direction="left"
        >
          <Donate onClick={openDonateGift} />
        </Tooltip>
        <Name>{grave?.name}</Name>
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
      <TombPhotos grave={grave} />
      <DateLiving>
        {grave?.born} - {grave?.died}
      </DateLiving>
      <LastWords>{grave?.lastWords}</LastWords>
    </MainInfoCont>
  );
};

const Text = styled.span`
  text-align: center;
  display: block;
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

const MainInfoCont = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
`;

const LastWords = styled(Text)`
  font-size: 30px;
`;

const DateLiving = styled(Text)`
  font-size: 45px;
  margin-top: 15px;
`;

const Name = styled(Text)`
  font-size: 40px;
`;
