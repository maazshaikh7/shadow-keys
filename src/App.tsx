import "./App.css";
import Navbar from "./components/Navbar";
import GhostText from "./components/GhostText";
import { useEffect, useState } from "react";

function App() {
  return (
    <>
      <Navbar title="Shadow-Keys" />
      <GhostText />
    </>
  );
}

export default App;
