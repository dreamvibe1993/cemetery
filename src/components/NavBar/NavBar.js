import React from "react";
import styled from "styled-components/macro";

import { NavButton } from "../css/sc-components/ScComponents";
import { ReactComponent as Logo } from "../../media/svg/logo.svg";
import { colors } from "../../configs/css/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../../configs/urls/app/app-urls";
import { useConfirmRedir } from "../../services/hooks/app/useConfirmRedir";
import { setUnsavedDataStatus } from "../../redux/app/appReducer";

export const TopNavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const askAndSubscribe = useConfirmRedir();
  const { user } = useSelector((state) => state.user);
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
      navigate(routes.profile.origin);
    });
  };

  return (
    <NavBar>
      <Buttons>
        <NavButton onClick={goProfile}>profile</NavButton>
        <NavButton onClick={goAuth}>auth</NavButton>
      </Buttons>
      <Logo onClick={goHome} />
      <UserName>{user.username || "unauthorized"}</UserName>
    </NavBar>
  );
};

const Buttons = styled.div`
  display: flex;
  & > * {
    margin-right: 10px;
  }
`;

const UserName = styled.span`
  padding-left: 40px;
  user-select: none;
  opacity: 0.5;
  transition: opacity 0.2s linear;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
`;

const NavBar = styled.div`
  position: fixed;
  background-color: ${colors.primary.rgba(0.6)};
  z-index: 999;
  height: 75px;
  width: 100%;
  top: 0;
  left: 0;
  box-shadow: 2px 0px 50px 2px rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 30px;
  * {
    text-transform: lowercase;
    font-size: 25px;
  }
  svg {
    height: 100%;
    width: 100px;
    fill: ${colors.secondaryB.hex};
    cursor: pointer;
  }
`;
