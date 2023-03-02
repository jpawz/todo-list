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
      taskNode.innerHTML += `<span>${task.getName()}</span><span>${task.getDueDate()}<span>`;
      projects.appendChild(taskNode);
    });
  }

  static createTask() {
    const taskNameInput = document.getElementById("new-task-name");
    const dueDate = document.getElementById("new-task-date").value;

    UI.repository.addTaskToProject(UI.selectedProject, new Task(taskNameInput.value, dueDate));
    const projects = document.getElementById("tasks");
    projects.innerHTML += `<li><span>${taskNameInput.value}</span><span>${dueDate}<span></li>`;
    taskNameInput.value = "";
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
