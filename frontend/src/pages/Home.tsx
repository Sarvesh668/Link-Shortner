import { useState } from "react";
import { ToggleMode } from "../components/ToggleMode/ToggleMode";
import { UrlBox } from "../components/UrlBox/UrlBox";
import { MangekyoOverlay } from "../components/MangekyoOverlay/MangekyoOverlay";

export const Home = () => {
  const [showBalatro, setShowBalatro] = useState(false);

  const handleToggle = () => {
    setShowBalatro(prev => !prev);
  };

  return (
    <div className="home-root">
      {/* Toggle always available */}
      <ToggleMode onToggle={handleToggle} />

      {/* UI stays for now (you can hide later if you want) */}
      {!showBalatro && (
        <div className="light-ui">
          <UrlBox />
        </div>
      )}

      {/* Balatro stays ON until toggled off */}
      {showBalatro && <MangekyoOverlay />}
    </div>
  );
};
