const dogRun = new Image();
dogRun.src = './img/dog_run.png';
dogRun.frameCount = 8;

const dogIdle = new Image();
dogIdle.src = './img/dog_idle.png';
dogIdle.frameCount = 10;

let i = 4;
let currFrame = 0;
let z = 0;

const animation = () => {

    const RunSprite = fabric.Image.fromURL(dogRun.src, (oImg) => {
        oImg.scale(0.25);
        oImg.set({left: 30, top: 300, cropX: dogRun.naturalWidth/8 * currFrame});
        oImg.selectable = false;
        // oImg.animate('left', '+=200', {
        //     onChange: canvas.renderAll.bind(canvas),
        //     duration: 2000,
        // })
        canvas.add(oImg);
    },{
        width: dogRun.naturalWidth/dogRun.frameCount
    });

    z++;
    if(z === 8){
        currFrame += 1;
        z = 0;
    }
    if(currFrame === dogRun.frameCount){
        currFrame = 0;
    };

    requestAnimationFrame(animation);
}


animation();

