import { GameModel } from './model/GameModel.js';
import { GameView } from './view/GameView.js';
import { GameController } from './controller/GameController.js';

const model = new GameModel();
const view = new GameView();
const controller = new GameController(model, view);
