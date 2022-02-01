import React from "react";
import styled from "styled-components/macro";
import { loadGraves } from "../../api/user";
import { CemetaryGrid } from "../../components/CemetaryGrid";
import { MainContainer } from "../../lib/css/sc-components/ScComponents";
import { Preloader } from "../../components/Preloader";

export const Home = () => {
  const [isLoading, setLoading] = React.useState(true);

  const unsub = React.useRef(() => {});

  React.useEffect(() => {
    loadGraves().then((unsubFn) => {
      unsub.current = unsubFn;
      setLoading(false);
    });
    return () => {
      // unsub.current();
    };
  }, []);

  if (isLoading)
    return (
      <MainContainer bgCol="rgb(49, 46, 68)">
        <LoadingContainer>
          <Preloader />
        </LoadingContainer>
      </MainContainer>
    );

  return (
    <MainContainer bgCol="rgb(49, 46, 68)">
      <CemetaryGrid />
    </MainContainer>
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
