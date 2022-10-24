const canvas = document.getElementById("canvas");
const canvasSizeText = document.getElementById("canvasCurrentSize");
const updateBtnText = document.getElementById("updCanvasTxt");
const canvasInput = document.getElementById("canvasSizeInput");
const canvasUpdater = document.getElementById("updCanvas");
const colorChoices = document.querySelectorAll('.btnColorOpt');

let currentCanvasVal = 16;
let newCanvasInput = 16;
let currentColorChoice = "white";
let isMouseDown;

document.addEventListener("mousedown", () => isMouseDown = true);
document.addEventListener("mouseup", () => isMouseDown = false);  

// update text that showcases the current canvas size
function canvasTextUpdater (){
    canvasSizeText.textContent = `Current size ${currentCanvasVal}x${currentCanvasVal}`  
}
canvasTextUpdater();

// input for canvas size getting saved to variable everytime the value changes
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
})

// update/reset button resets button text & color, then run function to remove canvas boxes
canvasUpdater.addEventListener("click",
    function() {
        if (newCanvasInput <= 100) {
            canvasUpdater.classList.remove("rdyGreen");
            updateBtnText.innerText = "Reset";
            removeCanvas();
        }
    })

    // removes current boxes, get new grid(canvas) size value from input, then run function to load new boxes
function removeCanvas() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild);
      }
    currentCanvasVal = newCanvasInput;
    loadCanvas();
};

// applies grid size & loads canvas on pageload(or when called with the update button)
function loadCanvas() {
    canvas.style.cssText = `grid-template-columns: repeat(${currentCanvasVal}, 2fr);grid-template-rows: repeat(${currentCanvasVal}, 2fr);`;
    for (let i = 0; i < currentCanvasVal * currentCanvasVal; i++) {
        let canvasBox = document.createElement("div");
        
        canvasBox.setAttribute("class", "canvasBox");
        canvasBox.setAttribute("id", "white");
        
        canvasBox.addEventListener('dragstart', (e) => {
            e.preventDefault()
          })
          
          canvasBox.addEventListener('drop', (e) => {
            e.preventDefault()
          })
        
        canvasBox.addEventListener("mousedown", (e) => e.target.setAttribute("id", currentColorChoice)); 
        canvasBox.addEventListener("mouseover", (e) => changeColor(e)) 
        
        canvas.appendChild(canvasBox);
    }
    canvasTextUpdater()
}
loadCanvas();

// get color ID on click


for (let i = 0; i < colorChoices.length; i++) {
    let button = colorChoices[i];
    
    // Add click event to colorChoices
    button.addEventListener("click", function(event) {
        let colorIndex = Array.prototype.indexOf.call(colorChoices, event.target);
        currentColorChoice = colorChoices[colorIndex].id;
      // First remove 'clicked' class from all colorChoices
      colorChoices.forEach(function(item){
        item.classList.remove("clicked");
      })
      
      // Next add 'clicked' class to clicked button
      button.classList.add("clicked");
    });
}  

// change color when clicking and mouse held down while hovering over boxes
function changeColor(e) {
    if(!isMouseDown) return;
    e.target.setAttribute("id", currentColorChoice)
}