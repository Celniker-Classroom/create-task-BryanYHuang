//let username = prompt("Enter your name:"); 

const infoArray = ["Information", "Importance", "Due Date"]; 
document.getElementById("addBtn").addEventListener("click", function(){
    let dueDate = document.getElementById("dueDate").value; 
    infoArray[0] = dueDate; 
    let details = document.getElementById("details").value; 
    infoArray[1] = details; 
    let importance = document.querySelector('input[name="importance"]:checked').value;
    infoArray[2] = importance;
    console.log(infoArray); 
}); 

// function addInfo(){
//     infoArray[0] = document.getElementsById("dueDate"); 
//     infoArray[1] = document.getElementsByName("importance"); 
//     infoArray[2] = document.getElementsById("details"); 
// }