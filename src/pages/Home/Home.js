import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import { CemetaryGrid } from "../../components/Cemetery/CemetaryGrid";
import { Preloader } from "../../components/App/Preloader";
import { useLoadGraves } from "../../services/hooks/api/graves/useLoadGraves";

export const Home = () => {
  const [getGraves, cancelGetGravesRequest] = useLoadGraves();
  const { isGravesLoading } = useSelector((state) => state.graves);

  React.useEffect(() => {
    getGraves();
    return () => {
      cancelGetGravesRequest();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isGravesLoading)
    return (
      <LoadingContainer>
        <Preloader />
      </LoadingContainer>
    );

  return <CemetaryGrid />;
};

const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
