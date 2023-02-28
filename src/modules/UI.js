import Repository from "./Repository";
import Task from "./Task";

export default class UI {
  static repository = new Repository();
  static selectedProject = "Shopping list";

  static initialize() {
    UI.initBindings();
  }

  static createProject() {
    const name = document.getElementById("new-project-name").value;
    if (UI.repository.hasProject(name)) {
      alert("Project already exists");
      return;
    }
    UI.repository.addProject(name);
    const projects = document.getElementById("projects");
    const projectNode = document.createElement("li");
    projectNode.innerText = name;
    projects.appendChild(projectNode);
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
      taskNode.innerHTML += `<span>${task.getName()}</span><span>${task.getDueDate()}<span>`;
      projects.appendChild(taskNode);
    });
  }

  static createTask() {
    const name = document.getElementById("new-task-name").value;
    const dueDate = document.getElementById("new-task-date").value;

    UI.repository.addTaskToProject(UI.selectedProject, new Task(name, dueDate));
    const projects = document.getElementById("tasks");
    projects.innerHTML += `<li><span>${name}</span><span>${dueDate}<span></li>`;
  }

  static initBindings() {
    const addProjectBtn = document.getElementById("btn-add-project");
    addProjectBtn.addEventListener("click", UI.createProject);

    const addTaskBtn = document.getElementById("btn-add-task");
    addTaskBtn.addEventListener("click", UI.createTask);

    UI.initProjectsBindings();
  }

  static initProjectsBindings() {
    const tasksElements = document.getElementById("projects").querySelectorAll("li");
    tasksElements.forEach(task => task.addEventListener("click", () => UI.selectProject(task.innerText)))
  }
}
