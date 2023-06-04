import "./App.css";
import Navbar from "./components/Navbar";
import GhostText from "./components/GhostText";
import { useEffect, useState } from "react";

function App() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem("mode");
    return savedMode || "light";
  });

  useEffect(() => {
    localStorage.setItem("mode", mode);
    if (mode === "light") {
      document.body.style.backgroundColor = "skyblue";
    } else {
      document.body.style.backgroundColor = "dimgray";
    }
  }, [mode]);

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
    } else {
      setMode("light");
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
