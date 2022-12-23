import Home from "@pages/Home";
import Trainers from "@pages/Trainers";
import React from "react";
import { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = ({ children }: PropsWithChildren<{}>) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/trainers" element={<Trainers />} />
        <Route index path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
