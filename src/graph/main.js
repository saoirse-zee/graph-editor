const node = require("./node");
const colorGraph = require("./color-graph");

let id = 0

// Create somes nodes. The "value" here could be interpreted to be x, y coords.
const node1 = node.createNode(id++, [10, 13]);
const node2 = node.createNode(id++, [1, 34]);
const node3 = node.createNode(id++, [80, 7]);
const node4 = node.createNode(id++, [10, 32]);

node1.setNeighbors([node2, node3]);
node2.setNeighbors([node1, node3, node4]);
node3.setNeighbors([node1, node2]);
node4.setNeighbors([node2]);

const colors = ["🎈", "🤢", "👖"];
const nodes = [node1, node2, node3, node4];

// Method 1: Given a list of nodes, color them
// colorGraph(nodes, colors);

// Method 2: Given a node in a graph, color all connected nodes.
colorGraph(node2, colors);

// Print the list of nodes
nodes.forEach(node.printNode);
