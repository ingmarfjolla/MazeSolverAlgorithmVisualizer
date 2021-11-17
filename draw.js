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

const drawPath = (path) => { 
    for(let i=1;i<path.length;i++){
      drawNodeWithStrings(path[i],"pink");
      drawEdgeWithStrings(path[i],path[i-1],"pink")
    }
    return;
  }


// example
//



const queue = [];

const enqueueTask = (fn, ...args) => {
  queue.push(() => fn(...args));
};


// enqueueTask(drawNodeWithStrings, '4,6', 'yellow');
// enqueueTask(drawNodeWithStrings, '4,10', 'red');
// enqueueTask(drawNodeWithStrings, '0,0', 'blue');

const evaluateQueue = () =>{
    let i = 0;
    let intervalId = setInterval(() => {
    queue[i]();
    i++;  
    if(i>queue.length-1){
        clearInterval(intervalId);
    }
    }, 50);
}

 
// const drawNodeWithStrings = (nodeStr, color) => {

// enqueueTask(drawNodeWithStrings('4,6', 'yellow'));
// enqueueTask(drawNodeWithStrings, '4,6', 'yellow');
// enqueueTask(drawNodeWithStrings, '4,6', 'yellow', 'red', 'blue');




