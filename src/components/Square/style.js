import styled from 'styled-components';
import bomb_img from '../../asserts/bomb.png';
import flag_img from '../../asserts/flag.png';

const colors = {
	'-1': 'black',
	'0': 'black',
	'1': 'rgb(0,0,200)',
	'2': 'rgb(0,200,200)',
	'3': 'rgb(0,200,0)',
	'4': 'rgb(200,200,0)',
	'5': 'rgb(200,100,50)',
	'6': 'rgb(250,100,100)',
	'7': 'rgb(255,80,0)',
	'8': 'rgb(200,0,0)',
};
function selectCorrectBackgroundColor(props) {
	if (props.isHidden === 'true') {
		return props.color === 'true' ? 'rgb(0,180,0)' : 'rgb(0,255,0)';
	}
	return 'rgb(200,200,200)';
}
function displayCorrectImage(props) {
	if (props.isHidden === 'false' && props.value === '-1') {
		return `background-image : url(${bomb_img})`;
	} else if (props.flag === 'true') {
		return `background-image : url(${flag_img})`;
	}
	return 'background-image :none';
}
export const ColorfulDiv = styled.div`
	display:flex;
	align-items: center;
	justify-content: center;

	height: 5rem;
	width: 5rem;
	border: 2px solid black;
	-webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: black;
	text-align: center;
	color:${props => colors[props.value]};
	background-color: ${props => selectCorrectBackgroundColor(props)};
	${props => displayCorrectImage(props)};
	background-size: 100% 100%;
	font-size: 3.2rem;
	font-weight: bold;
	font-family: Arial, Helvetica, sans-serif;
`;
export const ColumnDiv = styled.div`
	display: flex;
`;