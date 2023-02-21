const controller = document.querySelector("#controller");
const content = document.querySelector("div");
const circle = document.querySelector("#tryCircle")
const path = document.querySelector("#dashCircle");
const guide = document.querySelector("#guide")
const outerCircle = document.querySelector("#outerCircle");
const div = document.querySelector("div");
const tryBtn = document.querySelector("#tryBtn")

circle.style.strokeDasharray = circle.getTotalLength();
circle.style.strokeDashoffset = circle.getTotalLength();
circle.pathLength = path.getTotalLength();

//예시 버튼을 클릭했을 때 
guide.onclick = () => {
    if(outerCircle.style.display === "none"){
        outerCircle.style.display = "";
        document.querySelector("#play").style.display = "none";
        guide.style = ""
    }
    setTimeout(function(){
      document.querySelector("#try").style.display = "";
  }, 2500);
}

//학습자가 그리는 동그라미의 진행
let beforeValue = 0;
function progress(best){
  let dashoffset = path.getTotalLength() - best;
  circle.style.strokeDashoffset = dashoffset;
  beforeValue = best;  
}
progress(0);


//직접 진행하는 버튼을 눌렀을 때 + 드래그할 때  
let stX = 0;
let stY = 0;
let drag = false;

tryBtn.addEventListener("mousedown", (event) => {
  document.querySelector("#try").style.display = "none";
    if(outerCircle.style.display === ""){
        circle.style.display = "";
        drag = true;
        circle.style.dispaly = "";
    }
});

document.addEventListener("mousemove",(event) => {
  
  mMove(event);
});

document.addEventListener("mouseup", (event) => {
    drag = false;
});

//마우스를 드래그 할 때 마우스 좌표를 받아와 넘주는 함수
function mMove(event){
    if(drag === true){
      document.querySelector("#try").style.display = "none";
        let nowX = event.offsetX;
        let nowY = event.offsetY;
        stX = nowX;
        stY = nowY;
        let now = [stX, stY];

        mousemoved(now);
        //진행 시 +값으로만 나아가도록
        if(beforeValue <= bestLength){
          progress(bestLength);
        }
        
    }
}

// 가장 가까운 점 찾기
let best = Infinity;
let bestLength = Infinity;
var before,
    after,
    beforeLength,
    afterLength,
    beforeDistance,
    afterDistance;

function mousemoved(now) {
  var p = closestPoint(path, now);
  if(beforeValue <= bestLength){
    controller.setAttribute("cx", p[0]);
    controller.setAttribute("cy", p[1]);
  }
  
}

function closestPoint(pathNode, point) {
  let pathLength = pathNode.getTotalLength();
  let precision = 8;
  let bestDistance = Infinity;

  // linear scan for coarse approximation
  for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
    if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
      best = scan, bestLength = scanLength, bestDistance = scanDistance;
    }
  }

  // binary search for precise estimate
  precision /= 2;
  while (precision > 0.5) {
    
    if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
      best = before, bestLength = beforeLength, bestDistance = beforeDistance;
    } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
      best = after, bestLength = afterLength, bestDistance = afterDistance;
    } else {
      precision /= 2;
    }
  }

  best = [best.x, best.y];
  best.distance = Math.sqrt(bestDistance);
  return best;

  function distance2(p) {
    var dx = p.x - point[0],
        dy = p.y - point[1];
    return dx * dx + dy * dy;
  }
}

//SpeechSynthesis API
function speak(text) {
  const message = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();

  message.voice = voices[0];
  speechSynthesis.speak(message);
}

const speaker = document.querySelector("#speaker");
//텍스트 읽기
speaker.onclick = () => {
  text = document.querySelector("#guide").innerHTML;
  speak(text);
  speaker.setAttribute("fill", "#D2B48C");
  setTimeout(function(){
      speaker.setAttribute("fill", "orange");
  }, 1500);
}
