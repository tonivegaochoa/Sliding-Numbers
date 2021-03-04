const board = document.querySelector('#board');
const spaces = board.querySelectorAll('.space');
const spacesArr = Array.from(spaces);
const tiles = board.querySelectorAll('.tile');

tiles.forEach(tile => tile.addEventListener('click', moveToAdjacent));

function moveToAdjacent() {
  const index = spacesArr.findIndex(e => e.firstChild === this);
  const emptyIndex = spacesArr.findIndex(e => e.childElementCount === 0);
  const diff = Math.abs(emptyIndex - index);
  console.log(`index = ${index}, emptyIndex = ${emptyIndex}, diff = ${diff}`);

  if(diff === 1) {
    if(index < emptyIndex) {
      spacesArr[index+1].appendChild(this);
    } else {
      spacesArr[index-1].appendChild(this);
    }
  } else if(diff > 1) {
    if(index < emptyIndex) {
      for(let i = index; i < emptyIndex; i++) {
        spacesArr[i+1].appendChild(spacesArr[i].firstChild);
      }
    } else {
      for(let i = emptyIndex; i < index; i++) {
        spacesArr[i].appendChild(spacesArr[i+1].firstChild);
      }
    }
  }
}

const gameBoard = (() => {
  const board = [];
})();