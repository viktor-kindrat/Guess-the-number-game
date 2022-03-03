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
let lang = 'ua';

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
        if (lang === 'ua') {
            $('#hints').html('<h3 class="card__headline-warning ">Недоступно</h3>')
        } else if (lang === 'en') {
            $('#hints').html('<h3 class="card__headline-warning ">Unavialable</h3>')
        }
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

let getId;
let gmodeindex;
$('.select-difficulty__card').click(function () {
    getId = $(this).attr('id');
    $('#select-difficulty__close-btn').css('display', 'none')
    $('.select-difficulty').css('animation', 'close 0.6s linear 1');
    setTimeout(() => {
        $('.select-difficulty').css('display', 'none');
        $('.introduceing').css({
            'display': 'flex',
            'animation': 'open 1s 1 linear'
        })
        switch (getId) {
            case 'difficulty__easy':
                $('.diff__name').css('color', gamemodes[0].bgColor);
                if (lang === 'ua') {
                    $('.diff__name').html('Легко');
                    $('.description__item_min').html('Мінімальне значення: 1');
                    $('.description__item_max').html('Максимальне значення: 100');
                    $('.description__item_hints').html('Підказки: доступні');
                    $('.description__item_time').html('Час: 10 хв');
                } else if (lang === 'en') {
                    $('.diff__name').html('Easy');
                    $('.description__item_min').html('Minimum value: 1');
                    $('.description__item_max').html('Maximum value: 100');
                    $('.description__item_hints').html('Hints: avialable');
                    $('.description__item_time').html('Time: 10 min');
                }
                break;
            case 'difficulty__normal':
                $('.diff__name').css('color', gamemodes[1].bgColor);
                if (lang === 'ua') {
                    $('.diff__name').html('Нормально');
                    $('.description__item_min').html('Мінімальне значення: 1');
                    $('.description__item_max').html('Максимальне значення: 100');
                    $('.description__item_hints').html('Підказки: недоступні');
                    $('.description__item_time').html('Час: 8 хв');
                } else if (lang === 'en') {
                    $('.diff__name').html('Normal');
                    $('.description__item_min').html('Minimum value: 1');
                    $('.description__item_max').html('Maximum value: 100');
                    $('.description__item_hints').html('Hints: unavialable');
                    $('.description__item_time').html('Time: 8 min');
                }
                break;
            case 'difficulty__hard ':
                $('.diff__name').css('color', gamemodes[2].bgColor);
                if (lang === 'ua') {
                    $('.diff__name').html('Складно');
                    $('.description__item_min').html('Мінімальне значення: 1');
                    $('.description__item_max').html('Максимальне значення: 1000');
                    $('.description__item_hints').html('Підказки: доступні');
                    $('.description__item_time').html('Час: 6 хв');
                } else if (lang === 'en') {
                    $('.diff__name').html('Hard');
                    $('.description__item_min').html('Minimum value: 1');
                    $('.description__item_max').html('Maximum value: 1000');
                    $('.description__item_hints').html('Hints: avialable');
                    $('.description__item_time').html('Time: 6 min');
                }
                break;
            case 'difficulty__ultrahard ':
                $('.diff__name').css('color', gamemodes[3].bgColor);
                if (lang === 'ua') {
                    $('.diff__name').html('Неможливо');
                    $('.description__item_min').html('Мінімальне значення: 1');
                    $('.description__item_max').html('Максимальне значення: 10000');
                    $('.description__item_hints').html('Підказки: недоступні');
                    $('.description__item_time').html('Час: 4 хв');
                } else if (lang === 'en') {
                    $('.diff__name').html('Insane');
                    $('.description__item_min').html('Minimum value: 1');
                    $('.description__item_max').html('Maximum value: 10000');
                    $('.description__item_hints').html('Hints: unavialable');
                    $('.description__item_time').html('Time: 4 min');
                }
                break;
        }
    }, 599);
})

$('#play').click(function(){
    $('.introduceing').css('animation', 'close 0.6s linear 1');
    setTimeout(() => {
        $('.introduceing').css('display', 'none');
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
    }, 599);
})

let getHints = (checkednum) => {
    if (gmodeindex === 0 || gmodeindex === 2) {
        if (checkednum > generatedNum) {
            if (lang === 'ua') {
                return 'Число загадане мною менше'
            } else if (lang === 'en') {
                return 'The number I thought is less than your'
            }
        } else if (checkednum < generatedNum) {
            if (lang === 'ua') {
                return 'Число загадане мною більше'
            } else if (lang === 'en') {
                return 'The number I thought is more than your'
            }
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
            if (lang === 'ua') {
                $('.playground__alerts').html('Не використовуй чіти)');
            } else if (lang === 'en') {
                $('.playground__alerts').html("Don't use cheats)");
            }
            disableAnim();
        } else if (tryCount >= 1 && tryCount <= 5) {
            $('.playground__alerts').css({
                animation: 'up 1.1s 1 linear',
                display: 'flex',
                color: '#A4C958'
            })
            if (lang === 'ua') {
                $('.playground__alerts').html('Чудово!');
            } else if (lang === 'en') {
                $('.playground__alerts').html('Great!');
            }
            disableAnim();
        } else if (tryCount >= 6 && tryCount <= 15) {
            $('.playground__alerts').css({
                animation: 'up 1.2s 1 linear',
                display: 'flex',
                color: '#EBE368'
            });
            if (lang === 'ua') {
                $('.playground__alerts').html('Добре!');
            } else if (lang === 'en') {
                $('.playground__alerts').html('Good!');
            }
            disableAnim();
        } else if (tryCount >= 16 && tryCount <= 25) {
            $('.playground__alerts').css({
                animation: 'up 0.9s 1 linear',
                display: 'flex',
                color: '#EBAF68'
            });
            if (lang === 'ua') {
                $('.playground__alerts').html('хм... Не погано!');
            } else if (lang === 'en') {
                $('.playground__alerts').html('hmm... Not bad!');
            }
            disableAnim();
        } else if (tryCount >= 26 && tryCount <= 50) {
            $('.playground__alerts').css({
                animation: 'up 0.8s 1 linear',
                display: 'flex',
                color: '#EB6868'
            })
            if (lang === 'ua') {
                $('.playground__alerts').html('РмХ&...');
            } else if (lang === 'en') {
                $('.playground__alerts').html('zXc&...');
            }
            disableAnim();
        } else if (tryCount >= 51) {
            $('.playground__alerts').css({
                animation: 'up 1.3s 1 linear',
                display: 'flex',
                color: '#F61E1E'
            })
            if (lang === 'ua') {
                $('.playground__alerts').html('Ти у мінусі!');
            } else if (lang === 'en') {
                $('.playground__alerts').html('You are in minus!');
            }
            disableAnim();
        }
        if (lang === 'ua') {
            $('#scoreval').html(score + ' балів');
        } else if (lang === 'en') {
            $('#scoreval').html(score + ' points');
        }
        $('.card__hints').html('');
        $('.card.card_gray').html('<h3 class="win-num">' + generatedNum + '</h3>');
        tryCount = 0;
        setTimeout(() => {
            $('.card.card_gray').css('animation', 'drag 0.3s 3 linear');
            $('.card.card_gray').html('<img src=" ./image/question.svg " alt=" ? " class=" card__question-img ">');
            generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
            setTimeout(() => {
                $('.card.card_gray').css('animation', 'none');
            }, 1000);
        }, 2000);
        $('#guessedNum').val('')
    } else {
        tryCount++;
        if (tryCount > 2) {
            $('.card__hints').css('overflowY', 'scroll');
        }
        $('.card__hints-item.card__text').attr('class', 'card__hints-item card__text');
        $('.card__hints').append('<li class="card__hints-item card__text card__hints-item_actualy">' + getHints($('#guessedNum').val()) + '</li>');
        let block = document.getElementById('hintsBlock');
        block.scrollTop = block.scrollHeight;
        $('.playground__guess-word').val('')
    }
})

$('#goHome').click(() => {
    generatedNum = 0;
    score = 0;
    tryCount = 0;
    getId = '';
    clearInterval(y);
    $('.pause-play__img').attr('src', './image/buttons/pause.svg');
    $('.playground__guess-word').val('')

    if (lang === 'ua') {
        $('#scoreval').html('0 балів')
        $('#hints').html('<h3 class="card__headline">Підказки:</h3><ul class="card__hints"></ul>');
    } else if (lang === 'en') {
        $('#scoreval').html('0 points')
        $('#hints').html('<h3 class="card__headline">Hints:</h3><ul class="card__hints"></ul>');
    }
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

$('.langs').click(function () {
    if (lang === 'ua') {
        $('.menu__switcher').css('animation', 'langSwitch 1 0.6s cubic-bezier(.92,0,.69,.99)');
        setTimeout(() => {
            $('.menu__switcher').css({
                'animation': 'none',
                'left': '125px'
            });

            $('.menu-content__headline').html('Guess the<br>number');
            $('.menu-content__btn').html('Play');

            $('#text_easy').html('Easy');
            $('#text_normal').html('Normal');
            $('#text_hard').html('Hard');
            $('#text_insane').html('Insane');
            $('#play').html('Play');

            $('.playground__headline').html('Guess the number');
            $('#info_text').html('Information <br> panel');
            $('#text_record').html('Record');
            $('#text_hints').html('Hints: ');
            $('#text_soon').html('soon');
            $('#text_statistic').html('Score');
            $('#scoreval').html('0 points');
        }, 600);
        lang = 'en';
    } else if (lang === 'en') {
        $('.menu__switcher').css('animation', 'langSwitch-rev 1 0.6s cubic-bezier(.92,0,.69,.99)');
        setTimeout(() => {
            $('.menu__switcher').css({
                'animation': 'none',
                'left': '0px'
            });

            $('.menu-content__headline').html('Відгадай<br>число');
            $('.menu-content__btn').html('Грати');

            $('#text_easy').html('Легко');
            $('#text_normal').html('Нормально');
            $('#text_hard').html('Складно');
            $('#text_insane').html('Неможливо');
            $('#play').html('Грати');

            $('.playground__headline').html('Відгадай число');
            $('#info_text').html('Інформаційна <br> панель');
            $('#text_reocord').html('Рекорд');
            $('#text_hints').html('Підказки: ');
            $('#text_soon').html(' згодом');
            $('#text_statistic').html('Статистика:');
            $('#scoreval').html('0 балів');
        }, 600);
        lang = 'ua';
    }
})