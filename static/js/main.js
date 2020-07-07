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
    name_form = $('.addTask form div #name'),
    json = $('.json'),
    Tasks = [];
// making a tasks list with object
json = json.html().split('$and;')
var my = []
for (var i = 0; i < json.length; i++) {
    var data = json[i].split('%%')
    var name = data[1],
        day = data[2],
        time = data[3],
        o_name = 'name' + i,
        id = data[0]
    o_name = {
        time: time,
        day: day,
        name: name,
        id: id
    }
    my.push(o_name)
}
var time = [];

for (var i = 0; i < my.length; i++) {
    time.push(my[i].time)
    time.sort()
}
for (var i = 0; i < time.length; i++) {
    for (var l = 0; l < my.length; l++) {
        if (time[i] == my[l].time) {
            Tasks[i] = my[l];
        }

    }
}
// add task animations

add_task_form_btn.on('click', function () {
    add_task_form.toggleClass('up');
})

// event listner for the table click to add task
weak_table.on('click', function (e) {
    add_task_form.toggleClass('up');
    Array.from(select_day.children()).forEach(function (day) {
        if (day.textContent == e.target.className) {
            console.log(day)
            select_day[0]['value'] = day.textContent
            name_form.focus()
        }
    })
})

// arranging each task by its day
for (let i = 0; i < Tasks.length; i++) {
    if (Tasks[i].day == 'mon') {
        mon.push(Tasks[i])
    } else if (Tasks[i].day == 'tue') {
        tue.push(Tasks[i])
    } else if (Tasks[i].day == 'wed') {
        wed.push(Tasks[i])
    } else if (Tasks[i].day == 'thu') {
        thu.push(Tasks[i])
    } else if (Tasks[i].day == 'fri') {
        fri.push(Tasks[i])
    } else if (Tasks[i].day == 'sat') {
        sat.push(Tasks[i])
    } else if (Tasks[i].day == 'sun') {
        sun.push(Tasks[i])
    }
    no_of_task = [mon.length, tue.length, wed.length, thu.length, fri.length, sat.length, sun.length].sort();
    max_row = no_of_task.reverse()[0] + 1
}

// dispalying the tasks by there day

for (let i = 0; i < max_row; i++) {
    if (mon[i] != undefined) {
        if (mon[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + mon[i].id + '>' + mon[i].name + '</br>' + mon[i].time + '</a>'
            t_mon.children()[0].innerHTML += a
        } else if (mon[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + mon[i].id + '>' + mon[i].name + '</br>' + mon[i].time + '</a>'
            t_mon.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + mon[i].id + '>' + mon[i].name + '</br>' + mon[i].time + '</a>'
            t_mon.children()[2].innerHTML += a
        }

    } else {
        t_mon.append('<p class="mon"></p>')
    }
    if (tue[i] != undefined) {
        if (tue[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + tue[i].id + '>' + tue[i].name + '</br>' + tue[i].time + '</a>'
            t_tue.children()[0].innerHTML += a
        } else if (tue[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + tue[i].id + '>' + mon[i].name + '</br>' + tue[i].time + '</a>'
            t_tue.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + tue[i].id + '>' + tue[i].name + '</br>' + tue[i].time + '</a>'
            t_tue.children()[2].innerHTML += a
        }
    } else {
        t_tue.append('<p class="tue"></p>')
    }
    if (wed[i] != undefined) {
        if (wed[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + wed[i].id + '>' + wed[i].name + '</br>' + wed[i].time + '</a>'
            t_wed.children()[0].innerHTML += a
        } else if (wed[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + wed[i].id + '>' + wed[i].name + '</br>' + wed[i].time + '</a>'
            t_wed.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + mon[i].id + '>' + mon[i].name + '</br>' + mon[i].time + '</a>'
            t_mon.children()[2].innerHTML += a
        }
    } else {
        t_wed.append('<p class="wed"></p>')
    }
    if (thu[i] != undefined) {
        if (thu[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + thu[i].id + '>' + thu[i].name + '</br>' + thu[i].time + '</a>'
            t_thu.children()[0].innerHTML += a
        } else if (thu[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + thu[i].id + '>' + thu[i].name + '</br>' + thu[i].time + '</a>'
            t_thu.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + thu[i].id + '>' + thu[i].name + '</br>' + thu[i].time + '</a>'
            t_thu.children()[2].innerHTML += a
        }
    } else {
        t_thu.append('<p class="thu"></p>')
    }
    if (fri[i] != undefined) {
        if (fri[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + fri[i].id + '>' + fri[i].name + '</br>' + fri[i].time + '</a>'
            t_fri.children()[0].innerHTML += a
        } else if (fri[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + fri[i].id + '>' + fri[i].name + '</br>' + fri[i].time + '</a>'
            t_fri.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + fri[i].id + '>' + fri[i].name + '</br>' + fri[i].time + '</a>'
            t_fri.children()[2].innerHTML += a
        }
    } else {
        t_fri.append('<p class="fri"></p>')
    }
    if (sat[i] != undefined) {
        if (sat[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + sat[i].id + '>' + sat[i].name + '</br>' + sat[i].time + '</a>'
            t_sat.children()[0].innerHTML += a
        } else if (sat[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + sat[i].id + '>' + sat[i].name + '</br>' + sat[i].time + '</a>'
            t_sat.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + sat[i].id + '>' + sat[i].name + '</br>' + sat[i].time + '</a>'
            t_sat.children()[2].innerHTML += a
        }
    } else {
        t_sat.append('<p class="sat"></p>')
    }
    if (sun[i] != undefined) {
        if (sun[i].time.split(':')[0] <= 6) {
            var a = '<a href=/task/' + sun[i].id + '>' + sun[i].name + '</br>' + sun[i].time + '</a>'
            t_sun.children()[0].innerHTML += a
        } else if (sun[i].time.split(':')[0] <= '12') {
            var a = '<a href=/task/' + sun[i].id + '>' + sun[i].name + '</br>' + sun[i].time + '</a>'
            t_sun.children()[1].innerHTML += a
        } else {
            var a = '<a href=/task/' + sun[i].id + '>' + sun[i].name + '</br>' + sun[i].time + '</a>'
            t_mon.children()[2].innerHTML += a
        }
    } else {
        t_sun.append('<p class="sun"></p>')
    }
}
