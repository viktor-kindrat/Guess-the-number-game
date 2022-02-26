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
    time: 10
}, {
    name: 'hard',
    bgColor: '#C3C1D9',
    min: 0,
    max: 1000,
    hints: true,
    time: 5
}, {
    name: 'insane',
    bgColor: '#FFCBCB',
    min: 0,
    max: 10000,
    hints: false,
    time: 3
}, ]

let generatedNum = 0;

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

let setTimer = (time) => {
    let min = 0;
    min = time
    let sec = 0;
    let x = setInterval(() => {
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
    let y;
    $('.card__btn_pause').click(function() {
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
        $('#hints').css('filter', 'grayscale(0.5)')
        $('#hints').html('h3 class="card__headline ">Hints in this mode are unavialable</h3>')
    }
    setTimer(time);
    $('.playground').css('display', 'flex');
    $('.main-menu').css('display', 'none');
}

let checkIfWin = (num) => {
    if ($('.playground__guess-word').text() == num) {
        return true
    } else {
        return false
    }
}

$('.select-difficulty__card').click(function() {
    console.log('done from any')
    let getId = $(this).attr('id');
    console.log(getId);
    let gmodeindex;
    switch (getId) {
        case 'difficulty__easy':
            gmodeindex = searchNeadedGM('easy');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            console.log('done from btn')
            break;
        case 'difficulty__normal':
            gmodeindex = searchNeadedGM('normal');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            console.log('done from btn')
            break;
        case 'difficulty__hard ':
            gmodeindex = searchNeadedGM('hard');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            console.log('done from btn')
            break;
        case 'difficulty__ultrahard ':
            gmodeindex = searchNeadedGM('insane');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
            console.log('done from btn')
            break;
    }
})