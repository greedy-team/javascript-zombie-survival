import { GameModel } from "./model.js";
import { GameViewModel } from "./viewModel.js";
import { GameView } from "./view.js";

const model = new GameModel();
const viewModel = new GameViewModel(model);
new GameView(viewModel);
