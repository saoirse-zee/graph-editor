import React, { useState } from "react";
import { createList, createNode } from "./linked-list";
import Container from "./components/Container";
import "./App.css";


// Temporary test data.
const n1 = createNode();
const n2 = createNode();
const n3 = createNode();
n1.setData([100, 130]);
n2.setData([110, 135]);
n3.setData([115, 140]);
const list = createList(n1);
list.append(n2);
list.append(n3);

const App = () => {
  const [inputX, setInputX] = useState();
  const [inputY, setInputY] = useState();
  const [row, setRow] = useState(list);

  const rowNodes = row.toArray();

  // Handlers
  const handleAddClick = (e: any) => {
    e.preventDefault();
    const node = createNode();
    node.setData([inputX, inputY]);
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

  console.log(list.stringify());

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
            key={i}
            cx={n.getData()[0]}
            cy={n.getData()[1]}
            r={5}
            fill={"white"}
          />
        ))}
      </Container>
    </div>
  );
};

export default App;
