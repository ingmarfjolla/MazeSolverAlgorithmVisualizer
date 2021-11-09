const UNIT_SIZE = 20;
const WIDTH = 640;
const HEIGHT = 640;
const NUM_ROWS = HEIGHT / UNIT_SIZE;
const NUM_COLS = WIDTH / UNIT_SIZE;
const NODE_Y_NUM = NUM_ROWS / 2;
const NODE_X_NUM = NUM_ROWS / 2;

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


// drawEdge([0, 0], [0, 1], 'blue');

// you may assume that the two input nodes are adjacent

// drawEdge([0, 0], 'right', 'blue');




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

  const startingNode = getRandomElement(nodes); // '1,1
  const tree = new Set();
  tree.add(startingNode);
  // const neighbors = getNeighbors(startingNode,rows,cols); // [  '4,2', '3,2', ]
  const edges = getEdges(startingNode,rows,cols); // [ ['4,2', '1,1'], ['3,2', '1,1']  ]

  // todo: 
  
  
  const neighborsSet = new Set();
  for (let edge of edges) {
    neighborsSet.add(edge[1]);
  }
  
  while(tree.size < nodes.length){
    const randomEdge = getRandomElement(edges);
    
    const [ oldNode, newNode ] = randomEdge;
    drawEdgeWithStrings(oldNode,newNode,"white");
    if (tree.has(newNode)) {
      console.log('DUPE!!!!');
    }


    tree.add(newNode);
    //
    const newEdges = getEdges(newNode,rows,cols);
    for(let newEdge of newEdges){
      const [a, b] = newEdge;
      if (!neighborsSet.has(b)) {
        edges.push(newEdge);
        neighborsSet.add(b);
      }
    }


    // const currentNode = getRandomElement(neighbors); 
    // const newNeighbors = getNeighbors(currentNode,rows,cols);
    // tree.add(currentNode);
    // //no duplicate 
    // for(let i=0;i<newNeighbors.length;i++){
    //   if (!neighborsSet.has(newNeighbors[i])){
    //     neighborsSet.add(newNeighbors[i]);
    //     neighbors.push(newNeighbors[i]);
    //   }
    // }
  }

  console.log(tree.size);
}
// TODO: clean up old edges on generation of new edges

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
  // console.log(currNode);
  // console.log(currNode[2]);
  //console.log(currNode.substr(currNode.indexOf(',')+1));
  const row = parseInt(currNode.substr(0,currNode.indexOf(',')));
  const col = parseInt(currNode.substr(currNode.indexOf(',')+1));
  // const row = parseInt(currNode[0]);
  // const col = parseInt(currNode[2]);
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

const getRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};



// primsAlgo(16, 16);
// "0,0"


//A node for us is a grid so referring to row col




// (0, 0)
// (0, 20)
// (0, 40)

//
// i = 4, j = 6
// 

drawMaze(NUM_ROWS, NUM_COLS);
primsAlgo(16,16);

