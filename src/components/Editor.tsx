import React from "react";
import { HotKeys } from "react-hotkeys";
import Container from "./Container";
import { Direction } from "../types/types";

type State = {
  selected: number;
  selectedPoint: number[];
  row: any;
};

type EditorProps = {
  handlers: any;
  state: State;
};

export const Editor = ({ handlers, state }: EditorProps) => {
  const rowNodes: any[] = state.row.toArray();
  const lineData = rowToLineData(rowNodes);
  const editorHandlers = {
    APPEND: handlers.handleAppend,
    RIGHT: () => handlers.handleNudge(Direction.RIGHT, state.selected),
    LEFT: () => handlers.handleNudge(Direction.LEFT),
    UP: () => handlers.handleNudge(Direction.UP),
    DOWN: () => handlers.handleNudge(Direction.DOWN)
  };
  return (
    <HotKeys handlers={editorHandlers}>
      <div className="App">
        <div style={{ display: "flex", fontFamily: "monospace" }}>
          <div style={{ marginRight: 50 }}>
            <p>Selected: {state.selected}</p>
            <p>x: {state.selectedPoint && state.selectedPoint[0]}</p>
            <p>y: {state.selectedPoint && state.selectedPoint[1]}</p>
          </div>
          <form onSubmit={handlers.handleUpdateClick}>
            <div>
              <label>x</label>
              <input onChange={handlers.handleXChange} />
            </div>
            <div>
              <label>y</label>
              <input onChange={handlers.handleYChange} />
            </div>
            <button>Update</button>
          </form>
        </div>
        <button onClick={handlers.handlePrev}>Prev</button>
        <button onClick={handlers.handleNext}>Next</button>
        <button onClick={() => handlers.handleNudge(Direction.RIGHT)}>
          Nudge right
        </button>
        <button onClick={() => handlers.handleNudge(Direction.LEFT)}>
          Nudge left
        </button>
        <button onClick={() => handlers.handleNudge(Direction.UP)}>
          Nudge up
        </button>
        <button onClick={() => handlers.handleNudge(Direction.DOWN)}>
          Nudge down
        </button>
        <Container handleClick={() => {}}>
          <g
            onClick={e => {
              console.log(e);
            }}
          >
            <polyline
              points={lineData}
              fill="none"
              stroke="white"
              strokeWidth={3}
              opacity={0.3}
            />
            {rowNodes.map(n => (
              <circle
                key={n.getId()}
                cx={n.getData()[0]}
                cy={n.getData()[1]}
                r={n.getId() === state.selected ? 7 : 5}
                fill={"white"}
              />
            ))}
          </g>
        </Container>
      </div>
    </HotKeys>
  );
};

// Utils
const rowToLineData = (rowArray: any[]) => {
  return rowArray
    .map(node => {
      const point = node.getData();
      return `${point[0]},${point[1]}`;
    })
    .join(" ");
};
