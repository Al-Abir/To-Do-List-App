const item = document.querySelector('#item');
const todolist = document.querySelector("#to-do-box");

item.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        addtodo(this.value);
        this.value = "";
    }
});

const saveitems = () => {
    const notes = document.querySelectorAll("#to-do-box li");
    const data = [];

    notes.forEach((note) => {
        data.push(note.value); // Corrected to save list item text//(note.textContent.replace("×", "").trim()
    });

    

    if(data.length === 0){
        localStorage.removeItem("notes");
    } else {
        localStorage.setItem("notes", JSON.stringify(data)); // Corrected "Notes" to "notes"
    }
};

const addtodo = (item) => {
    if (!item) return; // Prevent adding empty items

    const listitem = document.createElement('li');
    listitem.innerHTML = `
        ${item}
        <i class="fas fa-times"></i>
    `;
    listitem.addEventListener("click", function(){
        this.classList.toggle("done");
    });

    listitem.querySelector("i").addEventListener("click", () => {
        listitem.remove();
        saveitems(); // Ensure saving items after removing
    });

    todolist.appendChild(listitem);
    saveitems();
};

(function(){
    const lsTodo = JSON.parse(localStorage.getItem("notes"));
    if(lsTodo !== null){ // Corrected null check
        lsTodo.forEach((todoItem) => { // Corrected variable names
            addtodo(todoItem);
        });
    }
})();
