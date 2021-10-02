import React from 'react';
import { ColorfulDiv, RowDiv } from './style';

export default function Square(props) {

	function handleOnContextMenu(event) {
		event.preventDefault();
		if (props.game_state.gameOver
			|| props.game_state.isWinner) {
			return;
		}
		if (!props.element.hidden) { return; }

		let { countFlags } = props.game_state;

		if (props.element.flag) {
			countFlags++;
			props.element.flag = false;
		} else if (props.game_state.countFlags > 0) {
			countFlags--;
			props.element.flag = true;
		}

		const { winner, loser } = props.game_state.minefield.won();

		props.setGameState(() => {
			return { ...props.game_state, countFlags, isWinner: winner, gameOver: loser };
		});

	}
	function handleClick() {
		if (props.game_state.gameOver
			|| props.game_state.isWinner
			|| !props.element.hidden
			|| props.element.flag) {
			return;
		}

		let { minefield, isFirstClick } = props.game_state;
		const { row, column } = props.element;

		if (isFirstClick) {
			isFirstClick = false;
			if (minefield.bombInThisPosition(row, column)) {
				minefield.field[row][column].value = 0;
				minefield.countBombsAround();
			}
		}

		props.element.hidden = false;
		minefield.clickPosition(row, column);

		const { winner, loser } = minefield.won();
		const isWinner = winner;
		const gameOver = loser || minefield.bombInThisPosition(row, column);

		props.setGameState(_ => ({ ...props.game_state, isFirstClick, isWinner, gameOver }));

	}
	const { row, column } = props.element;
	const color = String((row % 2) === (column % 2));
	const text_value = (props.element.hidden || props.element.value < 1) ? '' : props.element.value;
	return (
		<ColorfulDiv
			color={color}
			onClick={handleClick}
			onContextMenu={handleOnContextMenu}
			flag={String(props.element.flag)}
			value={String(props.element.value)}
			isHidden={String(props.element.hidden)}>
			{text_value}
		</ColorfulDiv>
	);
}

export function RowOfSquares(props) {
	const { game_state, setGameState } = props;
	return (
		<RowDiv>
			{props.columns.map((element) =>
				<Square {...{ game_state, setGameState }} key={element.id} element={element} />)}
		</RowDiv>
	);
}