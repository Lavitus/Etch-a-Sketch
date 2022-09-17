// grid/canvas area 
let canvas = document.getElementById("canvas");
// standard canvas size
let currentCanvasVal = 16;

let canvasSizeText = document.getElementById("canvasCurrentSize");
//set & update text that showcases the current canvas size
function canvasTextUpdater (){
    canvasSizeText.textContent = `Current size ${currentCanvasVal}x${currentCanvasVal}`  
}
canvasTextUpdater();

updateBtnText = document.getElementById("updCanvasTxt")

// input for canvas size getting saved to variable everytime the value changes
let newCanvasInput = 16;
let canvasInput = document.getElementById("canvasSizeInput");
canvasInput.addEventListener("input", (event) => {
    newCanvasInput = document.getElementById("canvasSizeInput").value;
    if (newCanvasInput <= 100) {
        if (newCanvasInput == currentCanvasVal) {
            canvasUpdater.classList.remove("rdyGreen");
            updateBtnText.innerText = "Reset";
        } else {
            canvasUpdater.classList.add("rdyGreen");
            updateBtnText.innerText = "Update";
        }
    }
});
// update btn click starts updateCanvas function
let canvasUpdater = document.getElementById("updCanvas");
canvasUpdater.addEventListener("click",
    function() {
        if (newCanvasInput <= 100) {
            canvasUpdater.classList.remove("rdyGreen");
            updateBtnText.innerText = "Reset";
            updCanvas();
        }
    });
// removes current boxes, get new grid(canvas) size value from input and 
function updCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
      }
    currentCanvasVal = newCanvasInput;
    loadCanvas();
}

// applies grid size & loads canvas on pageload(or when called with the update button)
function loadCanvas() {
    canvas.style.cssText = `grid-template-columns: repeat(${currentCanvasVal}, 2fr);grid-template-rows: repeat(${currentCanvasVal}, 2fr);`;
    for (let i = 0; i < currentCanvasVal * currentCanvasVal; i++) {
        let canvasBox = document.createElement("div");
        canvasBox.setAttribute("id", "canvasBox");
        
        canvasBox.addEventListener("mouseover", (event) => {
            event.target.style.backgroundColor = "red";
        }); 
        
        canvas.appendChild(canvasBox);
    }
    canvasTextUpdater()
}
loadCanvas();