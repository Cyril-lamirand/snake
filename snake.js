//Elements du jeu

const background_color = 'black';
const background_color2 = 'pink';
const background_color3 = 'purple';
const snake_color = 'blue';
const food_color = 'red';
const obstacle_color = 'brown';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = canvas.height = 620;

const FR =10;
const S = 20;
const T = canvas.width / S;

let pos;
let vel;
let food; 
let snake;
let obstacle;
let obstacleM;
let obstacleH;

var modal = document.getElementById("GameOver");
var span = document.getElementsByClassName("close")[0];

var point =  document.getElementById("point");
var p = 1;

var high = document.getElementById("high");
var h = localStorage.getItem("highscore");


// Fonction de la position initale du serpent

function init(){

    pos = {x:10, y:10};
    vel = {x:0, y:0};

    snake = [
        {x:8, y:10},
        {x:9, y:10},
        {x:10, y:10},

    ]

    randomFood();
    randomObstacle();
    randomObstacleM();
    randomObstacleH();

}

init();

// Fonction des positions aléatoires de la nourriture

function randomFood(){
    food = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }

    for (let cell of snake) {
        if(cell.x === food.x && food.y === cell.y) {
            return randomFood();
        }
    }
}

function randomObstacle(){
    obstacle = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }

    for (let cell of snake) {
        if(cell.x === obstacle.x && obstacle.y === cell.y) {
            return randomObstacle();
        }
    }
}

function randomObstacleM(){
    obstacleM = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }

    for (let cell of snake) {
        if(cell.x === obstacleM.x && obstacleM.y === cell.y) {
            return randomObstacleM();
        }
    }
}

function randomObstacleH(){
    obstacleH = {
        x: Math.floor(Math.random() * T),
        y: Math.floor(Math.random() * T),
    }

    for (let cell of snake) {
        if(cell.x === obstacleH.x && obstacleH.y === cell.y) {
            return randomObstacleH();
        }
    }
}

// Fonction des touches du jeu

document.addEventListener('keydown', keydown);

function keydown(e){
    switch(e.keyCode){

        case 37 : {
            return vel = {x: -1, y: 0}
        }
        case 38 : {
            return vel = {x: 0, y: -1}
        }
        case 39 : {
            return vel = {x: 1, y: 0}
        }
        case 40 : {
            return vel = {x: 0, y: 1}
        }
    }
}


setInterval(()=> {
    requestAnimationFrame(gameLoop);
}, 1000 /FR);

span.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }


// Mise en place du jeu

function gameLoop(){
    ctx.fillStyle = background_color;

        if(p>3){
            ctx.fillStyle = background_color2;
        }
        if(p>6){
            ctx.fillStyle = background_color3;
        }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
        

    ctx.fillStyle = snake_color;

    for(let cell of snake) {
        ctx.fillRect(cell.x*S, cell.y*S, S,S);
    }

ctx.fillStyle = food_color;
ctx.fillRect(food.x*S, food.y*S,S,S);

ctx.fillStyle = obstacle_color;
ctx.fillRect(obstacle.x*S, obstacle.y*S,S,S);


if (p>3){
ctx.fillRect(obstacleM.x*S, obstacleM.y*S,S,S);
}
if (p>6){
ctx.fillRect(obstacleH.x*S, obstacleH.y*S,S,S);
}

pos.x += vel.x;
pos.y += vel.y;



//Game Over (hors du cadre)

if(pos.x < 0 || pos.x > T || pos.y < 0 || pos.y >T ){
    if(p>h){
        h = parseInt(p) - 1;
        localStorage.setItem('highscore', h); 
        high.innerHTML = h
    }
    point.innerHTML = 0
    p = 1;
    modal.style.display = "block";
    
    init();

}

// Changement de position de la nourriture apres contact et ajout des points
if (food.x === pos.x && food.y === pos.y){
    snake.push({...pos});
    pos.x += vel.x;
    pos.y += vel.y;
    randomFood();
    randomObstacle();
    randomObstacleM();
    randomObstacleH();
    point.innerHTML = p++
    
    
}

// Game Over sur les obstacles
if (obstacle.x === pos.x && obstacle.y === pos.y){
    if(p>h){
        h = parseInt(p) - 1;
        localStorage.setItem('highscore', h); 
        high.innerHTML = h
    }
    point.innerHTML = 0
    p = 1;
    modal.style.display = "block";
    
    init();
    
}

//Game Over 

if(vel.x || vel.y) {
    for(let cell of snake){
        if(cell.x === pos.x && cell.y === pos.y){
            if(p>h){
                h = parseInt(p) - 1;
                localStorage.setItem('highscore', h); 
                high.innerHTML = h
            }
            point.innerHTML = 0
            p = 1;
            modal.style.display = "block";
            
            return init();
            
        } 

    }
    snake.push({...pos});
    snake.shift();
    
}

}

