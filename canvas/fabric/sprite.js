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


//Run 첫번째 프레임 
const dogImg = fabric.Image.fromURL(dogRun.src, (oImg) => {
    oImg.scale(0.25);
    oImg.set({left: 35, top: 300});
    oImg.selectable = false;
    // canvas.add(oImg);
},{
    width: dogRun.naturalWidth/dogRun.frameCount
} );

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
          sprite.animate('left', "+=630", {
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
          left: 625,
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
const idleAnimation =() => {
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

      };
    }
  
    (function render() {
        canvas.renderAll();
        let currentFrame = fabric.util.requestAnimFrame(render);
    })();
};

//스탬프 애니메이션
const stamp = () => {
    var radius = 300;
    canvas.preserveObjectStacking = true;
  
    fabric.Image.fromURL('./img/thumb1.png', function(img) {
      img.scale(0.08).set({
        left: 630,
        top: 0,
        angle: 15,
        clipPath: new fabric.Circle({
          radius: radius,
          originX: 'center',
          originY: 'center',
        }),
      });
  
      (function animate() {
        fabric.util.animate({
          startValue: Math.round(radius) === 200 ? 200 : 850,
          endValue: Math.round(radius) === 200 ? 850 : 200,
          duration: 2000,
          onChange: function(value) {
            radius = value;
            img.clipPath.set('radius', value);
            img.set('dirty', true);
            canvas.renderAll();
          },
          onComplete: animate
        });
      })();
      canvas.insertAt(img, 0)
    });
  }
  


