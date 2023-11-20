import { defaultSettings } from '../GameConfig';
import { convertCoordsToFlat, convertFlatToCoords } from '../utils/utils';
import Cell from './Cell';

export default class AI {
	board: string[] = new Array(defaultSettings.borderSize * defaultSettings.borderSize).fill(' ');
	lastMove: boolean = true;
	moves: number = 0;
	cells: Cell[] = [];
	Engine: Worker = null;

	constructor(cells: Cell[]) {
		this.cells = cells;
		this.Engine = new Worker(new URL('./mtdf(10)_worker.js', import.meta.url));
		console.log(this.Engine);
	}

	public setBoard(pos: number): boolean {
		const coords = convertFlatToCoords(pos);

		if (this.board[pos] === ' ') {
			this.board[pos] = this.lastMove ? 'x' : 'o';
			const currenCell = this.cells.find((cell) => +cell.id === pos);
			currenCell.value = this.lastMove;

			this.checkWinner(this.board);
			return true;
		} else {
			return false;
		}
	}

	private checkWinner(board: string[]) {
		const winner = this.checkWin(board);

		if (!winner) {
			this.lastMove = !this.lastMove;
			if (!this.lastMove) {
				setTimeout(this.makeMove.bind(this), 1);
			}
		} else {
			setTimeout(() => {
				alert(this.lastMove ? 'YOU WINNN' : 'LOOSER');
			}, 100);

			// 164
			// $('#move').text((last_move ? '[x]' : '[o]') + ' win');
			// $('.last').removeClass('last');
			// for (var i = 0; i < winner.count; i++) {
			// 	var pos =
			// 		defaultSettings.borderSize * (winner.row + i * winner.dy) +
			// 		(winner.col + i * winner.dx);
			// 	$('#m' + pos).addClass('last');
			// }
			// $('.move').removeClass('move').unbind('click');
		}
	}

	private checkWin(board: string[]) {
		const rule = 5;
		let winning = 0;
		for (var row = 0; row < defaultSettings.borderSize; row++) {
			for (var col = 0; col < defaultSettings.borderSize; col++) {
				if (this.getSymbol(board, row, col) != ' ') {
					// horizontal
					if (col <= defaultSettings.borderSize - rule) {
						winning = 1;
						while (
							this.getSymbol(board, row, col) ==
							this.getSymbol(board, row, col + winning)
						) {
							winning += 1;
						}
						if (winning >= rule) {
							return { row: row, col: col, count: winning, dx: 1, dy: 0 };
						}
					}
					// vertical
					if (row <= defaultSettings.borderSize - rule) {
						// |
						winning = 1;
						while (
							this.getSymbol(board, row, col) ==
							this.getSymbol(board, row + winning, col)
						) {
							winning += 1;
						}
						if (winning >= rule) {
							return { row: row, col: col, count: winning, dx: 0, dy: 1 };
						}

						// /
						if (col >= rule - 1) {
							winning = 1;
							while (
								this.getSymbol(board, row, col) ==
								this.getSymbol(board, row + winning, col - winning)
							) {
								winning += 1;
							}
							if (winning >= rule) {
								return { row: row, col: col, count: winning, dx: -1, dy: 1 };
							}
						}
						// \o
						if (col <= defaultSettings.borderSize - rule) {
							winning = 1;
							while (
								this.getSymbol(board, row, col) ==
								this.getSymbol(board, row + winning, col + winning)
							) {
								winning += 1;
							}
							if (winning >= rule) {
								return { row: row, col: col, count: winning, dx: 1, dy: 1 };
							}
						}
					}
				}
			}
		}
		return false;
	}

	private getSymbol(board: string[], row: number, col: number) {
		if (
			0 <= row &&
			row < defaultSettings.borderSize &&
			0 <= col &&
			col < defaultSettings.borderSize
		) {
			return board[row * defaultSettings.borderSize + col];
		} else {
			return '*';
		}
	}

	private makeMove() {
		// $('#move').text((last_move ? '[x]' : '[o]') + ' thinking...');
		const move = this.botMove(this.board, this.lastMove);
		this.setBoard(move);
	}

	private checkRow(board: string[], rule: number, symbol: 'x' | 'o' | ' ') {
		var opened = 0;
		var closed = 0;
		var winning = 0;
		for (var row = 0; row < defaultSettings.borderSize; row++) {
			for (var col = 0; col < defaultSettings.borderSize; col++) {
				if (this.getSymbol(board, row, col) == symbol) {
					// horizontal
					if (col <= defaultSettings.borderSize - rule) {
						winning = 1;
						while (
							this.getSymbol(board, row, col) ==
								this.getSymbol(board, row, col + winning) &&
							winning <= rule
						) {
							winning += 1;
						}
						if (winning == rule) {
							if (
								this.getSymbol(board, row, col + winning) == ' ' &&
								this.getSymbol(board, row, col - 1) == ' '
							) {
								opened += 1;
							} else {
								closed += 1;
							}
						}
					}
					// vertical
					if (row <= defaultSettings.borderSize - rule) {
						// |
						winning = 1;
						while (
							this.getSymbol(board, row, col) ==
								this.getSymbol(board, row + winning, col) &&
							winning <= rule
						) {
							winning += 1;
						}
						if (winning == rule) {
							if (
								this.getSymbol(board, row + winning, col) == ' ' &&
								this.getSymbol(board, row - 1, col) == ' '
							) {
								opened += 1;
							} else {
								closed += 1;
							}
						}
						// /
						if (col >= rule - 1) {
							winning = 1;
							while (
								this.getSymbol(board, row, col) ==
									this.getSymbol(board, row + winning, col - winning) &&
								winning <= rule
							) {
								winning += 1;
							}
							if (winning == rule) {
								if (
									this.getSymbol(board, row + winning, col - winning) == ' ' &&
									this.getSymbol(board, row - 1, col + 1) == ' '
								) {
									opened += 1;
								} else {
									closed += 1;
								}
							}
						}
						// \o
						if (col <= defaultSettings.borderSize - rule) {
							winning = 1;
							while (
								this.getSymbol(board, row, col) ==
									this.getSymbol(board, row + winning, col + winning) &&
								winning <= rule
							) {
								winning += 1;
							}
							if (winning == rule) {
								if (
									this.getSymbol(board, row + winning, col + winning) == ' ' &&
									this.getSymbol(board, row - 1, col - 1) == ' '
								) {
									opened += 1;
								} else {
									closed += 1;
								}
							}
						}
					}
				}
			}
		}
		return { opened: opened, closed: closed };
	}

	private isBetter(x: any, y: any) {
		if (x['5o'] + x['5c'] == y['5o'] + y['5c']) {
			if (x['4o'] == y['4o']) {
				if (x['3o'] == y['3o']) {
					if (x['2o'] == y['2o']) {
						if (x['4c'] == y['4c']) {
							if (x['3c'] == y['3c']) {
								if (x['2c'] == y['2c']) {
									return null;
								} else return x['2c'] > y['2c'];
							} else return x['3c'] > y['3c'];
						} else return x['4c'] > y['4c'];
					} else return x['2o'] > y['2o'];
				} else return x['3o'] > y['3o'];
			} else return x['4o'] > y['4o'];
		} else return x['5o'] + x['5c'] > y['5o'] + y['5c'];
	}

	private getResult(tempBoard: string[], symbol: 'x' | 'o' | ' ') {
		var result: any = {};
		for (var rule = 2; rule <= 6; rule++) {
			var count = this.checkRow(tempBoard, rule, symbol);
			result[rule + 'o'] = count['opened'];
			result[rule + 'c'] = count['closed'];
		}
		return result;
	}

	private getBoardCopy(board: string[], pos: number, symbol: 'x' | 'o' | ' ') {
		const tempBoard = [];
		for (let i = 0; i < defaultSettings.borderSize * defaultSettings.borderSize; i++) {
			tempBoard.push(board[i]);
		}
		tempBoard[pos] = symbol;
		return tempBoard;
	}

	private botMove(board: string[], player: boolean) {
		const enemy = player ? 'o' : 'x';
		const me = player ? 'x' : 'o';

		let bestPos = 0;
		let bestResult = null;
		let moveResult = null;

		//defense
		for (let i = 0; i < defaultSettings.borderSize * defaultSettings.borderSize; i++) {
			if (board[i] == ' ') {
				let result = this.getResult(this.getBoardCopy(board, i, enemy), enemy);

				if (bestResult == null) {
					bestPos = i;
					bestResult = result;
					moveResult = this.getResult(this.getBoardCopy(board, i, me), me);
				} else {
					const betterThan = this.isBetter(result, bestResult);
					if (betterThan == null) {
						//get the best of two
						result = this.getResult(this.getBoardCopy(board, i, me), me);
						if (this.isBetter(result, moveResult)) {
							bestPos = i;
							moveResult = result;
						}
					} else {
						if (betterThan) {
							bestPos = i;
							bestResult = result;
						}
					}
				}
			}
		}
		if (bestResult['5o'] + bestResult['5c'] == 0) {
			//offense
			var count_before = this.checkRow(board, 3, me);
			var count_before_4 = this.checkRow(board, 4, me);
			for (var i = 0; i < defaultSettings.borderSize * defaultSettings.borderSize; i++) {
				if (board[i] == ' ') {
					var tempBoard = this.getBoardCopy(board, i, me);
					if (bestResult['4o'] == 0) {
						// + bestResult['3o']
						var count = this.checkRow(tempBoard, 4, me);
						var result = count['closed'] - count_before_4['closed'];
						if (result > 0) {
							bestPos = i;
						}
						var count = this.checkRow(tempBoard, 3, me);
						var result = count['opened'] - count_before['opened'];
						if (result > 0) {
							bestPos = i;
						}
					}
					var count = this.checkRow(tempBoard, 4, me);
					var result = count['opened'];
					if (result > 0) {
						bestPos = i;
						break;
					}
				}
			}
		}
		//win move
		for (var i = 0; i < defaultSettings.borderSize * defaultSettings.borderSize; i++) {
			if (board[i] == ' ') {
				var count = this.checkRow(this.getBoardCopy(board, i, me), 5, me);
				var result = count['opened'] + count['closed'];
				if (result > 0) {
					bestPos = i;
					break;
				}
			}
		}
		if (board[bestPos] != ' ') {
			alert('superposition! = ' + bestPos + ' = ' + board[bestPos]);
		}
		return bestPos;
	}
}
