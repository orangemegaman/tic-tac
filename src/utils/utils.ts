import { defaultSettings } from '../GameConfig';

export const convertCoordsToFlat = (x: number, y: number) => {
	return y * defaultSettings.borderSize + x - 1;
};

export const convertFlatToCoords = (pos: number): { x: number; y: number } => {
	return {
		y: pos % defaultSettings.borderSize,
		x: Math.floor(pos / defaultSettings.borderSize),
	};
};

export const convertPositionToBoard = (pos: number) => {
	Array(9)
		.fill('')
		.map(() => Array(9).fill(''));
	return {
		y: pos % defaultSettings.borderSize,
		x: Math.floor(pos / defaultSettings.borderSize),
	};
};
