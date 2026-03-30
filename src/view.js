// view.js
export class UserView {
  constructor(viewModel) {
    this.vm = viewModel;

    this.input = document.getElementById("input");
    this.username = document.getElementById("username");

    // ViewModel 상태 구독
    this.vm.subscribe(() => this.render());

    this.bindEvents();
    this.render();
  }

  bindEvents() {
    this.input.addEventListener("input", (e) => {
      this.vm.name = e.target.value;
    });
  }

  render() {
    this.username.innerText = this.vm.name;
  }
}
