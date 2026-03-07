const grid = document.getElementById("grid");
const scoreEl = document.getElementById("score");
const heartMessage = document.getElementById("heartMessage");
const heartText = document.getElementById("heartText");
const finalScreen = document.getElementById("finalScreen");
const music = document.getElementById("music");
const startButton = document.getElementById("startButton");

let winningIndexes = [];
let found = 0;
let musicStarted = false;

const heartMessages = [
    "Лиза, твоя улыбка — как солнце после дождя ☀️",
    "Ты делаешь этот мир ярче 💕",
    "Пусть каждый день дарит тебе новые эмоции 🌸",
    "Лиза, оставайся такой же удивительной и веселой✨",
    "С 8 марта, Лиза! 💖 Ты — сокровище"
];

function startGame() {
    grid.style.display = "grid";
    grid.innerHTML = "";
    finalScreen.style.display = "none";
    heartMessage.style.display = "none";
    found = 0;
    scoreEl.textContent = found;
    winningIndexes = [];
    musicStarted = false;
    
    music.play().catch(e => console.log("Музыка запущена после взаимодействия"));

    while (winningIndexes.length < 5) {
        let rand = Math.floor(Math.random() * 36);
        if (!winningIndexes.includes(rand)) {
            winningIndexes.push(rand);
        }
    }

    for (let i = 0; i < 36; i++) {
        const gift = document.createElement("div");
        gift.classList.add("gift");
        gift.textContent = "🎁";
        gift.dataset.index = i;

        gift.addEventListener("click", function handler(e) {          
            const idx = parseInt(this.dataset.index);
            if (winningIndexes.includes(idx) && this.textContent !== "💖") {
                this.textContent = "💖";

                const messageIndex = winningIndexes.indexOf(idx);
                heartText.textContent = heartMessages[messageIndex];
                heartMessage.style.display = "flex";
                heartMessage.dataset.isLastHeart = found === 4 ? "true" : "false";

                found++;
                scoreEl.textContent = found;
            } 
            else if (this.textContent === "🎁") {
                this.textContent = "🌷";
            }
        });

        grid.appendChild(gift);
    }
}

window.startGame = startGame;

window.closeHeartMessage = function() {
    heartMessage.style.display = "none";
    
    if (heartMessage.dataset.isLastHeart === "true" && found === 5) {
        
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            startVelocity: 25,
            colors: ['#ff4da6', '#fff9c4', '#ffb6d9', '#f06292', '#ff80ab', '#b22b6d']
        });
        
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.5, x: 0.2 },
                colors: ['#ff4da6', '#ffb6d9', '#f06292']
            });
        }, 200);
        
        setTimeout(() => {
            confetti({
                particleCount: 100,
                spread: 100,
                origin: { y: 0.5, x: 0.8 },
                colors: ['#fff9c4', '#ffd6ec', '#ff80ab']
            });
        }, 400);
        
        setTimeout(() => {
            confetti({
                particleCount: 300,
                spread: 180,
                origin: { y: -0.1, x: 0.5 },
                startVelocity: 30,
                colors: ['#ff4da6', '#fff9c4', '#ffb6d9', '#f06292', '#ff80ab']
            });
        }, 600);
        
        setTimeout(() => {
            for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                    confetti({
                        particleCount: 50,
                        spread: 90,
                        origin: { y: 0.7, x: Math.random() },
                        startVelocity: 20,
                        colors: ['#ff4da6', '#fff9c4', '#f06292']
                    });
                }, i * 100);
            }
        }, 1000);
        
        finalScreen.style.display = "flex";
    }
    
    heartMessage.dataset.isLastHeart = "false";
};

window.closeFinal = function() {
    finalScreen.style.display = "none";
};

function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");
    const flowers = ["🌸", "🌼", "🌷", "🌺", "🪷", "🌹"];
    petal.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.animationDuration = (4 + Math.random() * 6) + "s";
    petal.style.fontSize = (20 + Math.floor(Math.random() * 25)) + "px";
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), 10000);
}
setInterval(createPetal, 500);