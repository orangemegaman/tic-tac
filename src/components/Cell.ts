import { GameScene } from '../scenes/GameScene';
import { Images } from '../utils/const';

export default class Cell extends Phaser.GameObjects.Sprite {
	id: number;
	onClick: (cell: Cell) => void;
	scene: GameScene;
	private _isActive = false;
	private _value: boolean | null = null;

	constructor(
		scene: GameScene,
		position: { x: number; y: number },
		texture: string,
		id: number,
		onClick: (cell: Cell) => void
	) {
		super(scene, position.x, position.y, texture);
		this.id = id;
		this.scene = scene;
		this.onClick = onClick;

		this.scene.add.existing(this);
		this.setInteractive();
		this.setOrigin(0, 0);
		this.on('clickCell', this.onClick.bind(this), this);
	}

	set value(value: boolean) {
		this._value = value;
		this.setTexture(value ? Images.CELL_X : Images.CELL_ZERO);
	}

	get value() {
		return this._value;
	}

	toggleActive(): void {
		this._isActive ? this.postFX.clear() : this.postFX.addBloom(0xffffff);
		this._isActive = !this._isActive;
	}
}
