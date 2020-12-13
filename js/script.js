$("document").ready(() => {
    $(".flex-box-result").hide();
})
$(".flex-box-container-1 .btn-primary").click(() => {
    let birthyear = prompt("Please enter your birth year");
    let ageInDays = (2020 - birthyear) * 365;
    $(".flex-box-result").show().html(`<h1>hey!you have already lived ${ageInDays} Day's </h1>`);
})
$(".btn-danger").click(() => {
    $(".flex-box-result").hide();
})
var img_gen = () => {
    let image = document.createElement("img");
    let div = $(".flex-box-container-2");
    image.src = "https://source.unsplash.com/random/150x100";
    div.append(image);
};
$("#gen_btn").click(img_gen);

let rpsGame = (yourchoice) => {
    let humanChoice = yourchoice.id;
    let botChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    result = decideWinner(humanChoice, botChoice);
    rpsFrontend(humanChoice, botChoice, finalMessage(result))
}

let decideWinner = (hc, bc) => {
    let rpsDatabase = {
        'rock': { 'scissors': 1, 'rock': 0.5, 'paper': 0 },
        'paper': { 'rock': 1, 'paper': 0.5, 'scissors': 0 },
        'scissors': { 'paper': 1, 'scissors': 0.5, 'rock': 0 },
    }
    let yourScore = rpsDatabase[hc][bc];
    let computerScore = rpsDatabase[bc][hc];
    return [yourScore, computerScore];
}

let finalMessage = ([yourScore, computerScore]) => {
    if (yourScore === computerScore) {
        return { 'message': 'You Tied', 'color': 'yellow' };
    }
    else if (yourScore < computerScore) {
        return { 'message': 'You Lose', 'color': 'red' };
    }
    else {
        return { 'message': 'You Win', 'color': 'green' };
    }
}

let rpsFrontend = (humanImageChoice, botImageChoice, finalMessage) => {
    let imageDatabase = {
        'rock': document.getElementById("rock").src,
        'paper': document.getElementById("paper").src,
        'scissors': document.getElementById("scissors").src,
    }
    $("#rock").hide();
    $("#paper").hide();
    $("#scissors").hide();
    let humanDiv = document.createElement('div');
    let messageDiv = document.createElement('div');
    let botDiv = document.createElement('div');

    humanDiv.innerHTML = "<img src='" + imageDatabase[humanImageChoice] + "'style='box-shadow: 0px 10px 50px rgba(0, 89, 255, 1)'>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size:60px; padding: 30px; '>" + finalMessage['message'] + "</h1>"
    botDiv.innerHTML = "<img src='" + imageDatabase[botImageChoice] + "'style='box-shadow: 0px 10px 50px rgba(255, 0, 34, 0.918)'>";
    $(".flex-box-rps").append(humanDiv);
    $(".flex-box-rps").append(messageDiv);
    $(".flex-box-rps").append(botDiv);
}
$(".btn-info").click(() => {
    $(".flex-box-rps div").hide();
    $("#rock").show();
    $("#paper").show();
    $("#scissors").show();
})

let all_buttons = document.querySelectorAll(".flex-box-pick-color button")
let copyAllButton = [];
for (let i = 0; i < all_buttons.length; i++) {
    copyAllButton.push(all_buttons[i].classList[1]);
}


function buttonColorChange(yourchoice) {
    switch (yourchoice.value) {
        case 'red':
            buttonRed();
            break;
        case 'green':
            buttonGreen();
            break;
        case 'reset':
            buttonReset();
            break;
        default: randomColors();
    }
}

function buttonRed() {
    all_buttons.forEach(e => {
        e.classList.remove(e.classList[1]);
        e.classList.add('btn-danger');
    });
}
function buttonGreen() {
    all_buttons.forEach(e => {
        e.classList.remove(e.classList[1]);
        e.classList.add('btn-success');
    });
}
function buttonReset() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButton[i]);
    }
}

function randomColors() {
    let choices = [...copyAllButton]
    randomChoice = choices.sort(() => .5 - Math.random());
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(randomChoice[i]);
    }
}

let blackjackGame = {
    'you': { 'scorespan': '#your-blackjack-result', 'div': '#your-box', 'score': 0 },
    'dealer': { 'scorespan': '#dealer-blackjack-result', 'div': '#dealer-box', 'score': 0 },
    'cards': ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'],
    'cardsMap': { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10, 'A': [1, 11] },
    'wins': 0,
    'losses': 0,
    'draws': 0,
    'isStand': false,
    'turnsOver': false,
}
const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];
const hitSound = new Audio("../public/sounds/swish.m4a");
const winSound = new Audio("../public/sounds/cash.mp3");
const lostSound = new Audio("../public/sounds/aww.mp3");


let randCard = () => {
    return blackjackGame.cards[(Math.floor(Math.random() * 13))]
}
let showCard = (activePlayer, card) => {
    if (activePlayer.score <= 21) {
        let cardImage = document.createElement("img");
        cardImage.src = `/public/images/${card}.png`;
        hitSound.play();
        $(activePlayer.div).append(cardImage);
    }
}
let updateScore = (activePlayer, card) => {
    if (card == 'A') {
        if (activePlayer.score < 11) {
            activePlayer.score += blackjackGame.cardsMap[card][1];
        } else {
            activePlayer.score += blackjackGame.cardsMap[card][0];
        }
    } else {
        activePlayer.score += blackjackGame.cardsMap[card];
    }
}
let showScore = (activePlayer) => {
    if (activePlayer.score > 21) {
        $(activePlayer.scorespan).text("BUST!").css("color", "red");
    } else {
        $(activePlayer.scorespan).text(activePlayer.score);
    }
}
let sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function dealerLogic() {
    blackjackGame.isStand = true;
    while (DEALER.score < 16 && blackjackGame.isStand === true) {
        let card = randCard();
        showCard(DEALER, card);
        updateScore(DEALER, card);
        showScore(DEALER);
        await sleep(1000);
    }
    blackjackGame.turnsOver = true;
    let winner = computeWiner();
    showResult(winner);
}

let computeWiner = () => {
    let winner;
    if (YOU.score <= 21) {
        if ((YOU.score > DEALER.score) || (DEALER.score > 21)) {
            blackjackGame.wins++;
            winner = YOU;
        } else if (YOU.score < DEALER.score) {
            blackjackGame.losses++;
            winner = DEALER;
        } else if (YOU.score === DEALER.score) {
            blackjackGame.draws++;
            console.log("You Drew");
        }
    } else if (YOU.score > 21 && DEALER.score <= 21) {
        blackjackGame.losses++;
        winner = DEALER;
    } else if (YOU.score > 21 && DEALER.score > 21) {
        blackjackGame.draws++;
        console.log("You Drew");
    }
    return winner;
}

let showResult = (winner) => {
    let message, messageColor;
    if (winner === YOU) {
        message = "You Won!";
        messageColor = "green";
        winSound.play();
    } else if (winner === DEALER) {
        message = "You Lost!";
        messageColor = "red";
        lostSound.play();
    } else {
        message = "You Draw!";
        messageColor = "yellow";
    }
    $("#blackjack-result").text(message).css('color', messageColor);
    $("#wins").text(blackjackGame.wins);
    $("#looses").text(blackjackGame.losses);
    $("#draws").text(blackjackGame.draws);

}

$("#blackjack-hit-button").click(() => {
    if (!blackjackGame.isStand) {
        let randomCard = randCard();
        showCard(YOU, randomCard);
        updateScore(YOU, randomCard);
        showScore(YOU);
    }
})
$("#blackjack-stand-button").click(() => {
    if(!blackjackGame.turnsOver){
        dealerLogic();
    }
})
$("#blackjack-deal-button").click(() => {
    if (blackjackGame.turnsOver) {
        blackjackGame.isStand = false;
        blackjackGame.turnsOver = false;
        $(".flex-blackjack-row-1 img").remove();
        $("#blackjack-result").text("Let's Play").css('color', '#000');
        $("#your-blackjack-result").text(0).css("color", '#fff');
        $("#dealer-blackjack-result").text(0).css("color", '#fff');
        YOU.score = 0;
        DEALER.score = 0;
    }
})