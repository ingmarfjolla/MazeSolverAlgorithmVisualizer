
//Arary cant be put into javascirpt set so we need stinrg
const primsAlgo = (rows,cols) => {
  const nodes = [];
  for(let i=0;i<rows;i++){
    for(let j=0;j<cols;j++){
      nodes.push(i+","+j);
    }
  }

  const startingNode = getRandomElement(nodes);
  const tree = new Set();
  tree.add(startingNode);
  const edges = getEdges(startingNode,rows,cols);

  
  const neighborsSet = new Set();
  for (let edge of edges) {
    neighborsSet.add(edge[1]);
  }
  const exportedEdges = [];

  while(tree.size < nodes.length){
    //const randomEdge = getRandomElement(edges);
    const randomEdge = pluckRandom(edges);
    exportedEdges.push(randomEdge);
    
    const [ oldNode, newNode ] = randomEdge;
    drawEdgeWithStrings(oldNode,newNode,"white");
    if (tree.has(newNode)) {
      console.log('DUPE!!!!');
    }


    tree.add(newNode);
     
    const newEdges = getEdges(newNode,rows,cols);
    for(let newEdge of newEdges){
      const [a, b] = newEdge;
      if (!neighborsSet.has(b)) {
        edges.push(newEdge);
        neighborsSet.add(b);
      }
    }
  }

  //returns the edges to traverse 
  return exportedEdges;
}
 

const getEdges = (currNode,rows,cols) => {
  const neighbors = getNeighbors(currNode,rows,cols);
  const edges = [];
  for(let i =0;i<neighbors.length;i++){
    edges.push([currNode,neighbors[i]]);
  }
  return edges;
}

//needs to take into account bounds checking
const getNeighbors = (currNode,rows,cols) =>{
  let neighbors = []
  const row = parseInt(currNode.substr(0,currNode.indexOf(',')));
  const col = parseInt(currNode.substr(currNode.indexOf(',')+1));
  let up = (row-1>=0);
  let down = (row+1<rows);
  let left = (col-1>=0);
  let right = (col+1<cols);
  if(up){
    neighbors.push((row-1)+","+col);
  }
  if(down){
    neighbors.push((row+1) +","+col );
  }
  if(left){
    neighbors.push(row +","+(col-1) );
  }
  if(right){
    neighbors.push(row +","+(col+1) );
  }

  return neighbors;

};
const pluckRandom = (arr) =>{
  const index = Math.floor(Math.random() * arr.length);
  const randElement = arr[index];
  arr.splice(index,1);
  return randElement;
};



const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};







const main = () => {
  drawMaze(NUM_ROWS, NUM_COLS);
  
  const edges = primsAlgo(NODE_Y_NUM, NODE_X_NUM);
  const adjacencyList = {};
  for(let edge of edges){
    const [A,B] = edge;
    if(!(A in adjacencyList)){
      adjacencyList[A] = [ B ];
    }
    else{
      adjacencyList[A].push(B);
    }
    if(!(B in adjacencyList)){
      adjacencyList[B] = [ A ];
    }
    else{
      adjacencyList[B].push(A);
    }
     
  }
  console.log(adjacencyList);

  //<=------------------------------------------->
  ///DFS TESTNIG///////
  console.log('starting dfs');
  const nodes = Object.keys(adjacencyList)
  const start = pluckRandom(nodes);
  const end = pluckRandom(nodes);
  console.log(start);
  console.log(end);
  const dfsPath = dfs(adjacencyList, start, end,[]);
  evaluateQueue();
  drawPath(dfsPath);
  drawNodeWithStrings(start, 'orange');
  drawNodeWithStrings(end, 'red');
  console.log('ending dfs');
  //<=------------------------------------------->


  //<=------------------------------------------->
  // <----------BFS TESTING --------------->

  // console.log('starting bfs');
  // const nodes = Object.keys(adjacencyList)
  // const start = pluckRandom(nodes);
  // const end = pluckRandom(nodes);
  // console.log(start);
  // console.log(end);
  // const bfsPath = bfs(adjacencyList, start, end);
  // drawPath(bfsPath);
  // drawNodeWithStrings(start, 'orange');
  // drawNodeWithStrings(end, 'red');
  // console.log('ending bfs');

// <----------BFS TESTING --------------->


  // <----------A* Testing --------------->



}

// const [a, b] = e
main();
