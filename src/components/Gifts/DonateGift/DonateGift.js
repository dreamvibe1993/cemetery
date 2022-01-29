import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as ChevroneLeft } from "../../../media/svg/chevrone.svg";
import { ReactComponent as Vodka } from "../../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../../media/svg/btc.svg";

export const DonateGift = ({ onChoose = () => {}, onClose = () => {} }) => {
  return (
    <DonateGiftCont>
      <TopPanel>
        <ChevroneLeft onClick={onClose} />
      </TopPanel>
      <ChooseGiftBlock>
        <Header>Choose a gift you'd like to leave on the grave</Header>
        <GiftsRow>
          <Gift onClick={() => onChoose(1)}>
            <Vodka />
          </Gift>
          <Gift onClick={() => onChoose(2)}>
            <Candy />
          </Gift>
          <Gift onClick={() => onChoose(3)}>
            <BTC />
          </Gift>
        </GiftsRow>
      </ChooseGiftBlock>
    </DonateGiftCont>
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

const Gift = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  transition: all 0.2s linear;
  align-items: stretch;
  padding: 10px;
  flex: 1;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const GiftsRow = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  margin-top: 10px;
  & > * {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const Header = styled.span`
  display: block;
`;

const ChooseGiftBlock = styled.div`
  width: 750px;
  background-color: #4c593e;
  padding: 15px;
  display: flex;
  flex-direction: column;
`;

const DonateGiftCont = styled.div`
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
