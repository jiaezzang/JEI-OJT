const next = document.querySelector("#next");

//페이지 생성 시점에 모든 버튼 가져와서 onclick이벤트
window.onload = () => {
    for(let i=0; i<=9; i++) {
        //모든 버튼 생성
        let btn = document.querySelector(".btn" + i);
        btn.onclick = btnClick;
    }
    document.querySelector("#correct").style.display = "none";
    document.querySelector("#wrong").style.display = "none";
    next.style.display = "none";
    hideAnswer(1, 8)
}

//모든 답안 가리기
function hideAnswer(start, end){
    for(let i=start; i<=end; i++){
        let gTag = document.querySelector("#num" + i);
        gTag.querySelector(".answer").style.display = "none";
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
        document.querySelector(pageNumber + " .answer").style.display = "";
        setTimeout(function(){
            document.querySelector("#correct").style.display = "";
            next.style.display = "";
        }, 500);
    } else if(next.style.display !== "" && box.getAttribute("fill") !== "darkgray"){
        document.querySelector("#wrong").style.display = "";
        setTimeout(function(){
            document.querySelector("#wrong").style.display = "none";
        }, 500);
    }

    //버튼 색상 변경    
    box.setAttribute("fill", "darkgray");
    this.style = "";
}

//다음 문제로 넘어가는 버튼 
next.onclick =(e) => {
    const question = document.querySelector("#currentPage");
    const id = question.getAttribute("href");
    const nextNum = Number([...id].pop()) + 1;
    if(nextNum < 9){
        question.setAttribute("href", "#num" + nextNum)
    }
    next.style.display = "none";
    document.querySelector("#correct").style.display = "none";
    resetBtn()
}

//버튼 리셋
function resetBtn() {
    for(let i=0; i<=9; i++) {
        let btn = document.querySelector(".btn"+i);
        btn.querySelector("rect").setAttribute("fill", "lightgray")
    }
}