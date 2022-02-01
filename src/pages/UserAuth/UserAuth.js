import React from "react";
import styled from "styled-components/macro";
import { ReactComponent as Logo } from "../../media/svg/logo.svg";

export const UserAuth = () => {
  return (
    <ContentContainer>
      <UserAuthContainer>
        <LogoWrapper>
          <Logo />
        </LogoWrapper>
        <Title>Not authorized yet?</Title>
        <LoginInput type="text" placeholder="login"></LoginInput>
        <PasswordInput type="password" placeholder="password"></PasswordInput>
        <LOGIN>LOGIN</LOGIN>
      </UserAuthContainer>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 33%;
  height: 40px;
  background-color: #23a0b0;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  color: #fff;
  border: none;
`;

const LOGIN = styled(Button)`
    margin-top: 20px;
`;

const Input = styled.input`
  width: 50%;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
  margin-bottom: 20px;
  padding: 5px;
  color: #fff;
  font-size: 16px;
`;

const PasswordInput = styled(Input)``;

const LoginInput = styled(Input)``;

const LogoWrapper = styled.div`
  width: 33%;
  margin-bottom: 20px;
  svg {
    height: 100%;
    width: 100%;
  }
`;

const Title = styled.span`
  font-size: 36px;
  margin-bottom: 20px;
`;

const UserAuthContainer = styled.div`
  padding: 40px 20px;
  width: 900px;
  margin: 10px auto;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
