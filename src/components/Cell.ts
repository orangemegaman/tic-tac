import { GameScene } from '../scenes/GameScene';
import { Images } from '../utils/const';

export default class Cell extends Phaser.GameObjects.Sprite {
	id: number;
	scene: GameScene;
	private _value: boolean | null = null;

	constructor(scene: GameScene, position: { x: number; y: number }, texture: string, id: number) {
		super(scene, position.x, position.y, texture);
		this.id = id;
		this.scene = scene;

		this.scene.add.existing(this);
		this.setInteractive();
		this.setOrigin(0, 0);
	}

	set value(value: boolean) {
		this._value = value;
		this.setTexture(value ? Images.CELL_X : Images.CELL_ZERO);
	}

	get value() {
		return this._value;
	}
}
