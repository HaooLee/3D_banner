/**
 * Created by 90761 on 2016/12/11.
 */

//创建一个数组保存图片路径

$(function(){
    var WIDTH = 600;
    var HEIGHT = 400;
    var colNum = 10;

    //   可实任意张图片的3d轮播  记得加逗号
    var imgPathArr=[
        "img/1.jpg",
        "img/2.jpg",
        "img/3.jpg",
        "img/4.jpg",
        "img/5.jpg",
        "img/1.jpg",
        "img/2.jpg"
        //"img/3.jpg",
        //"img/4.jpg",
        //"img/5.jpg"
    ];

    //提出所有的css 运算完返回css对象
    function cssObj(num,j,deg,origin) {
        if(!origin){
            if(j % 2 === 0){
                origin = 'left';    //核心
            }else {
                origin = 'right';    //核心
            }
        }
        return {
            width: WIDTH + 'px',
            height: HEIGHT / colNum + 'px',
           // background : 'url('+ imgPathArr[i] +') '+ 0 +'px '+0 * HEIGHT/colNum + 'px',
            position: "absolute",
            left: 0,
            top: num * HEIGHT / colNum,
            transformStyle:'preserve-3d',
            transformOrigin: origin,
            transform:'rotateY('+ deg +'deg) ',//核心css  旋转的角度
            //translateZ(-2px)   //旋转顺手往里推2像素，因为算基点的时候往里推了2px
            transition:'1s linear' //这里设置过度时间
        }
    }


    //加2为了不挡住按钮   ↓勾股定理  => js/lhjs.js                ↓计算正多边形外接圆的半径
    //var translateZ = lhMath_getRightAngleSide(WIDTH / 2,lh_polygon(WIDTH,imgPathArr.length)+2);//计算基点Z轴位置
    var translateZ = lhMath_getRightAngleSide(WIDTH / 2,lh_polygon(WIDTH,imgPathArr.length));//计算基点Z轴位置
    //



    //创建所有块并排成正多面体
    for(var i = 0; i < colNum; i++){
        //创建旋转的包裹器
        //下面创建的是第一个面的所有横块
        var $divfth = $('<div class=Div'+ i + 0 +'>')
            .css(cssObj(i,0,0,'300px '+ HEIGHT / colNum / 2 + 'px ' + '-' + translateZ+'px'));//
        $divfth.appendTo('#list');
        //嵌套img数量个子元素
        for(var j = 0; j < imgPathArr.length-1 ; j++){
             $divfth = $('<div class=Div' + i + (j+1)  +'>')
                 .css(cssObj(0,j,(180-360/imgPathArr.length),'','' + i + j))//倒数第二个参数传个空串进去为了 让if(!origin){判断为真

                 .appendTo($divfth);
        }

    }
    var deg = 0;

    //按钮点击事件
    $('#next').click(function(){
        deg += 360 / imgPathArr.length;
        rotate(-1,deg);//从 -1+1个开始旋转
        console.log(deg);
    });
    $('#prev').click(function(){
        deg -= 360 / imgPathArr.length;
        rotate(-1,deg);//从 -1+1个开始旋转
        console.log(deg);
    });



    //点击事件调用的函数
    function rotate(i,deg,callback){
        if(i>colNum){
           return;
        }
		//其实使用animate扩展性更高 效果更佳
        setTimeout(function(){
            $('.Div' + i+'0').css({
                "transform":"rotateY("+ deg +"deg) "
            });
            //递归调用
            rotate( i +1,deg) ;
        },80);
    }



    //循环设置背景
    for(var i = 0;i<colNum;i++){
        for(var j = 0;j < imgPathArr.length;j++){
            $('.Div' + i + j).css('background','url('+ imgPathArr[j] +') 0px '+(-i * HEIGHT / colNum)+'px');
        }
    }

    //自动播放
    var timer = 0;
    autoRotate(timer);
    function autoRotate() {
        clearInterval(timer);
          timer = setInterval(function () {
            deg += 360 / imgPathArr.length;
            rotate(-1, deg);
        }, 4000);
    }
    $('#container').hover(function(){
        clearInterval(timer);
    },function(){
        autoRotate()
    });




    //下面是为了测试写的
    var rotateXY = [0,0];
    var container = document.getElementById('container');
    addEventListener("mousedown",onmousedown,true);
    function onmousedown (ev) {
        ev = ev || event;
        oldX = ev.clientX;
        oldY = ev.clientY;
        var  oldoffsetL = ev.clientX - container.offsetLeft;
        var  oldoffsetT = ev.clientY - container.offsetTop;
        //console.log(ev.which);
        if(ev.which == 1){
            ev = ev || event;
            //ev.cancelBubble=true;
            console.log(container.style.transform);
            window.onmousemove = function (ev) {
                ev = ev || event;
                newX=ev.clientX;
                newY=ev.clientY;
                container.style.transform = "rotateY(" + (ev.clientX - oldX+ parseFloat(rotateXY[1])) + "deg) rotateX(" + (ev.clientY - oldY+ parseFloat(rotateXY[0])) + "deg)";
            };
        }else if(ev.which==3){
            document.onmousemove = function (ev) {
                ev = ev || event;
                // console.log(ev.clientX+"---"+oldoffsetL);
                container.style.left = ev.clientX - oldoffsetL +"px";
                container.style.top = ev.clientY - oldoffsetT +"px";
            };
        }
        window.onmouseup = function () {
            var rotate = container.style.transform;
            rotateXY = splitStr(rotate);
            //console.log(rotateXY[0],rotateXY[1]);
            window.onmousemove = null;
            document.onmousemove=null;
        };
    };
    function splitStr(str){
        var numX = str.substring(15,30);
        var numY = str.substring(8,15);
        var valueX = numX.replace(/[^0-9/-]/ig,"");
        var valueY = numY.replace(/[^0-9/-]/ig,"");
        // console.log(str.slice(15,25));
        //console.log(valueX+"---"+valueY);
        return [valueX,valueY];
    }




});//load