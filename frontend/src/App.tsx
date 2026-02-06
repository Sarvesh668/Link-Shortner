import { useState } from "react";
import EyesPair from "./components/EyesPair/EyesPair";
import ToggleMode from "./components/ToggleMode/ToggleMode";
import UrlBox from "./components/UrlBox/UrlBox";
import "./App.css";

export default function App() {
  const [mode, setMode] = useState<"light" | "dark">("light");

  return (
    <div className={`app ${mode}`}>
      <ToggleMode
        mode={mode}
        onToggle={() =>
          setMode(mode === "light" ? "dark" : "light")
        }
      />

      <EyesPair open={mode === "dark"} />

      <UrlBox />
    </div>
  );
}
