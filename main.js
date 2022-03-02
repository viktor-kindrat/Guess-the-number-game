let gamemodes = [{
    name: 'easy',
    bgColor: '#E7FBBE',
    min: 0,
    max: 100,
    hints: true,
    time: 10
}, {
    name: 'normal',
    bgColor: '#FFFDDE',
    min: 0,
    max: 100,
    hints: false,
    time: 8
}, {
    name: 'hard',
    bgColor: '#C3C1D9',
    min: 0,
    max: 1000,
    hints: true,
    time: 6
}, {
    name: 'insane',
    bgColor: '#FFCBCB',
    min: 0,
    max: 10000,
    hints: false,
    time: 4
}, ]

let x;

let generatedNum = 0;
let score = 0;
let tryCount = 0;

$("#menu__play-btn").click(() => {
    setTimeout(() => {
        $('#select-difficulty').css({
            'transition': '0.3s',
            'display': 'flex',
            'animation': 'open 1 0.6s linear'
        })
        setTimeout(() => {
            $('.select-difficulty__close-btn').css('display', 'block');
        }, 610);
    }, 610);
})
$('#select-difficulty__close-btn').click(() => {
    $('#select-difficulty').css('animation', 'close 0.6s 1 linear')
    setTimeout(() => {
        $('#select-difficulty').css({
            'transition': '0.3s',
            'display': 'none'
        })
        $('.select-difficulty__close-btn').css('display', 'none');
    }, 550);
})

let searchNeadedGM = (neededGM) => {
    let index = -1;
    for (let i = 0; i != gamemodes.length; i++) {
        if (neededGM === gamemodes[i].name) {
            index = i;
        }
    }
    if (index === -1) {
        return 'undefined'
    } else {
        return index
    }
}

let generateTheNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
}
let y;
let setTimer = (time) => {
    let min = 0;
    min = time
    let sec = 0;
    x = setInterval(() => {
        sec--;
        if (min === 0 && sec === 0) {
            alert("Time Over");
            clearInterval(x)
        } else if (sec <= 0) {
            sec = 60;
            min--
        } else if (min < 10) {
            if (sec < 10) {
                $('.playground__timer').text('0' + min + ':' + '0' + sec);
            } else {
                $('.playground__timer').text('0' + min + ':' + sec);
            }
        } else {
            if (sec < 10) {
                $('.playground__timer').text(min + ':' + '0' + sec);
            } else {
                $('.playground__timer').text(min + ':' + sec);
            }
        }
    }, 1000);
    let clicks = 0;
    $('.card__btn_pause').click(function () {
        if (clicks === 0) {
            clicks = 1
            clearInterval(x);
            y = setInterval(() => {
                $('.playground__guess-word').val('')
            }, 100);
            $('.pause-play__img').attr('src', './image/buttons/play.svg')
        } else {
            $('.pause-play__img').attr('src', './image/buttons/pause.svg')
            clearInterval(y);
            clicks = 0
            x = setInterval(() => {
                sec--;
                if (min === 0 && sec === 0) {
                    alert("Time Over");
                    clearInterval(x)
                } else if (sec <= 0) {
                    sec = 60;
                    min--
                } else if (min < 10) {
                    if (sec < 10) {
                        $('.playground__timer').text('0' + min + ':' + '0' + sec);
                    } else {
                        $('.playground__timer').text('0' + min + ':' + sec);
                    }
                } else {
                    if (sec < 10) {
                        $('.playground__timer').text(min + ':' + '0' + sec);
                    } else {
                        $('.playground__timer').text(min + ':' + sec);
                    }
                }
            }, 1000);
        }
    })
}

let stratGame = (bgColor, hints, time) => {
    $('#wrap').css({
        background: 'url("./image/background.png") ' + bgColor + ' center center',
        backgroundSize: 'cover'
    })
    if (hints === false) {
        $('#hints').css('filter', 'grayscale(0.5)');
        $('#hints').css('justifyContent', 'center');
        $('#hints').html('<h3 class="card__headline-warning ">Hints in this mode are unavialable</h3>')
    }
    setTimer(time);
    $('.playground').css('display', 'flex');
    $('.main-menu').css('display', 'none');
}

let checkIfWin = (num) => {
    if ($('#guessedNum').val() == num) {
        return true
    } else {
        return false
    }
}

let gmodeindex;
$('.select-difficulty__card').click(function () {
    let getId = $(this).attr('id');
    switch (getId) {
        case 'difficulty__easy':
            gmodeindex = searchNeadedGM('easy');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            break;
        case 'difficulty__normal':
            gmodeindex = searchNeadedGM('normal');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            break;
        case 'difficulty__hard ':
            gmodeindex = searchNeadedGM('hard');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            break;
        case 'difficulty__ultrahard ':
            gmodeindex = searchNeadedGM('insane');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            break;
    }
})

let getHints = (checkednum) => {
    if (gmodeindex === 0 || gmodeindex === 2) {
        if (checkednum > generatedNum) {
            return 'The number I thought is smaller'
        } else if (checkednum < generatedNum) {
            return 'The number I thought is bigger'
        }
    }
}

function disableAnim() {
    setTimeout(() => {
        $('.playground__alerts').css({
            animation: 'none',
            display: 'none',
            color: '#333333'
        })
    }, 1500);
}

$('.playground__guess-btn').click(function () {
    if (checkIfWin(generatedNum)) {
        score += 100 - tryCount * 2;
        if (tryCount === 0) {
            $('.playground__alerts').css({
                animation: 'up 1s 1 linear',
                display: 'flex',
                color: '#929D7B'
            })
            $('.playground__alerts').html('Don`t use cheats)');
            disableAnim();
        } else if (tryCount >= 1 && tryCount <= 5) {
            $('.playground__alerts').css({
                animation: 'up 1.1s 1 linear',
                display: 'flex',
                color: '#A4C958'
            })
            $('.playground__alerts').html('Well done!');
            disableAnim();
        } else if (tryCount >= 6 && tryCount <= 15) {
            $('.playground__alerts').css({
                animation: 'up 1.2s 1 linear',
                display: 'flex',
                color: '#EBE368'
            })
            $('.playground__alerts').html('Good!');
            disableAnim();
        } else if (tryCount >= 16 && tryCount <= 25) {
            $('.playground__alerts').css({
                animation: 'up 0.9s 1 linear',
                display: 'flex',
                color: '#EBAF68'
            })
            $('.playground__alerts').html('So... Not bad!');
            disableAnim();
        } else if (tryCount >= 26 && tryCount <= 50) {
            $('.playground__alerts').css({
                animation: 'up 0.8s 1 linear',
                display: 'flex',
                color: '#EB6868'
            })
            $('.playground__alerts').html('MhM&...');
            disableAnim();
        } else if (tryCount >= 51) {
            $('.playground__alerts').css({
                animation: 'up 1.3s 1 linear',
                display: 'flex',
                color: '#F61E1E'
            })
            $('.playground__alerts').html('You are in minus!');
            disableAnim();
        }
        $('#scoreval').html(score + ' points');
        $('.card.card_gray').html('<h3 class="win-num">' + generatedNum + '</h3>');
        tryCount = 0;
        setTimeout(() => {
            $('.card.card_gray').html('<img src=" ./image/question.svg " alt=" ? " class=" card__question-img ">');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
        }, 2000);
        $('#guessedNum').val('')
    } else {
        tryCount++;
        if (tryCount > 3) {
            $('.card__hints').css('overflowY', 'scroll');
        }
        $('.card__hints-item.card__text').attr('class', 'card__hints-item card__text');
        $('.card__hints').append('<li class="card__hints-item card__text card__hints-item_actualy">' + getHints($('#guessedNum').val()) + '</li>');
        $('#guessedNum').val('')
    }
})

$('#goHome').click(() => {
    generatedNum = 0;
    score = 0;
    tryCount = 0;
    clearInterval(y);
    $('.pause-play__img').attr('src', './image/buttons/pause.svg');

    $('#scoreval').html('0 points')
    $('#hints').html('<h3 class="card__headline">Hints:</h3><ul class="card__hints"></ul>');
    $('#playground__timer').html('00:00');

    clearInterval(x);
    $('#wrap').css({
        background: 'url("./image/background.png") #E7FBBE center center',
        backgroundSize: 'cover'
    })
    $('.playground').css('display', 'none');
    $('.main-menu').css('display', 'flex');

    $('#select-difficulty').css('animation', 'none')
    $('#select-difficulty').css({
        'transition': '0.3s',
        'display': 'none'
    })
    $('.select-difficulty__close-btn').css('display', 'none');
})

$('.numbers').click(function () {
    if ($(this).val() === '<') {
        $('#guessedNum').val($('#guessedNum').val().slice(0, $('#guessedNum').val().length - 1))
    } else {
        $('#guessedNum').val($('#guessedNum').val() + $(this).val())
    }
})