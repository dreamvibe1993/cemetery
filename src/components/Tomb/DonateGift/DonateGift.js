import React from "react";
import styled from "styled-components/macro";
import { useSelector } from "react-redux";

import { ReactComponent as Vodka } from "../../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../../media/svg/btc.svg";
import { giftSchema } from "../../../models/yup/yup-schemas";
import { updateGrave } from "../../../api/graves";
import { showError } from "../../../services/errors/showError";
import { colors } from "../../../configs/css/colors";
import { ServiceButton } from "../../css/sc-components/ScComponents";

export const DonateGift = ({ onClose = () => {}, grave }) => {
  const { user } = useSelector((state) => state.user);
  const [gift, setGift] = React.useState("");
  const [wish, setWish] = React.useState("");
  const [errThrown, setErrThrown] = React.useState("");

  const chooseGift = (giftName) => {
    setErrThrown("");
    setGift(giftName);
  };

  const handleWishInput = (e) => {
    setWish(e.target.value);
  };

  const leaveGift = () => {
    const dataToValidate = { gift, name: user.username, wish };
    giftSchema
      .validate(dataToValidate)
      .then(() => {
        updateGrave(dataToValidate, grave).then(() => onClose());
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        showError({ message: err.errors[0] });
        setErrThrown(err?.params?.path);
      });
  };

  return (
    <DonateGiftCont>
      <ChooseGiftBlock>
        <ButtonsRow>
          <ServiceButton onClick={onClose}>BACK TO THE TOMB</ServiceButton>
          <ServiceButton onClick={leaveGift}>LEAVE THE GIFT</ServiceButton>
        </ButtonsRow>
        <GiftsRow errThrown={errThrown === "gift"}>
          <Gift onClick={() => chooseGift("vodka")} chosen={gift === "vodka"}>
            <Vodka />
          </Gift>
          <Gift
            onClick={() => chooseGift("candies")}
            chosen={gift === "candies"}
          >
            <Candy />
          </Gift>
          <Gift onClick={() => chooseGift("btc")} chosen={gift === "btc"}>
            <BTC />
          </Gift>
        </GiftsRow>
        <WishRow>
          <Input
            type="text"
            defaultValue={wish}
            onChange={handleWishInput}
            placeholder="LEAVE YOUR MESSAGE HERE"
            maxLength={30}
            style={{ flex: 1 }}
            errThrown={errThrown === "wish"}
          />
        </WishRow>
      </ChooseGiftBlock>
    </DonateGiftCont>
  );
};

const ButtonsRow = styled.div`
  display: flex;
  & > * {
    &:not(:first-child) {
      margin-left: 5px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.4);
    }
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const WishRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0px;
  width: 100%;
`;

const Input = styled.input`
  transition: border 0.5s linear;
  border: ${(p) => (p.errThrown ? "1px solid red" : "none")};
  background-color: rgba(0, 0, 0, 0.2);
  padding: 10px;
  color: white;
  width: 100%;
  flex: 1;
`;

const Gift = styled.div`
  background-color: rgba(0, 0, 0, ${(p) => (p.chosen ? 0.1 : 0.3)});
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
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const GiftsRow = styled.div`
  transition: border 0.5s linear;
  width: 100%;
  display: flex;
  align-items: stretch;
  margin-top: 10px;
  border: ${(p) => (p.errThrown ? "1px solid red" : "none")};
  & > * {
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const ChooseGiftBlock = styled.div`
  width: 750px;
  background-color: ${colors.secondaryB.hex};
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
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;
