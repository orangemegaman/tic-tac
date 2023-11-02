export default class Button {
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
		callback: () => void
	) {
		const buttonText = scene.add.text(0, 0, text).setInteractive({ useHandCursor: true });
		const buttonImage = scene.add
			.image(x, y, 'ui', texture)
			.setOrigin(0)
			.setInteractive({ useHandCursor: true });
		buttonImage.scale = 0.4;

		const buttonContainer = scene.add.container(x, y, [buttonImage, buttonText]);

		buttonContainer
			.on('pointerdown', () => callback())
			.on('pointerover', () => {})
			.on('pointerout', () => {});

		scene.input.setHitArea(buttonContainer).on('gameobjectdown', callback, scene);
	}
}
