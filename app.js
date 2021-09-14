const allImages = [
  {
    id:'bee',
    src:'./images/bee.png'
  },
  {
    id:'bird',
    src:'./images/bird.png' 
  },
  {
    id:'butterfly',
    src:'./images/butterfly.png' 
  },
  {
    id:'kitty',
    src:'./images/kitty.png' 
  },
  {
    id:'dog',
    src:'./images/dog.png'
  },
  {
    id:'ladybug',
    src:'./images/ladybug.png'
  },
  {
    id:'duck',
    src:'./images/duck.png'
  },
  {
    id:'penguin',
    src:'./images/penguin.png'
  },
  {
    id:'bee',
    src:'./images/bee.png'
  },
  {
    id:'bird',
    src:'./images/bird.png' 
  },
  {
    id:'butterfly',
    src:'./images/butterfly.png' 
  },
  {
    id:'kitty',
    src:'./images/kitty.png' 
  },
  {
    id:'dog',
    src:'./images/dog.png'
  },
  {
    id:'ladybug',
    src:'./images/ladybug.png'
  },
  {
    id:'duck',
    src:'./images/duck.png'
  },
  {
    id:'penguin',
    src:'./images/penguin.png'
  }
]
const gameBoard = document.querySelector('#game-board');
const allCards = document.querySelectorAll('#game-board div'); // get all plain cards
const showScore = document.querySelector('span');
const showBestScore = document.querySelector('#best-score')
const showTime = document.querySelector('#time-container p');
const restartBtn = document.querySelector('button');
let clickCounter = 0;
let twoCards = [];
let score=0;
let newScore = 0;
let gameTime = 15;

showScore.innerText = score;
//updateScore function, compares newScore in localStorage if there is previous bestScore. Otherwise, current bsetScore is 0;
const updateScore = () => {
  if(localStorage.bestScore){ 
   let highestScore = JSON.parse(localStorage.bestScore);
   if(newScore > highestScore){ 
   highestScore = newScore;
   localStorage.bestScore = JSON.stringify(highestScore);
   }
  }else{
    localStorage.bestScore = JSON.stringify(newScore);
  }
showBestScore.innerText = JSON.parse(localStorage.bestScore);
}
updateScore(newScore); // retrieve previous bestScore from localStorage

 

/**Shuffle image function return new array of shuffled images */
const shuffle = (cards)=>{
  let result = [];
  while(cards.length){ //make a loop from number of cards left in array
  let index = Math.floor(Math.random()*cards.length); //take card from random index 
  result.push(cards[index]); // add picked card in shuffledCards array
  cards.splice(index,1); // take out picked card from original cards array
  }
  return result ; 
};

let shuffledImages = shuffle(allImages); // get all shuffled images

/**creatImageOnCard function, creates image tag with attribute src, then append it on input tag */
const createImageOnCard = (cardIndex) => { 
  const img = document.createElement('img');
  img.setAttribute('src',shuffledImages[cardIndex].src); 
  allCards[cardIndex].append(img);
}

/**checkMatching function, take in array of id of image on the each card, and compare if two cards have the same id image. If two cards have the same id image, score is incremented by 1, otherwise, image is detached from each card */
const checkMatching = (twoCards) => { 
  let firstCardIndex = twoCards[0];
  let secondCardIndex = twoCards[1];
  if(firstCardIndex !== secondCardIndex) {
    if(shuffledImages[firstCardIndex].id !== shuffledImages[secondCardIndex].id) {
      setTimeout(()=> {
        allCards[firstCardIndex].innerHTML ='';
        allCards[secondCardIndex].innerHTML='';
      },1000 );
    } else {
      score++
      showScore.innerText = score;
    }
  } 
}
let timer;
/**timing function, couting down and display game playing time for 15 seconds */
const timing = () => {
  timer = setInterval(()=>{
    gameTime--;
    if(gameTime >= 10){
      showTime.innerText = `00:${gameTime}`;
    } 
    if(gameTime === 0){
      showTime.style.fontSize = '20px';
      showTime.innerText = `TIME'S UP`;
      newScore = score;
      stopGame();
      clearInterval(timer);
      updateScore(newScore);
    }
    if(gameTime < 10 && gameTime > 0){
      showTime.innerText = `00:0${gameTime}`;
    }
  },1000)
}

/**flippingCard function, opens each card when it's clicked and flipped back when two cards aren't matching */
const flippingCard = (e) => {
  if(!e.target.id){
    let cardIndex = e.target.getAttribute('data-index')
    if(cardIndex && !e.target.children.length){ // preventing clicking on same card 
      clickCounter++;
      if(clickCounter === 1){
        timing();
      }
      createImageOnCard(cardIndex);
      if(twoCards.length < 2){// last adding is lenght of 1 
        twoCards.push(cardIndex);
          if(twoCards.length === 2){
            checkMatching(twoCards); 
            twoCards = [];//clear twoCards after checkMatching
          }
      }
    } else {
      twoCards.splice(1,1); //remove second card from array if user pickes a same card 
    }
  }
};

gameBoard.addEventListener('click',flippingCard);
const stopGame = () => { 
  gameBoard.removeEventListener('click', flippingCard);
  setTimeout(()=>{
    restartGame(); // game will be restart in 3 sec
  },3000)  
};

const restartGame = () => {
    showTime.style.fontSize = '28px'
    allCards.forEach(el => el.innerHTML = '');
    score = 0;
    showScore.innerHTML = score;
    gameTime = 15;
    showTime.innerText = `00:${gameTime}`;
    shuffledImages = shuffle(shuffledImages);
    gameBoard.addEventListener('click', flippingCard);
    clickCounter = 0;
}

restartBtn.addEventListener('click', ()=>{
clearInterval(timer);
restartGame();
});











