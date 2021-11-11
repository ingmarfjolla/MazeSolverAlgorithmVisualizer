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

// just bwecause ajacency list need visited to make sure not 
///vsited again
const dfs = (adjacencyList,start,end, visited=new Set()) => { 
  if(start === end){
    drawNodeWithStrings(end,"red");
    return;
  }
  if(visited.has(start)){
    return; 
  }
  visited.add(start);
  drawNodeWithStrings(start,"yellow");

  const neighbors = adjacencyList[start];
  for(let neighbor of neighbors){
    // visiting neighbor
    ///IF ITS TRUE DO STUFF 
    drawEdgeWithStrings(start,neighbor,"yellow");
    dfs(adjacencyList,neighbor,end,visited);
   
    
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

  console.log('starting dfs');
  const nodes = Object.keys(adjacencyList)
  const start = pluckRandom(nodes);
  const end = pluckRandom(nodes);
  dfs(adjacencyList, start, end);
  drawNodeWithStrings(start, 'orange');
  drawNodeWithStrings(end, 'orange');
  console.log('ending dfs');
}

// const [a, b] = e
main();
