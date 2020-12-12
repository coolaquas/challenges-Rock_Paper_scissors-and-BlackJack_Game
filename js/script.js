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
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copyAllButton[i]);
    }
}

function randomColors(){
    let choices = [...copyAllButton]
    randomChoice = choices.sort(() => .5 - Math.random());
    for(let i=0;i<all_buttons.length;i++){
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(randomChoice[i]);
    }
}