import React, { useState } from "react";
import { createNode } from "./graph/node";
import Container from "./components/Container";
import "./App.css";

let id = 0;

type MapNode = {
  getId: () => string;
  getData: () => any;
  getNeighbors: () => MapNode[];
  getColor: () => string;
  setColor: (color: string) => void;
  setNeighbors: (neighbors: MapNode[]) => void;
};

const n1 = createNode("test", [100, 100]);
n1.setColor("blue");

const App = () => {
  const [inputX, setInputX] = useState();
  const [inputY, setInputY] = useState();
  const [nodes, setNodes] = useState<Array<MapNode>>([n1]);
  const handleAddClick = (e: any) => {
    e.preventDefault();
    const newNode: MapNode = createNode(id++, [inputX, inputY]);
    newNode.setColor("pink");
    setNodes([...nodes, newNode]);
  };
  const handleXChange = (e: any) => {
    const value = parseInt(e.target.value);
    setInputX(isNaN(value) ? 0 : value); // Default to zero.
  };
  const handleYChange = (e: any) => {
    const value = parseInt(e.target.value);
    setInputY(isNaN(value) ? 0 : value); // Default to zero.
  };

  return (
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
      <Container>
        {nodes.map((n, i) => (
          <circle
            key={n.getId()}
            cx={n.getData().value[0]}
            cy={n.getData().value[1]}
            r={5}
            fill={n.getColor()}
          />
        ))}
      </Container>
    </div>
  );
};

export default App;
