//한번만 실행되는 메서드

function once(fn, context) {
    let result;
        return function () {
            if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
            }
            return result;
        };
    }
    
//오디오
const magicAudio = once( () => {
    const audio = new Audio('./audio/magic-chime-01.mp3');
    audio.play();
})

const beepAudio = once( () => {
    const audio = new Audio('./audio/beep.wav');
    audio.play();
})

const fallAudio1 = once( () => {
    const audio = new Audio('./audio/fall.wav');
    audio.play();
})

const fallAudio2 = once( () => {
    const audio = new Audio('./audio/fall.wav');
    audio.play();
})

const fallAudio3 = once( () => {
    const audio = new Audio('./audio/fall.wav');
    audio.play();
})

const fallAudio4 = once( () => {
    const audio = new Audio('./audio/fall.wav');
    audio.play();
})

const fallAudio5 = once( () => {
    const audio = new Audio('./audio/fall.wav');
    audio.play();
})

const fallAudio6 = once( () => {
    const audio = new Audio('./audio/fall.wav');
    audio.play();
})

//이미지
const imgQMark = new Image();
imgQMark.src = "./img/Qmark.png";
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
dogRun.frameRate = 15;

const dogJump = new Image();
dogJump.src = "./img/dog_jump.png"
dogJump.alt = "jump";
dogJump.frameCount = 16;
dogJump.frameRate = 15;

const dogHurt = new Image();
dogHurt.src = "./img/dog_hurt.png"
dogHurt.alt = "hurt";
dogHurt.frameCount = 10;
dogHurt.frameRate = 15;

const dogIdle = new Image();
dogIdle.src = "./img/dog_idle.png"
dogIdle.alt = "idle";
dogIdle.frameCount = 10;
dogIdle.frameRate = 15;