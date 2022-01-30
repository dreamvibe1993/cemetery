import React from "react";
import styled from "styled-components/macro";

export const TutorialModal = ({ onClose = () => {} }) => {
  return (
    <DonateGiftCont onClick={onClose}>
      <Announcement>
        Всем привет дамы и господа! <strike>С вами Юрий Хованский</strike>
        <br />В общем это мой небольшой проектик, который я сделал{" "}
        <strike>по-пьяне</strike> за эти выходные.
        <br />
        <strike>Это НФТ кладбище.</strike>
        <br />
        Это "макет" (так сказать, blueprint) НФТ кладбища.
        <br />
        &nbsp;
        <br />
        Что тут можно делать:
        <br />
        1. Похоронить кого-нибудь.
        <br />
        2. Посмотреть его фотографии.
        <br />
        3. Послушать песню под которую "его отпевали".
        <br />
        4. Оставить что-нибудь на блокчейновой могилке: чарочку водки или
        конфетку, или биткоин, а также оставить своё пожелание.
        <br />
        &nbsp;
        <br />
        Может быть я что-то забыл сказать, я не знаю.
        <br />
        &nbsp;
        <br />
        Для продолжения, нажми в любое место (на мониторе).
      </Announcement>
    </DonateGiftCont>
  );
};

const Announcement = styled.span`
  font-size: 28px;
  flex: 1;
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
  text-align: center;
  padding: 40px;
`;
