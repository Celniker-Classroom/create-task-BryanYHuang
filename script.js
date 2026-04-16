//let username = prompt("Enter your name:"); 

let infoArray = ["Information", "Importance", "Due Date"]; 
document.getElementById("addBtn").addEventListener("click", function(){
    let dueDate = document.getElementById("dueDate").value; 
    let details = document.getElementById("details").value; 
    let selectedImportance = document.querySelector('input[name="importance"]:checked').value;
    let importance = selectedImportance ? selectedImportance : "None"; 
    infoArray = [dueDate, details, importance]; 
    console.log(infoArray); 

    let container = document.getElementById("container"); 
    if (container.querySelector("h3")){
        container.innerHTML = ""; 
    }

    infoArray.forEach(item => {
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        taskItem.textContent = item; 
        container.appendChild(taskItem); 
    }); 
}); 