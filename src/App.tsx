import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </>
  );
};

export default App;
