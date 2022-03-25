import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

import PhotoPlaceholder from "../../media/img/common/user_photo_placeholder.jpg";

import {
  Input,
  ServiceButton,
} from "../../components/css/sc-components/ScComponents";
import { colors } from "../../configs/css/colors";
import { ORIGIN, routes } from "../../configs/urls/app/app-urls";
import { getUser, updateUser } from "../../api/user";
import { showError } from "../../services/errors/showError";
import { Preloader } from "../../components/Preloader";
import { compressPhotos } from "../../services/data-transformation/converting";
import { updateUserPhotos } from "../../redux/user/userReducer";
import { profileSchema } from "../../models/yup/yup-schemas";
import { updatePhotos } from "../../api/photos";
import { PHOTOS_API_URL } from "../../configs/urls/api/api-urls";
import { setUnsavedDataStatus } from "../../redux/app/appReducer";
import { Picture } from "../../components/Picture/Picture";
import { Gallery } from "../../components/Gallery";

export const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuth, isUserLoading } = useSelector((state) => state.user);

  const [redirect, setRedirect] = React.useState(null);
  const [picBlobArr, setPicBlobArr] = React.useState(null);
  const [name, setName] = React.useState(user.username);
  const [email, setEmail] = React.useState();
  const [userPhotoSrc, setUserPhotoSrc] = React.useState(null);

  React.useEffect(() => {
    if (isAuth) return;
    getUser().catch((e) => {
      showError(e.response.data);
      setRedirect(routes.auth.origin);
    });
  }, [isAuth]);

  React.useEffect(() => {
    if (!isAuth) return;
    setName(user.username);
    setEmail(user.email);
  }, [isAuth, user.email, user.username]);

  React.useEffect(() => {
    if (!isAuth) return;
    if (user.username !== name || user.email !== email || picBlobArr !== null) {
      dispatch(setUnsavedDataStatus(true));
      return;
    }
    dispatch(setUnsavedDataStatus(false));
  }, [dispatch, email, name, picBlobArr, isAuth, user.email, user.username]);

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
        dispatch(setUnsavedDataStatus(false));
        updateUser({ name, email, photos: userPics });
      })
      .catch((e) => {
        showError(e);
      });
  };

  const showUserPhoto = (src) => {
    if (!src) return;
    setUserPhotoSrc(src);
  };

  const closeUserPhoto = () => {
    setUserPhotoSrc(null);
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isUserLoading) return <Preloader />;

  return (
    <ProfileContainer>
      {userPhotoSrc && <Gallery src={userPhotoSrc} onClose={closeUserPhoto} />}
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
      <Row style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
        <Picture
          src={user?.photos[0] || PhotoPlaceholder}
          showPhoto={() => showUserPhoto(user?.photos[0])}
          sizes={{ width: 130, height: 190 }}
        />
        <CredsContainer>
          <UserPersonalInfo>
            <Row>
              <UsernameInput
                type="text"
                value={name}
                placeholder="Type your name here"
                onChange={changeUsername}
              />
            </Row>
            <Row>
              <UsernameInput
                type="email"
                value={email}
                placeholder="Type your name here"
                onChange={changeUserEmail}
              />
            </Row>
          </UserPersonalInfo>
          <RowEnd>
            <ServiceButton onClick={saveUserProfile}>
              SAVE PROFILE
            </ServiceButton>
            <ServiceButton>CHANGE PASSWORD</ServiceButton>
          </RowEnd>
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
