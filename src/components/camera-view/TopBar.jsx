import React from "react";
import { Lightning, CaretDown, CaretUp, CircleDashed } from "phosphor-react";

const TopBar = ({ flash, setFlash, showOptions, setShowOptions }) => {
  return (
    <div className="top-bar">
      <span className="icon flash-icon" onClick={() => setFlash(!flash)}>
        {flash ? (
          <Lightning size={24} color="#ffa500" weight="fill" />
        ) : (
          <Lightning size={24} />
        )}
      </span>

      <span
        className="icon up-arrow"
        onClick={() => setShowOptions(!showOptions)}
      >
        {showOptions ? <CaretDown size={24} color="#ffa500" /> : <CaretUp size={24} />}
      </span>

      <span className="icon settings">
        <CircleDashed size={24} />
      </span>
    </div>
  );
};

export default TopBar;
