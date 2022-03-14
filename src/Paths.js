import React from "react";
import { Routes, Route } from "react-router-dom";
import { Tomb } from "./pages/Tomb";
import { Home } from "./pages/Home";
import { UserAuth } from "./pages/UserAuth/UserAuth";
import { routes } from "./configs/urls/app/app-urls";

export const Paths = () => {
  return (
    <Routes>
      <Route path={routes.tomb.origin} exact={true} element={<Tomb />} />
      <Route path={routes.root} exact={true} element={<Home />} />
      <Route path={routes.auth.origin} exact={true} element={<UserAuth />} />
    </Routes>
  );
};
