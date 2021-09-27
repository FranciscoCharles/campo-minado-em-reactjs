import React from 'react';
import { ColorfulDiv, ColumnDiv } from './style';

export default function Square(props) {

	function handleOnContextMenu(event) {
		event.preventDefault();
		if (props.game_state.gameOver
			|| props.game_state.isWinner) {
			return;
		}
		if (!props.element.hidden) { return; }

		if (props.element.flag) {
			props.game_state.countFlags++;
			props.element.flag = false;
		} else if (props.game_state.countFlags > 0) {
			props.game_state.countFlags--;
			props.element.flag = true;
		}

		const { winner, loser } = props.game_state.minefield.won();
		props.game_state.isWinner = winner;
		props.game_state.gameOver = loser;

		props.setGameState(() => {
			return { ...props.game_state };
		});

	}
	function handleClick() {
		if (props.game_state.gameOver
			|| props.game_state.isWinner
			|| !props.element.hidden
			|| props.element.flag) {
			return;
		}

		let { minefield } = props.game_state;
		const { row, column } = props.element;

		if (props.game_state.isFirstClick) {
			props.game_state.isFirstClick = false;
			if (minefield.bombInThisPosition(row, column)) {
				minefield.field[row][column].value = 0;
				minefield.countBombsAround();
			}
		}

		props.element.hidden = false;
		minefield.clickPosition(row, column);

		const { winner, loser } = minefield.won();
		props.game_state.isWinner = winner;
		props.game_state.gameOver = loser || minefield.bombInThisPosition(row, column);

		props.setGameState(_ => ({ ...props.game_state }));

	}
	const { row, column } = props.element;
	const color = String((row % 2) === (column % 2));
	const value = props.element.value;
	return (
		<ColorfulDiv isHidden={String(props.element.hidden)}
			color={color} value={String(props.element.value)}
			flag={String(props.element.flag)}
			onClick={handleClick}
			onContextMenu={handleOnContextMenu}>
			{(props.element.hidden || props.element.value < 1) ? '' : value}
		</ColorfulDiv>
	);
}

export function ColumnOfSquares(props) {
	const { game_state, setGameState } = props;
	return (
		<ColumnDiv>
			{props.columns.map((element) =>
				<Square {...{ game_state, setGameState }} key={element.id} element={element} />)}
		</ColumnDiv>
	);
}