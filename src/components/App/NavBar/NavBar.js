import React from "react";
import styled from "styled-components/macro";

import { NavButton, ServiceButton } from "../../css/sc-components/ScComponents";
import { colorsBlack, colorsGreen } from "../../../configs/css/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../../configs/urls/app/app-urls";
import { useConfirmRedir } from "../../../services/hooks/app/useConfirmRedir";
import { setUnsavedDataStatus } from "../../../redux/app/appReducer";
import { RoundUserPic } from "../RoundUserPic/RoundUserPic";
import { ColorTheme } from "../../../App";
import { Logo } from "../Logo/Logo";

export const TopNavBar = () => {
  const { setColorSet, colorSet } = React.useContext(ColorTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const askAndSubscribe = useConfirmRedir();
  const { user, isAuth } = useSelector((state) => state.user);
  const { isThereUnsavedData } = useSelector((state) => state.app);

  const [unsavedData, setUnsavedData] = React.useState(false);

  React.useEffect(() => {
    setUnsavedData(isThereUnsavedData);
  }, [isThereUnsavedData]);

  const checkUnsavedData = (func) => {
    if (unsavedData) {
      askAndSubscribe(
        "There are unsaved data. Are you sure you want to close this page?",
        func
      );
    } else {
      func();
    }
  };

  const dropUnsaved = () => {
    dispatch(setUnsavedDataStatus(false));
  };

  const goHome = () => {
    checkUnsavedData(() => {
      dropUnsaved();
      navigate(routes.root);
    });
  };

  const goAuth = () => {
    checkUnsavedData(() => {
      dropUnsaved();
      navigate(routes.auth.origin);
    });
  };

  const goProfile = () => {
    checkUnsavedData(() => {
      dropUnsaved();
      navigate(routes.myProfile.origin);
    });
  };

  const changeTheme = () => {
    setColorSet(colorsBlack);
  };

  return (
    <NavBar>
      <Buttons>
        <NavButton onClick={goProfile}>my-profile</NavButton>
        <NavButton onClick={goAuth}>auth</NavButton>
      </Buttons>
      <LogoWrapper>
        <Logo onClick={goHome} color={colorSet.contrastB.hex} />
      </LogoWrapper>
      <ServiceButton onClick={changeTheme}>CHANGE THEME</ServiceButton>
      {isAuth && (
        <RoundUserPic
          src={Array.isArray(user.photos) && user.photos[0]}
          onClick={goProfile}
        />
      )}
    </NavBar>
  );
};

const Buttons = styled.div`
  display: flex;
  & > * {
    margin-right: 10px;
  }
`;

const LogoWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  width: 80px;
  cursor: pointer;
  svg {
    height: 100%;
    width: 100%;
  }
`;

// const UserName = styled.span`
//   padding-left: 40px;
//   user-select: none;
//   opacity: 0.5;
//   transition: opacity 0.2s linear;
//   cursor: pointer;
//   &:hover {
//     opacity: 1;
//   }
// `;

const NavBar = styled.div`
  position: fixed;
  background-color: ${(p) => p.theme.primary.rgba(1)};
  z-index: 1;
  height: 75px;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 2px 0px 10px 2px ${p => p.theme.contrastB.rgba(0.3)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  * {
    text-transform: lowercase;
    font-size: 25px;
  }
`;
