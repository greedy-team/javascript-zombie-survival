import { UserModel } from "./model.js";
import { UserViewModel } from "./viewModel.js";
import { UserView } from "./view.js";

const model = new UserModel();
const viewModel = new UserViewModel(model);
new UserView(viewModel);
