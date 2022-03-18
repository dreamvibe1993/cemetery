import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import { loadGraves } from "../../api/graves";
import { CemetaryGrid } from "../../components/CemetaryGrid";
import { Preloader } from "../../components/Preloader";

export const Home = () => {
  const { isGravesLoading } = useSelector((state) => state.graves);

  React.useEffect(() => {
    loadGraves();
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
