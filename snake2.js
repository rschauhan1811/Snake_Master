let inputDir ={x:0,y:0};
 const foodsound=new Audio('food.mp3');
 const gameover= new Audio('end.mp3');
 const movesound=new Audio('direction.wav');
 const themesong=new Audio('theme.mp3');
 let speed = 14;
 let score = 0;

 let lastpainttime = 0; 
 let snakearr = [
    {x: 13, y: 15}
 ];
 food={x: 6,y: 17};
//function
function main(ctime) {
    window.requestAnimationFrame(main);
    if((ctime-lastpainttime)/1000<1/speed  ){
        return;
    }
    lastpainttime=ctime;
   gameEngine();
}
function isCollide(snakearr) {
    for (let i = 1; i < snakearr.length; i++) {
        if(snakearr[i].x===snakearr[0].x&&snakearr[i].y===snakearr[0].y){
           
            return true; 
        }
      
    }
    if(snakearr[0].x>=18||snakearr[0].x<=0||snakearr[0].y>=18||snakearr[0].y<=0){
       
         return true;
    }
   
}
function gameEngine() {
    //part1 : Updating the snake array &Food
if(isCollide(snakearr)){
    gameover.play();
    themesong.pause(); 
    inputDir={x:0,y:0};
    alert(":_) Game Over. Press any key to play again.");
    snakearr= [
        {x:13, y:15}
     ];
     themesong.play();
     score = 0; 
     scorebox.innerHTML="Score : "+ score; 

}
  // if you have eaten the food, increment score and recreate the food
  if(snakearr[0].y===food.y&&snakearr[0].x===food.x){
    foodsound.play();
    score+=1; 
    if(score>highscoreval ){
        highscoreval=score;
        localStorage.setItem("highscore",JSON.stringify(highscoreval));
        highscorebox.innerHTML="High Score : " +highscoreval;
    }
    scorebox.innerHTML="Score : "+ score; 
     snakearr.unshift({x : snakearr[0].x+inputDir.x,y:snakearr[0].y +inputDir.y});
     let a = 2;let b = 16;
     food={x:Math.round(a+(b-a)*Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }
  
//moving the snake
  for (let i = snakearr.length-2; i >= 0; i--) {
   
    snakearr[i+1] = {...snakearr[i]}; 
}
snakearr[0].x += inputDir.x;
snakearr[0].y += inputDir.y;
 // Part 2: Display the snake and Food
    board.innerHTML= "";
    snakearr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart=e.y ;
        snakeElement.style.gridColumnStart=e.x;
       
        if(index===0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    
    //part3: Display the snake
   
        foodElement = document.createElement('div');
        foodElement.style.gridRowStart=food.y ; 
        foodElement.style.gridColumnStart=food.x;
        foodElement.classList.add('food');
        board.appendChild(foodElement);
    
}


// Main logic 
let highscore=localStorage.getItem("highscore");
if(highscore===null){
    highscoreval=0;
    localStorage.setItem("highscore",JSON.stringify(highscoreval));
}
else{
    highscoreval=JSON.parse(highscore);
    highscorebox.innerHTML="highscore : " +highscore;
}
 window.requestAnimationFrame(main);
 window.addEventListener('keydown', e=>{
    inputDir ={x: 0, y: 1}//start the game
    themesong.play();
    movesound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y  = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
             break;
        case "ArrowLeft":
            console.log("ArrowLeft"); 
             inputDir.x = -1;
            inputDir.y = 0;

             break;
        case "ArrowRight":
             console.log("ArrowRight");
             inputDir.x = 1;
             inputDir.y = 0;
             break;
        default:
            break;
    }
 });