import "./GameHelp.css";
import { useState } from "react";
import HelpIcon from "../assets/HelpIcon";
import CloseIcon from "../assets/CloseIcon";

function GameHelp() {
  const [helpDisplay, setHelpDisplay] = useState(false);

  function toggleHelp() {
    setHelpDisplay(!helpDisplay);
  }

  function HelpWindow() {
    return (
      <div className="helpWindow">
        <span
          className="closeButton"
          onClick={() => {
            setHelpDisplay(false);
          }}
        >
          <CloseIcon />
        </span>
        <div className="helpText">
          <h1>Help</h1>
          <ul>
            <li>Assume both buttons pressed on the same frame.</li>
            <li>Assume both attacks would hit the opponent.</li>
            <li>
              Assume that the attack would hit on the first possible active
              frame.
            </li>
          </ul>
          <p>
            <strong>Which character lands their attack?</strong>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="gameHelp">
      {helpDisplay ? <HelpWindow /> : null}
      <button className="helpButton" type="button" onClick={toggleHelp}>
        <HelpIcon />
      </button>
    </div>
  );
}

export default GameHelp;
