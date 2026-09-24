const startButton = document.getElementById("startButton");

const page1 = document.querySelector(".intro-page");
const page2 = document.querySelector(".question-page");
const page3 = document.querySelector(".birthday-page");
const page4 = document.getElementById("page4");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const memoryButton = document.getElementById("memoryButton");



/* =========================
   PAGE 1 → PAGE 2
========================= */

startButton.addEventListener("click", function () {

    page1.style.display = "none";
    page2.style.display = "flex";

});



/* =========================
   NO BUTTON
========================= */

function moveNoButton() {

    const padding = 30;

    const maxX =
        window.innerWidth -
        noButton.offsetWidth -
        padding;

    const maxY =
        window.innerHeight -
        noButton.offsetHeight -
        padding;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    noButton.style.position = "fixed";

    noButton.style.left =
        Math.max(padding, randomX) + "px";

    noButton.style.top =
        Math.max(padding, randomY) + "px";

}


noButton.addEventListener(
    "mouseenter",
    moveNoButton
);


noButton.addEventListener(
    "touchstart",
    function (event) {

        event.preventDefault();

        moveNoButton();

    }
);



/* =========================
   PAGE 2 → PAGE 3
========================= */

yesButton.addEventListener("click", function () {

    page2.style.display = "none";
    page3.style.display = "flex";

});



/* =========================
   PAGE 3 → PAGE 4
========================= */

memoryButton.addEventListener("click", function () {

    page3.style.display = "none";
    page4.style.display = "flex";

});



/* =========================
   PAGE 4 CARDS
========================= */

const surpriseCards =
    document.querySelectorAll(".surprise-card");

const letterButton =
    document.getElementById("letterButton");

let openedCards = 0;


surpriseCards.forEach(function (card) {

    card.addEventListener("click", function () {

        if (card.classList.contains("open")) {
            return;
        }

        card.classList.add("open");

        const message =
            card.getAttribute("data-message");

        card.querySelector(".card-message").textContent =
            message;

        openedCards++;

        if (openedCards === surpriseCards.length) {

            letterButton.classList.add("show");

        }

    });

});
/* =========================
   PAGE 4 → PAGE 5
========================= */

const page5 = document.getElementById("page5");
const page6 = document.getElementById("page6");
const gamesButton = document.getElementById("gamesButton");

gamesButton.addEventListener("click", function () {
    page5.style.display = "none";
    page6.style.display = "flex";
});
letterButton.addEventListener("click", function () {

    page4.style.display = "none";
    page5.style.display = "flex";

});


/* =========================
   ENVELOPE
========================= */
/* PAGE 5 - CANVA FLOATING LETTERS */
const letterCards = document.querySelectorAll(".letter-card");
const letterModal = document.getElementById("letterModal");
const closeLetter = document.getElementById("closeLetter");
const openedLetterImage = document.getElementById("openedLetterImage");

let openedLetters = new Set();


const letterImages = {
    1: "assets/letters/letter-01.png",
    2: "assets/letters/letter-02.png",
    3: "assets/letters/letter-03.png"
};


/* OPEN LETTER */

letterCards.forEach(function(card) {

    card.addEventListener("click", function() {

        const id = card.getAttribute("data-letter");

        openedLetterImage.src = letterImages[id];

        letterModal.classList.add("active");


        /* COUNT UNIQUE LETTERS */

        openedLetters.add(id);


        /* SHOW GAMES BUTTON AFTER ALL 3 */

        if (openedLetters.size === 3) {

            gamesButton.classList.add("show");

        }

    });

});

/* CLOSE LETTER */

closeLetter.addEventListener("click", function() {

    letterModal.classList.remove("active");

    openedLetterImage.src = "";

});


/* CLICK OUTSIDE TO CLOSE */

letterModal.addEventListener("click", function(event) {

    if (event.target === letterModal) {

        letterModal.classList.remove("active");

        openedLetterImage.src = "";

    }

});
/* =========================================================
   GAME 01 — BALLOON POP
========================================================= */

const balloonGame = document.getElementById("balloonGame");
const gameModal = document.getElementById("gameModal");
const closeGame = document.getElementById("closeGame");
const gameScreen = document.getElementById("gameScreen");

let balloonScore = 0;
let balloonInterval;


/* OPEN BALLOON GAME */

balloonGame.addEventListener("click", function () {

    gameModal.classList.add("active");

    startBalloonGame();

});


/* START GAME */

function startBalloonGame() {

    balloonScore = 0;

    clearInterval(balloonInterval);

    gameScreen.innerHTML = `
    
        <div class="balloon-header">

            <span>
                🎈 Balloon Pop
            </span>

            <strong id="balloonScore">
                0 / 10
            </strong>

        </div>

        <p class="balloon-instruction">
            Pop the balloons before they fly away! ♡
        </p>

        <div
            class="balloon-play-area"
            id="balloonPlayArea"
        >
        </div>

    `;

    createBalloon();

    balloonInterval = setInterval(function () {

        createBalloon();

    }, 900);

}


/* CREATE BALLOON */

function createBalloon() {

    const area =
        document.getElementById("balloonPlayArea");

    if (!area) return;

    const balloon =
        document.createElement("button");

    balloon.className = "game-balloon";

    balloon.innerHTML = "🎈";

    balloon.style.left =
        Math.random() * 80 + 5 + "%";

    balloon.style.animationDuration =
        (3 + Math.random() * 2) + "s";


    balloon.addEventListener("click", function () {

        popBalloon(balloon);

    });


    area.appendChild(balloon);


    setTimeout(function () {

        if (balloon.parentElement) {
            balloon.remove();
        }

    }, 5000);

}


/* POP */

function popBalloon(balloon) {

    if (balloon.classList.contains("popped")) {
        return;
    }

    balloon.classList.add("popped");

    balloonScore++;

    const score =
        document.getElementById("balloonScore");

    if (score) {

        score.textContent =
            balloonScore + " / 10";

    }


    createPopParticles(balloon);


    setTimeout(function () {

        balloon.remove();

    }, 250);


    if (balloonScore >= 10) {

        clearInterval(balloonInterval);

        setTimeout(function () {

            finishBalloonGame();

        }, 400);

    }

}


/* PARTICLES */

function createPopParticles(balloon) {

    const rect =
        balloon.getBoundingClientRect();

    for (let i = 0; i < 7; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "pop-particle";

        particle.textContent =
            ["✦", "♡", "•"][Math.floor(Math.random() * 3)];

        particle.style.left =
            rect.left + rect.width / 2 + "px";

        particle.style.top =
            rect.top + rect.height / 2 + "px";

        particle.style.setProperty(
            "--x",
            (Math.random() * 100 - 50) + "px"
        );

        particle.style.setProperty(
            "--y",
            (Math.random() * 100 - 50) + "px"
        );

        document.body.appendChild(particle);

        setTimeout(function () {

            particle.remove();

        }, 600);

    }

}


/* GAME COMPLETE */

function finishBalloonGame() {

    gameScreen.innerHTML = `

        <div class="game-result">

            <div class="result-icon">
                🎈✨
            </div>

            <h2>
                You did it!
            </h2>

            <p>
                All 10 balloons popped ♡
            </p>

            <div class="result-small">
                GAME 01 COMPLETE
            </div>

            <button
                class="game-result-button"
                id="balloonDone"
            >
                BACK TO GAMES
            </button>

        </div>

       `;

    completeGame("balloon");

    document
        .getElementById("balloonDone")
        .addEventListener("click", function () {

            gameModal.classList.remove("active");

        });

}


/* CLOSE GAME */

closeGame.addEventListener("click", function () {

    clearInterval(balloonInterval);

    gameModal.classList.remove("active");

});


/* CLICK OUTSIDE */

gameModal.addEventListener("click", function (event) {

    if (event.target === gameModal) {

        clearInterval(balloonInterval);

        gameModal.classList.remove("active");

    }

});
/* =========================================================
   GAME 02 — FIND THE HEARTS
========================================================= */

const heartsGame = document.getElementById("heartsGame");

let heartsFound = 0;


/* OPEN HEART GAME */

heartsGame.addEventListener("click", function () {

    gameModal.classList.add("active");

    startHeartsGame();

});


/* START GAME */

function startHeartsGame() {

    heartsFound = 0;

    gameScreen.innerHTML = `

        <div class="hearts-header">

            <div>
                <span class="hearts-game-name">
                    💗 Find The Hearts
                </span>

                <span class="hearts-instruction">
                    five tiny hearts are hiding...
                </span>
            </div>

            <strong id="heartsScore">
                0 / 5
            </strong>

        </div>


        <div
            class="heart-hunt-area"
            id="heartHuntArea"
        >

            <div class="hunt-note">
                ♡ look closely ♡
            </div>

            <div class="hunt-doodle doodle-one">
                ✦
            </div>

            <div class="hunt-doodle doodle-two">
                ✧
            </div>

            <div class="hunt-doodle doodle-three">
                ♡
            </div>

        </div>

    `;


    createHiddenHearts();

}


/* CREATE 5 HIDDEN HEARTS */

function createHiddenHearts() {

    const area =
        document.getElementById("heartHuntArea");

    const positions = [

        { left: 16, top: 24 },
        { left: 72, top: 19 },
        { left: 43, top: 44 },
        { left: 23, top: 70 },
        { left: 78, top: 72 }

    ];


    positions.forEach(function(position, index) {

        const heart =
            document.createElement("button");

        heart.className =
            "hidden-heart";

        heart.innerHTML =
            "♥";

        heart.style.left =
            position.left + "%";

        heart.style.top =
            position.top + "%";

        heart.dataset.heart =
            index;


        heart.addEventListener("click", function() {

            findHeart(heart);

        });


        area.appendChild(heart);

    });

}


/* FIND HEART */

function findHeart(heart) {

    if (heart.classList.contains("found")) {
        return;
    }

    heart.classList.add("found");

    heartsFound++;


    const score =
        document.getElementById("heartsScore");

    if (score) {

        score.textContent =
            heartsFound + " / 5";

    }


    createHeartSparkle(heart);


    if (heartsFound === 5) {

        setTimeout(function() {

            finishHeartsGame();

        }, 650);

    }

}


/* SPARKLES */

function createHeartSparkle(heart) {

    const rect =
        heart.getBoundingClientRect();


    for (let i = 0; i < 8; i++) {

        const sparkle =
            document.createElement("span");

        sparkle.className =
            "heart-sparkle";

        sparkle.textContent =
            ["✦", "♡", "✧"][Math.floor(Math.random() * 3)];


        sparkle.style.left =
            rect.left + rect.width / 2 + "px";

        sparkle.style.top =
            rect.top + rect.height / 2 + "px";


        sparkle.style.setProperty(
            "--heart-x",
            (Math.random() * 90 - 45) + "px"
        );

        sparkle.style.setProperty(
            "--heart-y",
            (Math.random() * 90 - 45) + "px"
        );


        document.body.appendChild(sparkle);


        setTimeout(function() {

            sparkle.remove();

        }, 650);

    }

}


/* GAME COMPLETE */

function finishHeartsGame() {

    gameScreen.innerHTML = `

        <div class="game-result hearts-result">

            <div class="result-icon">
                💗✨
            </div>

            <h2>
                You found them!
            </h2>

            <p>
                All five little hearts were hiding ♡
            </p>

            <div class="result-small">
                GAME 02 COMPLETE
            </div>

            <button
                class="game-result-button"
                id="heartsDone"
            >
                BACK TO GAMES
            </button>

        </div>

    `;

    completeGame("hearts");


    document
        .getElementById("heartsDone")
        .addEventListener("click", function() {

            gameModal.classList.remove("active");

        });

}
/* =========================================================
   GAME 03 — MYSTERY GIFT
========================================================= */

const giftGame = document.getElementById("giftGame");

let selectedGift = null;


/* OPEN MYSTERY GIFT */

giftGame.addEventListener("click", function () {

    gameModal.classList.add("active");

    startGiftGame();

});


/* START GAME */

function startGiftGame() {

    selectedGift = null;

    gameScreen.innerHTML = `

        <div class="gift-header">

            <span class="gift-game-name">
                🎁 Mystery Gift
            </span>

            <span class="gift-small-text">
                choose one...
            </span>

        </div>


        <div class="gift-game-area">

            <p class="gift-question">
                Which one is hiding<br>
                your little surprise? ♡
            </p>


            <div class="gift-options">

                <button
                    class="mystery-gift"
                    data-gift="1"
                >
                    <span class="gift-box">🎁</span>
                    <span class="gift-number">01</span>
                </button>


                <button
                    class="mystery-gift"
                    data-gift="2"
                >
                    <span class="gift-box">🎁</span>
                    <span class="gift-number">02</span>
                </button>


                <button
                    class="mystery-gift"
                    data-gift="3"
                >
                    <span class="gift-box">🎁</span>
                    <span class="gift-number">03</span>
                </button>

            </div>


            <p class="gift-hint">
                tap one gift to open it ✨
            </p>

        </div>

    `;


    document
        .querySelectorAll(".mystery-gift")
        .forEach(function(gift) {

            gift.addEventListener("click", function() {

                openMysteryGift(gift);

            });

        });

}


/* OPEN SELECTED GIFT */

function openMysteryGift(gift) {

    if (selectedGift !== null) {
        return;
    }

    selectedGift =
        gift.getAttribute("data-gift");


    gift.classList.add("shaking");


    setTimeout(function() {

        gift.classList.remove("shaking");

        gift.classList.add("opened");

        showGiftSurprise();

    }, 900);

}


/* SURPRISE */

function showGiftSurprise() {

    const surprises = {

        1: {
            icon: "🌷",
            title: "A Little Happiness",
            text: "I hope this year gives you lots of tiny moments that make you genuinely happy."
        },

        2: {
            icon: "💗",
            title: "A Little Smile",
            text: "Congratulations, you found a little smile hidden inside this gift. Keep it with you."
        },

        3: {
            icon: "✨",
            title: "One More Surprise",
            text: "Maybe the real surprise isn't inside the gift... maybe it's everything waiting for you next."
        }

    };


    const surprise =
        surprises[selectedGift];


    gameScreen.innerHTML = `

        <div class="gift-result">

            <div class="gift-result-icon">
                ${surprise.icon}
            </div>

            <p class="gift-result-label">
                YOU FOUND IT ✨
            </p>

            <h2>
                ${surprise.title}
            </h2>

            <p class="gift-result-text">
                ${surprise.text}
            </p>

            <div class="gift-confetti">
                ✦　♡　✦　♡　✦
            </div>

            <div class="result-small">
                GAME 03 COMPLETE
            </div>

            <button
                class="game-result-button"
                id="giftDone"
            >
                BACK TO GAMES
            </button>

        </div>

    `;


    createGiftConfetti();

    completeGame("gift");


    document
        .getElementById("giftDone")
        .addEventListener("click", function() {

            gameModal.classList.remove("active");

        });

}


/* CONFETTI */

function createGiftConfetti() {

    const symbols =
        ["✦", "♡", "✧", "•"];


    for (let i = 0; i < 22; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "gift-confetti-particle";

        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() * symbols.length
                )
            ];


        particle.style.left =
            Math.random() * 100 + "vw";

        particle.style.top =
            "-20px";


        particle.style.animationDelay =
            Math.random() * .7 + "s";


        document.body.appendChild(particle);


        setTimeout(function() {

            particle.remove();

        }, 1800);

    }

}
const completedGames = new Set();

const gamesComplete =
    document.getElementById("gamesComplete");

function completeGame(gameName) {

    completedGames.add(gameName);

    if (completedGames.size === 3) {

        gamesComplete.style.display = "block";

        gamesComplete.classList.add("show");

    }

}
/* =========================================================
   PAGE 6 → PAGE 7
========================================================= */

const continueFromGames =
    document.getElementById("continueFromGames");

const page6Element =
    document.getElementById("page6");

const page7Element =
    document.getElementById("page7");


if (continueFromGames) {

    continueFromGames.addEventListener(
        "click",
        function () {

            if (page6Element) {
                page6Element.style.display = "none";
            }

            if (page7Element) {
                page7Element.style.display = "flex";
            }

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}
/* =========================================================
   PAGE 7 — CAKE CUTTING
========================================================= */


const cakeCandles =
    document.querySelectorAll(
        ".graphic-candle"
    );


const cutCakeButton =
    document.getElementById(
        "cutCakeButton"
    );


const cakeInstruction =
    document.getElementById(
        "cakeInstruction"
    );


const cakeMessage =
    document.getElementById(
        "cakeMessage"
    );


const graphicCake =
    document.getElementById(
        "graphicCake"
    );


const cakeNextButton =
    document.getElementById(
        "cakeNextButton"
    );


let blownCandles = 0;


/* =========================================================
   CANDLES
========================================================= */

cakeCandles.forEach(function(candle) {

    candle.addEventListener(
        "click",
        function() {


            /* Already blown */

            if (
                candle.classList.contains(
                    "blown"
                )
            ) {
                return;
            }


            /* Blow candle */

            candle.classList.add(
                "blown"
            );


            blownCandles++;


            /* Update instruction */

            if (
                blownCandles === 1
            ) {

                cakeInstruction.textContent =
                    "One candle down... keep going ♡";

            }


            if (
                blownCandles === 2
            ) {

                cakeInstruction.textContent =
                    "Two more? Almost there ✨";

            }


            /* All candles */

            if (
                blownCandles ===
                cakeCandles.length
            ) {

                cakeInstruction.textContent =
                    "Wish made! Now cut the cake 🎂";


                cutCakeButton.disabled =
                    false;

            }

        }
    );

});


/* =========================================================
   CUT CAKE
========================================================= */

cutCakeButton.addEventListener(
    "click",
    function() {


        if (
            blownCandles <
            cakeCandles.length
        ) {

            return;

        }


        /* Disable button */

        cutCakeButton.disabled =
            true;


        cutCakeButton.style.display =
            "none";


        /* Update text */

        cakeInstruction.textContent =
            "Happy Birthday! 🎉";


        /* Cake animation */

        graphicCake.classList.add(
            "cake-cut"
        );


        /* Confetti */

        createCakeConfetti();


        /* Show final message */

        setTimeout(
            function() {

                cakeMessage.classList.add(
                    "show"
                );

            },
            700
        );

    }
);


/* =========================================================
   CONFETTI
========================================================= */

function createCakeConfetti() {


    const symbols = [

        "✦",
        "♡",
        "✧",
        "🎀",
        "•"

    ];


    for (
        let i = 0;
        i < 60;
        i++
    ) {


        const particle =
            document.createElement(
                "span"
            );


        particle.className =
            "cake-confetti";


        particle.textContent =
            symbols[
                Math.floor(
                    Math.random() *
                    symbols.length
                )
            ];


        particle.style.left =
            Math.random() *
            100 +
            "vw";


        particle.style.fontSize =
            (
                12 +
                Math.random() * 16
            ) +
            "px";


        particle.style.color =
            [
                "#d8899d",
                "#e5b4c0",
                "#b8c7ae",
                "#d8c99f"
            ][
                Math.floor(
                    Math.random() * 4
                )
            ];


        particle.style.animationDelay =
            Math.random() *
            .7 +
            "s";


        document.body.appendChild(
            particle
        );


        setTimeout(
            function() {

                particle.remove();

            },
            3200
        );

    }

}


/* =========================================================
   FINISH BUTTON
========================================================= */

/* =========================
   PAGE 7 → PAGE 8
========================= */

document.getElementById("cakeNextButton").addEventListener("click", function () {

    document.getElementById("page7").style.display = "none";

    document.getElementById("page8").style.display = "flex";

    window.scrollTo(0, 0);

});