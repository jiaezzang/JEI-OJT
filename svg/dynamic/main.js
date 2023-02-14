const answer = document.querySelector(".answer");
const next = document.querySelector('#next');

//페이지 생성 시점에 모든 버튼 가져와서 onclick이벤트 걸어준다.
window.onload = () => {
    for(let i=0; i<=9; i++) {
        let btn = document.querySelector('.btn' + i);
        btn.onclick = gTagClick;
    }
}

// 태그 클릭시 실행 이벤트
function gTagClick() {
    let box = this.querySelector("rect");
    box.setAttribute("fill", "darkgray");
}