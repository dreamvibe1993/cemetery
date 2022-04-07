import React from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "./configs/urls/app/app-urls";

import { Tomb } from "./pages/Tomb";
import { Home } from "./pages/Home";
import { UserAuth } from "./pages/UserAuth/UserAuth";
import { PasswordChange } from "./pages/PasswordChange";
import { MyProfile } from "./pages/Profile/My";
import { UserProfile } from "./pages/Profile/User";
import { About } from "./pages/About";

export const Paths = () => {
  return (
    <Routes>
      <Route path={routes.root} exact={true} element={<Home />} />
      <Route path={routes.tomb.origin} exact={true} element={<Tomb />} />
      <Route path={routes.auth.origin} exact={true} element={<UserAuth />} />
      <Route path={routes.profile.origin} exact={true} element={<UserProfile />} />
      <Route path={routes.myProfile.origin} exact={true} element={<MyProfile />} />
      <Route path={routes.passwordChange.origin} exact={true} element={<PasswordChange />} />
      <Route path={routes.about.origin} exact={true} element={<About />} />
    </Routes>
  );
};
