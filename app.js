let tasks = [];

const addTask = () => {

    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text){

        tasks.push({
            text: text,
            completed: false
        });

        taskInput.value = "";

        updateTaskList();
        updateStats();
    }
};

const updateTaskList = () => {

    const taskList = document.querySelector('.task-list');

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {

        const listItem = document.createElement('li');

        listItem.innerHTML = `
        
        <div class ="taskItem">

            <div class ="task ${task.completed ? 'completed' : ''}">

                <input 
                    type="checkbox" 
                    class="checkbox" 
                    ${task.completed ? 'checked' : ''}
                />

                <p>${task.text}</p>

            </div>

            <div class="icons">

                <img 
                    width="20"
                    src="edit.png"
                    onClick="editTask(${index})"
                />

                <img 
                    width="20"
                    src="bin.png"
                    onClick="deleteTask(${index})"
                />

            </div>

        </div>
        
        `;

        const checkbox = listItem.querySelector('.checkbox');

        checkbox.addEventListener('change', () => {
            toggleTaskComplete(index);
        });

        taskList.append(listItem);

    });
};

const toggleTaskComplete = (index) => {

    tasks[index].completed = !tasks[index].completed;

    updateTaskList();
    updateStats();
};

const deleteTask = (index) => {

    tasks.splice(index, 1);

    updateTaskList();
    updateStats();
};

const editTask = (index) => {

    const taskInput = document.getElementById('taskInput');

    taskInput.value = tasks[index].text;

    tasks.splice(index, 1);

    updateTaskList();
    updateStats();
};

const updateStats = () => {

    const completedTasks = tasks.filter(task => task.completed).length;

    const totalTasks = tasks.length;

    const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

    document.getElementById('progress').style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`;
};

document.getElementById('newTask').addEventListener('click', function(e){

    e.preventDefault();

    addTask();

});