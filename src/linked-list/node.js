/**
 * Node constructor
 */

const createNode = () => {
  let data = "";
  let next = null; // Some other node
  const getData = () => data;
  const setData = d => (data = d);
  const getNext = () => next;
  const setNext = n => (next = n);
  return {
    getData,
    setData,
    getNext,
    setNext
  };
};

module.exports = {
    createNode
}