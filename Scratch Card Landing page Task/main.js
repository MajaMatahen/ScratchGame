$(function() {
    $(document).ready(function() {
        $("#exampleModal").modal("show");
    });

    let numbers = $(".numbers");
    // let isScratch = 0; da proveruva dali card e scratch
    let win = [];
    let winLenght = 5;
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
        for (let i = 0; i < winLenght; i++) {
            let randomWinNum = randomNum();
            winNumbersArr.push(randomWinNum);
            $(".winWin").append(`<span class="winNumber">${randomWinNum}</span>`);
        }
    }

    winNumbersFunc();
    $(".scratchBtn").on("click", startGame);
    $(".card").wScratchPad({
        fg: `./Links/Vector-Smart-Object_3.svg`,
        cursor: "pointer",
    });

    let clickBtn = $(".card").wScratchPad();
    clickBtn.on("mousedown", function() {
        console.log($(this).index());

        console.log("maja");
    });

    function modalCongrats() {
        $(".container-fluid").append(`<div id="myModal" class="modalCongrats">
        <!-- Modal content -->
        <div class="modalCongrats-content">
          <span class="close">&times;</span>
          <p class="titleCongrats">Congrats!!! You WIN the Game.</p>
        </div>
      
      </div>`);

        $(".close").on("click", function() {
            $(".modalCongrats").hide();
        });
    }

    function startGame() {
        $(".card").wScratchPad("reset");
        console.log("start button clicked startGame");
        if (attemptCount == 1) {
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
            if (!includesNum) {
                modalCongrats();
            } else {
                modalCongrats();
            }
            $(".winWin").show();
            $(".counter").text("No attempts left");
        } else {
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].innerText = randomNum();
            }
            let includesNum = winNumbersArr.every((item) =>
                thirdAttemptArr.includes(item)
            );
            if (!includesNum) {
                modalCongrats();
                $(".titleCongrats").text("You are so close.Play again");
            } else {
                modalCongrats();
            }

            attemptCount--;
            $(".counter").text(attemptCount);
        }
    }
});