const UNIT_SIZE = 20;
const WIDTH = 640;
const HEIGHT = 640;
const NUM_ROWS = HEIGHT / UNIT_SIZE;
const NUM_COLS = WIDTH / UNIT_SIZE;

const c = document.getElementById("myCanvas");
const ctx = c.getContext("2d");

const drawSquare = (row, col,color) => {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.fillRect(row, col, UNIT_SIZE, UNIT_SIZE);
  ctx.stroke();
};

const drawMaze = (numRows, numCols) =>{
    for (let i=0;i<= numRows;i++){
        for(let j=0;j<=numCols;j++){
        //we rrmurltirply by 20 fo the actual gid
        if(i%2===0 || j%2===0){
            let row = i*20;
            let col = j*20;
            drawSquare(row,col,'yellow');
        }
        else{
            let row = i*20;
            let col = j*20;
            drawSquare(row,col,'yellow');
        }
          
        }
    }
};





// (0, 0)
// (0, 20)
// (0, 40)

//
// i = 4, j = 6
// 

drawMaze(NUM_ROWS, NUM_COLS);

// fake same "walls" (blocked edge)
for (let i = 0; i < 10; i += 1) {
  drawSquare(30, UNIT_SIZE * i, 'black');
}


// drawRectangle(3, 5);


//   01234
//   ---------
// 0 000000000
// 1 000000000
// 2 000000000
// 3 000000000
// 4 000000000




// 0-0-0-0-0-0-0-0-0-0
// | | | | | | | | | |
// 0-0-0-0-0-0-0-0-0-0
// | | | | | | | | | |
// 0-0-0-0-0-0-0-0-0-0
// | | | | | | | | | |
// 0-0-0-0-0-0-0-0-0-0
// | | | | | | | | | |
// 0-0-0-0-0-0-0-0-0-0






