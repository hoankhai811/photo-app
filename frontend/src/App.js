import React from "react";
import { Routes, Route } from "react-router-dom";

import { Login } from "./components";
import Home from "./container/Home";

/**
 * *asdasdasd
 * ! dedasda
 * ? asdasdsa
 * TODO asdasdsa
 * @param ASASAasdas
 */
const App = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
};

export default App;
