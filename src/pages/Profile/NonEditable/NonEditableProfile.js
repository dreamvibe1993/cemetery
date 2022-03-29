import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

import PhotoPlaceholder from "../../../media/img/common/user_photo_placeholder.jpg";

import {
  Input,
} from "../../../components/css/sc-components/ScComponents";
import { colors } from "../../../configs/css/colors";
import { Picture } from "../../../components/App/Picture/Picture";
import { Gallery } from "../../../components/App/Gallery";

export const NonEditableProfile = ({user}) => {
  const [redirect, setRedirect] = React.useState(null);
  const [userPhotoSrc, setUserPhotoSrc] = React.useState(null);

  const showUserPhoto = (src) => {
    if (!src) return;
    setUserPhotoSrc(src);
  };

  const closeUserPhoto = () => {
    setUserPhotoSrc(null);
  };

  if (redirect) return <Navigate to={redirect} />;

  return (
    <ProfileContainer>
      {userPhotoSrc && <Gallery src={userPhotoSrc} onClose={closeUserPhoto} />}
      <Row>
        <MainUsername>{user.username}</MainUsername>
      </Row>
      <Row style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Picture
          src={
            (Array.isArray(user?.photos) && user?.photos[0]) || PhotoPlaceholder
          }
          showPhoto={() => showUserPhoto(user?.photos[0])}
          sizes={{ width: 130, height: 190 }}
        />
        <CredsContainer>
          <UserPersonalInfo>
            <Row>
              <UsernameInput
                type="text"
                value={user.name}
                placeholder="Type your name here"
                readOnly={true}
              />
            </Row>
          </UserPersonalInfo>
        </CredsContainer>
      </Row>
    </ProfileContainer>
  );
};

const UserPersonalInfo = styled.div``;

const CredsContainer = styled.div`
  padding-left: 20px;
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ChangePhotoInput = styled.input`
  position: absolute;
  width: 128px;
  height: 35px;
  opacity: 0;
  top: 0;
  left: 0;
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const RowEnd = styled(Row)`
  justify-content: flex-end;
  margin-bottom: 0px;
  & > * {
    margin-left: 10px;
  }
`;

const MainUsername = styled.span`
  font-size: 32px;
  text-transform: uppercase;
  line-height: 0;
  font-weight: bolder;
`;

const UsernameInput = styled(Input)`
  width: 100%;
`;

const ProfileContainer = styled.div`
  padding: 20px;
  padding-bottom: 0px;
  width: 66vw;
  background-color: ${colors.primary.rgba(0.5)};
  display: flex;
  flex-direction: column;
  max-width: 600px;
`;
