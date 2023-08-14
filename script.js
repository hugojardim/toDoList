document.addEventListener('DOMContentLoaded', function() {
    let formTasks = document.getElementById('taskForm');
    let taskList = document.getElementById('taskList');

    formTasks.addEventListener('submit', function(event){
        event.preventDefault();

        let userInput = document.getElementById('userInput').value;

        if (userInput.trim() !== '') {
            let newTask = document.createElement('li');
            newTask.className = 'list-group-item';
            // newTask.style = ;
            newTask.textContent = userInput;
            
            taskList.insertBefore(newTask, taskList.firstChild);
            document.getElementById('userInput').value = '';
        }
    });
});
