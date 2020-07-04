let tasks = $('.task-list a'),
    t_mon = $('.time-tabel-cont .mon .tasks'),
    t_tue = $('.time-tabel-cont .tue .tasks'),
    t_wed = $('.time-tabel-cont .wed .tasks'),
    t_thu = $('.time-tabel-cont .thu .tasks'),
    t_fri = $('.time-tabel-cont .fri .tasks'),
    t_sat = $('.time-tabel-cont .sat .tasks'),
    t_sun = $('.time-tabel-cont .sun .tasks'),
    mon = [],
    tue = [],
    wed = [],
    thu = [],
    fri = [],
    sat = [],
    sun = [],
    no_of_task = [],
    max_row = 0,
    add_task_form = $('.main .addTask'),
    add_task_form_btn = $('.main .addTask h2'),
    weak_table = $('.time-tabel-cont'),
    select_day = $('.addTask form div select'),
    name_form = $('.addTask form div #name');

// add task animations

add_task_form_btn.on('click', function () {
    add_task_form.toggleClass('up');
})

// the add task for the weak table
weak_table.on('click', function (e) {
    add_task_form.toggleClass('up');
    Array.from(select_day.children()).forEach(function(day) {
        if (day.textContent == e.target.className) {
            console.log(day)
            select_day[0]['value'] = day.textContent
            name_form.focus()
        }
    })
})

// arranging each task by its day
for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].className == 'mon') {
        mon.push(tasks[i])
    } else if (tasks[i].className == 'tue') {
        tue.push(tasks[i])
    } else if (tasks[i].className == 'wed') {
        wed.push(tasks[i])
    } else if (tasks[i].className == 'thu') {
        thu.push(tasks[i])
    } else if (tasks[i].className == 'fri') {
        fri.push(tasks[i])
    } else if (tasks[i].hasClass == 'sat') {
        sat.push(tasks[i])
    } else if (tasks[i].className == 'sun') {
        sun.push(tasks[i])
    }
    no_of_task = [mon.length, tue.length, wed.length, thu.length, fri.length, sat.length, sun.length].sort();
    max_row = no_of_task.reverse()[0] + 1
}

// dispalying the tasks by there day

for (let i = 0; i < max_row; i++) {
    if (mon[i] != undefined) {
        t_mon.append(mon[i])
    } else {
        t_mon.append('<p class="mon"></p>')
    }
    if (tue[i] != undefined) {
        t_tue.append(tue[i])
    } else {
        t_tue.append('<p class="tue"></p>')
    }
    if (wed[i] != undefined) {
        t_wed.append(wed[i])
    } else {
        t_wed.append('<p class="wed"></p>')
    }
    if (thu[i] != undefined) {
        t_thu.append(thu[i])
    } else {
        t_thu.append('<p class="tur"></p>')
    }
    if (fri[i] != undefined) {
        t_fri.append(fri[i])
    } else {
        t_fri.append('<p class="fri"></p>')
    }
    if (sat[i] != undefined) {
        t_sat.append(sat[i])
    } else {
        t_sat.append('<p class="sat"></p>')
    }
    if (sun[i] != undefined) {
        t_sun.append(sun[i])
    } else {
        t_sun.append('<p class="sun"></p>')
    }
}
