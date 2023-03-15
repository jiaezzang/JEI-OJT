//이미지
const dogRun = new Image();
dogRun.src = './img/dog_run.png';

const dogIdle = new Image();
dogIdle.src = './img/dog_idle.png';

const dogJump = new Image();
dogJump.src = './img/dog_jump.png';

const check = new Image();
check.src = './img/check.png';

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
    fabric.Sprite.fromURL(dogRun.src, createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
            left: 35,
            top: 400
        });
        sprite.scale(0.4);
        sprite.selectable = false;
        canvas.add(sprite);
        setTimeout(function() {
          sprite.set('dirty', true);
          sprite.play();
          sprite.animate('left', "+=730", {
            onChange: canvas.renderAll.bind(canvas),
            duration: 3000,
            onComplete: jumpAnimation
        })
        }, 1000);

        setTimeout(() => {
            canvas.remove(sprite);
        }, 4200)
      };
    }
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
  }

//점프 애니메이션
const jumpAnimation = () => {
    fabric.Sprite.fromURL(dogJump.src, createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
          left: 780,
          top: 400
        });
        sprite.scale(0.4);
        canvas.add(sprite);
        sprite.set('dirty', true);
        sprite.play();
        sprite.selectable = false;
      };
    }

    setTimeout(() => {
      window.parent.postMessage('success4', '*');
    }, 1000)
  
    (function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    })();
}

//서있는 애니메이션
(idleAnimation =() => {
    fabric.Sprite.fromURL(dogIdle.src, createSprite());
  
    function createSprite() {
      return function(sprite) {
        sprite.set({
          left: 35,
          top: 400
        });
        sprite.scale(0.4);
        canvas.add(sprite);
        sprite.set('dirty', true);
        sprite.play();
        sprite.selectable = false;

        (function render() {
          canvas.renderAll();
          if(correct >= 3){
            setTimeout(() => {
              canvas.remove(sprite);
            }, 30)
          }
          fabric.util.requestAnimFrame(render);
      })();
      };
    }
})();

//스탬프 애니메이션
const stamp = () => {
    var radius = 300;
    canvas.preserveObjectStacking = true;
  
    fabric.Image.fromURL('./img/thumb1.png', function(img) {
      img.scale(0.08).set({
        left: 800,
        top: 0,
        angle: 15,
        clipPath: new fabric.Circle({
          radius: radius,
          originX: 'center',
          originY: 'center',
        }),
        selectable: false
      });
  
      (function animate() {
        fabric.util.animate({
          startValue: Math.round(radius) === 200 ? 200 : 850,
          endValue: Math.round(radius) === 200 ? 850 : 200,
          duration: 2000,
          onChange: function(value) { //onChange는 애니메이션의 모든 단계에서 호출
            radius = value;
            img.clipPath.set('radius', value);
            img.set('dirty', true);
            canvas.renderAll();
          },
          onComplete: animate   //onComplete는 완료 시 호출됨
        });
      })();
      canvas.insertAt(img, 0)
    });
  }
  


