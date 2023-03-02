const canvas = document.querySelector('.canvas');
const ctx = canvas.getContext('2d');


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

let stopDraw = false;
let xPos = 0, xPos2 = 0, count = 0, count2 = 0;

let fall1 = true, fall2 = true, fall3 = true, fall4 = true, fall5 = true, fall6 = true;
//동그라미가 떨어지는 애니메이션
const circleAnimation = () => {
    if(yPos1 < 200){
        yPos1 +=2;
    } else if(yPos2 < 200){
        yPos2 +=2;
        if(fall1 === true){
            fall();
            fall1 = false;
        }
    } else if(yPos3 < 200){
        yPos3 +=2;
        if(fall2 === true){
            fall();
            fall2 = false;
        }
    } else if(yPos4 < 200){
        yPos4 +=2;
        if(fall3 === true){
            fall();
            fall3 = false;
        }
    } else if(yPos5 < 200){
        yPos5 +=2;
        if(fall4 === true){
            fall();
            fall4 = false;
        }
    } else if(yPos6 < 200){
        yPos6 +=2;
        if(fall5 === true){
            fall();
            fall5 = false;
        }
    } else {
        if(fall6 === true){
            fall();
            fall6 = false;
        }
        ctx.fillStyle = "black";
        ctx.font = "40px Verdana";
        ctx.fillText(`5 + 1 =`, 300, 300); 
        ctx.fillStyle = "black";
        ctx.font = "35px Verdana";
        ctx.fillText(`다음 덧셈을 하세요`, 150, 100); 
        drawBtn();
        ctx.drawImage(imgQMark, 480, 240, 45, 81);
        stopDraw = true;
        startTime = Date.now();

    }
}
 
let wrong = true, correct = true;
//오답 선택 시 애니메이션
const wrongAnimation =() => {
    if(stopDraw === true){
        ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150); 
        animation(dogRun);  
        count2++;

        if(xPos > -350){
            if(count2 >= 100){
                xPos -= 2;
            }
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
        
            ctx.drawImage(imgPointer, 650 + xPos, 340, 150, 150);
            ctx.clearRect(480, 240, 50, 90);
            ctx.drawImage(imgCheck, 0, 0, 250, 231, 470, 245, 80, 80);

            if(wrong === true){
                beepAudio();
                wrong = false;
            }

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
        ctx.clearRect(480, 240, 50, 90);
        ctx.drawImage(imgCheck, 251, 0, 250, 231, 470, 245, 80, 80);
        if(correct === true){
            magicAudio();
            correct = false;
        }
    }
}

//초기화 메서드
const init = () => {
    currFrame = null;
    startTime = null;
    z = null;
    yPos1 = 100, yPos2 = 100, yPos3 = 100, yPos4 = 100, yPos5 = 100, yPos6 = 100;
    stopDraw = false;
    xPos = 0, xPos2 = 0, count = 0, count2 = 0;
    startCount = 0;
    fall1 = true, fall2 = true, fall3 = true, fall4 = true, fall5 = true, fall6 = true;
    voice = true;
    wrong = true;
    correct = true;
}

