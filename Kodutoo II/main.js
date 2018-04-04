const TIMERDEFAULT = 10;

let displayedTimer = TIMERDEFAULT;
// let displayedTimer = TIMERDEFAULT;
let timer = TIMERDEFAULT;
let timerInterval;
let isTimerRunning = false;
let displayedTimerInterval;
const papers = ['html.png', 'pdf.png'];
const distractions = ['9gag.jpg', 'messenger.jpg', 'yt.jpg'];
let correct = null;
let score = 0;
let game;

const self = this;
$(document).ready(function() {
  game = $('#game-wrapper');
  // self.startTimer();
  $('#start-msg').css('opacity', '1');

  $(document).on('keydown', function(evt) {
    // console.log(evt.which);
    if (evt.which === 13) { // enter key
      if (!isTimerRunning) {
        newGame();
      }
    } else if (evt.which === 27) { // escape key
      $('#myModal').modal('hide');
    } else {
      if (isTimerRunning && !$('.paper').hasClass('left-pile') && !$('.paper').hasClass('right-pile')) {
        let guess = null;
        if (evt.which === 37) { // left key
          $('.paper').addClass('left-pile');
          guess = 'left-pile';
        } else if (evt.which === 39) { // right key
          $('.paper').addClass('right-pile');
          guess = 'right-pile';
        } else if (evt.which === 40) {
          $('.paper').addClass('down-pile');
          guess = 'down-pile';
        } else {
          console.error('INVALID KEY!');
        }

        if (guess) {
          removeQueueItem();
						hideTimer();
          if (guess === correct) {
            score++;
						if (score % 5 === 0) {
								makeItRain();
								$('#payday').addClass('payday-show');
								setTimeout(function() {
										$('#payday').removeClass('payday-show');
								}, 2000);
						}
						newImg();
          } else {
            loseLife(false);
          }
        }
        $('#score').html(score);

      }
    }
  });
});

function loseLife(isBonus) {
  score--;
  const life = $('#lives-wrapper').children().last();
  $(life).addClass('life-lost');
  setTimeout(function() {
    $(life).remove();
  }, 1000);
  if ( $('.glyphicon-heart').length === 1 ) {
    gameOver();
  }
  //if (isBonus) {
    newImg();
  //}
}

function newImg() {
  if (Math.random() > 0.2) {
    newPaper(papers[Math.floor(Math.random() * papers.length)]);
  } else {
    newPaper(distractions[Math.floor(Math.random() * distractions.length)]);
  }
}

function newPaper(img) {
	$('.glyphicon-arrow-left').removeClass('blink-left');
	$('.glyphicon-arrow-right').removeClass('blink-right');
	$('.glyphicon-arrow-down').removeClass('blink-down');
  setTimeout(function () {
    $('.paper').remove();
    $('#boss-img').removeClass('boss-show');
    if (isTimerRunning) {
      if (img === 'html.png') {
				console.log('html');
        correct = 'left-pile';
				$('.glyphicon-arrow-left').addClass('blink-left');
      } else if (img === 'pdf.png') {
        correct = 'right-pile';
				console.log('pdf');
				$('.glyphicon-arrow-right').addClass('blink-right');
      } else {
        $('#boss-img').addClass('boss-show');
        correct = 'down-pile';
				$('.glyphicon-arrow-down').addClass('blink-down');
        startTimer();
      }
      $(game).append('<div class="paper">\n' +
          '          <img src="images/' + img + '">\n' +
          '        </div>');
    }
  }, 450);
}

function startTimer() {
  clearInterval(displayedTimerInterval);
  $('#timer').html('00:10');
  $('#timer').css('visibility', 'visible');
	$('#hurry').css('visibility', 'visible');
  displayedTimer = TIMERDEFAULT;
  let zero = '';
  if (displayedTimer < 10) {
    zero = '0'
  }
  $('#timer').html('00:' + zero + displayedTimer);
  displayedTimerInterval = setInterval(function() {
    if (displayedTimer === 1) {
      $('#timer').html('00:00');
      loseLife(true);
			removeQueueItem();
				hideTimer();
    } else {
      --displayedTimer;
      let zero = '';
      if (displayedTimer < 10) {
        zero = '0'
      }
      $('#timer').html('00:' + zero + displayedTimer);
    }
  }, 1000);
}

function hideTimer() {
		clearInterval(displayedTimerInterval);
		$('#timer').css('visibility', 'hidden');
			$('#hurry').css('visibility', 'hidden');
}

function newGame() {
		$('#lives-wrapper').html('<span class="life"><span class="glyphicon glyphicon-heart"></span></span><span class="life"><span class="glyphicon glyphicon-heart"></span></span><span class="life"><span class="glyphicon glyphicon-heart"></span></span>');
	$('#timer').css('visibility', 'hidden');
	$('#hurry').css('visibility', 'hidden');
  $('#boss-img').removeClass('boss-show');
  $('#myModal').modal('hide');
  $('#start-msg').css('opacity', '0');
	$('#pending-tasks').children().removeClass('ohnoes');
  newImg();
  // startTimer();
  startPaperTimer();
  isTimerRunning = true;
  score = 0;
  $('#score').html(score);
		removeQueueItem();
		removeQueueItem();
		removeQueueItem();
}

function gameOver() {
  $('.paper').remove();
  $('#start-msg').css('opacity', '1');
  isTimerRunning = false;
  clearInterval(displayedTimerInterval);
  clearInterval(timerInterval);
  $('#modal-score').html(score);
  $('#myModal').modal();
}

function startPaperTimer() {
  timerInterval = setInterval(function() {
    newQueueItem();
  }, 10000);
}

function newQueueItem() {
  if ( $('#pending-tasks').children().length >= 4 ) {
    loseLife(false);
  } else {
    $('#pending-tasks').append('<img src="images/paber.png">');
		$('#pending-tasks').children().removeClass('ohnoes');
    if ( $('#pending-tasks').children().length === 4) {
      $('#pending-tasks .text').css('color', 'red');
			$('#pending-tasks .text').css('font-weight', '500');
			$('#pending-tasks').children().slice(1).addClass('ohnoes');
    }
  }
}

function removeQueueItem() {
	$('#pending-tasks').children().removeClass('ohnoes');
	$('#pending-tasks .text').css('font-weight', '400');
	$('#pending-tasks .text').css('color', 'black');
  if ( $('#pending-tasks').children().length > 1) {
    $('#pending-tasks').children().last().remove();
  }
}

function makeItRain(){
			var maxBills = 30;

			for (var i = 0; i < maxBills; i++){

			var random = $(window).width();
			var randomPosition = Math.floor(random*Math.random());
			var randomTime = Math.random();
			var randomSpeed = (Math.random() + 2) ;

			var bills = $("<span class='billsBillsBills'>")
				.css({
					left : randomPosition,
					top: '-150px',
					"-webkit-animation-delay" : randomTime + "s",
					"-webkit-animation-duration" : randomSpeed + "s"
				});
					
				$(bills).prepend('<img src="images/bill.svg">');
					

				$('#container').append(bills);
		} 
}; 

