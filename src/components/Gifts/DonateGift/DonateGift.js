import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as ChevroneLeft } from "../../../media/svg/chevrone.svg";
import { ReactComponent as Vodka } from "../../../media/svg/vodka.svg";
import { ReactComponent as Candy } from "../../../media/svg/candy.svg";
import { ReactComponent as BTC } from "../../../media/svg/btc.svg";
import { giftSchema } from "../../../models/yup/yup-schemas";
import { updateGrave } from "../../../api/user";

export const DonateGift = ({ onClose = () => {}, user }) => {
  const [gift, setGift] = React.useState(null);
  const [name, setName] = React.useState("");
  const [wish, setWish] = React.useState("");
  const [errThrown, setErrThrown] = React.useState("");

  const chooseGift = (giftName) => {
    setErrThrown("");
    setGift(giftName);
  };

  const handleNameInput = (e) => {
    setErrThrown("");
    setName(e.target.value);
  };

  const handleWishInput = (e) => {
    setWish(e.target.value);
  };

  const leaveGift = () => {
    const dataToValidate = { gift, name, wish };
    giftSchema
      .validate(dataToValidate)
      .then((val) => {
        updateGrave(dataToValidate, user).then(() => onClose());
      })
      .catch((err) => {
        console.error(err);
        console.trace(err);
        if (err?.params?.path !== "gift" && err?.errors?.length > 0) {
          alert(err.errors[0]);
        }
        setErrThrown(err?.params?.path);
      });
  };

  return (
    <DonateGiftCont>
      <TopPanel>
        <ChevroneLeft onClick={onClose} />
      </TopPanel>
      <ChooseGiftBlock>
        <Header>
          Type your name{" "}
          <Input
            type="text"
            defaultValue={name}
            onChange={handleNameInput}
            errThrown={errThrown === "name"}
          />{" "}
          and choose a gift you'd like to leave on the grave:
        </Header>
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
          Also you can leave some warm words for the donatee{" "}
          <Input
            type="text"
            defaultValue={wish}
            onChange={handleWishInput}
            maxLength={30}
            style={{ flex: 1 }}
            errThrown={errThrown === "wish"}
          />{" "}
          <span style={{ fontSize: "10px" }}>(max 30)</span>
        </WishRow>
        <LEAVE onClick={leaveGift}>LEAVE THE GIFT</LEAVE>
      </ChooseGiftBlock>
    </DonateGiftCont>
  );
};

const WishRow = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: center;
  margin-top: 10px;
`;

const Input = styled.input`
  transition: border 0.5s linear;
  border: ${(p) => (p.errThrown ? "1px solid red" : "none")};
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
  user-select: none;
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
