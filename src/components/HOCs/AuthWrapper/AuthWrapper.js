import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../api/user";
import { ThemeProvider } from "styled-components";
import { returnTheme } from "../../../services/css/theming/returnTheme";
import { colorsBlack } from "../../../configs/css/colors";
import { Preloader } from "../../App/Preloader";
import { GreetingsScreen } from "../../Modals/GreetingsScreen/GreetingsScreen";
import { isThisFieldExistInLS } from "../../../services/local-storage/checkByFieldName";
import { localStorageFields } from "../../../configs/local-storage/fields";

export const ColorTheme = React.createContext();
export const GreetingsScreenContext = React.createContext();

export const AuthWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.user);
  const [colorSet, setColorSet] = React.useState(colorsBlack);
  const [isGreetingsShow, setGreetingsShow] = React.useState(true);

  React.useEffect(() => {
    setGreetingsShow(
      !isThisFieldExistInLS(localStorageFields.isFirstTimeLaunched)
    );
  }, []);

  React.useEffect(() => {
    getMe();
  }, [dispatch]);

  React.useEffect(() => {
    if (user) {
      setColorSet(returnTheme(user?.colorTheme || colorsBlack));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const closeGreetings = () => {
    setGreetingsShow(false);
  };

  if (isAuth === null) return <Preloader />;

  return (
    <ColorTheme.Provider value={{ colorSet, setColorSet }}>
      <GreetingsScreenContext.Provider value={{ setGreetingsShow }}>
        <ThemeProvider theme={colorSet}>
          {isGreetingsShow && <GreetingsScreen onClose={closeGreetings} />}
          {children}
        </ThemeProvider>
      </GreetingsScreenContext.Provider>
    </ColorTheme.Provider>
  );
};
