/**
 * Created by Administrator on 2016/11/29.
 */

/**
 *
 * @param min_num
 * @param max_num
 * @param bool
 * @returns {number}
 */
function lh_rand1(min_num,max_num,bool){
    return bool? Math.round(Math.random()*(max_num-min_num)+ min_num):Math.random()*(max_num-min_num)+ min_num;
}
/**
 *
 * @param num
 * @returns {number}
 */
function lh_rand2(num){
    return Math.round(Math.random()*(num*2)-num);
}
/**
 *
 * @param num
 * @param sNum
 * @returns {number}
 */
function lh_significant(num,sNum){
    return Math.round(num * Math.pow(10,sNum)) / Math.pow(10,sNum);
}

/**
 *
 * @param 输入透明度，空表示默认opacity为1
 * @param opacity_min
 * @param opcity_max
 * @returns {string}
 */
function lh_randColor(opacity_min,opcity_max){
    return opacity_min?"rgba("+lh_rand1(0,255,true)+","+lh_rand1(0,255,true)+","+lh_rand1(0,255,true)+","+
    lh_significant(lh_rand1(opacity_min,opcity_max,false),2)+")":
    "rgb("+lh_rand1(0,255,true)+","+lh_rand1(0,255,true)+","+lh_rand1(0,255,true)+")";
    //Math.round(x*100)/100
}

/**
 *
 * @param sideLength
 * @param sideNum
 * @returns {number}
 */
function lh_polygon(sideLength,sideNum){
    //求正多边形到顶点的距离
    //正多边形的外接圆的半径
    /*
    * 正24（sideLength）边形，每边对应圆心角为360°/24=15°，即
    * 由外接圆半径与圆心到一边的距离及半个边长组成的
    * 直角三角形中，半径与到边长的距离之间的夹角为15°/2=7.5°
     因此外接圆半径为：半个边长30÷sin7.5°=114.92
     js中sin要传入用弧度表示的角度
     =》  弧度=角度*Math.PI*2/360；
     =》  弧度=角度*Math.PI*2/360；
     =》  弧度=角度*Math.PI*2/360；
     重要的公式写三遍

    * */
    return sideLength / Math.sin((360/sideNum/2)*(Math.PI*2/360))/2;


}

/**
 *
 * @param side1
 * @param side2
 * @returns {number}
 */
function lhMath_getHypotenuse(rightAngleSide1,rightAngleSide2){
    return Math.sqrt(rightAngleSide1 * rightAngleSide1 + rightAngleSide2 * rightAngleSide2);
}
/**
 *
 * @param rightAngleSide
 * @param hypotenuse
 * @returns {number}
 */
function lhMath_getRightAngleSide(rightAngleSide,hypotenuse){
    return Math.sqrt(hypotenuse * hypotenuse - rightAngleSide * rightAngleSide)
}