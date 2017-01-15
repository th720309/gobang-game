/**
 * Created by tianhao on 17-1-14.
 */


var me;
var chessBoard = [];
/*赢法数组*/
var wins = [];
/*多少种赢法*/
var count;
/*赢法统计数组*/
var myWin = [];
var computerWin = [];

var over;

var isNewGame = false;

var chess;
var context;


var $ = function(id){
    return document.getElementById(id);
}


var drawChessBoard = function(){
    context.strokeStyle = "#bfbfbf";
    for(var i=0; i<20; i++){
        context.moveTo(15+i*30,15);
        context.lineTo(15+i*30,585);
        context.stroke();
        context.moveTo(15,15+i*30);
        context.lineTo(585,15+i*30);
        context.stroke();
    }
};






var oneStep_people = function (i,j,me) {
    context.beginPath();
    context.arc(15+i*30, 15+j*30, 13, 0, 2*Math.PI);
    context.closePath();
    var gradient = context.createRadialGradient(15+i*30+2, 15+j*30-2, 13, 15+i*30+2, 15+j*30-2, 15);
    if(me) {
        gradient.addColorStop(0, "#0A0A0A");
        gradient.addColorStop(1, "#636766");
    }else{
        gradient.addColorStop(0, "#D1D1D1");
        gradient.addColorStop(1, "#F9F9F9");
    }
    context.fillStyle = gradient;
    context.fill();
}





var newGame_people = function(){
    me=true;
    over =false;

    chessBoard = [];
    /*赢法数组*/
    wins = [];

    /*赢法统计数组*/
    myWin = [];
    computerWin = [];





    chess = null;
    context = null;

    $("box").innerHTML = '<canvas id="chess" width="600" height="600"></canvas>';
    chess = document.getElementById("chess");
    context = chess.getContext("2d");



    /*初始化棋盘数据*/
    for (var i = 0; i < 20; i++) {
        chessBoard[i] = [];
        for (var j = 0; j < 20; j++) {
            chessBoard[i][j] = 0;
        }
    }

    /*初始化赢法数据*/
    for (var i = 0; i < 20; i++) {
        wins[i] = [];
        for (var j = 0; j < 20; j++) {
            wins[i][j] = [];
        }
    }

    /*计算有多少种赢法*/
    count = 0;

    for (var i = 0; i < 20; i++) { //横线五子
        for (var j = 0; j < 16; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i][j+k][count] = true;
            }
            count++;
        }
    }

    for (var i = 0; i < 16; i++) { //竖线五子
        for (var j = 0; j < 20; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i+k][j][count] = true;
            }
            count++;
        }
    }

    for (var i = 0; i < 16; i++) { //斜线(\)五子
        for (var j = 0; j < 16; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i+k][j+k][count] = true;
            }
            count++;
        }
    }

    for (var i = 19; i >= 4; i--) { //斜线(/)五子
        for (var j = 0; j < 16; j++) {
            for (var k = 0; k < 5; k++) {
                wins[i-k][j+k][count] = true;
            }
            count++;
        }
    }

    /*初始化每一种赢法*/

    for (var i = 0; i < count; i++) {
        myWin[i] = 0;
        computerWin[i] = 0;
    }


    chess.onclick = function(e){
        myClick_people(e);
    }

};


var gameOver_people = function(me){
    over = true;
    var a;
    if (me) {
        a = confirm("黑棋赢了，是否重新开始");
    }else{
        a = confirm("白棋赢了，是否重新开始");
    }
    if (a) {

        setTimeout(function(){
            newGame_people();
            drawChessBoard();
        },200);

    }
};

function People(){
    newGame_people();
    drawChessBoard();
}
/*window.onload = function(){
 newGame();
 drawChessBoard();
 };*/

function myClick_people(e){
    if (over) return;
    var i = Math.floor(e.offsetX/30);
    var j = Math.floor(e.offsetY/30);
    if (chessBoard[i][j] != 0)        return;
    oneStep_people(i,j,me);
    if(me){
        chessBoard[i][j]=1;
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                myWin[k]++;
                computerWin[k] = 6;
                console.log("haha",myWin[k]);
                if (myWin[k] == 5) {
                    setTimeout(gameOver_people(me),10000);
                    over = true;
                }
            }
        }
    }else{
        chessBoard[i][j]=2;
        for (var k = 0; k < count; k++) {
            if (wins[i][j][k]) {
                computerWin[k]++;
                myWin[k] = 6;
                if (computerWin[k] == 5) {
                    setTimeout(gameOver_people(me),10000);
                    over = true;
                }
            }
        }
    }
    me=!me;
};

$("new-btn1").onclick = function(){
    var a = confirm("是否开始人人对战？");
    if (a) {
        me = true;
        newGame_people();
        drawChessBoard();
    }
}



