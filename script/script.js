'use strict';

let canv = document.getElementById("can"); //холст, из html, найденный по id
let content = canv.getContext("2d"); //вид игры


let backgraund = new Image();  //объект для изображения
let backgroundOver = new Image();
let chell = new Image(); //объект для изображения
let chell2 = new Image();
let botblock = new Image();
let botblock2 = new Image();
let textim = new  Image();
let connect = 0;


//координаты для персонажа
let x = 5;
let y = 85;
let width = 30;
let height = 50;
let gravity = 1.5;
let keySpress = false;
let notReterned = false;


backgraund.src = "../img/фон.jpg"; //передача картинок
backgroundOver.src = "../img/фон2.jpg";
chell.src = "../img/чел.png";
chell2.src = "../img/монстр.png";
botblock.src = "../img/печенька.png";
botblock2.src = "../img/кекс.png";


let block = [];
block[0] = {
    x:canv.width, //за пределами экрана
    y: -100,
    img: 0
}
function sleep(millis) {
    var t = (new Date()).getTime();
    var i = 0;
    while (((new Date()).getTime() - t) < millis) {
        i++;
    }
}


const gameOver = () => {
    content.drawImage(chell, -4, y, 50, height);
    alert("ВЫ ПОТОЛСТЕЛИ!!!!");

}


const paint = () => { //Для загрузки изображения на сайт и изменение его масштабов
    if (connect === 1) {
        gameOver();
        return;
    }
    if (!keySpress) {
        y += gravity;
        if (y > 85){
            notReterned = false;
            y = 85;
        }
    }

    requestAnimationFrame(paint);
    content.drawImage(backgraund, 0, 0, 300, 150);
    content.drawImage(chell, x, y, width, height);


    for (let i = 0; i < block.length; i++) {
        if (block[i].img === 0) {
            content.drawImage(botblock2, block[i].x, block[i].y, 15, 20);
        } else {
            content.drawImage(botblock, block[i].x, block[i].y, 15, 20);
        }


        block[i].x --; //
        let yPos = Math.floor(Math.random() * 89) + 40;
        if (yPos < 80) {
            yPos = -180;
        }
        if (block[i].x === 180) {
            block.push({ //объект
                x:canv.width,
                y:yPos,
                img: Math.floor(Math.random() * 2)
            });
        }
        if ((block[i].x + 5 > x && block[i].x + 5 < x + width) && (block[i].y + 10 > y && block[i].y + 10 < y + height)) {
            connect = 1;
        }
    }

};

//загружаем и вызываем функцию по вызову изображаения
backgraund.onload = paint;
chell.onload = paint;



document.addEventListener('keydown', (event) => {
    if (event.code === "KeyW")
    {
        if (y !== 85) {
            return;
        }
        y -= 100;
        notReterned = true;
    }
    if (event.code === "KeyS" && height === 50 && !notReterned)
    {
        height -=20;
        y += 20;
        keySpress = true;
    }
});
document.addEventListener('keyup', (event) => {

    if (event.code === "KeyS" && height === 30)
    {
        height +=20;
        keySpress = false;
    }

});



let timerInput = document.getElementById("time"); // Берём строку
let buttonRun = document.getElementById("button");// Берём кнопку запуска
let timerShow = document.getElementById("timer");


