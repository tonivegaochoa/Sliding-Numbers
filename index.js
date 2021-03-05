"use strict";

const gameBoard = (() => {
  const board = Array.from(document.querySelectorAll('.space'));
  const tiles = Array.from(document.querySelectorAll('.tile'));
  const size = 3;
  const numSpaces = size*size;

  const event = new Event('click');

  tiles.forEach(tile => tile.addEventListener('click', tileClicked));

  function tileClicked(e) {
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
  };

  return {board, tiles, size, numSpaces, event};
})();

const gameController = (() => {
  const shuffle = () => {
    for(let i = 0; i < 100*gameBoard.size; i++) {
      const r = Math.floor(Math.random() * 100 % 8);
      gameBoard.tiles[r].dispatchEvent(gameBoard.event);
    }
  };

  return {shuffle};
})();

const displayController = (() => {
  const shuffleBtn = document.querySelector('button');

  shuffleBtn.addEventListener('click', gameController.shuffle);
})();