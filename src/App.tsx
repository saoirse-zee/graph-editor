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

// Row - Represent a row of circles on the map
type Row = {
  root: MapNode; // Entry point for the row
};

// Render row - given a row, find all the nodes in the row.
const getRowNodes = (rowRoot: MapNode) => {
  let rowNodes: MapNode[] = [];
  let current = rowRoot;
  rowNodes.push(current);

  let next = current.getNeighbors() && current.getNeighbors()[0];
  while (next) {
    rowNodes.push(next);
    next = next.getNeighbors() && next.getNeighbors()[0];
  }
  return rowNodes;
};

// Append row - given a row and a node, returns a new row with the node as the "next neighbor" of the final node
// QUESTIONS: This both mutates the input and returns a value. Is this what I want to do?
const appendNode = (node: MapNode, row: Row) => {
  let finalNode = row.root;
  while (finalNode.getNeighbors.length > 0) {
    finalNode = finalNode.getNeighbors()[0]; // Assumes a single neighbor, and that this neighbor represents the "next"
  }
  finalNode.setNeighbors([node]);
  return row;
};

// Temporary test data.
const n1 = createNode("test1", [300, 140]);
const n2 = createNode("test2", [10, 10]);
const n3 = createNode("test3", [120, 200]);
n1.setColor("blue");
n2.setColor("pink");
n3.setColor("aqua");
// Append by hand
// n1.setNeighbors([n2])
// n2.setNeighbors([n3])

// Append with util
const temp = appendNode(n2, { root: n1 });
// console.log(getRowNodes(temp.root)); // has a return value
// appendNode(n3, {root: n1})

const App = () => {
  const [inputX, setInputX] = useState();
  const [inputY, setInputY] = useState();
  const [nodes, setNodes] = useState<Array<MapNode>>([n1]);
  const [row, setRow] = useState({ root: n1 });

  const rowNodes = getRowNodes(row.root);

  // Handlers
  const handleAddClick = (e: any) => {
    e.preventDefault();
    const newNode: MapNode = createNode(id++, [inputX, inputY]);
    newNode.setColor("pink");
    setNodes([...nodes, newNode]);
    const newRow = appendNode(newNode, row); // Append a node to the row.
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
        {rowNodes.map((n, i) => (
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
