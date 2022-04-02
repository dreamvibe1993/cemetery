import React from "react";
import styled from "styled-components/macro";
import { Navigate } from "react-router-dom";

import { Input } from "../../../components/css/sc-components/ScComponents";
import { Picture } from "../../../components/App/Picture/Picture";
import { Gallery } from "../../../components/App/Gallery";
import { ProfileContainer } from "../Common/Common";
import { getUser } from "../../../api/user";
import { showError } from "../../../services/errors/showError";
import { Preloader } from "../../../components/App/Preloader";

export const UserProfile = () => {
  const [redirect, setRedirect] = React.useState(null);
  const [userPhotoSrc, setUserPhotoSrc] = React.useState(null);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    // if (user?.id === id) {
    //   return setRedirect("/")
    // }
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
      showError({ message: "User not found" });
      setRedirect("/");
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

  if (!user) return <Preloader />;

  if (redirect) return <Navigate to={redirect} />;

  return (
    <ProfileContainer>
      {userPhotoSrc && <Gallery src={userPhotoSrc} onClose={closeUserPhoto} />}
      <Row>
        <MainUsername>{user.username}</MainUsername>
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

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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
