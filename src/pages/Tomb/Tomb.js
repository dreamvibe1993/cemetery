import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// import PMML from "../../media/audio/zemfira-pmml.mp3";

import { Preloader } from "../../components/App/Preloader";
import { TombChatLogs } from "../../components/Tomb/TombChatLogs";
import { TombInfo } from "../../components/Tomb/TombInfo";
import { setGravesLoadingOver } from "../../redux/graves/gravesReducer";
import { FadeIn } from "../../configs/css/animations";
import { useLoadGraves } from "../../services/hooks/api/graves/useLoadGraves";

export const Tomb = () => {
  const [getGraves, cancelGetGravesRequest] = useLoadGraves();
  const { graves, isGravesLoading } = useSelector((state) => state.graves);
  const dispatch = useDispatch();

  const [redirect, setRedirect] = React.useState(null);
  const [grave, setGrave] = React.useState(null);

  React.useEffect(() => {
    getGraves();
    return () => {
      cancelGetGravesRequest();
    }  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (isGravesLoading) return <Preloader />;

  return (
    <>
      <Monument>
        <TombInfo grave={grave} />
        <TombChatLogs grave={grave} />
      </Monument>
    </>
  );
};

const Monument = styled.div`
  width: 60vw;
  min-width: 650px;
  background-color: ${p => p.theme.primary.rgba(1)};
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 2px;
  box-shadow: 0px 0px 20px 1px ${p => p.theme.contrastB.rgba(0.2)};
  position: relative;
  z-index: 999;
  animation: ${FadeIn} .2s linear forwards;
  svg {
    /* fill: ${p => p.theme.secondaryB.hex}; */
  }
`;
