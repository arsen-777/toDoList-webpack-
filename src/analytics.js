import "./styles/style.css";
import { Task } from "./post";

const addTaskBtn = document.getElementById("add-task-btn");
const deskTaskInput = document.getElementById("description-task");
const todosWrapper = document.querySelector(".todos-wrapper");
const descriptionTask = document.getElementById("description-task");

let tasks;

!localStorage.tasks
	? (tasks = [])
	: (tasks = JSON.parse(localStorage.getItem("tasks")));

let todoItemElems = [];
let buttons = [];

function createTemplate(task, index) {
	return `
				<div class="todo-item ${task.completed ? "checked" : ""}">
                <div class="description">${task.description}</div>
                <div class="buttons">
                    <input onclick="completeTask(${index})" type="checkbox" class="btn-complete" ${
		task.completed ? "checked" : ""
	}>
                    <button onclick = "deleteTasks(${index})" class="btn-delete">delete</button>
                </div>
            </div>
				`;
}

function fillHtmlList() {
	todosWrapper.innerHTML = "";
	if (tasks.length > 0) {
		tasks.forEach((item, index) => {
			todosWrapper.innerHTML += createTemplate(item, index);
		});
		todoItemElems = document.querySelector(".todo-item");
		buttons = document.querySelectorAll(".btn-delete");
	}
}

fillHtmlList();

const updateLocal = () => {
	localStorage.setItem("tasks", JSON.stringify(tasks));
};

const completeTask = (index) => {
	console.log(index);
	tasks[index].completed = !tasks[index].completed;

	updateLocal();
	fillHtmlList();
};

descriptionTask.addEventListener("keyup", (ev) => {
	if (ev.keyCode === 13) {
		ev.preventDefault();
		clickFunc();
	}
});

const clickFunc = () => {
	tasks.push(new Task(deskTaskInput.value));
	updateLocal();
	fillHtmlList();
	deskTaskInput.value = "";
};
addTaskBtn.addEventListener("click", clickFunc);

const deleteTasks = (index) => {
	setTimeout(() => {
		tasks.splice(index, 1);
		updateLocal();
		fillHtmlList();
	}, 500);
};
// const deleteItem = (ev) => {
// 	tasks.splice(ev.target, 1);
// 	updateLocal();
// 	fillHtmlList();
// };

// buttons.forEach((el) => {
// 	el.addEventListener("click", deleteItem);
// 	// updateLocal();
// 	// fillHtmlList();
// });

window.completeTask = completeTask;
window.deleteTasks = deleteTasks;
