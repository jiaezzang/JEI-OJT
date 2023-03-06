const dogRun = new Image();
dogRun.src = './img/dog_run.png';
dogRun.frameCount = 8;

const dogIdle = new Image();
dogIdle.src = './img/dog_idle.png';
dogIdle.frameCount = 10;

const check = new Image();
check.src = './img/check.png';
check.frameCount = 10;

let currFrame = 0;
let count = 0;


//spriteAnimation
const animation = (delay) => {
    const RunSprite = fabric.Image.fromURL(dogRun.src, (oImg) => {
        oImg.scale(0.25);
        oImg.set({left: 35, top: 300, cropX: dogRun.naturalWidth/8 * currFrame});
        oImg.selectable = false;
        oImg.animate('left', delay, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000
        })
        canvas.add(oImg);
        canvas.renderAll();
    },{
        width: dogRun.naturalWidth/dogRun.frameCount
    });

    count++;
    if(count === 8){
        currFrame += 1;
        count = 0;
    }
    if(currFrame === dogRun.frameCount){
        currFrame = 0;
    };
    
}



//정오표시
const checkImg = (x, y, z) => {
    const RunSprite = fabric.Image.fromURL(check.src, (oImg) => {
        oImg.scale(0.15);
        oImg.set({left: x, top: y, cropX: check.naturalWidth/2 * z});
        oImg.selectable = false;
        canvas.add(oImg);
        canvas.renderAll();
        setTimeout(()=>{
            canvas.remove(oImg);
        }, 500);
    },{
        width: check.naturalWidth/2
    });
}



