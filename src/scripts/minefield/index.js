export function randint(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
export function generateNumberOfBombs(max_value) {
	return randint(max_value * 0.2, max_value * 0.8);
}
function isValidPosition(i, j, max_rows, max_columns) {
	return (i > -1 && i < max_rows) && (j > -1 && j < max_columns);
}
export class Minefield {
	constructor(rows, columns, n_bombs = 10) {
		this.rows = rows;
		this.columns = columns;
		this.n_bombs = n_bombs;
		this.createMineField();
		this.addBombers(n_bombs);
		this.countBombsAround();
	}
	resetMineField(n_bombs) {
		if (typeof n_bombs === undefined) {
			n_bombs = this.n_bombs;
		} else {
			this.n_bombs = n_bombs;
		}
		this.createMineField();
		this.addBombers(n_bombs);
		this.countBombsAround();
	}

	createMineField() {
		const field = [];
		for (let i = 0; i < this.rows; i++) {
			field.push([]);
			for (let j = 0; j < this.columns; j++) {
				field[i].push({
					value: 0,
					hidden: true,
					flag: false,
					id: i * this.rows + j,
					row: i,
					column: j
				});
			}
		}
		this.field = field;
	}
	bombInThisPosition(row, column) {
		if (!isValidPosition(row, column, this.rows, this.columns)) {
			throw Error('Invalid position!');
		}
		return this.#elementIsBomb(this.field[row][column]);
	}
	clickPosition(row, column) {
		const element = this.field[row][column];
		if (this.#elementIsBomb(this.field[row][column])) {
			this.revealAllBombs();
		} else if (element.value === 0) {
			this.revealSquareNeighbors(row, column);
		}
	}
	won() {
		let count_invalid_flags = 0;
		let visible_elements = 0;
		const total_elements = this.rows * this.columns;

		this.field.forEach((row_elements) => {
			row_elements.forEach((element) => {
				if (!element.hidden) {
					visible_elements++;
				} else if (element.flag) {
					if (!this.#elementIsBomb(element)) {
						count_invalid_flags++;
					}
				}
			})
		})
		const diff = (total_elements - visible_elements);
		return {
			winner: diff === this.n_bombs,
			loser: count_invalid_flags > 0 && (diff - count_invalid_flags) === this.n_bombs
		}
	}
	revealSquareNeighbors(current_row, current_column) {
		const neighbors = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1], [0, 1],
			[1, -1], [1, 0], [1, 1]
		];
		const max_rows = this.rows;
		const max_columns = this.columns;

		let array_neighbors = [[current_row, current_column]];

		while (array_neighbors.length > 0) {
			let [current_row, current_column] = array_neighbors.pop();

			array_neighbors = neighbors.reduce((acc, pos) => {
				const row = pos[0] + current_row;
				const column = pos[1] + current_column;
				if (isValidPosition(row, column, max_rows, max_columns)) {
					const elem = this.field[row][column];
					if (!this.#elementIsBomb(elem) && elem.hidden && !elem.flag) {
						elem.hidden = false;
						if (elem.value === 0) {
							acc.push([row, column]);
						}
					}
				}
				return acc;
			}, array_neighbors);

			const index = array_neighbors.indexOf([current_row, current_column]);
			if (index > -1) {
				array_neighbors.splice(index, 1);
			}
		}
	}
	revealAllBombs() {
		this.field.forEach((row_elements) => {
			row_elements.forEach((element) => {
				if (this.#elementIsBomb(element) && element.hidden) {
					element.hidden = false;
				}
			})
		})
	}
	#elementIsBomb = (element) => {
		return element.value <= -1;
	}
	addBombers(quantity) {
		const rows = this.rows - 1;
		const columns = this.columns - 1;
		let element, row, column;

		while (quantity > 0) {
			do {
				row = randint(0, rows);
				column = randint(0, columns);
				element = this.field[row][column];
			} while (this.#elementIsBomb(element))
			element.value = -1;
			quantity -= 1;
		}
	}

	countBombsAround() {
		const neighbors = [
			[-1, -1], [-1, 0], [-1, 1],
			[0, -1], [0, 1],
			[1, -1], [1, 0], [1, 1]
		];

		const countBombsAroundNeighbor = (current_row, current_column) => {
			return neighbors.reduce((acc, pos) => {
				const row = pos[0] + current_row;
				const column = pos[1] + current_column;
				if (isValidPosition(row, column, this.rows, this.columns)) {
					const element = this.field[row][column];
					acc += +this.#elementIsBomb(element);
				}
				return acc;
			}, 0)
		}

		this.field.forEach((row_elements) => {
			row_elements.forEach((element) => {
				if (this.#elementIsBomb(element)) return;
				element.value = countBombsAroundNeighbor(element.row, element.column)
			})
		})
	}
}
