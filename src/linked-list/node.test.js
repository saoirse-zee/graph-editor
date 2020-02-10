import { createNode } from ".";

test("new node has default data value", () => {
  const node = createNode();
  expect(node.getData()).toBe("");
});

test("new node has no neighbors", () => {
  const node = createNode();
  expect(node.getNext()).toBe(null);
});

test("can set data on a node", () => {
  const node = createNode();
  node.setData("hi im some data");
  expect(node.getData()).toBe("hi im some data");
});

test("data can be anything", () => {
  const node = createNode();
  node.setData({
    blurg: "smurg"
  });
  expect(node.getData()).toStrictEqual({
    blurg: "smurg"
  });
});

test("can set next on a node", () => {
  const node1 = createNode();
  const node2 = createNode();
  node1.setNext(node2);
  expect(node1.getNext()).toEqual(node2);
});
