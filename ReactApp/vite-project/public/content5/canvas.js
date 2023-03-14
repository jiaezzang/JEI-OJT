const canvas = new fabric.Canvas('canvas');

function resizeCanvas() {
    const canvasContainer = document.getElementById('canvasContainer');
    const width = canvasContainer.offsetWidth;
    const height = canvasContainer.offsetHeight;
    canvas.setWidth(width);
    canvas.setZoom(width/1000);
}

 window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  

//드래그 선택 금지
canvas.selection = false;

//이미지
const dogRun = new Image();
dogRun.src = './img/dog_run.png';

const dogWalk = new Image();
dogWalk.src = './img/dog_walk.png';

//달리는 애니메이션
(walkAnimation = () => {
    fabric.Sprite.fromURL(dogWalk.src, createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
            left: 330,
            top: 200
        });
        sprite.scale(0.6);
        sprite.selectable = false;
        canvas.add(sprite);
        sprite.set('dirty', true);
        sprite.play();
      };
    }
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
  })();
