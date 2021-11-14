const UNIT_SIZE = 20;
const WIDTH = 640;
const HEIGHT = 640;
const NUM_ROWS = HEIGHT / UNIT_SIZE;
const NUM_COLS = WIDTH / UNIT_SIZE;
const NODE_Y_NUM = NUM_ROWS / 2;
const NODE_X_NUM = NUM_ROWS / 2;
//16 nodes 


const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

//some squares are nodes and  some squares are edges
const drawSquare = (row, col,color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(col, row, UNIT_SIZE, UNIT_SIZE);
  ctx.stroke();
};


// HEre is where we inject the logic for inode
//OFFSET
const drawNode = (nodeRow, nodeCol, color) =>{
  drawSquare(nodeRow*UNIT_SIZE*2+UNIT_SIZE, nodeCol*UNIT_SIZE*2+UNIT_SIZE, color);
};

const drawNodeWithStrings = (nodeStr, color) => {
  const [r, c] = nodeStr.split(',').map(ch => Number(ch));
  drawNode(r, c, color);
};

const drawEdgeWithStrings = (nodeA, nodeB, color) => {
  const a = nodeA.split(',').map(ch => Number(ch));
  const b = nodeB.split(',').map(ch => Number(ch));
  drawEdge(a, b, color);
};

const drawEdge = (nodeA, nodeB, color) => {
  const [ rowA, colA ] = nodeA;
  const [ rowB, colB ] = nodeB;

  if (rowA === rowB) {
     // the rows are the same
     // so the cols must differ 1
     // we want to go one unit size to the igrht so its 2*unit size 
     const leftCol = Math.min(colA, colB);
     drawSquare(rowA*UNIT_SIZE*2+UNIT_SIZE, leftCol*UNIT_SIZE*2+(2*UNIT_SIZE),color);
  } else {
    const upRow = Math.min(rowA, rowB);
    drawSquare(upRow*UNIT_SIZE*2+(2*UNIT_SIZE), colA*UNIT_SIZE*2+UNIT_SIZE ,color);
  }
}




const drawMaze = (numRows, numCols) =>{
    for (let i=0;i<= numRows;i++){
          for(let j=0;j<=numCols;j++){
          //we rrmurltirply by 20 fo the actual gid
          //16nodes 16 edges
            if (i %2===0 || j%2===0){
              let row = i * UNIT_SIZE;
              let col = j * UNIT_SIZE;
              drawSquare(row,col, 'black');
            } else  {
              let row = i * UNIT_SIZE;
              let col = j * UNIT_SIZE;
              drawSquare(row,col, 'white');
        }
          
        }
    }
};

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

const drawPath = (path) => { 
  for(let i=1;i<path.length;i++){
    drawNodeWithStrings(path[i],"pink");
    drawEdgeWithStrings(path[i],path[i-1],"pink")
  }
  return;
}
// just bwecause ajacency list need visited to make sure not 
///vsited again
const dfs = (adjacencyList,start,end,correctPath,visited=new Set()) => { 
  if(start === end){
    drawNodeWithStrings(end,"red");
    return [start];
  }
  if(visited.has(start)){
    return []; 
  }
  visited.add(start);
  drawNodeWithStrings(start,"yellow");

  const neighbors = adjacencyList[start];
  for(let neighbor of neighbors){
    // visiting neighbor
    ///IF ITS TRUE DO STUFF 
    drawEdgeWithStrings(start,neighbor,"yellow");
    const path = dfs(adjacencyList,neighbor,end,correctPath,visited);
    // if(path){
    //   correctPath.push(neighbor);
    // }
    if(path.length>0){
      // correctPath.push(neighbor);
      // correctPath.push(start, ...path);
      return[start, ...path];
    }
   
    
  }
  //correctPath.push(start);
  console.log(correctPath);
  return[];
}
// const bfs = (adjacencyList,start,end, visited=new Set()) =>{
//   const queue = [];
//   queue.push(start);
//   //const previous = start;
  
//   while(queue.length>0){
//     console.log(queue);
//     const curr = queue.shift();
    
//     if(curr===end){
//       drawNodeWithStrings(end,"red");
//       return; 
//     }
//     if(visited.has(curr)){
//       continue;
//     }
//     drawNodeWithStrings(curr,"yellow");
//     visited.add(curr);
//     const neighbors = adjacencyList[curr];
//     for(let neighbor of neighbors){
//       if(visited.has(neighbor)){
//         continue;
//       }
//       drawEdgeWithStrings(curr,neighbor,"yellow");
//       queue.push(neighbor);
//     }
//   }
//   return;

// }

const bfs = (adjacencyList,start,end, visited=new Set()) =>{
  const queue = [];
  // const path = [];
  
  //this is how we will maintain ALL paths, by pushing them each time
  //and when we deque we just deque the current path and if its 
  //the right path, we return it so we can paint it
  //we will also paint ALL paths explored
  // path.push(start);

  queue.push([start]);
  //const previous = start;
  
  while(queue.length>0){
    // console.log(queue);
    const currPath = queue.shift();
    //console.log(currPath);
    currNode = currPath[currPath.length-1];
    //console.log(currNode);
    if(currNode ===end){
      console.log(currPath);
      
      drawNodeWithStrings(end,"red");
      drawPath(currPath);
      return; 
    }
    if(visited.has(currNode)){
      continue;
    }
    drawNodeWithStrings(currNode,"yellow");
    
    visited.add(currNode);

    const neighbors = adjacencyList[currNode];
    for(let neighbor of neighbors){
      if(visited.has(neighbor)){
        continue;
      }

      drawEdgeWithStrings(currNode,neighbor,"yellow");
      const newPath = currPath.concat([neighbor])
      queue.push(newPath);
    }

  }
  return;

}



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
  // bfs(adjacencyList, start, end);
  // drawNodeWithStrings(start, 'orange');
  // drawNodeWithStrings(end, 'red');
  // console.log('ending bfs');

// <----------BFS TESTING --------------->


  // <----------A* Testing --------------->



}

// const [a, b] = e
main();
