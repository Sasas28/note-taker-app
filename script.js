//Represent Notes
class Notes {
  constructor(text){
    this.text = text;
  }
}

//UI Task
class UI {
  static displayNotes(){
    const notes = Storage.getNotes();
    
    for(let note of notes){
      UI.addToNoteList(note);
    }
  }
  
  static addToNoteList(note){
    const myNoteList = document.querySelector('#myNoteList');
    
    const div = document.createElement('div');
    div.className = `card mb-2`;
    div.innerHTML = `
        <div class="card-body">
          <p>${note.text}</p>
          <button class="view btn btn-primary btn-sm">View Details</button>
          <button class="remove btn btn-danger btn-sm">Remove</button>
        </div>    
    `;
    
    myNoteList.appendChild(div);
  }
  
  static removeFromNoteList(btn){
   btn.parentElement.parentElement.remove();
  }
  
  static displayModal(btn){
    const text = btn.parentElement.firstElementChild.textContent;
    document.querySelector('#text').innerText = text;
    document.querySelector('#myModal').style.display = 'block';
  }
//UI ends here
}

//Storage
class Storage {
  static getNotes(){
    let notes;
    if(localStorage.getItem('notes') === null){
      notes = [];
    }else{
      notes = JSON.parse(localStorage.getItem('notes'));
    }
    
    return notes;
  }
  
  static addNoteToStorage(note){
    const notes = Storage.getNotes();
    notes.push(note);
    localStorage.setItem('notes',JSON.stringify(notes));
  }
  
  static removeFromStorage(text){
    const notes = Storage.getNotes();
    notes.forEach((note, index) => {
      if(note.text === text){
        notes.splice(index, 1);
      }
    });
    localStorage.setItem('notes', JSON.stringify(notes));
  }
//Storage ends here
}

//Events: Page Loaded
document.addEventListener('DOMContentLoaded', UI.displayNotes);
//When form was submitted
document.querySelector('#myForm').addEventListener('submit', e => {
  e.preventDefault();
  //get value from input
  const myInput = document.querySelector('#myInput').value;
  //validate
  if(myInput === ''){
    alert('Please fill in field');
  }else{
  //instantiate
  const note = new Notes(myInput);
  //add note to myNoteList
  UI.addToNoteList(note)
  //add note to local storage
  Storage.addNoteToStorage(note);
  //clear field value
  document.querySelector('#myInput').value = '';
  document.querySelector('#myInput').focus();  
  }
});

//View Details and Remove Note
document.querySelector('#myNoteList').addEventListener('click', e => {
  if(e.target.classList.contains('remove')){
  //remove note from myNoteList
  UI.removeFromNoteList(e.target);
  //remove note from local storage
  Storage.removeFromStorage(e.target.parentElement.firstElementChild.textContent);    
  }else if(e.target.classList.contains('view')){
  //display modal
  UI.displayModal(e.target);
  }
});

//Close modal
document.querySelector('.close').addEventListener('click', () => {
  document.querySelector('#myModal').style.display = 'none';
});