import { GameConfig, defaultSettings } from '../GameConfig';
import { GameScene } from '../scenes/GameScene';
import { Images } from '../utils/const';
import Cell from './Cell';

export default class Board {
	scene: GameScene;

	constructor(scene: GameScene) {
		this.scene = scene;
	}

	public drawBoard(): void {
		this.createCells();
	}

	private getCellsPositions(): Array<{ x: number; y: number }> {
		const positions = [];
		const { borderSize } = defaultSettings;
		const cellTexure = this.scene.game.textures.get(Images.CELL_EMPTY).getSourceImage();
		const cellWidth = cellTexure.width;
		const cellHeight = cellTexure.height;
		const offsetX = (+GameConfig.width - cellWidth * borderSize) / 2;
		const offsetY = (+GameConfig.height - cellHeight * borderSize) / 2 + cellHeight * 1;

		for (let row = 0; row < defaultSettings.borderSize; row++) {
			for (let col = 0; col < defaultSettings.borderSize; col++) {
				positions.push({
					x: offsetX + col * cellWidth,
					y: offsetY + row * cellHeight,
				});
			}
		}
		return positions;
	}

	private createCells(): void {
		const positions = this.getCellsPositions();

		for (let i = 0; i < positions.length; i++) {
			const cell = new Cell(
				this.scene,
				positions[i],
				Images.CELL_EMPTY,
				i,
				this.handleCellClick
			);
			this.scene.cells.push(cell);
		}

		const firstPointedCell = this.scene.cells[Math.floor(this.scene.cells.length / 2)];
		this.scene.cellPointer = firstPointedCell;
		firstPointedCell.toggleActive();
	}

	private handleCellClick(cell: Cell): void {
		if (cell.value !== null) {
			return;
		}
		this.scene.AI.setBoard(cell.id);
		this.scene.cellPointer.toggleActive();
		this.scene.cellPointer = cell;
		this.scene.cellPointer.toggleActive();
	}
}
