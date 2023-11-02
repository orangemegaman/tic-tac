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
		const sellWidth = cellTexure.width;
		const sellHeight = cellTexure.height;
		const offsetX = (+GameConfig.width - sellWidth * borderSize) / 2;
		const offsetY = (+GameConfig.height - sellHeight * borderSize) / 2 + sellHeight * 1;

		for (let row = 0; row < defaultSettings.borderSize; row++) {
			for (let col = 0; col < defaultSettings.borderSize; col++) {
				positions.push({
					x: offsetX + col * sellWidth,
					y: offsetY + row * sellHeight,
				});
			}
		}
		return positions;
	}

	private createCells(): void {
		const positions = this.getCellsPositions();

		for (let i = 0; i < positions.length; i++) {
			this.scene.cells.push(new Cell(this.scene, positions[i], Images.CELL_EMPTY, i));
		}
		const cellsGroup = this.scene.add.group(this.scene.cells);
		this.scene.input
			.setHitArea(cellsGroup.getChildren())
			.on('gameobjectdown', this.handleCellClick.bind(this), this.scene);
	}

	private handleCellClick(
		pointer: Phaser.Input.Pointer,
		cell: Cell,
		event: Phaser.Types.Input.EventData
	): void {
		if (cell.value !== null) {
			return;
		}
		this.scene.AI.setBoard(+cell.id);
	}
}
