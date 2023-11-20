import { defaultSettings } from '../GameConfig';
import { GameScene } from '../scenes/GameScene';
import Button from './Button';

export default class Controlls {
	scene: GameScene;
	constructor(scene: GameScene) {
		this.scene = scene;
		const makeMove = new Button(
			scene,
			900,
			550,
			0,
			0,
			'black',
			'round_btn_red',
			null,
			'makeMove',
			0.4,
			() => {
				this.scene.AI.setBoard(scene.cellPointer.id);
			}
		);

		const up = new Button(
			scene,
			0,
			0,
			0,
			0,
			'black',
			'round_btn_yellow',
			null,
			'up',
			0.4,
			() => {
				this.movePointer(scene.cellPointer.id - defaultSettings.borderSize);
			}
		);
		const down = new Button(
			scene,
			0,
			75,
			0,
			0,
			'black',
			'round_btn_yellow',
			null,
			'down',
			0.4,
			() => {
				this.movePointer(scene.cellPointer.id + defaultSettings.borderSize);
			}
		);
		const right = new Button(
			scene,
			50,
			35,
			0,
			0,
			'black',
			'round_btn_yellow',
			null,
			'right',
			0.4,
			() => {
				this.movePointer(scene.cellPointer.id + 1);
			}
		);
		const left = new Button(
			scene,
			-50,
			35,
			0,
			0,
			'black',
			'round_btn_yellow',
			null,
			'left',
			0.4,
			() => {
				this.movePointer(scene.cellPointer.id - 1);
			}
		);

		scene.add.container(100, 500, [
			up.container,
			right.container,
			down.container,
			left.container,
		]);
	}

	private movePointer(nextCellId: number) {
		if (this.scene.cells.every((cell) => cell.id !== nextCellId)) {
			return;
		}
		this.scene.cellPointer.toggleActive();
		this.scene.cellPointer = this.scene.cells.find((cell) => cell.id === nextCellId);
		this.scene.cellPointer.toggleActive();
	}
}
