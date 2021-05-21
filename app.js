//info
const timer = document.querySelector('#timetext');
const click = document.querySelector('#totalclicks');
const restart = document.querySelector('#restartBtn');
const info = document.querySelector('.info');
const matchDisplay = document.querySelector('.match-cuantity');
//info

//start, lose and win page
const startText = document.querySelector('.start-text');
const startBtn = document.querySelector('#start-btn');
const hard = document.querySelector('#hard');
const medium = document.querySelector('#medium');
const easy = document.querySelector('#easy');
const startScreen = document.querySelector('.start-screen');
//start, lose and win page

//loader
const loader = document.querySelector('.card-loading');
//loader
//cards place
const cardContainer = document.querySelector('.card-container');
//cards place

fetch('cards.json')
    .then(response => response.json())
    .then(cardsData => {

        //shuffle cards array
        const shufflecards = cardsData.sort((a, b) => 0.5 - Math.random());
        //shuffle cards array

        //default difficulty
        medium.setAttribute('class', 'difficulty-style');
        let timerNum = 50;
        timer.textContent = timerNum;
        //default difficulty

        //hard difficulty
        hard.addEventListener('click', () => {
            hard.setAttribute('class', 'difficulty-style');
            medium.classList.remove("difficulty-style");
            easy.classList.remove("difficulty-style");
            timerNum = 30;
            timer.textContent = timerNum;
        })
        //hard difficulty

        //medium difficulty
        medium.addEventListener('click', () => {
            medium.setAttribute('class', 'difficulty-style');
            hard.classList.remove("difficulty-style");
            easy.classList.remove("difficulty-style");
            timerNum = 50;
            timer.textContent = timerNum;
        })
        //medium difficulty

        //easy difficulty
        easy.addEventListener('click', () => {
            easy.setAttribute('class', 'difficulty-style');
            hard.classList.remove("difficulty-style");
            medium.classList.remove("difficulty-style");
            timerNum = 70;
            timer.textContent = timerNum;
        })
        //easy difficulty

        //start, play again, try again
        startBtn.addEventListener('click', startGame);

        let clickCounter = 0;
        let chosenCards = [];
        let chosenCardsId = [];
        let winning = [];

        function startGame() {
            console.log(screen.width + 'x' + screen.height)
            cardContainer.innerHTML = '';
            placeCards();
            screen.width <= 780 ? info.style.display = 'flex' : info.style.display = 'block'

            startScreen.style.display = 'none';
            let timerCountdown = setInterval(() => {
                timerNum--
                timer.textContent = timerNum;
                if (checkTime()) {
                    startScreen.style.display = 'flex'
                    startBtn.textContent = 'TRY AGAIN'
                    startText.textContent = 'You Have Lost'
                    startText.setAttribute('style', 'color:red; font-size:100px')
                    info.style.display = 'none';
                    clearInterval(timerCountdown);
                    click.textContent = 0;
                    clickCounter = 0;
                    timer.textContent = 50;
                    timerNum = 50;
                    winning = [];
                    matchDisplay.textContent = 0;

                }
                if (winning.length === shufflecards.length / 2) {
                    startScreen.style.display = 'flex'
                    startBtn.textContent = 'PLAY AGAIN'
                    startText.textContent = 'You Have Won'
                    startText.setAttribute('style', 'color:green; font-size:100px')
                    info.style.display = 'none';
                    clearInterval(timerCountdown);
                    click.textContent = 0;
                    clickCounter = 0;
                    timer.textContent = 50;
                    timerNum = 50;
                    winning = [];
                    matchDisplay.textContent = 0;
                }
            }, 1000);
        }

        //timer check
        function checkTime() {
            if (timerNum === 0) {
                return true
            } else {
                return false
            }
        }
        //timer check

        //create and set cards
        function placeCards() {
            for (let i = 0; i < shufflecards.length; i++) {
                let card = document.createElement('img');
                card.style.transform = 'rotateY(180deg)';
                loader.style.display = 'flex';
                card.setAttribute('src', shufflecards[i].img);
                setTimeout(() => {
                    card.setAttribute('src', 'images/back.jpg');
                    loader.style.display = 'none';
                    cardContainer.style.display = 'flex';
                    // cardContainer.setAttribute('style', 'display:flex; transition:300ms; opacity:1;');
                }, 2000);

                card.setAttribute('data-id', i);
                card.addEventListener('click', flip)
                cardContainer.appendChild(card);
            }
        }
        //create and set cards

        //check if cards are same
        function checkForMatch() {
            let cards = document.querySelectorAll('img');
            const firstClickId = chosenCardsId[0];
            const secondClickId = chosenCardsId[1];
            if (chosenCards[0] === chosenCards[1]) {
                setTimeout(() => {
                    cards[firstClickId].setAttribute('class', 'matchedCards');
                    cards[secondClickId].setAttribute('class', 'matchedCards');
                }, 700);
                winning.push(chosenCards);
            } else {
                setTimeout(() => {
                    cards[firstClickId].setAttribute("style", "transition: transform 700ms;transform: rotateY(180deg);");
                    cards[secondClickId].setAttribute("style", "transition: transform 700ms;transform: rotateY(180deg);");

                    setTimeout(() => {
                        cards[firstClickId].setAttribute('src', 'images/back.jpg');
                        cards[secondClickId].setAttribute('src', 'images/back.jpg');
                    }, 212);
                }, 700);
            }
            chosenCards = [];
            chosenCardsId = [];
            matchDisplay.textContent = winning.length;
        }
        //check if cards are same

        //flip cards
        function flip() {
            clickCounter++;
            click.textContent = clickCounter
            let cardNum = this.getAttribute('data-id');
            chosenCards.push(shufflecards[cardNum].name);
            chosenCardsId.push(cardNum);

            this.setAttribute("style", "transition: transform 700ms;transform: rotateY(0deg);");

            setTimeout(() => {
                this.setAttribute('src', shufflecards[cardNum].img);
            }, 212);
            if (chosenCardsId[0] === chosenCardsId[1]) {
                chosenCardsId.pop();
                chosenCards.pop();
            }
            if (chosenCards.length === 2) {
                checkForMatch()
            }
        }
        //flip cards

        //restart button
        restart.addEventListener('click', resetGame);
        function resetGame() {
            location.reload()

        }
        //restart button
    });












