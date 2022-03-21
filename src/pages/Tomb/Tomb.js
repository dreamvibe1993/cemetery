import React from "react";
import styled from "styled-components/macro";
import { MainContainer } from "../../components/css/sc-components/ScComponents";

// import PMML from "../../media/audio/zemfira-pmml.mp3";

import { ReactComponent as ChevroneLeft } from "../../media/svg/chevrone.svg";

import { Gifts } from "../../components/Gifts";
import { Navigate } from "react-router-dom";
import { Tooltip } from "../../components/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { Preloader } from "../../components/Preloader";
import { colors } from "../../configs/css/colors";
import { TombChatLogs } from "../../components/TombChatLogs";
import { TombInfo } from "../../components/TombInfo";
import { setGravesLoadingOver } from "../../redux/graves/gravesReducer";
import { reloadGraves } from "../../api/graves";

export const Tomb = () => {
  const { graves, isGravesLoading } = useSelector((state) => state.graves);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = React.useState(null);
  const [grave, setGrave] = React.useState(null);
  const [isGiftsOpen, setGiftsOpen] = React.useState(false);

  const closeGifts = () => {
    setGiftsOpen(false);
    reloadGraves();
  };

  const openGifts = () => {
    setGiftsOpen(true);
  };

  React.useEffect(() => {
    reloadGraves();
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

  const backToGYard = () => {
    setRedirect("/");
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isGravesLoading)
    return (
      <MainContainer bgCol="rgb(49, 46, 68)">
        <LoadingContainer>
          <Preloader />
        </LoadingContainer>
      </MainContainer>
    );

  return (
    <>
      {isGiftsOpen && <Gifts onClose={closeGifts} grave={grave} />}

      <TopPanel>
        <ChevroneLeft onClick={backToGYard} />
      </TopPanel>
      <Monument>
        <TombInfo grave={grave} />
        <TombChatLogs grave={grave} />
        <Tooltip
          content={"Gifts people left to honor the person laying here."}
          direction="top"
        >
          <OpenGiftsButton onClick={openGifts}>
            <span>Gifts</span>
          </OpenGiftsButton>
        </Tooltip>
      </Monument>
    </>
  );
};

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

const OpenGiftsButton = styled.div`
  transition: all 0.2s linear;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  font-size: 24px;
  padding: 15px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Monument = styled.div`
  width: 60vw;
  background-color: ${colors.primary.rgba(0.6)};
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
  svg {
    fill: ${colors.secondaryB.hex};
  }
`;
