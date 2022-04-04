import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components/macro";

import { sendChangePassEmail } from "../../../api/user";
import { FadeIn } from "../../../configs/css/animations";
import { setNotification } from "../../../redux/app/appReducer";
import { Input, ServiceButton } from "../../css/sc-components/ScComponents";

export const FPassEmailModal = ({ onClose = () => {} }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");

  const handleEmailInput = (e) => {
    setEmail(e.target.value);
  };

  const sendEmail = () => {
    sendChangePassEmail(email)
      .then(() => {
        dispatch(
          setNotification({
            text: `The password update link has been sent to ${email}.`,
            withOptions: false,
          })
        );
      })
      .finally(onClose);
  };

  return (
    <Container>
      <EmailInputBox>
        <EmailInput
          type="email"
          placeholder="Type your email here please."
          onChange={handleEmailInput}
          value={email}
        />
        <ServiceButton onClick={sendEmail}>SUBMIT</ServiceButton>
      </EmailInputBox>
    </Container>
  );
};

const EmailInput = styled(Input)`
  margin-right: 10px;
`;

const EmailInputBox = styled.div`
  width: 50vw;
  max-width: 600px;
  min-width: 355px;
  padding: 20px;
  background-color: ${p => p.theme.secondaryB.rgba(0.8)};
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: stretch;
`;

const Container = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: ${p => p.theme.contrastB.rgba(0.8)};
  animation: ${FadeIn} 0.2s linear forwards;
`;
