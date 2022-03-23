import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";

import PhotoPlaceholder from "../../media/img/common/user_photo_placeholder.jpg";

import {
  Input,
  ServiceButton,
} from "../../components/css/sc-components/ScComponents";
import { colors } from "../../configs/css/colors";
import { Navigate } from "react-router-dom";
import { ORIGIN, routes } from "../../configs/urls/app/app-urls";
import { getUser, updateUser } from "../../api/user";
import { showError } from "../../services/errors/showError";
import { Preloader } from "../../components/Preloader";
import { compressPhotos } from "../../services/data-transformation/converting";
import { updateUserPhotos } from "../../redux/user/userReducer";
import { profileSchema } from "../../models/yup/yup-schemas";
import { updatePhotos } from "../../api/photos";
import { PHOTOS_API_URL } from "../../configs/urls/api/api-urls";


export const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuth, isUserLoading } = useSelector((state) => state.user);

  const [redirect, setRedirect] = React.useState(null);
  const [picBlobArr, setPicBlobArr] = React.useState(null);
  const [name, setName] = React.useState(user.username);
  const [email, setEmail] = React.useState();

  React.useEffect(() => {
    getUser().catch((e) => {
      showError(e.response.data);
      setRedirect(routes.auth.origin);
    });
  }, [isAuth]);

  React.useEffect(() => {
    if (user) {
      setName(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const changeUsername = (e) => {
    setName(e.target.value);
  };

  const changeUserEmail = (e) => {
    setEmail(e.target.value);
  };

  const createPhotosBlobs = async (e) => {
    try {
      const ph = await compressPhotos(e);
      setPicBlobArr(ph);
      dispatch(updateUserPhotos([ph[0].url]));
    } catch (e) {
      console.error(e);
      console.trace(e);
      showError(e.response.data || e);
    }
  };

  const saveUserProfile = async () => {
    profileSchema
      .validate({
        name,
        email,
      })
      .then(async () => {
        let userPics = user.photos;
        if (picBlobArr) {
          const res = await updatePhotos(
            picBlobArr,
            ORIGIN + PHOTOS_API_URL + "/user"
          );
          userPics = res.data.photos;
        }
        updateUser({ name, email, photos: userPics });
      })
      .catch((e) => {
        showError(e);
      });
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isUserLoading) return <Preloader />;

  return (
    <ProfileContainer>
      <Row>
        <MainUsername>{user.username}</MainUsername>
        <ServiceButton>
          CHANGE PHOTO
          <ChangePhotoInput
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => createPhotosBlobs(e)}
          />
        </ServiceButton>
      </Row>
      <Row>
        <PhotoWrapper>
          <UserPhoto src={user?.photos[0] || PhotoPlaceholder} />
        </PhotoWrapper>
      </Row>
      <Row>
        <InputTitle>Your name</InputTitle>
        <UsernameInput
          type="text"
          value={name}
          placeholder="Type your name here"
          onChange={changeUsername}
        />
      </Row>
      <Row>
        <InputTitle>Your email</InputTitle>
        <UsernameInput
          type="email"
          value={email}
          placeholder="Type your name here"
          onChange={changeUserEmail}
        />
      </Row>
      <RowEnd>
        <ServiceButton onClick={saveUserProfile}>SAVE PROFILE</ServiceButton>
        <ServiceButton>CHANGE PASSWORD</ServiceButton>
      </RowEnd>
    </ProfileContainer>
  );
};

const ChangePhotoInput = styled.input`
  position: absolute;
  width: 128px;
  height: 35px;
  opacity: 0;
  top: 0;
  left: 0;
  cursor: pointer;
`;

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
