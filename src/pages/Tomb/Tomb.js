import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { MainContainer } from "../../components/css/sc-components/ScComponents";

// import PMML from "../../media/audio/zemfira-pmml.mp3";

import { Tooltip } from "../../components/Tooltip";
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
      <Monument>
        <TombInfo grave={grave} />
        <TombChatLogs grave={grave} />
        <Tooltip
          content={"Gifts people left to honor the person laying here."}
          direction="top"
        ></Tooltip>
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
  position: relative;
  svg {
    /* fill: ${colors.secondaryB.hex}; */
  }
`;
