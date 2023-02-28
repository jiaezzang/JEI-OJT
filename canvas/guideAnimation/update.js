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
    startTime = Date.now();
    update();
};

const pause = () => {
    cancelAnimationFrame(currentAnimationFrame);
};

const resume = () => {
    ctx.restore();
    requestAnimationFrame(update);
}
