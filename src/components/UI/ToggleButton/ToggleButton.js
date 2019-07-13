import React from "react";
import styled from "styled-components";
import { toggleButtonStyle } from "./ToggleButton.style";
import { useTheme } from "../../../utils/useTheme/useTheme";
import MoonIcon from "../Icons/MoonIcon";
import SunIcon from "../Icons/SunIcon";

const ToggleButton = styled.div`
  ${toggleButtonStyle}
`;

const toggleButton = () => {
  const themeState = useTheme();

  return (
    <ToggleButton>
      <label id="shifter" htmlFor="shiftercb" className="switch">
        <input
          id="shiftercb"
          type="checkbox"
          onChange={() => themeState.toggle()}
          checked={!themeState.dark}
          name="checkbox"
        />
        <span className="slider round">
          <div className="sun">
            <SunIcon />
          </div>
          <div className="moon">
            <MoonIcon />
          </div>
        </span>
      </label>
      <div className="divider" />
      <label id="shifter" htmlFor="shiftercb" className="switch2">
        <div className="moon2">
          <MoonIcon />
        </div>
        <input
          id="shiftercb"
          type="checkbox"
          onChange={() => themeState.toggle()}
          checked={!themeState.dark}
          name="checkbox"
        />
        <span className="slider2 round" />
        <div className="sun2">
          <SunIcon />
        </div>
      </label>
    </ToggleButton>
  );
};

export default toggleButton;
