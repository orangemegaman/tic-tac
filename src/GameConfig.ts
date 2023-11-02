import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';

export const GameConfig: Phaser.Types.Core.GameConfig = {
	title: 'XO',
	width: 1024,
	height: 768,
	scene: [BootScene, GameScene],
	type: Phaser.AUTO,
};

export const defaultSettings = {
	borderSize: 15,
};
