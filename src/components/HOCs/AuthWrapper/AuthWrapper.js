import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../api/user";
import { ThemeProvider } from "styled-components";
import { returnTheme } from "../../../services/css/theming/returnTheme";
import { colorsBlack } from "../../../configs/css/colors";

export const ColorTheme = React.createContext();

export const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const [colorSet, setColorSet] = React.useState(colorsBlack);

  React.useEffect(() => {
    getMe();
  }, [dispatch]);

  React.useEffect(() => {
    if (user) {
      setColorSet(returnTheme(user?.colorTheme));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (isAuth === null) return "Loading...";

  return (
    <ColorTheme.Provider value={{ colorSet, setColorSet }}>
      <ThemeProvider theme={colorSet}>{children}</ThemeProvider>
    </ColorTheme.Provider>
  );
};
