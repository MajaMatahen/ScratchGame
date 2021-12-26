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
        <div class="modalCongrats-content text-center w-75">
          <span class="close">&times;</span>
          <img src="./images/coin-animation.gif" alt="coin" class="coin" />

          <p class="popUp-title">Congrats!!! You WIN the Game.</p>
          <div class="containerForm mt-3">
    <p>Signup to collect your winnings</p>
     <form  class="was-validated">
      <div class="mb-3 mt-3">
        <label for="uname" class="form-label">Username:</label>
        <input type="text" class="form-control" id="uname" placeholder="Enter username" name="uname" required/>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
      </div>
      <div class="mb-3">
        <label for="pwd" class="form-label">Email:</label>
        <input type="email" class="form-control" id="pwd" placeholder="Enter your e-mail"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email" required/>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="checkbox" id="myCheck"  name="remember" required/>
        <label class="form-check-label" for="myCheck">I agree on therms .</label>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Check this checkbox to continue.</div>
      </div>
   <button class="gameBtn" id="btn" class="btn" type ="submit" >Play now </button>
    </form>
    <a href="https://vitamediagroup.com/">Therms and conditions</a>
  </div>
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
                $(".popUp-title").text("You are so close.Play again");
                $(".containerForm").hide()
            } else {
                modalCongrats();
            }

            attemptCount--;
            $(".counter").text(attemptCount);
        }
    }
});