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
let numCalc = 0;
let lang = 'ua';

$("#menu__play-btn").click(function () {
    setTimeout(() => {
        $('#select-difficulty').css({
            'transition': '0.3s',
            'display': 'flex',
            'animation': 'open 1 0.6s linear'
        })
        setTimeout(() => {
            $('.select-difficulty__close-btn').css('display', 'block');
        }, 500);
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

let starsSet = () => {
    if (score >= 1000) {
        $('.star1').css('background', 'transparent url("./image/stars/starFilled.svg") no-repeat no-repeat center center');
        $('.star2').css('background', 'transparent url("./image/stars/starFilled.svg") no-repeat no-repeat center center');
        $('.star3').css('background', 'transparent url("./image/stars/starFilled.svg") no-repeat no-repeat center center');
        $('.star').css('backgroudSize', 'contain')
    } else if (score >= 700) {
        $('.star1').css('background', 'transparent url("./image/stars/starFilled.svg") no-repeat no-repeat center center');
        $('.star2').css('background', 'transparent url("./image/stars/starFilled.svg") no-repeat no-repeat center center');
        $('.star3').css('background', 'transparent url("./image/stars/starEmpty.svg") no-repeat no-repeat center center');
        $('.star').css('backgroudSize', 'contain')
    } else if (score >= 300) {
        $('.star1').css('background', 'transparent url("./image/stars/starFilled.svg") no-repeat no-repeat center center');
        $('.star2').css('background', 'transparent url("./image/stars/starEmpty.svg") no-repeat no-repeat center center');
        $('.star3').css('background', 'transparent url("./image/stars/starEmpty.svg") no-repeat no-repeat center center');
        $('.star').css('backgroudSize', 'contain')
    } else {
        $('.star1').css('background', 'transparent url("./image/stars/starEmpty.svg") no-repeat no-repeat center center');
        $('.star2').css('background', 'transparent url("./image/stars/starEmpty.svg") no-repeat no-repeat center center');
        $('.star3').css('background', 'transparent url("./image/stars/starEmpty.svg") no-repeat no-repeat center center');
        $('.star').css('backgroudSize', 'contain')
    }
}

let y;
let min;
let sec;
let setTimer = (time) => {
    min = time;
    sec = 0
    x = setInterval(() => {
        sec--;
        if (min === 0 && sec === 0) {
            min = 0;
            sec = 0;
            $('.playground').css('filter', 'grayscale(0.3)')
            $('.playground__timer').text('00:00');
            $('.gameover').css({
                'display': 'flex',
                'animation': 'customShow 0.3s 1 linear'
            });
            starsSet();
            if (lang === 'ua') {
                $('#finalS').html(score + ' балів');
            } else if (lang === 'en') {
                $('#finalS').html(score + ' points');
            }
            $('#calcNums').html(numCalc);
            clearInterval(x);
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
            $('.pause-play__img').attr('src', './image/buttons/play.svg');
            $('.wrap').css({
                'filter': 'grayscale(0.3) brightness(0.9)'
            })
            $('.pause-text').show(300);
            clicks = 1
            clearInterval(x);
            y = setInterval(() => {
                $('.playground__guess-word').val('')
            }, 100);
        } else {
            $('.pause-play__img').attr('src', './image/buttons/pause.svg')
            $('.wrap').css({
                'filter': 'grayscale(0) brightness(1)'
            })
            $('.pause-text').hide(300);
            clearInterval(y);
            clicks = 0
            x = setInterval(() => {
                sec--;
                if (min === 0 && sec === 0) {
                    min = 0;
                    sec = 0;
                    $('.playground').css('filter', 'grayscale(0.3)')
                    $('.playground__timer').text('00:00');
                    $('.gameover').css({
                        'display': 'flex',
                        'animation': 'customShow 0.3s 1 linear'
                    });
                    starsSet();
                    if (lang === 'ua') {
                        $('#finalS').html(score + ' балів');
                    } else if (lang === 'en') {
                        $('#finalS').html(score + ' points');
                    }
                    $('#calcNums').html(numCalc);
                    clearInterval(x);
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
                $('.diff__name').css('color', '#929D7B');
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
                $('.diff__name').css('color', '#EBAF68');
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
                $('.diff__name').css('color', '#9C3AFF');
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
                $('.diff__name').css('color', '#EB6868');
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

$('#play').click(function () {
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
        } else {
            if (lang === 'ua') {
                return 'Хммм... Ти впевнений що ти вводиш число?'
            } else if (lang === 'en') {
                return 'Hmmm... Are you sure that it is number?'
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

let showAndClearPoints = () => {
    let value = 100 - tryCount * 2;

    function hide() {
        setTimeout(() => {
            $('.playground__points').css({
                animation: 'none',
                display: 'none',
                color: '#ffffff'
            })
            $('.playground__points').html('+ default')
        }, 1000);
    }
    if (value > 0) {
        $('.playground__points').html('+' + value);
        $('.playground__points').css({
            animation: 'up 1s 1 linear',
            display: 'flex',
            color: '#929D7B'
        });
        hide();
    } else if (value < 0) {
        $('.playground__points').html('-' + value);
        $('.playground__points').css({
            animation: 'up 1s 1 linear',
            display: 'flex',
            color: '#F61E1E'
        });
        hide();
    } else if (value === 0) {
        $('.playground__points').html(value);
        $('.playground__points').css({
            animation: 'up 1s 1 linear',
            display: 'flex',
            color: '#FFFFFF'
        });
        hide();
    }
}

$('.playground').keypress(function (e) {
    if (e.keyCode === 13) {
        if (checkIfWin(generatedNum)) {
            numCalc++;
            showAndClearPoints();
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
                $('.scoreval').html(score);
            } else if (lang === 'en') {
                $('.scoreval').html(score);
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
            $('.card__hints-item.card__text').attr('class', 'card__hints-item card__text');
            $('.card__hints').append('<li class="card__hints-item card__text card__hints-item_actualy">' + getHints($('#guessedNum').val()) + '</li>');
            let block = document.getElementById('hintsBlock');
            block.scrollTop = block.scrollHeight;
            $('.playground__guess-word').val('')
        }
    }
});

$('.playground__guess-btn').click(function () {
    if (checkIfWin(generatedNum)) {
        numCalc++;
        showAndClearPoints();
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
            $('.scoreval').html(score);
        } else if (lang === 'en') {
            $('.scoreval').html(score);
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
        $('.card__hints-item.card__text').attr('class', 'card__hints-item card__text');
        $('.card__hints').append('<li class="card__hints-item card__text card__hints-item_actualy">' + getHints($('#guessedNum').val()) + '</li>');
        let block = document.getElementById('hintsBlock');
        block.scrollTop = block.scrollHeight;
        $('.playground__guess-word').val('')
    }
})

$('.card__btn.card__btn_home').click(() => {
    generatedNum = 0;
    score = 0;
    tryCount = 0;
    getId = '';
    min = 0;
    sec = 0;
    numCalc = 0;
    clearInterval(y);
    clearInterval(x);
    $('.pause-play__img').attr('src', './image/buttons/pause.svg');
    $('.playground__guess-word').val('')
    $('.wrap').css({
        'filter': 'grayscale(0) brightness(1)'
    })
    $('.pause-text').hide(300);

    if (lang === 'ua') {
        $('.scoreval').html('0')
        $('#hints').html('<h3 class="card__headline">Підказки:</h3><ul class="card__hints"></ul>');
    } else if (lang === 'en') {
        $('.scoreval').html('0')
        $('#hints').html('<h3 class="card__headline">Hints:</h3><ul class="card__hints"></ul>');
    }
    $('#playground__timer').html('00:00');

    clearInterval(x);
    $('#wrap').css({
        background: 'url("./image/background.png") #E7FBBE center center',
        backgroundSize: 'cover'
    })
    $('.playground').fadeOut(500);
    setTimeout(() => {
        $('.main-menu').fadeIn(500);
    }, 500);

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

$('#gm_home').click(function () {
    generatedNum = 0;
    score = 0;
    tryCount = 0;
    getId = '';
    min = 0;
    sec = 0;
    numCalc = 0;
    clearInterval(y);
    clearInterval(x);
    $('.pause-play__img').attr('src', './image/buttons/pause.svg');
    $('.playground__guess-word').val('')
    $('.wrap').css({
        'filter': 'grayscale(0) brightness(1)'
    })
    $('.pause-text').hide(300);
    $('.gameover').css({
        'animation': 'customHide 0.3s 1 linear'
    })
    setTimeout(() => {
        $('.gameover').css({
            'animation': 'none',
            'display': 'none'
        })
    }, 295);

    if (lang === 'ua') {
        $('.scoreval').html('0')
        $('#hints').html('<h3 class="card__headline">Підказки:</h3><ul class="card__hints"></ul>');
    } else if (lang === 'en') {
        $('.scoreval').html('0')
        $('#hints').html('<h3 class="card__headline">Hints:</h3><ul class="card__hints"></ul>');
    }
    $('#playground__timer').html('00:00');

    clearInterval(x);
    $('#wrap').css({
        background: 'url("./image/background.png") #E7FBBE center center',
        backgroundSize: 'cover'
    })
    $('.playground').fadeOut(500);
    setTimeout(() => {
        $('.main-menu').fadeIn(500);
    }, 500);

    $('#select-difficulty').css('animation', 'none')
    $('#select-difficulty').css({
        'transition': '0.3s',
        'display': 'none'
    })
    $('.select-difficulty__close-btn').css('display', 'none');
})

$('#gm_playAgain').click(function () {
    $('.pause-play__img').attr('src', './image/buttons/pause.svg');
    $('.playground__guess-word').val('')
    $('.wrap').css({
        'filter': 'grayscale(0) brightness(1)'
    })
    $('.playground').css({
        'filter': 'grayscale(0) brightness(1)'
    })
    $('.pause-text').hide(300);
    score = 0;
    tryCount = 0;
    min = 0;
    sec = 0;
    numCalc = 0;
    $('.gameover').css({
        'animation': 'customHide 0.3s 1 linear'
    })
    setTimeout(() => {
        $('.gameover').css({
            'animation': 'none',
            'display': 'none'
        })
    }, 295);
    generatedNum = generateTheNumber(gamemodes[gmodeindex].min, gamemodes[gmodeindex].max);
    stratGame(gamemodes[gmodeindex].bgColor, gamemodes[gmodeindex].hints, gamemodes[gmodeindex].time);
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
            $('.introduceing__h2').html('Difficulty: <span class="diff__name">easy</span>');
            $('.introduceing__h3').html('Short description:');

            $('.playground__headline').html('Guess the number');
            $('#info_text').html('Information <br> panel');
            $('#text_record').html('Rec.:');
            $('#text_hints').html('Hints: ');
            $('#text_soon').html('soon');
            $('#text_statistic').html('Sc.:');
            $('.scoreval').html('0');
            $('#guessedNum').attr('placeholder', 'your number');
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
            $('.introduceing__h2').html('Складність: <span class="diff__name">легко</span>');
            $('.introduceing__h3').html('Короткий опис:');

            $('.playground__headline').html('Відгадай число');
            $('#info_text').html('Інформаційна <br> панель');
            $('#text_reocord').html('Рек.');
            $('#text_hints').html('Підказки: ');
            $('#text_soon').html(' згодом');
            $('#text_statistic').html('Стат.:');
            $('.scoreval').html('0 балів');
            $('#guessedNum').attr('placeholder', 'ваше число')
        }, 600);
        lang = 'ua';
    }
})