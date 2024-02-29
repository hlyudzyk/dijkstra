let graph = {};

function viewGraph() {
  const nodeSelect = document.getElementById('nodeSelect');
  const selectedNode = nodeSelect.value;
  document.getElementById("result").innerHTML = dictToTable(dijkstra(graph, selectedNode));
}

function dijkstra(graph, start) {
  let distances = {};

  let visited = new Set();

  let nodes = Object.keys(graph);

  for (let node of nodes) {
      distances[node] = Infinity;
  }
  
  distances[start] = 0;

  while (nodes.length) {
      nodes.sort((a, b) => distances[a] - distances[b]);
      let closestNode = nodes.shift();

      if (distances[closestNode] === Infinity) break;

      visited.add(closestNode);

      for (let neighbor in graph[closestNode]) {
          if (!visited.has(neighbor)) {
              let newDistance = distances[closestNode] + graph[closestNode][neighbor];
              
              if (newDistance < distances[neighbor]) {
                  distances[neighbor] = newDistance;
              }
          }
      }
  }

  return distances;
}

function dictToTable(dictionary) {
  let tableHtml = '<table><tr><th>Key</th><th>Value</th></tr>';
  for (let key in dictionary) {
      tableHtml += '<tr><td>' + key + '</td><td>' + JSON.stringify(dictionary[key]) + '</td></tr>';
  }
  tableHtml += '</table>';
  return tableHtml;
}

function parseGraphFromTextArea() {
  let textAreaConten = document.getElementById("graphInput").value;

  try{
    const lines = textAreaConten.trim().split('\n');

    lines.forEach(line => {
      const [node, edges] = line.trim().split(':');
      const edgeList = {};
      const edgePairs = edges.trim().split(',').map(pair => pair.trim());
      edgePairs.forEach(pair => {
          const [adjacentNode, weight] = pair.split(' ');
          edgeList[adjacentNode] = parseInt(weight);
      });
      graph[node] = edgeList;
      populateNodeDropdown();
  });
  } catch {
    alert("Wrong graph format")
  }

}

function populateNodeDropdown() {
  const nodeSelect = document.getElementById('nodeSelect');
nodeSelect.innerHTML = '';
  for (const node in graph) {
      const option = document.createElement('option');
      option.value = node;
      option.textContent = node;
      nodeSelect.appendChild(option);
  }
}


