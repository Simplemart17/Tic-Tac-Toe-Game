const first = document.getElementById('first');
const btnClick = document.getElementById('btn-click');
const iconO = document.getElementById('o-icon');
const iconX = document.getElementById('x-icon');

const getValue = (id) => {
  
}

// open selection modal
btnClick.onclick = () => {
  document.getElementById('icon-modal').style.display = 'block';
}

// select icon to play the game
const selectIcon = (id) => {
  if (id === 'o-icon') {
    console.log(iconO.value);
  }
  if (id === 'x-icon') {
    console.log(iconX.value);
  }
  document.getElementById('icon-modal').style.display = 'none';
}

// reset the game
const clearGame = () => {
  first.innerHTML = "";
}