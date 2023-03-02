let currentAnimationFrame;
let startCount = 0;
let voice = true;
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBase();
    drawCircle();
    if(startCount < 160){
        if(voice){
            plus();
            voice = false;
        }
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
