import React from "react";
import styled from "styled-components/macro";

import { NavButton } from "../../css/sc-components/ScComponents";
import { allColors } from "../../../configs/css/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../../configs/urls/app/app-urls";
import { useConfirmRedir } from "../../../services/hooks/app/useConfirmRedir";
import { setUnsavedDataStatus } from "../../../redux/app/appReducer";
import { RoundUserPic } from "../RoundUserPic/RoundUserPic";
import { Logo } from "../Logo/Logo";
import { FadeIn } from "../../../configs/css/animations";
import {
  ColorTheme,
  GreetingsScreenContext,
} from "../../HOCs/AuthWrapper/AuthWrapper";
import { updateMe } from "../../../api/user";
import { updateColorTheme } from "../../../redux/user/userReducer";
import { deviceMax } from "../../../configs/css/breakpoints";
import { ReactComponent as TriangleDown } from "../../../media/svg/triangle-down.svg";

export const TopNavBar = () => {
  const { setColorSet } = React.useContext(ColorTheme);
  const { setGreetingsShow } = React.useContext(GreetingsScreenContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const askAndSubscribe = useConfirmRedir();
  const { user, isAuth } = useSelector((state) => state.user);
  const { isThereUnsavedData } = useSelector((state) => state.app);

  const [unsavedData, setUnsavedData] = React.useState(false);
  const [isColorPickedOpen, setColorPickerOpen] = React.useState(false);

  React.useEffect(() => {
    setUnsavedData(isThereUnsavedData);
  }, [isThereUnsavedData]);

  const closeIfMissedComponent = (e) => {
    if (e.target.id !== "colorsPicker") closeColorPicker();
  };

  React.useEffect(() => {
    window.addEventListener("click", (e) => closeIfMissedComponent(e));
    return () => {
      window.removeEventListener("click", (e) => closeIfMissedComponent(e));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    dispatch(updateColorTheme(theme.id));
    if (!isAuth) return;
    updateMe({ colorTheme: theme.id });
  };

  const toggleColorPicker = () => {
    setColorPickerOpen((prev) => !prev);
  };

  function closeColorPicker() {
    setColorPickerOpen(false);
  }

  return (
    <NavBar>
      <LogoWrapper>
        <Logo onClick={goHome} />
      </LogoWrapper>
      <Buttons>
        <ShowStartingScreenButton onClick={() => setGreetingsShow(true)}>
          <TriangleDown />
        </ShowStartingScreenButton>
        <NavButton onClick={goAuth}>auth</NavButton>
        <NavButton onClick={toggleColorPicker} id="colorsPicker">
          THEME
          {isColorPickedOpen && (
            <ColorPicker id="colorsPicker">
              {allColors.map((color) => (
                <ColorTile
                  onClick={() => changeTheme(color.theme)}
                  key={color.hex + color.id}
                  color={color.hex}
                ></ColorTile>
              ))}
            </ColorPicker>
          )}
        </NavButton>
        {isAuth && (
          <UserFixedWrapper>
            <RoundUserPic
              src={Array.isArray(user.photos) && user.photos[0]}
              onClick={goProfile}
            />
          </UserFixedWrapper>
        )}
      </Buttons>
    </NavBar>
  );
};

const ShowStartingScreenButton = styled.div`
  padding: 0px 10px;
  cursor: pointer;
  svg {
    path {
      fill: ${(p) => p.theme.contrastB.hex};
    }
  }
`;

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
  z-index: 1002;
  @media ${deviceMax.mobileL} {
    left: auto;
    right: 0px;
    transform: none;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  & > * {
    margin-right: 10px;
  }
  @media ${deviceMax.mobileL} {
    position: initial;
    & > * {
      &:not(:last-child) {
        margin-right: 15px;
      }
      margin-right: 0px;
      padding: 0px;
    }
  }
`;

const LogoWrapper = styled.div`
  height: 80%;
  width: 80px;
  cursor: pointer;
  svg {
    height: 100%;
    width: 100%;
  }
  @media ${deviceMax.mobileL} {
    position: unset;
    transform: none;
    height: 50px;
    width: 50px;
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
  @media ${deviceMax.mobileL} {
    padding: 5px 10px;
  }
`;

const UserFixedWrapper = styled.div`
  background-color: ${(p) => p.theme.primary.hex};
`;
