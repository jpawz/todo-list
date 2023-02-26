import Repository from "./Repository";

export default class UI {
  static repository = new Repository();
  static selectedProject = "Shopping list";

  static initialize() {
    UI.initBindings();
  }

  static createProject() {
    const name = prompt("Project name:");
    if (UI.repository.hasProject(name)) {
      alert("Project already exists");
      return;
    }
    UI.repository.addProject(name);
    const projects = document.getElementById("projects");
    const projectNode = document.createElement("li");
    projectNode.innerText = name;
    projectNode.addEventListener("click", () => UI.selectProject(name));
    projects.appendChild(projectNode);
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
      taskNode.innerText = task.getName();
      projects.appendChild(taskNode);
    });
  }

  static createTask() {
    const name = prompt("Task name:");
    UI.repository.addTask(UI.selectedProject, name);
    const projects = document.getElementById("tasks");
    projects.innerHTML += `<li>${name}</li>`;
  }

  static initBindings() {
    const addProjectBtn = document.getElementById("btn-add-project");
    addProjectBtn.addEventListener("click", UI.createProject);

    const addTaskBtn = document.getElementById("btn-add-task");
    addTaskBtn.addEventListener("click", UI.createTask);

    const shoppingList = document.getElementById("project-shopping-list");
    shoppingList.addEventListener("click", () =>
      UI.selectProject("Shopping list")
    );
  }
}
