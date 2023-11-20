export default class Button {
	private buttonContainer: Phaser.GameObjects.Container;

	constructor(
		scene: Phaser.Scene,
		x: number,
		y: number,
		width: number,
		height: number,
		fontColor: string,
		texture: string,
		hoverTexture: string,
		text: string,
		scale: number = 0.4,
		callback: () => void
	) {
		const buttonText = scene.add.text(0, 0, text).setColor(fontColor).setOrigin(0.5);
		const buttonImage = scene.add.image(0, 0, 'ui', texture);
		buttonImage.scale = scale;

		this.buttonContainer = scene.add.container(x, y, [buttonImage, buttonText]);

		this.buttonContainer
			.setSize(buttonImage.displayWidth, buttonImage.displayHeight)
			.setInteractive();
		this.buttonContainer
			.on('pointerdown', function () {
				callback();
			})
			.on('pointerover', () => {})
			.on('pointerout', () => {});
	}

	get container() {
		return this.buttonContainer;
	}
}
