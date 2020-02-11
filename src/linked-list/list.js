/**
 * Linked list - Implementation in functional style... I hope! 🤷🏻‍♀️
 */

const n = require("./node");

const createList = head => {
  let _head = head;
  const getHead = () => _head;
  const getLast = () => {
    let currentNode = _head;
    while (currentNode.getNext()) {
      currentNode = currentNode.getNext();
    }
    return currentNode;
  };
  const append = node => {
    const last = getLast();
    last.setNext(node);
    return _head;
  };
  const stringify = () => {
    let string = "";
    let currentNode = _head;
    while (currentNode.getNext()) {
      string += currentNode.getData();
      string += " -> ";
      currentNode = currentNode.getNext();
    }
    string += currentNode.getData();
    return string;
  };
  return {
    getHead,
    getLast,
    append,
    stringify
  };
};

module.exports = {
  createList
};
