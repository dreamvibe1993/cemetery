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
        <Header>
          Type your name <NameInput /> and choose a gift you'd like to leave on
          the grave
        </Header>
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
        <LEAVE>LEAVE</LEAVE>
      </ChooseGiftBlock>
    </DonateGiftCont>
  );
};

const NameInput = styled.input`
  border: 1px solid black;
  background-color: rgba(0, 0, 0, 0.2);
  height: 20px;
  margin: 0px 5px;
  color: white;
`;

const LEAVE = styled.div`
  width: 300px;
  height: 40px;
  background-color: #1a6e6b;
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.1s linear;
  &:hover {
    background-color: #165c59;
  }
  &:active {
    background-color: #114745;
  }
`;

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
  position: relative;
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
