const controller = document.querySelector("#controller");
const content = document.querySelector("div");
const circle = document.querySelector("#tryCircle")
const path = document.querySelector("#dashCircle");
const guide = document.querySelector("#guide")
const outerCircle = document.querySelector("#outerCircle");
const div = document.querySelector("div");
const tryBtn = document.querySelector("#tryBtn");
const svg = document.getElementById("content");
const guideController = document.querySelector("#guideController")

circle.style.strokeDasharray = circle.getTotalLength();
circle.style.strokeDashoffset = circle.getTotalLength();
circle.pathLength = path.getTotalLength();

//svg좌표 변환
var pt = svg.createSVGPoint();  // Created once for document
let stX = 0;
let stY = 0;

function alert_coords(event) {
    pt.x = event.clientX;
    pt.y = event.clientY;

    // The cursor point, translated into svg coordinates
    let cursorpt =  pt.matrixTransform(svg.getScreenCTM().inverse());

    stX = cursorpt.x;
    stY = cursorpt.y;
}

//예시 버튼을 클릭했을 때 
guide.onclick = () => {
    if(outerCircle.style.display === "none"){
        outerCircle.style.display = "";
        guideController.style.display = "none";
        document.querySelector("#play").style.display = "none";
        guide.style = ""
        const buttonAudio = new Audio('./audio/button-09a.mp3');
        buttonAudio.play();
    }
    setTimeout(function(){
      document.querySelector("#try").style.display = "";
      document.querySelector("#wait").style.display = "none";
      document.querySelector("#wait2").style.display = "";
  }, 2500);
}

//학습자가 그리는 동그라미의 진행
let beforeValue = circle.getTotalLength();
function progress(best){
  let dashoffset = path.getTotalLength() - best;
  circle.style.strokeDashoffset = dashoffset;
  beforeValue = best;  
}
progress(0);


//직접 진행하는 버튼을 눌렀을 때 + 드래그할 때  
let drag = false;

tryBtn.addEventListener("mousedown", (event) => {
  document.querySelector("#try").style.display = "none";
    if(outerCircle.style.display === ""){
        circle.style.display = "";
        drag = true;
        circle.style.dispaly = "";
    }

    if(bestLength === Infinity){
      const buttonAudio = new Audio('./audio/button-09a.mp3');
      buttonAudio.play();
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
    alert_coords(event);
    let now = [stX, stY];

    mousemoved(now);
    //진행 시 +값으로만 나아가도록
    if(bestLength - beforeValue >= 0 && bestLength - beforeValue < 90){
      progress(bestLength);
    }
    //끝지점에 다다랐을 때 마무리
    if(circle.style.strokeDashoffset < 10){
      circle.style.strokeDashoffset = 0;
      controller.setAttribute("cx", 600);
      controller.setAttribute("cy", 130);
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
  if(bestLength - beforeValue >= 0 && bestLength - beforeValue < 90){
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

//텍스트 읽기
const speaker = document.querySelector("#speaker");

speaker.onclick = () => {
  const voice = new Audio('./audio/voice.mp3');
  voice.play();
  speaker.setAttribute("fill", "#D2B48C");
  setTimeout(function(){
      speaker.setAttribute("fill", "orange");
  }, 1500);
}

//조건에 해당할 시 효과음 이벤트
function soundEffect() {
  if(circle.style.strokeDashoffset < 2.5){
    const magicAudio = new Audio('./audio/magic-chime-01.mp3');
    magicAudio.play();
    document.querySelector("#wait").style.display = "";
    removeEvent();
  }
}

//효과음 이벤트가 한번만 실행되도록 이벤트 제거
svg.addEventListener('mouseup', soundEffect);
function removeEvent(){
  svg.removeEventListener('mouseup', soundEffect);
}