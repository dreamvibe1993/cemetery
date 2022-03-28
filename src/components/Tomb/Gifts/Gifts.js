import React from "react";
import styled from "styled-components/macro";
import { ServiceButton } from "../../css/sc-components/ScComponents";
import { ReactComponent as Vodka } from "../../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../../media/svg/btc.svg";
import { Tooltip } from "../../App/Tooltip";
import { colors } from "../../../configs/css/colors";

export const Gifts = ({ onClose = () => {}, grave }) => {
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
    if (!grave) return;
    const gifts = Object.keys(grave.gifts);
    if (gifts.length > 16) return;
    const cells = new Array(16).fill(null);
    const giftsToShow = gifts
      .map((gift) =>
        grave.gifts[gift].map((giftOnTheGrave) => ({
          ...giftOnTheGrave,
          giftType: gift,
          giftSvg: returnGiftSvg(gift),
        }))
      )
      .flat();
    giftsToShow.forEach((gift, i) => {
      cells[i] = gift;
    });
    setCells(cells);
  }, [grave]);

  return (
    <GiftsCont>
      <GiftsGridWrapper>
        <ServiceButton onClick={onClose}>BACK</ServiceButton>
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
      </GiftsGridWrapper>
    </GiftsCont>
  );
};

const Cell = styled.div`
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GiftsGridWrapper = styled.div`
  padding: 20px;
  background-color: ${colors.secondaryB.rgba(1)};
  button {
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 170px);
  grid-template-rows: repeat(4, 170px);
  grid-gap: 10px;
  margin-top: 10px;
`;

const GiftsCont = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;
