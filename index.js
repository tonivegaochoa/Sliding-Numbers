"use strict";

const gameBoard = (() => {
  const board = Array.from(document.querySelectorAll('.space'));
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const size = 3;
  const numSpaces = size*size;

  tiles.forEach(tile => tile.addEventListener('click', tileClicked));

  function tileClicked() {
    const index = board.findIndex(e => e.firstChild === this);
    const emptyIndex = board.findIndex(e => e.childElementCount === 0);
    const diff = Math.abs(emptyIndex - index);
    const row = Math.floor(index / size);
    const col = index % size;

    let inRow = false;
    let inCol = false;

    // check for empty space in row
    for(let i = row*size; i < row*size+size; i++) {
      if(i === emptyIndex) {
        inRow = true;
        break;
      };
    }

    // check for empty space in column
    for(let i = col; i < board.length; i+=size) {
      if(i === emptyIndex) {
        inCol = true;
        break;
      }
    }

    if(inRow) {
      if(index < emptyIndex) {
        for(let i = index; i < emptyIndex; i++) {
          board[i+1].appendChild(board[i].firstChild);
        }
      } else {
        for(let i = emptyIndex; i < index; i++) {
          board[i].appendChild(board[i+1].firstChild);
        }
      }
    } else if (inCol) {
      if(index < emptyIndex) {
        for(let i = index; i < emptyIndex; i+=size) {
          board[i+size].appendChild(board[i].firstChild);
        }
      } else {
        for(let i = emptyIndex; i < index; i+=size) {
          board[i].appendChild(board[i+size].firstChild);
        }
      }
    }

    if(solved()) {
      setTimeout(displayController.solved, 100);
    }
  };

  const solved = () => {
    if(board[numSpaces-1].firstChild) return false;
    return board.every((space,index) => {
      if(!space.firstChild) return true;
      return space.firstChild.id == index+1;
    });
  }

  return {board, tiles, numSpaces};
})();

const gameController = (() => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  const shuffle = () => {
    shuffleArray(gameBoard.tiles);
    gameBoard.board.forEach((space, index) => {
      if(index < gameBoard.numSpaces-1) {
        space.appendChild(gameBoard.tiles[index]);
      }
    })
  };

  const newGame = () => {
    shuffle();
  };

  return {newGame};
})();

const displayController = (() => {
  const newGameBtn = document.querySelector('button');

  newGameBtn.addEventListener('click', gameController.newGame);

  const solved = () => {
    window.alert('You solved the puzzle');
  }

  return {solved};
})();