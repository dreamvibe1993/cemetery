import React from "react";
import styled from "styled-components/macro";
import { ServiceButton } from "../../css/sc-components/ScComponents";
import { ReactComponent as Vodka } from "../../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../../media/svg/btc.svg";
import { Tooltip } from "../../HOCs/Tooltip";
import { FadeIn } from "../../../configs/css/animations";
import { Backdrop } from "../../App/Backdrop";
import { deviceMax, deviceMin } from "../../../configs/css/breakpoints";

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
    <>
      <Backdrop onClick={onClose} />
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
    </>
  );
};

const Cell = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(p) => p.theme.contrastB.rgba(0.1)};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  overflow: hidden;
  cursor: pointer;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const GiftsGridWrapper = styled.div`
  padding: 20px;
  background-color: ${(p) => p.theme.primary.hex};
  position: absolute;
  z-index: 1001;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${FadeIn} 0.2s linear forwards;
  @media ${deviceMax.mobileL} {
    width: calc(100% - 20px);
  }
  @media ${deviceMax.tablet} and ${deviceMin.mobileL} {
    width: calc(100vw - 40px);
    padding: 10px;
    padding-bottom: 40px;
  }
`;

const GiftsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 170px);
  grid-template-rows: repeat(4, 170px);
  grid-gap: 10px;
  margin-top: 10px;
  @media ${deviceMax.mobileL} {
    padding: 10px;
    width: 100%;
    grid-template-columns: repeat(4, calc(100% / 4));
    grid-template-rows: repeat(4, calc(100vh / 6));
    justify-content: space-around;
  }
  @media ${deviceMax.tablet} and ${deviceMin.mobileL} {
    grid-template-columns: repeat(4, calc(100vw / 5));
    grid-template-rows: repeat(4, calc(100vh / 5));
    justify-content: center;
  }
`;
