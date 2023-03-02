import Repository from "./Repository";
import Task from "./Task";

export default class UI {
  static repository = new Repository();
  static selectedProject = "Shopping list";

  static initialize() {
    UI.initBindings();
    UI.selectProject(UI.selectedProject);
  }

  static createProject() {
    const addProjectInput = document.getElementById("new-project-name");
    if (!addProjectInput.value) return;
    if (UI.repository.hasProject(addProjectInput.value)) {
      alert("Project already exists");
      return;
    }
    UI.repository.addProject(addProjectInput.value);
    const projects = document.getElementById("projects");
    const projectNode = document.createElement("li");
    projectNode.innerText = addProjectInput.value;
    projects.appendChild(projectNode);
    addProjectInput.value = "";
    UI.initProjectsBindings();
  }

  static selectProject(projectName) {
    UI.selectedProject = projectName;
    const selectedProject = document.getElementById("selected-project");
    selectedProject.innerText = UI.selectedProject;

    const projects = document.getElementById("tasks");
    projects.innerHTML = "";

    const tasks = UI.repository.getTasks(projectName);
    tasks.forEach((task) => {
      const taskNode = document.createElement("li");
      taskNode.innerHTML += `<span><input type="checkbox" id="${task.getId()}" ${
        task.getDone() ? "checked" : ""
      }>${task.getName()}</span><span>${task.getDueDate()}<span>`;
      projects.appendChild(taskNode);
    });
    UI.initTasksBindings();
  }

  static createTask() {
    const taskNameInput = document.getElementById("new-task-name");
    if (!taskNameInput.value) return;
    const dueDate = document.getElementById("new-task-date").value;

    const newTask = new Task(taskNameInput.value, dueDate);
    UI.repository.addTaskToProject(UI.selectedProject, newTask);
    const projects = document.getElementById("tasks");
    projects.innerHTML += `<li><span><input type="checkbox" id="${newTask.getId()}">${
      taskNameInput.value
    }</span><span>${dueDate}<span></li>`;
    taskNameInput.value = "";
    UI.initTasksBindings();
  }

  static initBindings() {
    const addProjectBtn = document.getElementById("btn-add-project");
    addProjectBtn.addEventListener("click", UI.createProject);

    const addTaskBtn = document.getElementById("btn-add-task");
    addTaskBtn.addEventListener("click", UI.createTask);

    UI.initProjectsBindings();
  }

  static initProjectsBindings() {
    const projectsElements = document
      .getElementById("projects")
      .querySelectorAll("li");
    projectsElements.forEach((project) =>
      project.addEventListener("click", () =>
        UI.selectProject(project.innerText)
      )
    );
  }

  static initTasksBindings() {
    const projectName = UI.selectedProject;
    const tasksCheckboxes = document
      .getElementById("tasks")
      .querySelectorAll("input");
    tasksCheckboxes.forEach((task) =>
      task.addEventListener("click", () =>
        UI.repository.switchTaskDone(projectName, task.id)
      )
    );
  }
}
