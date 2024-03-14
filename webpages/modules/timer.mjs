
let intervalId;

//Checks if the start button is clicked, if so, it starts the timer
export function startButtonAttacher() {
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
export function stopButtonAttacher() {
    let button = document.querySelector("#stop");
    button.addEventListener("click", () => {
        clearInterval(intervalId);
    });
}

export function timerBoxAttacher() {
    let box = document.querySelector("#timer");
    box.addEventListener("change", () => {
        checkFormatting();
    });

}

export function checkFormatting() {
    console.log("Checking formatting")
    let input = document.querySelector("#timer").value;
    if (input[2] !== ":" && (input.length <= 2 || input.length >= 4)) {
        console.log("Formatting")
        if (input.length <= 2) {
            input = input + ":00";
            console.log(input);
        } else {
            if (input.length > 4) {
                input = input.substring(input.length - 4);
            }
        }
        document.querySelector("#timer").value = input;
    }
}

export function main() {
    startButtonAttacher();
    stopButtonAttacher();
    timerBoxAttacher();
}

main();