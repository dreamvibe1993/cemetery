import React from "react";
import styled from "styled-components/macro";
import { MainContainer } from "../../sc-components/ScComponents";
import { ReactComponent as ChevroneLeft } from "../../media/svg/chevrone.svg";
import { ReactComponent as Vodka } from "../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../media/svg/btc.svg";
import { Tooltip } from "../Tooltip";

export const Gifts = ({ onClose = () => {} }) => {
  return (
    <GiftsCont>
      <TopPanel>
        <ChevroneLeft onClick={onClose} />
      </TopPanel>
      <MainContainer
        bgCol="#4c593e"
        style={{ width: "750px", height: "750px" }}
      >
        <GiftsGrid>
          <Tooltip
            direction="bottom"
            content="By Lisa. We will always remember you."
          >
            <Cell>
              <Vodka />
            </Cell>
          </Tooltip>
          <Tooltip direction="bottom" content="By Mark. R.I.P. friend.">
            <Cell>
              <Candy />{" "}
            </Cell>
          </Tooltip>
          <Tooltip
            direction="bottom"
            content="By Judith. I hope this sum will help."
          >
            <Cell>
              <BTC />
            </Cell>
          </Tooltip>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
          <Cell></Cell>
        </GiftsGrid>
      </MainContainer>
    </GiftsCont>
  );
};

const TopPanel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  z-index: 99999999999;
  padding: 40px 0px 0px 40px;
  svg {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    box-shadow: 0px 0px 20px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Cell = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GiftsGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 170px);
  grid-template-rows: repeat(4, 170px);
  grid-gap: 10px;
`;

const GiftsCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 9999999999999 !important;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
