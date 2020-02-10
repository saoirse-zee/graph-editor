/**
 * Node constructor
 * @param id - A unique id for the node
 * @param initialValue - Arbitrary data to store in the node
 */
const createNode = (id, initialValue) => {
  const _id = id;
  let data = {
    value: initialValue,
    color: ""
  };
  let neighbors = [];

  const getId = () => _id;
  const getData = () => data;
  const getNeighbors = () => neighbors;
  const getColor = () => data.color;
  const setColor = color => {
    data.color = color;
  };
  const setNeighbors = newNeighbors => {
    neighbors = newNeighbors;
  };

  return {
    getId,
    getData,
    getNeighbors,
    getColor,
    setColor,
    setNeighbors
  };
};

/**
 * Node utilities
 */
const printNode = n => {
  console.log(n.getData());
};

const printNeighbors = n => {
  n.getNeighbors().forEach(printNode);
};

module.exports = {
  createNode,
  printNode,
  printNeighbors
};
