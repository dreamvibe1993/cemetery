import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Preloader } from "../../components/App/Preloader";
import { device } from "../../configs/css/breakpoints";

import { ReactComponent as Cross } from "../../media/svg/cross.svg";
import { PassChange } from "../UserAuth/PassChange/PassChange";

export const PasswordChange = () => {
  const { isUserLoading } = useSelector((state) => state.user);

  if (isUserLoading) return <Preloader />;

  return (
    <ContentContainer>
      <UserAuthContainer>
        <CrossSVGWrapper>
          <Cross onClick={() => {}} />
        </CrossSVGWrapper>
        <PassChange />
      </UserAuthContainer>
    </ContentContainer>
  );
};

const CrossSVGWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  cursor: pointer;
  svg {
    width: 14px;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserAuthContainer = styled.div`
  padding: 40px 20px;
  width: 900px;
  margin: 10px auto;
  background-color: ${p => p.theme.contrastB.rgba(0.2)};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  @media ${device.mobileL} {
    width: calc(100vw - 20px);
    padding: 10px;
  }
`;
