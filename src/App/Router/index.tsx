import FightSimulator from "@pages/FightSimulator";
import Home from "@pages/Home";
import Progression from "@pages/Progression";
import Trainers from "@pages/Trainers";
import React from "react";
import { PropsWithChildren } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AppRouter = ({ children }: PropsWithChildren<{}>) => {
  return (
    <BrowserRouter>
      {children}
      <Routes>
        <Route path="/simulator" element={<FightSimulator />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/progression" element={<Progression />} />
        <Route index path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
