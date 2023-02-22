const svgNS = "http://www.w3.org/2000/svg";  
const paintBtn = document.querySelector("#paintBtn");
const scratchPad = document.querySelector("#scratchPad");
const svg = document.getElementById("content");
const realPad = document.getElementById("pad")
const deleteBtn = document.querySelector("#delete");
const undoBtn = document.querySelector("#undo");


//그리기 버튼 눌렀을 때 
paintBtn.onclick = () => {
    if(scratchPad.style.display === "none"){
        scratchPad.style.display = "";
        undoBtn.style.display = "";
        deleteBtn.style.display = "";
        realPad.style.display = "";
    }else if(scratchPad.style.display === "") {

        realPad.style.display = "none";
        scratchPad.style.display = "none";
        undoBtn.style.display = "none";
        deleteBtn.style.display = "none";
        console.log(document);
    }
}

//휴지통 버튼 눌렀을 때
deleteBtn.onclick = () => {
    while(realPad.hasChildNodes()){
        realPad.removeChild(realPad.firstChild)
    }
}

//되돌리기 버튼 눌렀을 때 
undoBtn.onclick = () => {
    realPad.lastElementChild.remove();
}

//마우스 동작
let dragging = false;
let msX = 0;
let msY = 0;
let startPoint;

scratchPad.addEventListener("mousedown", (event) => {
    dragging = true;
    startPoint = "M "+ event.clientX + ", " + event.clientY + " ";
})



scratchPad.addEventListener("mousemove", (event) => {
    if(dragging === true){
        let nowX = event.clientX;
        let nowY = event.clientY;
        msX = nowX;
        msY = nowY;
        

        currPath = startPoint + " " + msX + "," + msY + " "; 
        drawing(currPath);
    }
})
scratchPad.addEventListener("mouseup", () => {
    dragging = false;
    console.log(document);
})

//그리기
var drawLine = document.createElementNS(svgNS,"path");

function drawing(currPath) {
    let i = 1;
    drawLine.setAttributeNS(null,"d", startPoint + currPath);
    drawLine.setAttributeNS(null,"fill"  ,"none");
    drawLine.setAttributeNS(null,"class"  ,"draw " + i);
    drawLine.setAttributeNS(null,"stroke","black");
    drawLine.setAttributeNS(null,"stroke-width","2");
    realPad.appendChild(drawLine);
    i++;
}