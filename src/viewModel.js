// viewModel.js
export class UserViewModel {
  constructor(model) {
    this.model = model;
    this.listeners = [];
  }

  // View가 구독
  subscribe(listener) {
    this.listeners.push(listener);
  }

  notify() {
    this.listeners.forEach((fn) => fn());
  }

  get name() {
    return this.model.getName();
  }

  set name(value) {
    this.model.setName(value);
    this.notify(); // 상태 변경 → View 자동 업데이트
  }
}
