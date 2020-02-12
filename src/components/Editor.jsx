import React from "react";
import { HotKeys } from "react-hotkeys";

export const Editor = ({ handlers }) => {
  return (
    <HotKeys handlers={handlers}>
      <button onClick={handlers.handlePrev}>Prev</button>
      <button onClick={handlers.handleNext}>Next</button>
    </HotKeys>
  );
};
