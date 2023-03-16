const next = document.querySelector("#next");
const retry = document.querySelector("#retry");
const speaker = document.querySelector("#speaker");

//랜덤하게 문제 주기
let words = ['#num1', '#num2', '#num3', '#num4', '#num5', '#num6', '#num7', '#num8']
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}
shuffle(words);
const question = document.querySelector("#currentPage");
question.setAttribute("href", words[0]);

//페이지 생성 시점에 모든 버튼 가져와서 onclick이벤트
window.onload = () => {
    for(let i=0; i<=9; i++) {
        //모든 버튼 생성
        let btn = document.querySelector("#btn" + i);
        btn.onclick = btnClick;
    }
}

//모든 답안 가리기
function hideAnswer(){
    for(let i=1; i<=8; i++){
        let gTag = document.querySelector("#num" + i);
        gTag.querySelector("#answer").style.display = "none";
    }
}

// 버튼 클릭시 실행 이벤트
function btnClick() {
    
    let box = this.querySelector("rect");

    //정답 비교
    let number = this.querySelector("text").innerHTML;
    const question = document.querySelector("#currentPage");
    const pageNumber = question.getAttribute("href");
    const answer = document.querySelector(pageNumber + " text").innerHTML;
    const btnAudio = new Audio('./audio/button.wav');
    btnAudio.play();

    if(number === answer){
        //정답일 때 
        document.querySelector(pageNumber + " #answer").style.display = "";
        document.querySelector("#correct").style.display = "";
        document.querySelector("#stop").style.display = "";
        let comments = ["정말 멋진데요?", "음~ 훌륭해요!", "와! 잘했어요!", "와우~ 좋아요!", "와! 최고예요!"]
        let cmtPick = Math.floor(Math.random() * comments.length);
        document.querySelector("#success text").innerHTML = comments[cmtPick];
        document.querySelector("#success").style.display = "";
        const magicAudio = new Audio('./audio/magic.wav');
        magicAudio.play();
        setTimeout(function(){
            document.querySelector("#success").style.display = "none";
            nextStep();
        }, 1000);

    } else if(next.style.display !== "" && box.getAttribute("fill") !== "gray"){
        //오답일 때
        document.querySelector("#wrong").style.display = "";
        setTimeout(function(){
            document.querySelector("#wrong").style.display = "none";
        }, 300);
    }

    //버튼 클릭 시 색상 변경    
    box.setAttribute("fill", "gray");
    this.style = "";

    //3번 오답 시 주의
    const list = document.querySelectorAll('[fill="gray"]');
    if(list.length == 3 && document.querySelector("#correct").style.display === "none"){
        let comments = ["조금 아쉬워요", "좀 더 집중해요", "아! 아까워요!"]
        let cmtPick = Math.floor(Math.random() * comments.length);
        document.querySelector("#miss text").innerHTML = comments[cmtPick];
        document.querySelector("#miss").style.display = "";
        document.querySelector("#stop").style.display = "";
        document.querySelector("#content").style = "width:100%; height:100%; background-color:#e9ecef;";
        const missAudio = new Audio('./audio/beep.wav');
        missAudio.play();
        setTimeout(function(){
            document.querySelector("#content").style = "width:100%; height:100%";
            document.querySelector("#miss").style.display = "none";
            document.querySelector("#stop").style.display = "none";
            resetBtn();
        }, 700);
    }
}

//다음 문제로 넘어가는 버튼 
const nextStep = () => {
    document.querySelector("#stop").style.display = "none";
    const question = document.querySelector("#currentPage"); 
    const id = question.getAttribute("href");
    const nextIndex = words.indexOf(id) + 1;
    const nextAudio = new Audio('./audio/next.wav')
    nextAudio.play();
    if(nextIndex < 8){                    //버튼 클릭 시 다음 문제 노출
        question.setAttribute("href", words[nextIndex]);
        next.style.display = "none";
        document.querySelector("#correct").style.display = "none";
        resetBtn();
    } else if(nextIndex === 8){           //마지막 문제에서 클릭 시 학습 마무리 메세지
        next.style.display = "none";
        document.querySelector("#finish").style.display = "";
        text = document.querySelector("#finish text").innerHTML
        speak(text);
        const applauseAudio = new Audio('./audio/applause.wav');
        applauseAudio.play();

        setTimeout(() => {
            window.parent.postMessage('success1', '*');
        }, 1000)
    }
    
}

//버튼 리셋
function resetBtn() {
    for(let i=0; i<=9; i++) {
        let btn = document.querySelector("#btn"+i);
        btn.querySelector("rect").setAttribute("fill", "#e3fafc");
        btn.style = "cursor:pointer";
    }
}

//Retry 버튼 클릭 시
retry.onclick = () => {
    //불필요한 요소들을 모두 숨김
    document.querySelector("#correct").style.display = "none";
    document.querySelector("#wrong").style.display = "none";
    document.querySelector("#finish").style.display = "none";
    document.querySelector("#miss").style.display = "none";
    document.querySelector("#success").style.display = "none";
    next.style.display = "none";

    const question = document.querySelector("#currentPage");
    shuffle(words);     //문제를 다시 랜덤 배치
    question.setAttribute("href", words[0]); //첫번째 문제로 돌아가기
    const nextAudio = new Audio('./audio/next.wav');
    nextAudio.play();
    hideAnswer()
    resetBtn();
}

//SpeechSynthesis API
function speak(text) {
    const message = new SpeechSynthesisUtterance(text);
    const voices = speechSynthesis.getVoices();
  
    message.voice = voices[0];
    speechSynthesis.speak(message);
}

//텍스트 읽기
speaker.onclick = () => {
    text = document.querySelector("#guide").innerHTML
    speak(text);
    speaker.setAttribute("fill", "#D2B48C");
    setTimeout(function(){
        speaker.setAttribute("fill", "orange");
    }, 1500);
}

