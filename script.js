// I used AI to help debug my code, and it suggested the line saying "let tasks = JSON.parse(localStorage.getItem("tasks")) || [];". 
// Timer setup
function updateTimer(){
    let now = new Date(); 

    now.getFullYear(); 
    now.getMonth(); 
    now.getDate(); 
    now.getDay(); 
    now.getHours(); 
    now.getMinutes(); 
    now.getSeconds(); 
    now.getTime(); 

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; // Array of day names for display purposes
    let dayName = days[now.getDay()];

    let myDate = document.getElementById("myDate"); 
    myDate.textContent = `${dayName}, ${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds().toString().padStart(2, '0')}`;
}

setInterval(updateTimer, 1000); 
updateTimer(); 
//Initial message shown before tasks are added
document.getElementById("existingTasks").textContent = "Added Tasks Will Appear Below";

function btnClick(){
    let dueDate = infoArray[0];
    let details = infoArray[1];
    
    if (dueDate === "" || details === ""){
        //Alerts user if they try to add a task without filling in the required fields
        alert("Please fill in all the required fields.");
        return; 
    }
    else{
        // Switches initial message once tasks are added successfully
        document.getElementById("existingTasks").textContent = "Existing Tasks: ";
    }

    // Gets existing tasks from local browser storage and converts them from the stored string format back into an array, otherwise sets up an empty array
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(infoArray);

    // Saves back into local storage as a string again
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Refreshes task display after adding a new task
    displayTasks();
}

document.getElementById("addBtn").addEventListener("click", function(){
    //Retrieves user input values and stores them in an array for processing
    let dueDate = document.getElementById("dueDate").value;
    let details = document.getElementById("details").value;
    let selectedImportance = document.querySelector('input[name="importance"]:checked');
    let importance = selectedImportance ? selectedImportance.value : "None";

    infoArray = [dueDate, details, importance]; 
    btnClick();
});

// Function to delete a task based on its index in the tasks array
function deleteTask(index){
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks)); 
    displayTasks(); 
}

function displayTasks(){
    let container = document.getElementById("triplecontainer");
    // Clear existing tasks before displaying updated list
    container.innerHTML = ""; 
    // Load tasks again
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        // Converts date string into an object, processes to check if overdue and applies the "overdue" class if necessary
        let taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        let dueDateBox = document.createElement("div");
        dueDateBox.classList.add("task-box");

        let dueDateValue = new Date(task[0]); 
        let now = new Date();

        dueDateBox.textContent = task[0];

        if (!isNaN(dueDateValue) && dueDateValue < now) {
            dueDateBox.classList.add("overdue");
        }

        taskItem.appendChild(dueDateBox);

        // Creates and appends the details and importance boxes for each task
        let detailsBox = document.createElement("div");
        detailsBox.classList.add("task-box");
        detailsBox.textContent = task[1]; 
        taskItem.appendChild(detailsBox);

        let importanceBox = document.createElement("div");
        importanceBox.classList.add("task-box");
        importanceBox.textContent = task[2]; 
        taskItem.appendChild(importanceBox);

        // Creates delete button and sets up event listener to call deleteTask function with right index when clicked
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function (){
            deleteTask(index); 
        });
        taskItem.appendChild(deleteBtn);

        // Add full task item to the page
        container.appendChild(taskItem);
    });
}
// Load and display tasks when page is first opened
displayTasks();