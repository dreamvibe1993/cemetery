import React from "react";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
import { Tomb } from "./pages/Tomb";
import { Home } from "./pages/Home";

export const Paths = () => {
  console.log("rerender");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/tomb" exact={true} element={<Tomb />} />
        <Route path="" exact={true} element={<Home />} />
        <Route path="/home" exact={true} element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};
