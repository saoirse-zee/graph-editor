const test = require('ava');
const node = require("./node");
const colorGraph = require("./color-graph");

// Define nodes
const node1 = node.createNode("a");
const node2 = node.createNode("b");
const node3 = node.createNode("c");
const node4 = node.createNode("d");
const unreachableNode = node.createNode("unreachable");

// Connect them to each other
node1.setNeighbors([node2, node3]);
node2.setNeighbors([node1, node3, node4]);
node3.setNeighbors([node1, node2]);
node4.setNeighbors([node2]);

// Color the graph, using node1 as the entry point
colorGraph(node1, ["red", "green", "blue"]);

test('nodes are colored correctly', t => {
    t.is(node1.getColor(), 'red');
    t.is(node2.getColor(), 'green');
    t.is(node3.getColor(), 'blue');
    t.is(unreachableNode.getColor(), '');
});
 