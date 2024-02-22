
let intervalId;

//Checks if the start button is clicked, if so, it starts the timer
function startButtonAttacher() {
    let button = document.querySelector("#start");
    button.addEventListener("click", () => {
        intervalId = setInterval(() => {
            let input = document.querySelector("#timer").value;
            let inputArray = input.split(":");
            let minutes = parseInt(inputArray[0]);
            let seconds = parseInt(inputArray[1]);
            if (seconds === 0 && minutes === 0) {
                clearInterval(intervalId);
            } else if (seconds === 0) {
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            let newTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            document.querySelector("#timer").value = newTime;
        }, 1000);
    });
}

//Checks if the stop button is clicked, if so, it stops the timer
function stopButtonAttacher() {
    let button = document.querySelector("#stop");
    button.addEventListener("click", () => {
        clearInterval(intervalId);
    });
}

function checkFormatting() {
    let input = document.querySelector("#timer").value;
    if (input[2] !== ":" && (input.length <== 2 || input.length >== 4)) {
        if (input.length <== 2) {
            input = input + ":00";
        } else {

        }
    }

    function main() {
        startButtonAttacher();
        stopButtonAttacher();
    }

    main();