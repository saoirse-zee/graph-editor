import { createList, createNode } from "./";

test("can create new list", () => {
  const node = createNode();
  node.setData("hi");
  const list = createList(node);
  const headNode = list.getHead();
  expect(headNode.getData()).toEqual("hi");
});

test("can get the last node", () => {
  // Create a node. This will be our root.
  const root = createNode();
  root.setData("root");

  // Put a couple nodes on the root.
  const fakeNode = createNode();
  fakeNode.setData("2");
  const fakeNode2 = createNode();
  fakeNode2.setData("3");
  fakeNode.setNext(fakeNode2)
  root.setNext(fakeNode);

  // Create a list
  const list = createList(root);

  // Get the last node and make sure it's correct.
  const last = list.getLast()
  expect(last.getData()).toEqual("3");
});

test("can append a node to a list with one node", () => {
  const root = createNode();
  root.setData("root");
  const list = createList(root);
  const newNode = createNode()
  newNode.setData('new')
  list.append(newNode)

  const last = list.getLast()
  expect(last.getData()).toEqual("new");
});

test("can append a node to a list with multiple nodes", () => {
  const root = createNode();
  const n1 = createNode()
  const n2 = createNode()
  const n3 = createNode()

  root.setData("root");
  n1.setData('1')
  n2.setData('2')
  n3.setData('3')
  
  const list = createList(root);
  list.append(n1)
  list.append(n2)
  list.append(n3)

  const last = list.getLast()
  expect(last.getData()).toEqual("3");
});

test('stringify creates a pretty string representation of the list', () => {
  const root = createNode();
  const n1 = createNode()
  const n2 = createNode()
  const n3 = createNode()

  root.setData("root");
  n1.setData('1')
  n2.setData('2')
  n3.setData('3')
  
  const list = createList(root);
  list.append(n1)
  list.append(n2)
  list.append(n3)
  const string = list.stringify()
  expect(string).toBe('root -> 1 -> 2 -> 3')
})