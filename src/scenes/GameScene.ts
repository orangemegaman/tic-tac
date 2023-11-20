import AI from '../components/AI';
import Board from '../components/Board';
import Cell from '../components/Cell';
import Controlls from '../components/Controlls';
import { Images } from '../utils/const';

export class GameScene extends Phaser.Scene {
	isGameOver: boolean = false;
	cells: Cell[] = [];

	AI: AI = null;
	BOARD: Board = null;
	CONTROLLS: Controlls = null;

	cellPointer: Cell;
	prevCellPointer: Cell;

	constructor() {
		super({
			key: 'GameScene',
		});
	}

	create(): void {
		this.add.sprite(0, 0, Images.BACKGROUND).setOrigin(0);

		this.input.on(
			'gameobjectup',
			function (pointer: Phaser.Input.Pointer, gameObject: Cell) {
				gameObject.emit('clickCell', gameObject);
			},
			this
		);

		this.AI = new AI(this.cells);
		this.BOARD = new Board(this);
		this.BOARD.drawBoard();
		this.CONTROLLS = new Controlls(this);
	}
}
