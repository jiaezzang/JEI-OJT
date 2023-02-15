const next = document.querySelector("#next");

//페이지 생성 시점에 모든 버튼 가져와서 onclick이벤트
window.onload = () => {
    for(let i=0; i<=9; i++) {
        //모든 버튼 생성
        let btn = document.querySelector("#btn" + i);
        btn.onclick = btnClick;
    }
    document.querySelector("#correct").style.display = "none";
    document.querySelector("#wrong").style.display = "none";
    document.querySelector("#finish").style.display = "none";
    document.querySelector("#miss").style.display = "none";
    document.querySelector("#success").style.display = "none";
    next.style.display = "none";
    hideAnswer()
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

    if(number === answer){
        //정답일 때 
        document.querySelector(pageNumber + " #answer").style.display = "";
        document.querySelector("#correct").style.display = "";
        document.querySelector("#success").style.display = "";
        next.style.display = "";
        setTimeout(function(){
            document.querySelector("#success").style.display = "none";
        }, 1000);

    } else if(next.style.display !== "" && box.getAttribute("fill") !== "darkgray"){
        //오답일 때
        document.querySelector("#wrong").style.display = "";
        setTimeout(function(){
            document.querySelector("#wrong").style.display = "none";
        }, 1000);
    }

    //버튼 클릭 시 색상 변경    
    box.setAttribute("fill", "darkgray");

    //3번 오답 시 주의
    const list = document.querySelectorAll('[fill="darkgray"]');
    if(list.length == 3 && document.querySelector("#correct").style.display === "none"){
        document.querySelector("#miss").style.display = "";
        setTimeout(function(){
            document.querySelector("#miss").style.display = "none";
            resetBtn();
        }, 500);
    }
}

//다음 문제로 넘어가는 버튼 
next.onclick =(e) => {
    const question = document.querySelector("#currentPage");
    const id = question.getAttribute("href");
    const nextNum = Number([...id].pop()) + 1;
    if(nextNum < 9){                    //버튼 클릭 시 다음 문제 노출
        question.setAttribute("href", "#num" + nextNum);
        next.style.display = "none";
        document.querySelector("#correct").style.display = "none";
        resetBtn();
    } else if(nextNum === 9){           //마지막 문제에서 클릭 시 학습 마무리 메세지
        next.style.display = "none";
        document.querySelector("#finish").style.display = "";
    }
    
}

//버튼 리셋
function resetBtn() {
    for(let i=0; i<=9; i++) {
        let btn = document.querySelector("#btn"+i);
        btn.querySelector("rect").setAttribute("fill", "lightgray");
    }
}