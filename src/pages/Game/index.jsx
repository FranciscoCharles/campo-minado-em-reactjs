import React, { useState } from 'react';
import { Minefield, generateNumberOfBombs } from '../../scripts/minefield';
import { ImageFlag, Container, ContainerGame } from './style';
import { ColumnOfSquares } from '../../components/Square';
import flag_image from '../../asserts/flag.png';

function MenuGame(props) {
	let message = '';
	if (props.game_state.gameOver) {
		message = 'YOU LOST!';
	} else if (props.game_state.isWinner) {
		message = 'YOU WON!';
	}
	return (
		<Container>
			<button onClick={props.onReset}>Reset Game</button>
			{message !== '' && <p>{message}</p>}
			<ImageFlag src={flag_image} alt='' />
			<div className='countFlags'>
				{props.game_state.countFlags}
			</div>
		</Container>
	);
}
export default function Game() {
	const max_bombs = 50;
	const percentFlags = 0.7;
	const n_bombs = generateNumberOfBombs(max_bombs);
	const maxFlags = parseInt(n_bombs * percentFlags);

	const [game_state, setGameState] = useState({
		minefield: new Minefield(15, 15, n_bombs),
		isFirstClick: true,
		gameOver: false,
		isWinner: false,
		countFlags: maxFlags
	})

	function resetGame() {
		const n_bombs = generateNumberOfBombs(max_bombs);
		const maxFlags = parseInt(n_bombs * percentFlags);

		game_state.minefield.resetMineField(n_bombs);

		setGameState(() => ({
			...game_state,
			isFirstClick: true,
			gameOver: false,
			isWinner: false,
			countFlags: maxFlags
		}));
	}

	return (
		<ContainerGame>
			<MenuGame onReset={resetGame} {...{ game_state, setGameState }} />
			<div>
				{
					game_state.minefield.field.map((columns, index) =>
						<ColumnOfSquares key={index} columns={columns}{...{ game_state, setGameState }} />)
				}
			</div>
		</ContainerGame>);
}