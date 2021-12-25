$(function() {
    $(document).ready(function() {
        $("#exampleModal").modal("show");
    });
    let numbers = $(".numbers");
    console.log(numbers);
    let isScratch = 0;
    let win = [];
    let winNumbersArr = [];
    let thirdAttemptArr = [];
    let attemptCount = 3;
    $(".startNow-btn").on("click", function() {
        $("#exampleModal").modal("remove");
    });
    $(document).on("hidden.bs.modal", ".modal", function() {
        $("#exampleModal").remove();
        $(".modal-dialog").remove();
    });
    $(".winWin").hide();

    function randomNum() {
        let random = Math.floor(Math.random() * 50);
        return random;
    }

    function winNumbersFunc() {
        for (let i = 0; i < 5; i++) {
            let randomWinNum = randomNum();
            winNumbersArr.push(randomWinNum);
            console.log(winNumbersArr);
            $(".winWin").append(`<span class="winNumber">${randomWinNum}</span>`);
        }
    }
    winNumbersFunc();
    $(".scratchBtn").on("click", startGame);
    $(".card").wScratchPad({
        size: 15,
        bg: `/Links/Vector-Smart-Object_4.svg`,
        fg: `./Links/Vector-Smart-Object_3.svg`,
        cursor: "pointer",
    });

    function startGame() {
        $(".card").wScratchPad("reset");
        console.log("start button clicked startGame");
        if (attemptCount == 1) {
            console.log(attemptCount);
            for (let i = 0; i < 4; i++) {
                win.push(randomNum());
                console.log(win);
            }
            let thirdAttemptArr = winNumbersArr.concat(win);
            console.log(thirdAttemptArr);
            for (let i = 0; i < thirdAttemptArr.length; i++) {
                numbers[i].innerText = thirdAttemptArr[i];
            }
            let includesNum = winNumbersArr.every((item) =>
                thirdAttemptArr.includes(item)
            );
            $(".winWin").show();
            $(".scratchBtn").disabled();
            console.log(includesNum);
            console.log("Congrats!");
        } else {
            console.log(attemptCount);
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].innerText = randomNum();
            }
            let includesNum = winNumbersArr.every((item) =>
                thirdAttemptArr.includes(item)
            );
            console.log("You are close to WIN");
            console.log(includesNum);
        }
        attemptCount--;
        $(".counter").text(attemptCount);
    }
});