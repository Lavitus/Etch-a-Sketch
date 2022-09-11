let sketchArea = document.getElementById("sketchArea");
sketchField = 16 * 16;

for (let i = 0; i < sketchField; i++) {
    let sketchBox = document.createElement("div");
    sketchBox.setAttribute("id", "sketchBox");
    
    sketchBox.addEventListener("mouseover", (event) => {
        event.target.style.backgroundColor = "red";
    }); 
    
    sketchArea.appendChild(sketchBox);
}

