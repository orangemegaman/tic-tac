import AI from '../components/AI';
import Board from '../components/Board';
import Button from '../components/Button';
import Cell from '../components/Cell';
import { Images } from '../utils/const';

export class GameScene extends Phaser.Scene {
	isGameOver: boolean = false;
	cells: Cell[] = [];

	AI: AI = null;
	BOARD: Board = null;

	constructor() {
		super({
			key: 'GameScene',
		});
	}

	create(): void {
		this.add.sprite(0, 0, Images.BACKGROUND).setOrigin(0);

		this.AI = new AI(this.cells);
		this.BOARD = new Board(this);
		this.BOARD.drawBoard();
	}
}
