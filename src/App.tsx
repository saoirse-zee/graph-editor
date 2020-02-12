import React, { useState } from "react";
import { HotKeys } from "react-hotkeys";
import { createList, createNode } from "./linked-list";

import "./App.css";
import { Editor } from "./components/Editor";
import { Direction } from "./types/types";

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

const App = () => {
  const [inputX, setInputX] = useState();
  const [inputY, setInputY] = useState();
  const [row, setRow] = useState(list);
  const [selected, setSelected] = useState(0);

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
  const handleNudge = (direction: Direction) => {
    const node = row.find(selected);
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

  const selectedNode = row.find(selected);
  const selectedPoint = selectedNode.getData();

  return (
    <HotKeys
      keyMap={{ APPEND: "a", RIGHT: "right", L: "l" }}
      handlers={{
        APPEND: append,
        RIGHT: () => handleNudge(Direction.RIGHT),
        L: () => handleNudge(Direction.RIGHT)
      }}
    >
      <div className="App">
        {selected}
        <Editor
          handlers={{
            handleNext,
            handlePrev,
            handleUpdateClick,
            handleMapClick,
            handleXChange,
            handleYChange,
            handleNudge
          }}
          state={{
            selected,
            selectedPoint,
            row
          }}
        />
      </div>
    </HotKeys>
  );
};

export default App;
