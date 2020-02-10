/**
 * Given a node in a graph, color all connected nodes.
 *
 * @param {} head - the starting point, a node
 * @param {*} colorList - A list of colors. There must be enough colors to cover the graph. This is graph depth + 1.
 */
const colorGraph = (head, colorList) => {
  let stack = [];
  const visited = new Set();

  const colorNode = n => {
    stack.push(n);
    visited.add(n.getId());

    const neighborColors = n
      .getNeighbors()
      .map(neighbor => neighbor.getColor());
    let legalColor;
    for (let i = 0; i < colorList.length; i++) {
      const color = colorList[i];
      const colorIsUsable = neighborColors.indexOf(color) < 0;
      if (colorIsUsable) {
        legalColor = color;
        break;
      }
    }
    n.setColor(legalColor);

    // Visit neighbors
    const notYetVisited = head
      .getNeighbors()
      .filter(n => !visited.has(n.getId()));
    if (notYetVisited.length > 0) {
      colorNode(notYetVisited[0]);
    }
  };

  // Kick it off by visiting the first head
  colorNode(head);
};

module.exports = colorGraph;
