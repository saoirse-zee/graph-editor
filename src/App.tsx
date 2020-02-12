import React, { useState } from "react";
import { HotKeys } from "react-hotkeys";
import { createList, createNode } from "./linked-list";
import Container from "./components/Container";
import "./App.css";

let id = 0;

// Temporary test data.
const n1 = createNode(id++);
const n2 = createNode(id++);
const n3 = createNode(id++);
n1.setData([100, 130]);
n2.setData([110, 135]);
n3.setData([215, 170]);
const list = createList(n1);
list.append(n2);
list.append(n3);

const rowToLineData = (rowArray: any[]) => {
  return rowArray
    .map(node => {
      const point = node.getData();
      return `${point[0]},${point[1]}`;
    })
    .join(" ");
};

const App = () => {
  const [inputX, setInputX] = useState();
  const [inputY, setInputY] = useState();
  const [row, setRow] = useState(list);
  const [selected, setSelected] = useState(0);

  const rowNodes = row.toArray();
  const lineData = rowToLineData(rowNodes);

  // Handlers
  const handleUpdateClick = (e: any) => {
    e.preventDefault();
    const node = list.find(selected);
    node.setData([inputX, inputY]);
    const newRow = Object.assign({}, row);
    setRow(newRow);
  };
  const handleMapClick = (coords: number[]) => {
    const node = createNode(id++);
    node.setData(coords);
    row.append(node);
    const newRow = Object.assign({}, row);
    setRow(newRow);
  };
  const handleXChange = (e: any) => {
    const value = parseInt(e.target.value);
    setInputX(isNaN(value) ? 0 : value); // Default to zero.
  };
  const handleYChange = (e: any) => {
    const value = parseInt(e.target.value);
    setInputY(isNaN(value) ? 0 : value); // Default to zero.
  };
  const append = () => {
    const newId = id++;
    const node = createNode(newId);
    const last = row.getLast();
    const point = last.getData();
    const newPoint = [point[0] + 15, point[1]];
    node.setData(newPoint);
    row.append(node);
    const newRow = Object.assign({}, row);
    setSelected(newId);
    setRow(newRow);
  };
  const handleNext = () => {
    const current = list.find(selected);
    const next = current.getNext();
    if (next) {
      setSelected(next.getId());
    }
  };
  const handlePrev = () => {
    // This is super hacky and relies on the id scheme.
    // To fix once node.prev() is implemented.
    setSelected(Math.max(selected - 1, 0));
  };
  enum Direction {
    RIGHT = "right",
    LEFT = "left",
    UP = "up",
    DOWN = "down"
  }
  const handleNudge = (direction: Direction) => {
    const node = list.find(selected);
    const point = node.getData();
    const xOffset =
      direction === Direction.RIGHT ? 5 : direction === Direction.LEFT ? -5 : 0;
    const yOffset =
      direction === Direction.UP ? -5 : direction === Direction.DOWN ? 5 : 0;
    const newPoint = [point[0] + xOffset, point[1] + yOffset];
    node.setData(newPoint);
    const newRow = Object.assign({}, row);
    setRow(newRow);
  };

  console.log(selected);

  const selectedNode = row.find(selected);
  const selectedPoint = selectedNode.getData();

  return (
    <HotKeys
      keyMap={{ APPEND: "a" }}
      handlers={{
        APPEND: append
      }}
    >
      <div className="App">
        <div style={{ display: "flex", fontFamily: "monospace" }}>
          <div style={{ marginRight: 50 }}>
            <p>Selected: {selected}</p>
            <p>x: {selectedPoint && selectedPoint[0]}</p>
            <p>y: {selectedPoint && selectedPoint[1]}</p>
          </div>
          <form onSubmit={handleUpdateClick}>
            <div>
              <label>x</label>
              <input onChange={handleXChange} />
            </div>
            <div>
              <label>y</label>
              <input onChange={handleYChange} />
            </div>
            <button>Update</button>
          </form>
        </div>
        <button onClick={handlePrev}>Prev</button>
        <button onClick={handleNext}>Next</button>
        <button onClick={() => handleNudge(Direction.RIGHT)}>
          Nudge right
        </button>
        <button onClick={() => handleNudge(Direction.LEFT)}>Nudge left</button>
        <button onClick={() => handleNudge(Direction.UP)}>Nudge up</button>
        <button onClick={() => handleNudge(Direction.DOWN)}>Nudge down</button>
        <Container handleClick={handleMapClick}>
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
                r={n.getId() === selected ? 7 : 5}
                fill={"white"}
              />
            ))}
          </g>
        </Container>
      </div>
    </HotKeys>
  );
};

export default App;
