let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let count = 0;

boxes.forEach((box) => {
    box.addEventListener('click', () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let iswinner = CheckW();

        if (count === 9 && !iswinner) {
            gameDraw();
        }
    });
});

const patterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enabledbox();
    msgContainer.classList.add("hide");
};

const disabledbox = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
};

const enabledbox = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disabledbox();
};

const CheckW = () => {
    for (let pattern of patterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                return true;
            }
        }
    }
    return false;
};

const gameDraw = () => {
    msg.innerText = "Game was a Draw.";
    msgContainer.classList.remove("hide");
    disabledbox();
};

newBtn.addEventListener('click', resetGame);
reset.addEventListener('click', resetGame);
