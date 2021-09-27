import { createGlobalStyle } from 'styled-components';
export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html{
    font-size: min(1.5vw, 1.5vh);
  }
  body{
    display: flex;
    flex-direction: column;

    align-items: center;
    align-content: center;
    justify-content: center;

    width: 100vw;
    height: 100vh;
  }

`;