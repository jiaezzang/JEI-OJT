const canvas = new fabric.Canvas('canvas');

//드래그 선택 금지
canvas.selection = false;

//커서 스타일 설정
canvas.hoverCursor = 'pointer'

//Triangle로 도형 그리기
const triangle1 = new fabric.Triangle({
    left: 430,
    top: 300,
    stroke: 'red',
    fill: 'rgba(0,0,0,0)',
    width: 120,
    height: 120,
    selectable: false
});

const triangle2 = new fabric.Triangle({
    left: 100,
    top: 80,
    stroke: 'green',
    fill: 'rgba(0,0,0,0)',
    angle: 50,
    width: 300,
    height: 80,
    selectable: false
});

//Path로 도형 그리기 
const triangle3 = new fabric.Path('M 0 0 L 260 160 L 240 260 z');
triangle3.set({ 
    left: 580, 
    top: 80,
    fill:'rgba(0,0,0,0)', 
    stroke: 'blue',
    selectable: false
 });

const path1 = new fabric.Path('M 0 0 L 20 140 L 120 7 L 100 180');
path1.set({ 
    left: 500, 
    top: 130,
    angle: 5,
    fill:'rgba(0,0,0,0)', 
    stroke: 'orange',
    selectable: false
});

const path2 = new fabric.Path('M 0 100 L 140, 0 L 140, 100 L 0, 120');
path2.set({ 
    left: 320, 
    top: 180,
    fill:'rgba(0,0,0,0)', 
    stroke: 'yellowgreen',
    angle: -15,
    selectable: false
});

const path3 = new fabric.Path('M 0 100 L 140, 140 L 140, 20 L 0, 80 z');
path3.set({ 
    left: 600, 
    top: 300,
    fill:'rgba(0,0,0,0)', 
    stroke: 'pink',
    selectable: false
});


//rect로 도형 그리기
const rect = new fabric.Rect({
    left: 250,
    top: 150,
    stroke: 'violet',
    fill: 'rgba(0,0,0,0)',
    width: 80,
    height: 80,
    selectable: false
});

const rect2 = new fabric.Rect({
    left: 850,
    top: 200,
    angle: -20,
    stroke: 'brown',
    fill: 'rgba(0,0,0,0)',
    width: 50,
    height: 120,
    selectable: false
});

//circle로 도형 그리기 
const circle = new fabric.Circle({
    angle: 30,
    stroke: 'lightblue',
    fill: 'rgba(0,0,0,0)',
    radius: 60,
    left: 300,
    top: 300,
    selectable: false
})

//text 작성하기
const guide = new fabric.Text('삼각형을 모두 찾아 고르세요',{
    fontSize: 35,
    left: 130,
    top: 30,
    selectable: false
});

//이미지 사용하기
let waitting = false;

const speakerImg = fabric.Image.fromURL("./img/speaker.png", function(oImg){
    oImg.scale(0.09);
    oImg.set({left: 70, top: 25});
    oImg.selectable = false;
    oImg.on('mousedown', function (){
        if(!waitting){
            //음성파일 넣기
            audio.play('삼각형.mp3');
            waitting = true;
        }
        setTimeout(() => {
            waitting = false;
        }, 3000);
        
    })
    canvas.add(oImg);
});


const flagImg = new fabric.Image.fromURL("./img/flag.png", function(oImg){
    oImg.scale(0.4);
    oImg.set({left: 800, top: 380});
    oImg.selectable = false;
    canvas.add(oImg);
});


//캔버스에 넣기
canvas.add(triangle1, triangle2, triangle3, path1, path2, path3, rect, rect2, circle, guide);

//정답 선택 시 애니메이션
let a = true, b= true, c= true;
let correct = 0, wrong = 0;

canvas.on('mouse:down', function(option) {
    if(option.target === triangle1 && a){
        triangle1.animate('top', '+=160', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 1700,
            easing: fabric.util.ease.easeOutBounce
        }); 
        setTimeout(() =>{
            audio.play('fall.wav');
        }, 2000);
        audio.play('magic.mp3');
        checkImg(440, 300, 1);
        correctMsg();
        a = false; 
        correct++;

      } else if(option.target === triangle2 && b){
        triangle2.animate('top', '+=420', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000,
            easing: fabric.util.ease.easeOutBounce
        });
        triangle2.animate('angle', '-=50', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 700
        });
        setTimeout(() =>{
            audio.play('fall.wav');
        }, 2000);

        audio.play('magic.mp3')
        checkImg(30, 120, 1);
        correctMsg();
        b = false; 
        correct++;

    } else if(option.target === triangle3 && c){
        triangle3.animate('top', '+=500', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 2000,
            easing: fabric.util.ease.easeOutBounce
        });
        triangle3.animate('angle', '-=48', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 700
        });
        setTimeout(() =>{
            audio.play('fall.wav');
        }, 2000);

        audio.play('magic.mp3')
        checkImg(570, 70, 1);
        correctMsg();
        c = false; 
        correct++;
    }
    if(!a && !b && !c && correct === 3){
        runAnimation();
        setTimeout(() => {
            jumpAnimation();
            stamp();
        }, 4000);
    }
  });

//오답 선택 시 애니메이션
canvas.on('mouse:down', function(option) {
    if(option.target === path1 && (a || b || c)){
        audio.play('beep.mp3');
        path1.animate('opacity', '0', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 500,
        });
        setTimeout(()=> {
            canvas.remove(path1)
        }, 500);
        checkImg(480, 110, 0);
        wrong++;
    } else if(option.target === path2 && (a || b || c)){
        audio.play('beep.mp3');
        path2.animate('opacity', '0', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 500,
        });
        setTimeout(()=> {
            canvas.remove(path2)
        }, 500);
        checkImg(370, 160, 0);
        wrong++;
    } else if(option.target === path3 && (a || b || c)){
        audio.play('beep.mp3');
        path3.animate('opacity', '0', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 500,
        });
        setTimeout(()=> {
            canvas.remove(path3)
        }, 500);
        checkImg(580, 340, 0);
        wrong++;
    } else if(option.target === circle && (a || b || c)){
        audio.play('beep.mp3');
        circle.animate('opacity', '0', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 500,
        });
        setTimeout(()=> {
            canvas.remove(circle)
        }, 500);
        checkImg(250, 320, 0);
        wrong++;
    } else if(option.target === rect && (a || b || c)){
        audio.play('beep.mp3');
        rect.animate('opacity', '0', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 500,
        });
        setTimeout(()=> {
            canvas.remove(rect)
        }, 500);
        checkImg(230, 130, 0);
        wrong++;
    } else if(option.target === rect2 && (a || b || c)){
        audio.play('beep.mp3');
        rect2.animate('opacity', '0', {
            onChange: canvas.renderAll.bind(canvas),
            duration: 500,
        });
        setTimeout(()=> {
            canvas.remove(rect2)
        }, 500);
        checkImg(830, 180, 0);
        wrong++;
    }
});

//정답 시 메세지 
const correctMsg = () => {
    const txtCircle = new fabric.Circle({
        radius: 100,
        fill: 'skyblue',
        scaleY: 0.5,
        originX: 'center',
        originY: 'center',
        selectable: false
    });

    const text = new fabric.Text('참 잘했어요!',{
        fontSize: 30,
        fill: 'white',
        originX: 'center',
        originY: 'center',
        selectable: false
    });

    const group = new fabric.Group([txtCircle, text], {
        left: 750,
        top: 20,
        angle: 10,
        selectable: false
    })
    canvas.add(group);

    setTimeout(() => {
        canvas.remove(group)
    }, 2000);
}
//정답 개수에 따른 애니메이션
let d = true, e= true, f= true;
canvas.on('mouse:down', () => {
    if(correct === 1 && d){
        //idleAnimation();
        d = false;
    } else if(correct === 2 && e){
        e = false;
    } else if(correct === 3 && f){
        correct++;
        f = false;
    }
});

//오답 시 메세지 
const wrongMsg = () => {
    const cover = new fabric.Rect({
        left: 0,
        top: 0,
        width: 1000,
        height: 625,
        fill: 'black',
        opacity: 0.3,
        selectable: false
    })

    const txtCircle = new fabric.Circle({
        radius: 100,
        fill: 'orange',
        scaleY: 0.5,
        originX: 'center',
        originY: 'center',
        selectable: false
    });

    const text = new fabric.Text('조금 아쉬워요!',{
        fontSize: 30,
        fill: 'white',
        originX: 'center',
        originY: 'center',
        selectable: false
    });

    const group = new fabric.Group([txtCircle, text], {
        left: 750,
        top: 20,
        angle: 10,
        selectable: false
    })
    canvas.add(cover, group);

    setTimeout(() => {
        canvas.remove(cover, group)
    }, 2000);
}

//오답의 개수에 따른 애니메이션
canvas.on('mouse:down', () => {
    if(wrong === 3){
        wrongMsg();
        wrong = 0;
    }
});

//audio
const audio = {
    play: (fileName) => {
        const myAudio = new Audio('./audio/' + fileName);
        myAudio.play();
    }
}