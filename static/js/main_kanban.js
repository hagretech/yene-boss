let tasks = $('.main .kanbanCont .kanban .task'),
    kanbans = $('.main .kanbanCont .kanban'),
    headers = $('.main .kanbanCont .kanban h3');

var active = '',
    kactive = ''


// adding a event listener for the tasks
for (const task of tasks) {
    task.addEventListener('dragstart', dragStart);
    task.addEventListener('dragend', dragEnd);
}

// adding an event listern for the kabans
for (const kan of kanbans) {
    kan.addEventListener('dragover', dragOver);
    kan.addEventListener('dragenter', dragEnter);
    kan.addEventListener('dragleave', dragLeave);
    kan.addEventListener('drop', dragDrop);
}

// adding event listener for the kanban header
for (const kanban of kanbans) {
    kanban.addEventListener('dragstart', kanDragStart);
    kanban.addEventListener('dragend', kanDragEnd);
}


// functions


function kanflipper() {

}

function dragStart() {
    this.className += ' acive'
    active = this
}

function dragEnd() {
    var classes = this.className.split(' ');
    classes.pop()
    setTimeout(() => (this.className = classes), 100)
    active = ''
}

function kanDragStart(e) {
    if (e.target.className == 'kanban') {
        this.className += ' kacive'
        kactive = this
    }
}

function kanDragEnd(e) {

    if (e.target.className == 'kanban kacive') {
        var classes = this.className.split(' ');
        classes.pop()
        setTimeout(() => (this.className = classes), 100)
        kactive = ''
    }
}

function dragOver(e) {
    e.preventDefault()

}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {


}

function dragDrop(e) {

    if (active != '') {
        this.append(active)
    }
    var list = []
    if (kactive != '') {
        var target = e.target,
            draged = kactive,
            targetIndex = kanbans.index(target),
            dragedIndex = kanbans.index(draged);
        

        for (const kan of kanbans) {
            list.push(kan)
        }

        list[targetIndex] = draged
        list[dragedIndex] = target
        for (const l of list){
            kanbans = list
        }
    }
}
