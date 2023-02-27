const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const imgQMark = new Image();
imgQMark.src = "./img/Qmark2.png";
imgQMark.alt = "question";

const imgPointer = new Image();
imgPointer.src = "./img/pointer.png";
imgPointer.alt = "pointer";

const imgCheck = new Image();
imgCheck.src = "./img/check.png"
imgPointer.alt = "check";

const drawBase = () => {
    //헤더
    ctx.beginPath();
    ctx.fillStyle ="rgb(87, 186, 203)";
    ctx.rect(0, 0, 800, 40);
    ctx.fill();

    //틀
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#6495ED";
    ctx.beginPath();
    ctx.roundRect(225, 175, 250, 50, 30);
    ctx.stroke();

    ctx.beginPath();
    ctx.roundRect(525, 175, 50, 50, 30);
    ctx.stroke();
    ctx.moveTo(427, 175);
    ctx.quadraticCurveTo(487, 130, 547, 175);
    ctx.stroke();
}

let yPos1 = 100;
let yPos2 = 100;
let yPos3 = 100;
let yPos4 = 100;
let yPos5 = 100;
let yPos6 = 100;
const drawCircle = () => {
   //왼쪽 동그라미들
   ctx.fillStyle = "pink";
   ctx.beginPath();
   ctx.arc(250, yPos1, 10, 0, Math.PI * 2, true)
   ctx.fill();
   ctx.beginPath();
   ctx.arc(300, yPos2, 10, 0, Math.PI * 2, true)
   ctx.fill();
   ctx.beginPath();
   ctx.arc(350, yPos3, 10, 0, Math.PI * 2, true)
   ctx.fill();
   ctx.beginPath();
   ctx.arc(400, yPos4, 10, 0, Math.PI * 2, true)
   ctx.fill();
   ctx.beginPath();
   ctx.arc(450, yPos5, 10, 0, Math.PI * 2, true)
   ctx.fill();

   //오른쪽 동그라미
   ctx.fillStyle = "plum";
   ctx.beginPath();
   ctx.arc(550, yPos6, 10, 0, Math.PI * 2, true)
   ctx.fill();
}

//j
const drawBtn = () => {
    ctx.fillStyle = "rgb(87, 186, 203)"
    ctx.beginPath();
    ctx.rect(120, 350, 565, 70);
    ctx.fill(); 
    
    //숫자 버튼
    ctx.beginPath();
    for(let i=0; i<10; i++){
        ctx.fillStyle = "#e3fafc"
        ctx.roundRect(130 + 55*i, 360, 50, 50, 10);
    }
    ctx.fill();

    ctx.beginPath();
    for(let i=0; i<10; i++){
        ctx.font = "50px Verdana";
        ctx.fillStyle = "#1098ad";
        ctx.fillText(i, 140 + 55 * i, 405)
    }
    ctx.fill();
}

let stopContent = false;
let xPos = 0;
let xPos2 = 0;
let count = 0;

//떨어지는 동그라미
const fallDownCircle = () => {
    if(yPos1 < 200){
        yPos1 +=2;
    } else if(yPos2 < 200){
        yPos2 +=2;
    } else if(yPos3 < 200){
        yPos3 +=2;
    } else if(yPos4 < 200){
        yPos4 +=2;
    } else if(yPos5 < 200){
        yPos5 +=2;
    } else if(yPos6 < 200){
        yPos6 +=2;
    } else {
        ctx.fillStyle = "black";
        ctx.font = "50px Verdana";
        ctx.fillText(`5 + 1 =`, 300, 300); 
        drawBtn();
        stopContent = true;
    }
}
 
//오답 선택 시 애니메이션
const wrongNum =() => {
    if(stopContent === true){
        ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150);   
        if(xPos > -350){
            xPos -= 2;
            ctx.drawImage(imgQMark, 520, 240, 50, 90);
            ctx.save();
        }else if(xPos == -350){
            ctx.beginPath();
            ctx.fillStyle = "gray"
            ctx.roundRect(130 + 55 * 4, 360, 50, 50, 10);
            ctx.fill();
    
            ctx.beginPath();
            ctx.font = "50px Verdana";
            ctx.fillStyle = "darkgray";
            ctx.fillText(4, 140 + 55 * 4, 405)
            ctx.fill();
        
            ctx.restore();
            ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150);
            ctx.clearRect(520, 240, 50, 90);
            ctx.drawImage(imgCheck, 0, 0, 250, 231, 510, 240, 90, 90);
            if(count<=200){
                count++;
            }
            xPos2 = xPos;
        }
    
        if(count === 200 && xPos2 < -230){
            ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150);
            xPos += 2;
        } 
    }
}

// 정답 선택 시 애니메이션
const correctNum = () => {
    if(count === 200 && xPos < -230){
        xPos += 2;
    }else if(count === 200 && xPos === -230){
        ctx.beginPath();
        ctx.fillStyle = "gray"
        ctx.roundRect(130 + 55*6, 360, 50, 50, 10);
        ctx.fill();

        ctx.beginPath();
        ctx.font = "50px Verdana";
        ctx.fillStyle = "darkgray";
        ctx.fillText(6, 140 + 55 * 6, 405)
        ctx.fill();
    
        ctx.restore();
        ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150);
        ctx.clearRect(520, 240, 50, 90);
        ctx.drawImage(imgCheck, 251, 0, 250, 231, 510, 240, 90, 90);
        cancelAnimationFrame(requestAnimationFrame(update));
    }
}


const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    drawCircle();
    fallDownCircle();
    wrongNum();
    correctNum();
    requestAnimationFrame(update);
}
