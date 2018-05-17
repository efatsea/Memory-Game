/* Create a list that holds all of your cards*/
const cards = ['fa-diamond', 'fa-paper-plane-o','fa-anchor',
 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb',
 'fa-diamond', 'fa-paper-plane-o','fa-anchor',
 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']

 /* The element where we are going to add the cards */
const classToAddCards = document.querySelector('.deck');

shuffle(cards);/* The cards are shuffled */

/* With the loop we create the cards elements inside the deck */
for (let i = 0; i < 16; i++) {
	let eachCardClass= '<li class="card '+i+'"><i class="fa '+cards[i]+'"></i>';
	classToAddCards.insertAdjacentHTML('afterbegin',eachCardClass);
}

/*variables for the time functions*/
let status = 0;
let time = 0;

const cardClassElements = document.querySelectorAll('.card'); //all the elements with class=card
const starsClassElements = document.querySelectorAll('.fa-star');//all the elements with class= fa-star
const movesClassElement = document.querySelector('.moves'); // the element with class=moves
let len = cardClassElements.length; //the length of the cardClassElements
let openList = []; //we make the variable which will hold the opened cards
let cardShowClassElements = []; //the variable that will hold the cards that have temporary the class show
let clicks = 0;  //how many moves tha player have done.
let matches = 0; //how many matches the player has found
let stars = 3; //stars the palyer have in the beggining
let fistCard = null;//we make the variable that temporary keeps the class name of the fist card that is open
const resultCard = document.querySelector('.results')
/*for all the card we set a click event which triger all the events that we want*/

for (let i = 0; i < len; i++) {
	addClickEvent(cardClassElements[i]);
}

/* We make a click event so the time will start */
classToAddCards.addEventListener("click", startTime);


/* -------------------FUNCTIONS---------------------------------*/ 


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function start(){ //starts the time
	status=1;
	timer();
}

function stop(){  //stops the time
	status=0;
}

function timer(){  //timer function
	
	setTimeout(function(){
		if (status==1) {
			time++;
			let min = Math.floor(time/100/60);
			let sec = Math.floor(time/100);
			let msec = time%100;

			if (min<10) {
				min = "0" + min;
			}
			if (sec>=60) {
				sec = sec % 60;
			}
			if (sec<10) {
				sec = "0" +sec;
			}

			document.getElementById("timerLabel").innerHTML = min+":"+sec;
			timer();

		}	
			
		
	},8.97)
	
}

/*it counts the moves and reduce a star if they rich some point*/ 
function click(){ 
	clicks++;
	movesClassElement.innerHTML=clicks;
	if (clicks>35) {
		starsClassElements[0].classList.remove('fa-star');
		stars=2;
	}
	if (clicks>50) {
		starsClassElements[1].classList.remove('fa-star');
		stars=1;
	}
}

/*check if you end the game and show us the results*/ 
function gameOver(){
	if (matches===8) {
		stop();
		let time = document.getElementById("timerLabel").innerHTML;
		const textToAdd = '<h1>You win!!!</h1><p>Your score is:</p><p class="finalStars">Stars: '+stars+'</p><p class="finalMoves">Moves: '+clicks+'</p><p class="finalTime">Time: '+time+'</p><a class="play" href="index.html">Play Again!</a>'
		resultCard.insertAdjacentHTML('afterbegin',textToAdd);
		resultCard.style.cssText = 'display:flex;'
	}
}

/*it checks if two cards are equal or not*/
function checkMatch(array){
	setTimeout(function check(){
			if (openList.length===0) {
				addOpenCardToList(array);
				fistCard= array.className;
				click();
			}
			else if(openList.length===1 & array.className!==fistCard){
				addOpenCardToList(array);
				if (openList[0] === openList[1]) {
					cardShowClassElements[0].classList.remove('show','open');
					cardShowClassElements[0].classList.add('match');
					cardShowClassElements[1].classList.remove('show','open');
					cardShowClassElements[1].classList.add('match');
					cardShowClassElements = [];
					openList =[];
					matches++;
					gameOver();	
					click();
				}
				else {
					cardShowClassElements[0].classList.remove('show','open');
					cardShowClassElements[1].classList.remove('show','open');
					cardShowClassElements = [];
					openList =[];
					click();
					
				}
			}			
		},500);
}

/*add to each card a click event and what it's going to happend*/
function addClickEvent(array){
	array.addEventListener('click',function(event){
		array.classList.add('show','open');
		cardShowClassElements = document.querySelectorAll('.show');
		checkMatch(array);
		
	})
}

/*it starts the time after the fist click and then removes the click event*/
function startTime() {
	start();
	classToAddCards.removeEventListener("click", startTime);
}

/* add the open card to a temporary open list so we can compare if the cards are the same*/
function addOpenCardToList(array){
	openList.push(array.firstElementChild.classList.value); 
}