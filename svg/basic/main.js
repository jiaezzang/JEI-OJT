const num1 = document.querySelector("#num1");
const num2 = document.querySelector("#num2");
const num3 = document.querySelector("#num3");
const num4 = document.querySelector("#num4");
const num5 = document.querySelector("#num5");
const num6 = document.querySelector("#num6");
const num7 = document.querySelector("#num7");
const num8 = document.querySelector("#num8");
const answer = document.querySelector(".answer");


num1.onclick = (e) => {
    if(num1.querySelector("#asw1") !== null){             //svg 요소 제거
        num1.removeChild(document.querySelector("#asw1"));
    } else {
        let asw1 = answer.cloneNode();                  //svg 요소 복사해서 사용
        asw1.setAttribute("id", "asw1")             //중복 게시 막기 위해 id값 부여
        asw1.innerHTML = "3"
        num1.appendChild(asw1);
    }
    console.dir(num1);
}

num2.onclick = (e) => {
    if(num2.querySelector("#asw2") !== null){
        num2.removeChild(document.querySelector("#asw2"));
    } else {
        let asw2 = answer.cloneNode();
        asw2.setAttribute("id", "asw2")
        asw2.setAttribute("x", "278");
        asw2.setAttribute("y", "225");
        asw2.innerHTML = "5"
        num2.appendChild(asw2);

    }
}

num3.onclick = (e) => {
    if(num3.querySelector("#asw3") !== null){
        num3.removeChild(document.querySelector("#asw3"));
    } else {
        let asw3 = answer.cloneNode();
        asw3.setAttribute("id", "asw3")
        asw3.setAttribute("x", "308");
        asw3.setAttribute("y", "345");
        asw3.innerHTML = "7"
        num3.appendChild(asw3);
    }
}

num4.onclick = (e) => {
    if(num4.querySelector("#asw4") !== null){
        num4.removeChild(document.querySelector("#asw4"));
    } else {
        let asw4 = answer.cloneNode();
        asw4.setAttribute("id", "asw4")
        asw4.setAttribute("x", "343");
        asw4.setAttribute("y", "465");
        asw4.innerHTML = "9"
        num4.appendChild(asw4);
    }
}

num5.onclick = (e) => {
    if(num5.querySelector("#asw5") !== null){
        num5.removeChild(document.querySelector("#asw5"));
    } else {
        let asw5 = answer.cloneNode();
        asw5.setAttribute("id", "asw5")
        asw5.setAttribute("x", "723");
        asw5.setAttribute("y", "105");
        asw5.innerHTML = "8"
        num5.appendChild(asw5);
    }
}

num6.onclick = (e) => {
    if(num6.querySelector("#asw6") !== null){
        num6.removeChild(document.querySelector("#asw6"));
    } else {
        let asw6 = answer.cloneNode();
        asw6.setAttribute("id", "asw6")
        asw6.setAttribute("x", "693");
        asw6.setAttribute("y", "225");
        asw6.innerHTML = "6"
        num6.appendChild(asw6);
    }
}

num7.onclick = (e) => {
    if(num7.querySelector("#asw7") !== null){
        num7.removeChild(document.querySelector("#asw7"));
    } else {
        let asw7 = answer.cloneNode();
        asw7.setAttribute("id", "asw7")
        asw7.setAttribute("x", "663");
        asw7.setAttribute("y", "345");
        asw7.innerHTML = "4"
        num7.appendChild(asw7);
    }
}

num8.onclick = (e) => {
    if(num8.querySelector("#asw8") !== null){
        num8.removeChild(document.querySelector("#asw8"));
    } else {
        let asw8 = answer.cloneNode();
        asw8.setAttribute("id", "asw8")
        asw8.setAttribute("x", "633");
        asw8.setAttribute("y", "465");
        asw8.innerHTML = "2"
        num8.appendChild(asw8);
    }
}