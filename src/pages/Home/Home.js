import React from "react";
import styled from "styled-components/macro";

import { loadGraves } from "../../api/graves";
import { CemetaryGrid } from "../../components/CemetaryGrid";
import { MainContainer } from "../../components/css/sc-components/ScComponents";
import { Preloader } from "../../components/Preloader";

export const Home = () => {
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadGraves().then(() => {
      setLoading(false);
    });
  }, []);

  if (isLoading)
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
