//***************** GLOBAL Variables for the filtering *******************//

let eked_cont = $('.ekeds ul'),
    ekeds = $('.ekeds ul li'),
    eked = $('.search .ekedName'),
    result = [];

// focus the enput when the page load up

eked.focus()
// adding event lister on the input field
for (const e of eked) {
    eked.focus()
    e.addEventListener('keyup', checker);
}


//****************** functions *************************//


// check if the letter found if true add it to results
function checker() {
    result = []
    for (const e of ekeds) {
        if (e.innerHTML.indexOf(this.value) >= 0) {
            result.push(e)
        }
    }
    display();
}

// display the filter results
function display() {
    eked_cont.empty()
    for (const r of result) {
        eked_cont.append(r)
    }
    if (result.length < 1){
        eked_cont.append('<p>no results</P>')
    }
}

// Global variabels for the search animation

var sIcon = $('.search i'),
    sinput = $('.search input');



sIcon.on('click', function(){
    sinput.addClass('searchInputAnim')
    sIcon.addClass('searchIconAnim')
})




































