$("#menu__play-btn").click(() => {
    setTimeout(() => {
        $('#select-difficulty').css({
            'transition': '0.3s',
            'display': 'flex',
            'animation': 'open 1 0.6s linear'
        })
        $('.select-difficulty__close-btn').css('display', 'block');
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