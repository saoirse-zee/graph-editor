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
  const handleAddClick = (e: any) => {
    e.preventDefault();
    const node = createNode(id++);
    node.setData([inputX, inputY]);
    row.append(node);
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
  const handleRight = () => {
    const current = list.find(selected);
    const next = current.getNext();
    if (next) {
      setSelected(next.getId());
    }
  };
  const handleLeft = () => {
    setSelected(selected - 1);
  };

  return (
    <HotKeys
      keyMap={{ LEFT: "left", RIGHT: "right", UP: "up", DOWN: "down" }}
      handlers={{
        RIGHT: handleRight // Something funny's going on with this handler.
      }}
    >
      <div className="App">
        <form onSubmit={handleAddClick}>
          <div>
            <label>x</label>
            <input onChange={handleXChange} />
          </div>
          <div>
            <label>y</label>
            <input onChange={handleYChange} />
          </div>
          <button>Add</button>
        </form>
        <p>Selected: {selected}</p>
        <button onClick={handleLeft}>Left</button>
        <button onClick={handleRight}>Right</button>
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
