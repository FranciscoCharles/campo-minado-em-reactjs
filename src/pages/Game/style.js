import styled from 'styled-components';
export const ImageFlag = styled.img`
	height: 5rem;
	width: 5rem;
`;
export const Container = styled.div`
	display:flex;
	align-items: center;
	justify-content: center;
	justify-content: space-around;
	width: 52.5rem;
	border: 2px solid black;
	.countFlags{
		font-size: 4rem;
		font-weight: bold;
		font-family: Arial, Helvetica, sans-serif;
	}
	button{
		width: 15rem;
		text-align:center;
		height: 2.5rem;
		font-size: 1.6rem;
	}
	p{
		font-size: 1.6rem;
		font-weight: bold;
		font-family: Arial, Helvetica, sans-serif;
	}
`;
export const ContainerGame = styled.div`

	display:flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

`;