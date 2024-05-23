let taskList = [];

document.getElementById('add-task').addEventListener('click', addTask);
document.getElementById('mark-all-completed').addEventListener('click', markAllCompleted);

function addTask() {
	const taskInput = document.getElementById('task-input');
	const task = taskInput.value.trim();
	if (task) {
		taskList.push({ text: task, completed: false });
		renderTaskList();
		updateTaskCount();
		taskInput.value = '';
	}
}

function renderTaskList() {
	const taskListElement = document.getElementById('task-list');
	taskListElement.innerHTML = '';
	taskList.forEach((task, index) => {
		const taskElement = document.createElement('li');
		taskElement.textContent = task.text;
		if (task.completed) {
			taskElement.classList.add('completed');
		}
		taskElement.addEventListener('click', () => {
			taskList[index].completed = !taskList[index].completed;
			renderTaskList();
			updateTaskCount();
		});
		taskListElement.appendChild(taskElement);
	});
}

function markAllCompleted() {
	taskList.forEach((task) => {
		task.completed = true;
	});
	renderTaskList();
	const markAllCompletedBtn = document.getElementById('mark-all-completed');
	markAllCompletedBtn.classList.add('animate');
	setTimeout(() => {
		markAllCompletedBtn.classList.remove('animate');
	}, 2000);
}

function updateTaskCount() {
	const taskCountElement = document.getElementById('task-count');
	const incompleteTasks = taskList.filter(task => !task.completed);
	taskCountElement.textContent = incompleteTasks.length;
	taskCountElement.textContent = `Task count: ${taskList.length}`;
}
