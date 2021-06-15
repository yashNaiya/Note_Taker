console.log('notes app');
showNotes();

const addBtn = document.getElementById('formButton')

addBtn.addEventListener('click', (e) => {


    let addTxt = document.getElementById('input');

    if (addTxt.value == '') {
        alert('add note before submitting');
        addTxt.value = '';
    }
    else {

        let notes = localStorage.getItem('notes');

        if (notes == null) {
            notesObj = [];
        }
        else {
            notesObj = JSON.parse(notes);
        }

        notesObj.push(addTxt.value);
        localStorage.setItem('notes', JSON.stringify(notesObj));

        addTxt.value = '';

        showNotes();
    }

})

function showNotes() {
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = '';

    notesObj.forEach(function (element, index) {

        html += `<div class="note">
            <span>Note: ${index + 1}</span>
            <p>${element}</p>
            <button class="view">View</button>
            <button class="remove" id="${index}"onclick="deleteNote(this.id)" >Remove</button>
        </div>`

    });

    const noteBox = document.getElementById('notes');
    if (notesObj.length != 0)
        noteBox.innerHTML = html;
    else
        noteBox.innerHTML = `<h3>Nothing to show yet</h3>`
}

const viewBtn = document.querySelectorAll('.view');

viewBtn.forEach(btn=>{

    btn.addEventListener('click', (e)=>{

        if(btn.innerHTML == 'View'){
            const pera = btn.parentElement.childNodes[3];
            pera.style.height = 'auto';
            btn.innerHTML = 'Hide';
            console.log(btn.innerHTML);
        }
        else{
            const pera = btn.parentElement.childNodes[3];
            pera.style.height = '110px';
            btn.innerHTML = 'View';
        }
        
    })
})

function deleteNote(index){

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
      } else {
        notesObj = JSON.parse(notes);
      }
    
      notesObj.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notesObj));
      showNotes();
}

let search = document.getElementById('search');
search.addEventListener('input', ()=>{

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('note');
    console.log(Array.from(noteCards));
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})