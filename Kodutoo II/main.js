const TIMERDEFAULT = 10;

let timer = TIMERDEFAULT;
let isTimerRunning = false;
let timerInterval;
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
          newImg();
          if (guess === correct) {
            score++;
          } else {
            score--;
            const life = $('#lives-wrapper').children().last();
            $(life).addClass('life-lost');
            setTimeout(function() {
              $(life).remove();
            }, 1000);
            if ( $('.glyphicon-heart').length === 1 ) {
              gameOver();
            }
          }
        }
        $('#score').html(score);

      }
    }
  });
});

function newImg() {
  if (Math.round(Math.random()) === 0) {
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
      }
      $(game).append('<div class="paper">\n' +
          '          <img src="images/' + img + '">\n' +
          '        </div>');
    }
  }, 450);
}

function startTimer() {
  timer = TIMERDEFAULT;
  let zero = '';
  if (timer < 10) {
    zero = '0'
  }
  $('#timer').html('00:' + zero + timer);
  timerInterval = setInterval(function() {
    if (timer === 1) {
      $('#timer').html('00:00');
      gameOver();
    } else {
      --timer;
      let zero = '';
      if (timer < 10) {
        zero = '0'
      }
      $('#timer').html('00:' + zero + timer);
    }
  }, 1000);
}

function newGame() {
  $('#boss-img').removeClass('boss-show');
  $('#myModal').modal('hide');
  $('#start-msg').css('opacity', '0');
  newImg();
  startTimer();
  isTimerRunning = true;
  score = 0;
  $('#score').html(score);
}

function gameOver() {
  $('.paper').remove();
  $('#start-msg').css('opacity', '1');
  isTimerRunning = false;
  clearInterval(timerInterval);
  $('#modal-score').html(score);
  $('#myModal').modal();
}
