import React from "react";
import styled from "styled-components/macro";
import { MainContainer } from "../../sc-components/ScComponents";
import Deceased from "../../img/common/user_photo.png";

export const Tomb = () => {
  return (
    <MainContainer>
      <Monument>
        <Name>Test Test</Name>
        <PhotoCont>
          <Photo src={Deceased} />
        </PhotoCont>
        <DateLiving>19.19.1999 - 19.19.1999</DateLiving>
        <PhotosCont></PhotosCont>
        <LastWords>Perfect time to die you filthy bastards!</LastWords>
        <GiftsCont>
          <Log>
            <LogEntry>&gt; Lisa left 1.25 BTC for Test Test.</LogEntry>
            <LogEntry>&gt; Mark left left a Candy for Test Test.</LogEntry>
            <LogEntry>
              &gt; Cynthia left a message: RIP God rest your soul ashes to ashes
              dust to dust ashes to ashes dust to dust ashes to ashes dust to
              dust
            </LogEntry>
          </Log>
        </GiftsCont>
      </Monument>
    </MainContainer>
  );
};

const LogEntry = styled.span`
  display: block;
`;

const Log = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const Text = styled.span`
  text-align: center;
  display: block;
`;

const Photo = styled.img`
  object-fit: contain;
  height: 100%;
`;

const GiftsCont = styled.span`
  flex: 1;
`; //left a candy; left 1.25 btc

const LastWords = styled(Text)`
  font-size: 30px;
`;

const PhotosCont = styled.div``;

const DateLiving = styled(Text)`
  font-size: 45px;
`;

const PhotoCont = styled.div`
  max-height: 330px;
  display: flex;
  justify-content: center;
`;

const Name = styled(Text)`
  font-size: 60px;
`;

const Monument = styled.div`
  width: 80%;
  height: 100%;
  margin: 0 auto;
  background-color: gray;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
