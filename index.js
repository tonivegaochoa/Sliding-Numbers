const board = document.querySelector('#board');
const spaces = board.querySelectorAll('.space');
const spacesArr = Array.from(spaces);
const tile = board.querySelector('.tile');

tile.addEventListener('click', moveToAdjacent);

function moveToAdjacent() {
  const index = spacesArr.findIndex(element => element.firstChild === this);

  if(spacesArr[index+1] && spacesArr[index+1].childElementCount === 0) {
    spacesArr[index+1].appendChild(this);
  } else {
    spacesArr[index-1].appendChild(this);
  };
}