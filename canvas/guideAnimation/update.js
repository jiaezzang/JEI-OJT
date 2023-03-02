let currentAnimationFrame;
let startCount = 0;
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBase();
    drawCircle();
    if(startCount < 160){
        plus();
        startCount++;
    }else if(startCount === 160){
        circleAnimation();
    }
    wrongAnimation();
    correctAnimation();

    currentAnimationFrame = requestAnimationFrame(update);
}

const start = () => {
    requestAnimationFrame(update);
};

const pause = () => {
    cancelAnimationFrame(currentAnimationFrame);
};

const resume = () => {
    init();
    pause();
    start();
}
