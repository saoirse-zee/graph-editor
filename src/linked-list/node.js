/**
 * Node constructor
 */

const createNode = (id) => {
  const _id = id
  let data = "";
  let next = null; // Some other node
  const getId = () => _id;
  const getData = () => data;
  const setData = d => (data = d);
  const getNext = () => next;
  const setNext = n => (next = n);
  return {
    getId,
    getData,
    setData,
    getNext,
    setNext
  };
};

module.exports = {
    createNode
}