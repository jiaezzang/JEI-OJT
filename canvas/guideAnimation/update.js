let currentAnimationFrame;

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
    update();
};

const pause = () => {
    cancelAnimationFrame(currentAnimationFrame);
};

const resume = () => {
    requestAnimationFrame(update) = 1;
    console.log(currentAnimationFrame)
    cancelAnimationFrame(currentAnimationFrame);

}
