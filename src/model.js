// model.js
export class UserModel {
  constructor() {
    this.name = "Alice";
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }
}
