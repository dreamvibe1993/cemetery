import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

import {
  Input,
  ServiceButton,
} from "../../../components/css/sc-components/ScComponents";
import { ORIGIN, routes } from "../../../configs/urls/app/app-urls";
import { getMe, updateMe } from "../../../api/user";
import { showError } from "../../../services/errors/showError";
import { Preloader } from "../../../components/App/Preloader";
import {
  compressPhotos,
  contactsFromB2F,
  contactsFromF2B,
} from "../../../services/data-transformation/converting";
import { updateUserPhotos } from "../../../redux/user/userReducer";
import { profileSchema } from "../../../models/yup/yup-schemas";
import { updatePhotos } from "../../../api/photos";
import { PHOTOS_API_URL } from "../../../configs/urls/api/api-urls";
import { setUnsavedDataStatus } from "../../../redux/app/appReducer";
import { Picture } from "../../../components/App/Picture/Picture";
import { Gallery } from "../../../components/App/Gallery";
import { ProfileContainer } from "../Common/Common";
import { defaultPlatforms } from "../../../configs/profile/defaultPlarforms";
import { useDeleteMe } from "../../../services/hooks/api/user/useDeleteMe";
import { deviceMax } from "../../../configs/css/breakpoints";

export const MyProfile = () => {
  const [deleteMyProfile] = useDeleteMe();
  const dispatch = useDispatch();
  const { user, isAuth, isUserLoading } = useSelector((state) => state.user);

  const [isAdditInpShow, setAdditInpShow] = React.useState(false);
  const [redirect, setRedirect] = React.useState(null);
  const [picBlobArr, setPicBlobArr] = React.useState(null);
  const [name, setName] = React.useState(user.username);
  const [email, setEmail] = React.useState("");
  const [userPhotoSrc, setUserPhotoSrc] = React.useState("");
  const [contacts, setContacts] = React.useState({});
  const [extraPlatform, setExtraPlatform] = React.useState(undefined);
  const [extraLink, setExtraLink] = React.useState(undefined);

  React.useEffect(() => {
    if (isAuth) return;
    getMe(function (e) {
      showError(e.response.data);
      setRedirect(routes.auth.origin);
    });
  }, [isAuth]);

  React.useEffect(() => {
    if (!isAuth) return;
    setName(user.username);
    setEmail(user.email);
  }, [isAuth, user.contacts, user.email, user.username]);

  React.useEffect(() => {
    if (!isAuth) return;
    const ucontacts = contactsFromB2F(user.contacts);
    setContacts(ucontacts);
    for (let contact in ucontacts) {
      if (!defaultPlatforms.includes(contact)) {
        setExtraLink(ucontacts[contact]);
        setExtraPlatform(contact);
        setAdditInpShow(true);
        setContacts((prev) => {
          prev[contact] = undefined;
          return prev;
        });
      }
    }
  }, [isAuth, user.contacts]);

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

  const setUserContacts = (e) => {
    if (!e.target.id) return;
    const id = e.target.id;
    const value = e.target.value.trim();
    setContacts((prev) => {
      prev = { ...prev };
      prev[id] = value;
      return prev;
    });
  };

  const handleAdditInput = () => {
    setAdditInpShow((prev) => !prev);
  };

  const addAditionalContactLink = (e) => {
    if (!isAdditInpShow) return;
    setExtraLink(e.target.value.trim());
  };

  const addAditionalContactPlatform = (e) => {
    if (!isAdditInpShow) return;
    setExtraPlatform(e.target.value.trim());
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

  const saveUserProfile = async (e) => {
    e.preventDefault();
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
        const extra = {};
        if (extraPlatform && extraLink) extra[extraPlatform] = extraLink;
        let contactsUpdated = contactsFromF2B({ ...contacts, ...extra });
        dispatch(setUnsavedDataStatus(false));
        updateMe({
          name,
          email,
          photos: userPics,
          contacts: contactsUpdated,
        });
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

  const goToMyProfilePreview = () => {
    setRedirect(routes.profile.origin + `?id=${user.id}&preview=true`);
  };

  if (redirect) return <Navigate to={redirect} />;

  if (isUserLoading) return <Preloader />;

  return (
    <>
      {userPhotoSrc && <Gallery src={userPhotoSrc} onClose={closeUserPhoto} />}
      <ProfileContainer onSubmit={(e) => saveUserProfile(e)}>
        <Row>
          <MainUsername>{user.username}</MainUsername>
          <ServiceButton>
            CHANGE PHOTO
            <ChangePhotoInput
              type="file"
              accept="image/*"
              multiple
              readOnly
              onChange={(e) => createPhotosBlobs(e)}
            />
          </ServiceButton>
        </Row>
        <Row style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
          <Picture
            src={Array.isArray(user?.photos) && user?.photos[0]}
            showPhoto={() => showUserPhoto(user?.photos[0])}
            sizes={{ width: 130, height: 190 }}
          />
          <CredsContainer>
            <UserPersonalInfo>
              <Row>
                <UserInput
                  type="text"
                  value={name || ""}
                  placeholder="Type your name here"
                  onChange={changeUsername}
                />
              </Row>
              <Row>
                <UserInput
                  type="email"
                  value={email || ""}
                  placeholder="Type your name here"
                  onChange={changeUserEmail}
                />
              </Row>
              <Row>ways to keep in touch with you: </Row>
              <Row>
                <UserInput
                  type="text"
                  placeholder="telegram"
                  id="telegram"
                  value={contacts.telegram || ""}
                  onChange={setUserContacts}
                />
              </Row>
              <Row>
                <UserInput
                  type="text"
                  placeholder="discord"
                  id="discord"
                  value={contacts.discord || ""}
                  onChange={setUserContacts}
                />
              </Row>
              <Row hidden={!isAdditInpShow}>
                <UserPlatformInput
                  disabled={!isAdditInpShow}
                  type="text"
                  placeholder="platform"
                  value={extraPlatform || ""}
                  onChange={addAditionalContactPlatform}
                />
                <UserInput
                  disabled={!isAdditInpShow}
                  type="text"
                  placeholder="link"
                  value={extraLink || ""}
                  onChange={addAditionalContactLink}
                />
              </Row>
              <Row>
                <ServiceButton onClick={handleAdditInput} type="button">
                  {isAdditInpShow ? "HIDE" : "+ ANOTHER"}
                </ServiceButton>
              </Row>
            </UserPersonalInfo>
          </CredsContainer>
        </Row>
        <RowEnd>
          <ServiceButton type="button" onClick={goToMyProfilePreview}>
            PREVIEW
          </ServiceButton>
          <ServiceButton type="submit">SAVE PROFILE</ServiceButton>
          <ServiceButton type="button" onClick={deleteMyProfile}>
            DELETE PROFILE
          </ServiceButton>
        </RowEnd>
      </ProfileContainer>
    </>
  );
};

const UserPlatformInput = styled(Input)`
  width: 40%;
  margin-right: 5px;
`;

const UserPersonalInfo = styled.div``;

const CredsContainer = styled.div`
  padding-left: 20px;
  flex: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media ${deviceMax.mobileL} {
    width: 50%;
  }
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
  margin-bottom: ${(p) => (p.hidden ? "0px" : "20px")};
  height: ${(p) => (p.hidden ? "0px" : "auto")};
  overflow: hidden;
`;

const RowEnd = styled(Row)`
  justify-content: flex-end;
  margin-bottom: 20px;
  & > * {
    margin-left: 10px;
  }
  @media ${deviceMax.mobileL} {
    & > * {
      font-weight: lighter;
      margin-left: 0px;
      font-size: 13px;
      width: 33.3%;
    }
  }
`;

const MainUsername = styled.span`
  font-size: 32px;
  text-transform: uppercase;
  line-height: 0;
  font-weight: bolder;
`;

const UserInput = styled(Input)`
  width: 100%;
`;
