// import logo from './logo.svg';
import "./App.css";
import Navbar from "./components/Navbar";
import GhostText from "./components/GhostText";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light");
  if (mode === "light") {
    document.body.style.backgroundColor = "skyblue";
  } else {
    document.body.style.backgroundColor = "slateblue";
  }
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "#1b2228";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "powderblue";
    }
  };
  return (
    <>
      <Navbar title="Shadow-Keys" mode={mode} toggleMode={toggleMode} />
      <GhostText mode={mode} />
    </>
  );
}

export default App;
