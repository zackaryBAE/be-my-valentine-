const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const valentineGif = document.getElementById('valentineGif');
const question = document.querySelector('h1');
const buttonsContainer = document.querySelector('.buttons');

// Containers
const gameContainer = document.getElementById('game-container');
const game2Container = document.getElementById('game2-container');
const game3Container = document.getElementById('game3-container');
const mathContainer = document.getElementById('math-container');

// Game 1 Elements
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');

// Game 1 Variables
let score = 0;
const targetScore = 5;
let gameInterval;

// Game 2 Variables
let winningGiftIndex = Math.floor(Math.random() * 3);

// Game 3 Variables
const memoryGrid = document.getElementById('memory-grid');
let flippedCards = [];
let matchedPairs = 0;
const totalPairs = 8;
const cardIcons = [
    '❤️', '❤️', 
    '🌹', '🌹', 
    '🍫', '🍫', 
    '🧸', '🧸',
    '💋', '💋',
    '💌', '💌',
    '💍', '💍',
    '😻', '😻'
];

// --- Button Movement Logic ---
function moveButton() {
    const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
    const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

    noBtn.style.position = 'fixed';
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
}

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('click', moveButton);

yesBtn.addEventListener('click', () => {
    buttonsContainer.style.display = 'none';
    question.style.display = 'none';
    startGame1();
});

// --- Game 1: Catch the Hearts ---
function startGame1() {
    gameContainer.classList.remove('hidden');
    score = 0;
    scoreDisplay.innerText = `Hearts Collected: ${score} / ${targetScore}`;
    gameInterval = setInterval(spawnGameHeart, 800);
}

function spawnGameHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤️';
    heart.classList.add('game-heart');
    
    const maxX = gameArea.offsetWidth - 40;
    const maxY = gameArea.offsetHeight - 40;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    
    const removeTimeout = setTimeout(() => {
        if (heart.parentElement) heart.remove();
    }, 1500);
    
    heart.addEventListener('click', () => {
        score++;
        scoreDisplay.innerText = `Hearts Collected: ${score} / ${targetScore}`;
        heart.remove();
        clearTimeout(removeTimeout);
        
        if (score >= targetScore) {
            endGame1();
        }
    });
    
    gameArea.appendChild(heart);
}

function endGame1() {
    clearInterval(gameInterval);
    gameArea.innerHTML = '';
    gameContainer.classList.add('hidden');
    startGame2();
}

// --- Game 2: Gift Hunt ---
function startGame2() {
    game2Container.classList.remove('hidden');
    document.getElementById('gift-message').innerText = "";
    // Reset gifts
    const gifts = document.querySelectorAll('.gift-box');
    gifts.forEach(gift => {
        gift.innerHTML = '🎁';
        gift.style.pointerEvents = 'auto';
    });
    winningGiftIndex = Math.floor(Math.random() * 3);
}

function checkGift(index) {
    const message = document.getElementById('gift-message');
    const gifts = document.querySelectorAll('.gift-box');
    
    if (index === winningGiftIndex) {
        gifts[index].innerHTML = '❤️';
        message.style.color = '#4caf50';
        message.innerText = "You found my heart!";
        setTimeout(() => {
            game2Container.classList.add('hidden');
            startGame3();
        }, 1500);
    } else {
        gifts[index].innerHTML = '💨';
        message.style.color = '#f44336';
        message.innerText = "Empty! Try another one.";
        gifts[index].style.pointerEvents = 'none';
    }
}

// --- Game 3: Memory Match ---
function startGame3() {
    game3Container.classList.remove('hidden');
    flippedCards = [];
    matchedPairs = 0;
    memoryGrid.innerHTML = '';
    
    // Shuffle cards
    cardIcons.sort(() => 0.5 - Math.random());
    
    cardIcons.forEach((icon, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.icon = icon;
        card.dataset.index = index;
        card.innerHTML = '❓'; // Back of card
        
        card.addEventListener('click', () => flipCard(card));
        memoryGrid.appendChild(card);
    });
}

function flipCard(card) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerHTML = card.dataset.icon;
        flippedCards.push(card);
        
        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    
    if (card1.dataset.icon === card2.dataset.icon) {
        matchedPairs++;
        flippedCards = [];
        if (matchedPairs === totalPairs) {
            setTimeout(() => {
                game3Container.classList.add('hidden');
                startMathChallenge();
            }, 1000);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card1.innerHTML = '❓';
            card2.classList.remove('flipped');
            card2.innerHTML = '❓';
            flippedCards = [];
        }, 1000);
    }
}

// --- Math Challenge ---
function startMathChallenge() {
    mathContainer.classList.remove('hidden');
    document.getElementById('math-message').innerText = "";
    document.getElementById('math-answer').value = "";
}

function checkMath() {
    const answer = document.getElementById('math-answer').value;
    const message = document.getElementById('math-message');
    
    if (parseInt(answer) === 300) {
        mathContainer.classList.add('hidden');
        showFinalCelebration();
    } else {
        message.innerText = "Try again, baby! 😘";
        // Shake animation effect
        const input = document.getElementById('math-answer');
        input.style.borderColor = 'red';
        setTimeout(() => input.style.borderColor = '#e91e63', 500);
    }
}

// --- Final Celebration ---
function showFinalCelebration() {
    message.classList.remove('hidden');
    valentineGif.style.transform = "scale(1.2)";
    valentineGif.style.transition = "transform 0.5s ease";
    createHearts();
}

function createHearts() {
    const heartContainer = document.createElement('div');
    document.body.appendChild(heartContainer);

    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 20 + 'px';
        heart.style.animation = 'floatUp 4s linear forwards';
        heartContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);
    }, 300);
}

// Add heart animation style dynamically
const style = document.createElement('style');
style.innerHTML = `
    @keyframes floatUp {
        to {
            transform: translateY(-100vh);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Make functions globally available for HTML onclick events
window.checkGift = checkGift;
window.checkMath = checkMath;
