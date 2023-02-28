const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');

const playBtn = document.querySelector("#playBtn");
const stopBtn = document.querySelector("#stopBtn");
const playTxt = document.querySelector("#play");
const pauseTxt = document.querySelector("#pause");
const btnRect1 = document.querySelector("#btnRect1");
const btnRect2 = document.querySelector("#btnRect1");

let currentAnimationFrame;
let isPaused, isStopped = false;

playBtn.onclick = () => {
    if(playTxt.style.display === ""){
        start();
        playTxt.style.display = "none";
        pauseTxt.style.display= "";
    } else {
        pauseTxt.style.display = "none";
        playTxt.style.display= "";
        pause();
    }
}

stopBtn.onclick = () => {
    pause();
    pauseTxt.style.display = "none";
    playTxt.style.display= "";

}

const imgQMark = new Image();
imgQMark.src = "./img/Qmark2.png";
imgQMark.alt = "question";

const imgPointer = new Image();
imgPointer.src = "./img/pointer.png";
imgPointer.alt = "pointer";

const imgCheck = new Image();
imgCheck.src = "./img/check.png"
imgPointer.alt = "check";

const dogRun = new Image();
dogRun.src = "./img/dog_run.png"
dogRun.alt = "run";
dogRun.frameCount = 8;
dogRun.frameRate = 17;

const dogJump = new Image();
dogJump.src = "./img/dog_jump.png"
dogJump.alt = "jump";
dogJump.frameCount = 16;
dogJump.frameRate = 17;

const dogHurt = new Image();
dogHurt.src = "./img/dog_hurt.png"
dogHurt.alt = "hurt";
dogHurt.frameCount = 10;
dogHurt.frameRate = 18;

let currFrame = 0;
let startTime;
let z = 0;

const animation = (img) => {
    ctx.clearRect(20, 120, 200, 200);
    ctx.drawImage(img, img.width / img.frameCount * currFrame, 0, img.width / img.frameCount, img.height, 20, 120, 200, 200);

    // if(Date.now() - startTime > img.frameRate){
    //     currFrame += 1;
    //     startTime = Date.now()
    // }
    // if(currFrame === img.frameCount){
    //     currFrame = 0;
    // };

    z++;
    if(z === 12){
    currFrame += 1;
    z = 0;
    }
    if(currFrame === img.frameCount){
        currFrame = 0;
    };
}

//베이스 이미지 그리기 
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

//동그라미 그리기
let yPos1 = 100, yPos2 = 100, yPos3 = 100, yPos4 = 100, yPos5 = 100, yPos6 = 100;
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

//버튼 그리기
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
let xPos = 0, xPos2 = 0, count = 0;

//동그라미가 떨어지는 애니메이션
const circleAnimation = () => {
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
const wrongAnimation =() => {
    if(stopContent === true){
        ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150);   
        if(xPos > -350){
            xPos -= 2;
            animation(dogRun);
            ctx.drawImage(imgQMark, 520, 240, 50, 90);
            ctx.save();
        }else if(xPos == -350){
            animation(dogHurt);
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
const correctAnimation = () => {
    if(count === 200 && xPos < -230){
        xPos += 2;
        animation(dogRun);
    }else if(count === 200 && xPos === -230){
        animation(dogJump);

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
    }
}


const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBase();
    drawCircle();
    circleAnimation();
    wrongAnimation();
    correctAnimation();

    currentAnimationFrame = requestAnimationFrame(update);
}

const start = () => {
    startTime = Date.now();
    requestAnimationFrame(update);
};

const pause = () => {
    currentPausedTime = Date.now() - startTime;
    isPaused = true;
    cancelAnimationFrame(currentAnimationFrame);
};

const stop = () => {
    currentPausedTime = 0;
    isStopped = true;

    cancelAnimationFrame(update);
};