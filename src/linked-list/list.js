/**
 * Linked list - Implementation in functional style... I hope! 🤷🏻‍♀️
 */

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
  const find = id => {
    let currentNode = _head;
    while (currentNode && currentNode.getId() !== id) {
      currentNode = currentNode.getNext();
    }
    return currentNode || false;
  };
  const toArray = () => {
    const array = [];
    let currentNode = _head;
    while (currentNode.getNext()) {
      array.push(currentNode);
      currentNode = currentNode.getNext();
    }
    array.push(currentNode);
    return array;
  };

  return {
    getHead,
    getLast,
    append,
    stringify,
    find,
    toArray
  };
};

module.exports = {
  createList
};
