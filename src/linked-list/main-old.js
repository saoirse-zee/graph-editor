/**
 * Linked list - Implementation in functional style... I hope! 🤷🏻‍♀️
 */


/**
 * Node constructor
 */
const node = () => {
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

/**
 * List constructor
 */
const list = () => {
  let head = null; // The first node in the list.
  const setHead = n => (head = n);
  const render = () => {
    for (n = head; n.getNext() !== null; n = n.getNext()) {
      console.log(n.getData());
    }
    console.log(n.getData()); // It seems dumb to have to print this last one separately.
  };
  return {
    setHead,
    render,
  };
};

/**
 * Playground
 */
const n1 = node();
const n2 = node();
const n3 = node();
const n4 = node();

n1.setData("n1");
n2.setData("n2");
n3.setData("n3");
n4.setData("n4");
n1.setNext(n2);
n2.setNext(n3);
n3.setNext(n4);

const l1 = list()
l1.setHead(n1)
l1.render()
