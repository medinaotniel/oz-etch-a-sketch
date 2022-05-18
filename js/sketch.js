/*
  DOM variables
*/

const grid = document.querySelector(".sketch__grid");

const btnClear = document.querySelector(".btn__clear");
const btnEraser = document.querySelector(".btn__eraser");
const btnRainbow = document.querySelector(".btn__rainbow");
const btnRandom = document.querySelector(".btn__random");
const btnBlack = document.querySelector(".btn__black");

const picker = document.querySelector("#picker__input");

const reSize = document.querySelector(".re-size__container");
const reSizeLabel = document.querySelector("#re-size__label");

/*
  Settings
*/

const settings = {
  option: "rgb(0,0,0)",
  size: 16,
  colour: "rgb(0,0,0)",
};

/*
  Save and control the state of the mousedown and mouseup events in order to simultaneously
  use them with the mouseover event
*/

let mouseDown = false;
grid.onmousedown = (event) => {
  // Prevents the browser from trying to 'grab' the element
  event.preventDefault(); 

  mouseDown = true;
};

grid.onmouseup = () => {
  mouseDown = false;
};

/*
  Returns if the left mouse button is pressed while the pointer is over an element
*/

const sketching = (event) => {
  return event.type === "mouseover" && mouseDown;
};

/*
  Sketches in a block if the left mouse button is pressed while the pointer is over it
*/

const sketchHandler = (event) => {
  if (sketching(event)) {
    let block = event.target;
    if (settings.option === "rainbow") {
      block.style.backgroundColor = randomRGB();
    } else {
      block.style.backgroundColor = settings.colour;
    }
  }
};

/*
  Generate a grid in the DOM of a given size:
    - The grid consists of stacked rectangular containers (divs)
    - Each container is made up of blocks (divs) that span the grid's width 
*/

const generateGrid = (size) => {
  // Container for grid blocks
  let container; 
  // Singular grid unit
  let block; 

  for (let n = 0; n < size * size; n++) {
    if (n % size === 0 || n === 0) {
      container = document.createElement("div");
      container.classList.add("grid__container");
    }

    block = document.createElement("div");
    block.classList.add("grid__block");

    // Handle sketching in accordance to mouse event
    block.addEventListener("mouseover", sketchHandler); 
    block.addEventListener("mousedown", sketchHandler); 

    container.appendChild(block);

    // If container is filled with blocks add it to the grid
    if (n % size === 0) { 
      grid.appendChild(container);
    }
  }
};

/*
  Clear the contents of the grid and generate a new one according to the settings
*/

const clearGrid = () => {
  grid.innerHTML = "";

  generateGrid(settings.size);
};

/*
  Returns a random RGB value "rgb(0-255, 0-255, 0-255)"
*/

const randomRGB = () => {
  // Returns a number from 0 - 255
  const random = () => Math.floor(Math.random() * 256); 
  return `rgb(${random()}, ${random()}, ${random()})`;
};

/*
  Event listeners for the sketching options and controls
*/

btnClear.onclick = () => {
  clearGrid();
};

btnEraser.onclick = () => {
  settings.option = "eraser";
  settings.colour = "rgb(252, 253, 253)";
};

btnBlack.onclick = () => {
  settings.option = "default";
  settings.colour = "rgb(0, 0, 0)";
};

btnRainbow.onclick = () => {
  settings.option = "rainbow";
};

btnRandom.onclick = () => {
  settings.option = "random";
  settings.colour = randomRGB();
};

// Dynamically change the size of the grid with the range input
reSize.oninput = (event) => { 
  settings.size = event.target.value;

  clearGrid();

  reSizeLabel.innerHTML = `${settings.size} X ${settings.size}`;
};

// Change the sketching colour using the color input
picker.oninput = () => {  
  settings.colour = picker.value;
};

// Generate default grid
generateGrid(settings.size); 
