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

//달리는 애니메이션
(runAnimation = () => {
    fabric.Sprite.fromURL(dogRun.src, createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
            left: 400,
            top: 200
        });
        sprite.scale(0.4);
        sprite.selectable = false;
        canvas.add(sprite);
        sprite.set('dirty', true);
        sprite.play();
        sprite.animate('left', "+=730", {
        onChange: canvas.renderAll.bind(canvas),
        duration: 3000,
        onComplete: jumpAnimation
        })
      };
    }
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
  })();
