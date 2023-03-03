export default class Task {
  constructor(name, dueDate, done, id) {
    this.id = id ?? Date.now();
    this.name = name;
    this.dueDate = dueDate;
    this.done = done;
  }

  getId() {
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  setDueDate(dueDate) {
    this.dueDate = dueDate;
  }

  getDueDate() {
    return this.dueDate;
  }
  
  setDone(done) {
    this.done = done;
  }

  getDone() {
    return this.done;
  }
}
