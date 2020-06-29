//***************** GLOBAL Variables for the filtering *******************//

let task_cont = $('.tasks ul'),
    tasks = $('.tasks ul li'),
    task = $('.search .taskName'),
    result = [];

// focus the enput when the page load up

task.focus()
// adding event lister on the input field
for (const e of task) {
    task.focus()
    e.addEventListener('keyup', checker);
}


//****************** functions *************************//


// check if the letter found if true add it to results
function checker() {
    result = []
    for (const e of tasks) {
        if (e.innerHTML.indexOf(this.value) >= 0) {
            result.push(e)
        }
    }
    display();
}

// display the filter results
function display() {
    task_cont.empty()
    for (const r of result) {
        task_cont.append(r)
    }
    if (result.length < 1){
        task_cont.append('<p>no results</P>')
    }
}

// Global variabels for the search animation

var sIcon = $('.search i'),
    sinput = $('.search input');



sIcon.on('click', function(){
    sinput.addClass('searchInputAnim')
    sIcon.addClass('searchIconAnim')
})




































