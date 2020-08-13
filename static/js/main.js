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
    var data = json[i].split('%%'),
        name = data[1],
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
    console.log(e.target)
    add_task_form.toggleClass('up');
    Array.from(select_day.children()).forEach(function (day) {
        if (day.textContent == e.target.className) {
            select_day[0]['value'] = day.textContent
            name_form.focus()
        }
    })
})

// arranging each task by its day
for (let i = 0; i < Tasks.length; i++) {
    if (Tasks[i].day == 'mon') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        mon.push(task)
    } else if (Tasks[i].day == 'tue') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        console.log(time.split(':')[0])
    
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        console.log(clas)
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        tue.push(task)
    } else if (Tasks[i].day == 'wed') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        wed.push(task)
    } else if (Tasks[i].day == 'thu') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        thu.push(task)
    } else if (Tasks[i].day == 'fri') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        fri.push(task)
    } else if (Tasks[i].day == 'sat') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        sat.push(task)
    } else if (Tasks[i].day == 'sun') {
        var time = Tasks[i].time,
            clas = '',
            task = '';
        if (time.split(':')[0] <= 06) {
            clas = 'mor';
        } else if (time.split(':')[1] <= 12) {
            clas = 'after'
        } else {
            clas = 'eve'
        }
        task = '<a href=\'/task/'+Tasks[i].id+'\'"' + clas  +'">'+Tasks[i].name +'</a>'
        sun.push(task)
    }
    no_of_task = [mon.length, tue.length, wed.length, thu.length, fri.length, sat.length, sun.length].sort();
    max_row = no_of_task.reverse()[0] + 1

}

// dispalying the tasks by there day and time

for (let i = 0; i < max_row; i++) {
    if (mon[i] != undefined) {
        var a = mon[i],
            time = a.split('"')[1]
        if (time == 'mor') {
            t_mon.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_mon.children()[1].innerHTML += a
        }else {
            t_mon.children()[2].innerHTML += a
        }

    } else {
        t_mon.append('<p class="mon"></p>')
    }
    if (tue[i] != undefined) {
        var a = tue[i]
        time = a.split('"')[1]
        if (time == 'mor') {
            t_tue.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_tue.children()[1].innerHTML += a
        }else {
            t_tue.children()[2].innerHTML += a
        }
    } else {
        t_tue.append('<p class="tue"></p>')
    }
    if (wed[i] != undefined) {
        var a = wed[i]
        time = a.split('"')[1]
        if (time == 'mor') {
            t_wed.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_wed.children()[1].innerHTML += a
        }else {
            t_wed.children()[2].innerHTML += a
        }

    } else {
        t_wed.append('<p class="wed"></p>')
    }
    if (thu[i] != undefined) {
        var a = thu[i]
        time = a.split('"')[1]
        if (time == 'mor') {
            t_thu.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_thu.children()[1].innerHTML += a
        }else {
            t_thu.children()[2].innerHTML += a
        }

    } else {
        t_thu.append('<p class="thu"></p>')
    }
    if (fri[i] != undefined) {
        var a = fri[i]
        time = a.split('"')[1]
        if (time == 'mor') {
            t_fri.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_fri.children()[1].innerHTML += a
        }else {
            t_fri.children()[2].innerHTML += a
        }

    } else {
        t_fri.append('<p class="fri"></p>')
    }
    if (sat[i] != undefined) {
        var a = sat[i]
        time = a.split('"')[1]
        if (time == 'mor') {
            t_sat.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_sat.children()[1].innerHTML += a
        }else {
            t_sat.children()[2].innerHTML += a
        }

    } else {
        t_sat.append('<p class="sat"></p>')
    }
    if (sun[i] != undefined) {
        var a = sun[i]
        time = a.split('"')[1]
        if (time == 'mor') {
            t_sun.children()[0].innerHTML += a
        }else if ( time == 'after'){
            t_sun.children()[1].innerHTML += a
        }else {
            t_sun.children()[2].innerHTML += a
        }

    } else {
        t_sun.append('<p class="sun"></p>')
    }
}
