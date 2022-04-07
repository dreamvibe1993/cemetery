import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

import { ServiceButton } from "../../../components/css/sc-components/ScComponents";
import { Picture } from "../../../components/App/Picture/Picture";
import { Gallery } from "../../../components/App/Gallery";
import { ProfileContainer } from "../Common/Common";
import { getUser } from "../../../api/user";
import { showError } from "../../../services/errors/showError";
import { Preloader } from "../../../components/App/Preloader";
import { routes } from "../../../configs/urls/app/app-urls";
import { deviceMax } from "../../../configs/css/breakpoints";

export const UserProfile = () => {
  const [redirect, setRedirect] = React.useState(null);
  const [userPhotoSrc, setUserPhotoSrc] = React.useState(null);
  const [user, setUser] = React.useState(null);
  const [showGoBackButton, setShowGoBackButton] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const isPreview = params.get("preview");
    if (id) {
      getUser(id)
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((e) => {
          showError(e.response.data);
          setRedirect("/");
        });
    } else {
      showError({ message: "User not found." });
      setRedirect("/");
    }
    if (isPreview) {
      setShowGoBackButton(isPreview);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showUserPhoto = (src) => {
    if (!src) return;
    setUserPhotoSrc(src);
  };

  const closeUserPhoto = () => {
    setUserPhotoSrc(null);
  };

  if (redirect) return <Navigate to={redirect} />;

  if (!user) return <Preloader />;

  return (
    <>
      {userPhotoSrc && <Gallery src={userPhotoSrc} onClose={closeUserPhoto} />}
      <ProfileContainer>
        <UsernameRow>
          <MainUsername>{user.name}</MainUsername>
        </UsernameRow>
        <Row style={{ alignItems: "flex-start", justifyContent: "flex-start" }}>
          <Picture
            src={Array.isArray(user?.photos) && user?.photos[0]}
            showPhoto={() => showUserPhoto(user?.photos[0])}
            sizes={{ width: 130, height: 190 }}
          />
          <CredsContainer>
            <UserPersonalInfo>
              {Array.isArray(user.contacts) && user.contacts.length < 1 ? (
                <NoContactsText>
                  This user preffered not to share his contacts and remain
                  anonymous.
                </NoContactsText>
              ) : (
                user.contacts.map((contact) => (
                  <UserContactsRow key={contact.link}>
                    <UserContactSource>{contact.platform}</UserContactSource>
                    <UserContact href={contact.link}>
                      {contact.link}
                    </UserContact>
                  </UserContactsRow>
                ))
              )}
            </UserPersonalInfo>
          </CredsContainer>
        </Row>
        {showGoBackButton && (
          <Row>
            <ServiceButton onClick={() => setRedirect(routes.myProfile.origin)}>
              BACK
            </ServiceButton>
          </Row>
        )}
      </ProfileContainer>
    </>
  );
};

const NoContactsText = styled.span``;

const UserContactsRow = styled.div`
  margin-bottom: 10px;
  display: flex;
`;

const UserContactSource = styled.span`
  width: 30%;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UserContact = styled.a`
  color: inherit;
  max-width: 69%;
  overflow: hidden;
  text-overflow: ellipsis;
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const UsernameRow = styled.div`
  margin-bottom: 20px;
`;

const MainUsername = styled.span`
  font-size: 32px;
  text-transform: uppercase;
  line-height: 32px;
  font-weight: bolder;
`;
