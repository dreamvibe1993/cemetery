import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components/macro";

import PhotoPlaceholder from "../../media/img/common/user_photo_placeholder.jpg";

import {
  Input,
  ServiceButton,
} from "../../components/css/sc-components/ScComponents";
import { colors } from "../../configs/css/colors";
import { Navigate } from "react-router-dom";
import { routes } from "../../configs/urls/app/app-urls";
import { getUser } from "../../api/user";
import { showError } from "../../services/errors/showError";
import { Preloader } from "../../components/Preloader";

export const Profile = () => {
  const { user, isAuth, isUserLoading } = useSelector((state) => state.user);
  const [redirect, setRedirect] = React.useState(null);

  React.useEffect(() => {
    getUser().catch((e) => {
      showError(e.response.data);
      setRedirect(routes.auth.origin);
    });
  }, [isAuth]);

  if (redirect) return <Navigate to={redirect} />;

  if (isUserLoading) return <Preloader />

  return (
    <ProfileContainer>
      <Row>
        <MainUsername>{user.username}</MainUsername>
        <ServiceButton>CHANGE PHOTO</ServiceButton>
      </Row>
      <Row>
        <PhotoWrapper>
          <UserPhoto src={(user?.photos && user?.photos[0]) || PhotoPlaceholder} />
        </PhotoWrapper>
      </Row>
      <Row>
        <InputTitle>Your name</InputTitle>
        <UsernameInput
          type="text"
          value={user.username}
          placeholder="Type your name here"
        />
      </Row>
      <Row>
        <InputTitle>Your email</InputTitle>
        <UsernameInput
          type="email"
          value={user.email}
          placeholder="Type your name here"
        />
      </Row>
      <RowEnd>
        <ServiceButton>SAVE PROFILE</ServiceButton>
        <ServiceButton>CHANGE YOUR PASSWORD</ServiceButton>
      </RowEnd>
    </ProfileContainer>
  );
};

const PhotoWrapper = styled.div`
  height: 150px;
  width: 21%;
  overflow: hidden;
`;

const UserPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  input {
    width: 78%;
  }
`;

const RowEnd = styled(Row)`
  justify-content: flex-end;
  & > * {
    margin-left: 10px;
  }
`;

const MainUsername = styled.span`
  font-size: 36px;
`;

const InputTitle = styled.span``;

const UsernameInput = styled(Input)``;

const ProfileContainer = styled.div`
  padding: 20px;
  width: 66vw;
  background-color: ${colors.primary.rgba(0.5)};
  display: flex;
  flex-direction: column;
`;
