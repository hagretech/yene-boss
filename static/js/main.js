var min = $('.timer .min'),
    sec = $('.timer .sec'),
    start = $('.buttons .btn-success'),
    stop = $('.buttons .btn-danger'),
    second = 0,
    minute = 0,
    restart = $('.restart'),
    form_input = $('.main form .form_input'),
    on = true;


restart[0].onclick = function () {
    second = 0;
    minute = 0;
    min.html('0');
    sec.html('0');
}

function upcounter() {
    time = second++
    sec[0].innerHTML = time
    if (second == 60) {
        minute++
        min[0].innerHTML = minute
        second = 0
    }
    form_input[0]["value"] = minute
}


start[0].onclick = function () {
    if (start.hasClass('on')) {
        console.log('error')
    } else {
        start.addClass('on')
        mytimer = setInterval(upcounter, 1000)
    }


}
stop[0].onclick = function () {
    start.removeClass('on')
    clearInterval(mytimer);

}
