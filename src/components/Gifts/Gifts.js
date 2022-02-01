import React from "react";
import styled from "styled-components/macro";
import { MainContainer } from "../../lib/css/sc-components/ScComponents";
import { ReactComponent as ChevroneLeft } from "../../media/svg/chevrone.svg";
import { ReactComponent as Vodka } from "../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../media/svg/btc.svg";
import { Tooltip } from "../Tooltip";

export const Gifts = ({ onClose = () => {}, user }) => {
  const [cells, setCells] = React.useState([]);

  const returnGiftSvg = (giftName) => {
    switch (giftName) {
      case "vodka":
        return <Vodka />;
      case "candies":
        return <Candy />;
      case "btc":
        return <BTC />;
      default:
        return null;
    }
  };

  React.useEffect(() => {
    if (!user) return;
    const gifts = Object.keys(user.gifts);
    if (gifts.length > 16) return;
    const cells = new Array(16).fill(null);
    const giftsToShow = gifts
      .map((g) =>
        user.gifts[g].map((ug) => ({
          ...ug,
          giftType: g,
          giftSvg: returnGiftSvg(g),
        }))
      )
      .flat();
    giftsToShow.forEach((gift, i) => {
      cells[i] = gift;
    });
    setCells(cells);
  }, [user]);

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
          {cells.map((cell, i) =>
            cell ? (
              <Tooltip
                direction="bottom"
                content={`By ${cell?.by}. ${cell?.wish}`}
                key={cell?.by}
              >
                <Cell>{cell?.giftSvg}</Cell>
              </Tooltip>
            ) : (
              <Cell key={i + new Date().getTime()} />
            )
          )}
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
