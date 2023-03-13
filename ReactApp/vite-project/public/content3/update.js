let currentAnimationFrame;
let startCount = 0;
let voice = true;
const update = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBase();
    drawCircle();
    if(startCount < 160){
        if(voice){
            audio.play("덧셈.mp3");
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

(start = () => {
    requestAnimationFrame(update);
})();

const pause = () => {
    cancelAnimationFrame(currentAnimationFrame);
};

const resume = () => {
    init();
    pause();
    start();
}
