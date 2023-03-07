const dogRun = new Image();
dogRun.src = './img/dog_run.png';
dogRun.frameCount = 8;

const dogIdle = new Image();
dogIdle.src = './img/dog_idle.png';
dogIdle.frameCount = 10;

const check = new Image();
check.src = './img/check.png';
check.frameCount = 10;

let currFrame = 0;
let count = 0;


//spriteAnimation
const animation = (delay) => {
    const RunSprite = fabric.Image.fromURL(dogRun.src, (oImg) => {
        oImg.scale(0.25);
        oImg.set({left: 35, top: 300, cropX: dogRun.naturalWidth/8 * currFrame});
        oImg.selectable = false;
        oImg.animate('left', delay, {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000
        })
        canvas.add(oImg);
        //canvas.renderAll();
    },{
        width: dogRun.naturalWidth/dogRun.frameCount
    });

    count++;
    if(count === 8){
        currFrame += 1;
        count = 0;
    }
    if(currFrame === dogRun.frameCount){
        currFrame = 0;
    };

    (function render() {
        canvas.renderAll();
        fabric.util.requestAnimFrame(render);
    })();
}


//정오표시
const checkImg = (x, y, z) => {
    const RunSprite = fabric.Image.fromURL(check.src, (oImg) => {
        oImg.scale(0.15);
        oImg.set({left: x, top: y, cropX: check.naturalWidth/2 * z});
        oImg.selectable = false;
        canvas.add(oImg);
        canvas.renderAll();
        setTimeout(()=>{
            canvas.remove(oImg);
        }, 500);
    },{
        width: check.naturalWidth/2
    });
}


//달리는 애니메이션
const runAnimation = () => {
    fabric.Sprite.fromURL('./img/dog_run.png', createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
          left: 35,
          top: 300
        });
        sprite.scale(0.25);
        sprite.selectable = false;
        canvas.add(sprite);
        setTimeout(function() {
          sprite.set('dirty', true);
          sprite.play();
          sprite.animate('left', "+=600", {
            onChange: canvas.renderAll.bind(canvas),
            duration: 3000
        })
        }, 1000);

        setTimeout(() => {
            canvas.remove(sprite);
        }, 4000)
      };
    }
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
  }

//점프 애니메이션
const jumpAnimation = () => {
    fabric.Sprite.fromURL('./img/dog_jump.png', createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
          left: 635,
          top: 300
        });
        sprite.scale(0.25);
        canvas.add(sprite);
        sprite.set('dirty', true);
        sprite.play();
        sprite.selectable = false;
      };
    }
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
}

//서있는 애니메이션
(idleAnimation =() => {
    fabric.Sprite.fromURL('./img/dog_idle.png', createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
          left: 35,
          top: 300
        });
        sprite.scale(0.25);
        canvas.add(sprite);
        sprite.set('dirty', true);
        sprite.play();
        sprite.selectable = false;
        if(correct >= 1){
            canvas.remove(sprite);
        }
      };
    }
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
})();
  


