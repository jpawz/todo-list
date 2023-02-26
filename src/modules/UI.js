import Repository from "./Repository";

export default class UI {
  static repository = new Repository();
  static selectedProject = "Shopping list";

  static initialize() {
    UI.initButtons();
  }

  static createProject() {
    const name = prompt("Project name:");
    if (UI.repository.hasProject(name)) {
      alert("Project already exists");
      return;
    }
    UI.repository.addProject(name);
    const projects = document.getElementById("projects");
    projects.innerHTML += `<li>${name}</li>`;
  }

  static createTask() {
    const name = prompt("Task name:");
    UI.repository.addTask(UI.selectedProject, name);
    const projects = document.getElementById("tasks");
    projects.innerHTML += `<li>${name}</li>`;
  }

  static initButtons() {
    const addProjectBtn = document.getElementById("btn-add-project");
    addProjectBtn.addEventListener("click", UI.createProject);

    const addTaskBtn = document.getElementById("btn-add-task");
    addTaskBtn.addEventListener("click", UI.createTask);
  }
}
