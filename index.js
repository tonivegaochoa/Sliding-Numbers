"use strict";

const gameBoard = (size) => {
  const board = Array.from(document.querySelectorAll('.space'));
  const tiles = Array.from(document.querySelectorAll('.tile'));

  const event = new Event('click');
  tiles.forEach(tile => tile.addEventListener('click', tileClicked));

  function tileClicked() {
    const index = board.findIndex(e => e.firstChild === this);
    const emptyIndex = board.findIndex(e => e.childElementCount === 0);
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

  const getSize = () => size;

  return {board, tiles, event, getSize};
};

const gameController = (() => {
  let game;

  const shuffle = () => {
    for(let i = 0; i < 100*game.getSize(); i++) {
      const r = Math.floor(Math.random() * 100 % game.tiles.length);
      game.tiles[r].dispatchEvent(game.event);
    }
  };

  const startGame = (size) => {
    game = gameBoard(size);
  };

  return {shuffle, startGame};
})();

const displayController = (() => {
  const container = document.querySelector('#container');
  const gameContainer = container.querySelector('#game');
  const menuContainer = container.querySelector('#menu');
  const menuBtn = gameContainer.querySelector('#menuBtn');
  const shuffleBtn = gameContainer.querySelector('#shuffleBtn');
  const board = gameContainer.querySelector('#board');
  const boardSizeBtns = menuContainer.querySelectorAll('.boardSize');

  menuBtn.addEventListener('click', showPuzzleOptions);
  shuffleBtn.addEventListener('click', gameController.shuffle);
  boardSizeBtns.forEach(btn => btn.addEventListener('click', startGame));

  function showPuzzleOptions() {
    gameContainer.classList.toggle('hidden');
    menuContainer.classList.toggle('hidden');
    clearBoard();
  };

  function startGame() {
    gameContainer.classList.toggle('hidden');
    menuContainer.classList.toggle('hidden');

    const size = this.getAttribute('size');
    createBoard(size);
    gameController.startGame(Number(size));
  };

  function clearBoard() {
    while(board.firstChild) {
      board.removeChild(board.firstChild);
    }
  }

  function createBoard(size) {
    let columns = "";
    for(let i = 0; i < size; i++) columns += 'auto ';
    board.style.gridTemplateColumns = columns;

    for(let i = 1; i < size*size; i++) {
      const space = createSpace();
      const tile = createTile(i);
      space.appendChild(tile);
      board.appendChild(space);
    }

    board.appendChild(createSpace());
  };

  function createSpace() {
    const div = document.createElement('div');
    div.classList.add('space');
    return div;
  };

  function createTile(num) {
    const div = document.createElement('div');
    div.classList.add('tile');
    div.setAttribute('id', num);
    div.textContent = num;
    return div;
  };
})();