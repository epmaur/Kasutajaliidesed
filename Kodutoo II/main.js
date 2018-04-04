const TIMERDEFAULT = 10;

let displayedTimer = TIMERDEFAULT;
// let displayedTimer = TIMERDEFAULT;
let timer = TIMERDEFAULT;
let timerInterval;
let isTimerRunning = false;
let displayedTimerInterval;
const papers = ['html.png', 'pdf.png'];
const distractions = ['9gag.png', 'messenger.png', 'yt.png'];
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
          if (guess === correct) {
            score++;
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
  if (isBonus) {
    newImg();
  }
}

function newImg() {
  if (Math.random() > 0.2) {
    newPaper(papers[Math.floor(Math.random() * papers.length)]);
  } else {
    newPaper(distractions[Math.floor(Math.random() * distractions.length)]);
  }
}

function newPaper(img) {
  setTimeout(function () {
    $('.paper').remove();
    $('#boss-img').removeClass('boss-show');
    if (isTimerRunning) {
      if (img === 'html.png') {
        correct = 'left-pile';
      } else if (img === 'pdf.png') {
        correct = 'right-pile';
      } else {
        $('#boss-img').addClass('boss-show');
        correct = 'down-pile';
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
  displayedTimer = TIMERDEFAULT;
  let zero = '';
  if (displayedTimer < 10) {
    zero = '0'
  }
  $('#timer').html('00:' + zero + displayedTimer);
  displayedTimerInterval = setInterval(function() {
    if (displayedTimer === 1) {
      clearInterval(displayedTimerInterval);
      $('#timer').html('00:00');
      loseLife(true);
      $('#timer').css('visibility', 'hidden');
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

function newGame() {
  $('#boss-img').removeClass('boss-show');
  $('#myModal').modal('hide');
  $('#start-msg').css('opacity', '0');
  newImg();
  // startTimer();
  startPaperTimer();
  isTimerRunning = true;
  score = 0;
  $('#score').html(score);
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
    if ( $('#pending-tasks').children().length === 4) {
      $('#pending-tasks .text').css('color', 'red');
    }
  }
}

function removeQueueItem() {
  if ( $('#pending-tasks').children().length > 1) {
    $('#pending-tasks').children().last().remove();
  }
}
