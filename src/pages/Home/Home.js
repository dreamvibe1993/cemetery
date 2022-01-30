import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";
import { loadUsers } from "../../api/user";
import { CemetaryGrid } from "../../components/CemetaryGrid";
import { MainContainer } from "../../sc-components/ScComponents";
import { Preloader } from "../../components/Preloader";

export const Home = () => {
  const { users } = useSelector((state) => state.user);
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadUsers().then(() => {
      setLoading(false);
    });
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
