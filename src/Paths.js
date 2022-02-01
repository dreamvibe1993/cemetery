import React from "react";
import { Routes, Route } from "react-router-dom";
import { Tomb } from "./pages/Tomb";
import { Home } from "./pages/Home";
import { UserAuth } from "./pages/UserAuth/UserAuth";

export const Paths = () => {
  return (
    <Routes>
      <Route path="/tomb" exact={true} element={<Tomb />} />
      <Route path="/" exact={true} element={<Home />} />
      <Route path="/auth" exact={true} element={<UserAuth />} />
    </Routes>
  );
};
