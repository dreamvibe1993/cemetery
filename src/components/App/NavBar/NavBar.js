import React from "react";
import styled from "styled-components/macro";

import { NavButton, ServiceButton } from "../../css/sc-components/ScComponents";
import { colorsBlack, colorsGreen, colorsWeird, colorsWhite } from "../../../configs/css/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../../configs/urls/app/app-urls";
import { useConfirmRedir } from "../../../services/hooks/app/useConfirmRedir";
import { setUnsavedDataStatus } from "../../../redux/app/appReducer";
import { RoundUserPic } from "../RoundUserPic/RoundUserPic";
import { ColorTheme } from "../../../App";
import { Logo } from "../Logo/Logo";
import { FadeIn } from "../../../configs/css/animations";

export const TopNavBar = () => {
  const { setColorSet } = React.useContext(ColorTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const askAndSubscribe = useConfirmRedir();
  const { user, isAuth } = useSelector((state) => state.user);
  const { isThereUnsavedData } = useSelector((state) => state.app);

  const allColors = [
    { id: colorsBlack.id, hex: colorsBlack.primary.hex, theme: colorsBlack },
    { id: colorsGreen.id, hex: colorsGreen.primary.hex, theme: colorsGreen },
    { id: colorsWhite.id, hex: colorsWhite.primary.hex, theme: colorsWhite },
    { id: colorsWeird.id, hex: colorsWeird.primary.hex, theme: colorsWeird },
  ];

  const [unsavedData, setUnsavedData] = React.useState(false);
  const [isColorPickedOpen, setColorPickerOpen] = React.useState(false);

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

  const changeTheme = (theme) => {
    setColorSet(theme);
  };

  const toggleColorPicker = () => {
    setColorPickerOpen((prev) => !prev);
  };

  return (
    <NavBar>
      <Buttons>
        <NavButton onClick={goProfile}>my-profile</NavButton>
        <NavButton onClick={goAuth}>auth</NavButton>
      </Buttons>
      <LogoWrapper>
        <Logo onClick={goHome} />
      </LogoWrapper>
      <Buttons>
        <ServiceButton onClick={toggleColorPicker}>
          CHANGE THEME
          {isColorPickedOpen && (
            <ColorPicker>
              {allColors.map((color) => (
                <ColorTile
                  onClick={() => changeTheme(color.theme)}
                  key={color.hex + color.id}
                  color={color.hex}
                ></ColorTile>
              ))}
            </ColorPicker>
          )}
        </ServiceButton>
        {isAuth && (
          <RoundUserPic
            src={Array.isArray(user.photos) && user.photos[0]}
            onClick={goProfile}
          />
        )}
      </Buttons>
    </NavBar>
  );
};

const ColorTile = styled.div`
  height: 35px;
  width: 35px;
  background-color: ${(p) => p.color};
`;

const ColorPicker = styled.div`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  padding: 10px;
  background-color: ${(p) => p.theme.white.hex};
  display: flex;
  animation: ${FadeIn} 0.2s linear forwards;
  /* box-shadow: 0px 10px 10px 5px ${(p) => p.theme.contrastB.rgba(0.1)}; */
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  position: relative;
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
  box-shadow: 2px 0px 10px 2px ${(p) => p.theme.contrastB.rgba(0.3)};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  * {
    text-transform: lowercase;
    font-size: 25px;
  }
`;
