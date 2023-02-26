export default class UI {
  static initialize() {
    UI.initButtons();
  }

  static createProject() {
    const name = prompt("Project name:");
    const projects = document.getElementById("projects");
    projects.innerHTML += `<li>${name}</li>`;
  }

  static initButtons() {
    const addProjectBtn = document.getElementById("btn-add-project");
    addProjectBtn.addEventListener("click", UI.createProject);
  }
}
