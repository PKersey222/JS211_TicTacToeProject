'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let playerTurn = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const horizontalWin = () => {
  // Your code here to check for horizontal wins
  // if player  gets three in a row from horizontal then 'YOU WIN'
  if((board[0][0] == "X" && board[0][1] == "X" && board[0][2] == "X") || (board[0][0] == "O" && board[0][1] == "O" && board[0][2] == "O")) {
    return true;
  } else if ((board[1][0] == "X" && board[1][1] == "X" && board[1][2] == "X") || (board[1][0] == "O" && board[1][1] == "O" && board[1][2] == "O")) {
    return true;
} else if ((board[2][0] == "X" && board[2][1] == "X" && board[2][2] == "X") || (board[2][0] == "O" && board[2][1] == "O" && board[2][2] == "O")) {
return true;
}
}

const verticalWin = () => {
  // Your code here to check for vertical wins
  // if player gets three in a row virtical then 'YOU WIN'
  if((board[0][0] == "X" && board[1][0] == "X" && board[2][0] == "X") || (board[0][0] == "O" && board[1][0] == "O" && board[2][0] == "O")) {
    return true;
  } else if ((board[0][1] == "X" && board[1][1] == "X" && board[2][1] == "X") || (board[0][1] == "O" && board[1][1] == "O" && board[2][1] == "O")) {
    return true;
  } else if ((board[0][2] == "X" && board[1][2] == "X" && board[2][2] == "X") || (board[0][2] == "O" && board[1][2] == "O" && board[2][2] == "O")) {
    return true;
  }
}
  const diagonalWin = () => {
    // Your code here to check for diagonal wins
    // if player gets three in a row diagonal the 'YOU WIN'
    if((board[0][0] == "X" && board[1][1] == "X" && board[2][2] == "X") || (board[0][0] == "O" && board[1][1] == "O" && board[2][2] == "O")) {
      return true;
    } else if ((board[0][2] == "X" && board[1][1] == "X" && board[2][0] == "X") || (board[0][2] == "O" && board[1][1] == "O" && board[2][0] == "O")) {
      return true;    
    }
  }
  
  
  
  const isLegal = (row, column) => {
    //need to check if something is there if so reject move if not allow move
   if (board[row][column]!== ' '){
   return false;
   } else {
    return true;
   }
  }
  const movePiece = (row, column) => {
    // take whatever the playerTurn is and put it in the array
    board[row].splice(column, 1, playerTurn);
  }
  const checkForWin = () => {
    // Your code here call each of the check for types of wins
    // console.log ('Player ${playerTurn} won!')
  // } else{
    //call horizontal win
     //call virtical win
    //call diaginal win
    if (horizontalWin () || verticalWin () || diagonalWin ()) {
      return true
    }
   
    
  //   changeMarker()
  }
  const changeMarker = () => {
    if (playerTurn === 'X') {
      playerTurn = 'O'
    } else {
      playerTurn ='X'
    }
  }
  
  const ticTacToe = (row, column) => {
    // Your code here to place a marker on the board
    // check if move is legal
    // if the move is legal then move the piece if not then return false 
    if (isLegal(row, column) === true){
      movePiece(row, column)
      if(checkForWin () === true){
    // alert('YOU WIN!!!') 
    console.log('YOU WIN!!!')
    return true   
  }else{
     changeMarker ()
  }
    } else{
      console.log('Not An Empty Box')
      return false
      // alert ('Not An Empty Box')
    }
  //   isLegal (row, column)
  // // call move piece function
  //  movePiece(row, column);
  // then check for a win
  // if the function returns true then alert you win
  
  // if the player didnt win flip to the new players turn
 
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + playerTurn + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      ticTacToe(0, 0)
      ticTacToe(0, 1)
      ticTacToe(1, 1)
      ticTacToe(0, 2)
      ticTacToe(2, 2)
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
