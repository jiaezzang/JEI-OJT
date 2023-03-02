const playBtn = document.querySelector("#playBtn");
const replayBtn = document.querySelector("#replayBtn");
const playTxt = document.querySelector("#play");
const pauseTxt = document.querySelector("#pause");
const btnRect1 = document.querySelector("#btnRect1");
const btnRect2 = document.querySelector("#btnRect2");

playBtn.onclick = () => {
    if(playTxt.style.display === ""){
        start();
        playTxt.style.display = "none";
        pauseTxt.style.display= "";
        btnRect2.setAttribute("fill", "rgb(87, 186, 203)");
    } else {
        pauseTxt.style.display = "none";
        playTxt.style.display= "";
        pause();
    }
}

replayBtn.onclick = () => {
    resume();
    pauseTxt.style.display = "";
    playTxt.style.display= "none";
}