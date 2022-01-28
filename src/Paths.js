import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Tomb } from "./pages/Tomb";
import { Home } from "./pages/Home";

export const Paths = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tomb" exact={true} element={<Tomb />} />
        <Route path="" exact={true} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
