var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj,lastFed;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);
  
  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
 fedTime=database.ref('feedTime') 
 fedTime.on('value',function(data){
   lastFed = data.val();
 });
 
 
 
  drawSprites();
  fill("yellow")
  if(lastFed>=12){
    text("Last Feed:"+lastFed%12+ " PM",350,30);
   }
   else if(lastFed==0){
     text("Last Feed : 12AM",350,30);
   }
   else{
     text("Last Feed :"+ lastFed +"AM",350,30)
   }
    //write code to display text lastFed time here
  
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here update food stock and last fed time
var food_Stock=foodObj.getFoodStock();
if(food_Stock<=0){
  foodObj.updateFoodStock(food_Stock*0)
}
else{
  foodObj.updateFoodStock(food_Stock-1)
}
database.ref('/').update({
  food : foodObj.getFoodStock(),
  feedTime : hour()
})
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    food:foodS
  })
}
