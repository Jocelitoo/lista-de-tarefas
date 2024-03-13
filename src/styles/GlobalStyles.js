import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyles = createGlobalStyle`
:root{
 --primary-color: #C3073F;
 --primary-color-hover: #89052c;
 --bg-color-1: #0D0D0D ;
 --bg-color-2: #262626;
 --bg-color-3: #3d3d3d ;
 --bg-color-4: #565656 ;
 --font-color: #fff
}

.lightmode {
  --bg-color-1: #F2F2F2;
  --bg-color-2: #D9D9D9;
  --bg-color-3: #BFBFBF;
  --bg-color-4: #A6A6A6;
  --font-color: #000
}

*{
  border: none;
  margin: 0;
  padding: 0;
  outline: none;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
}

body{
  height: 100vh;
  font-family: sans-serif;
  font-size: 16px;
  color: var(--font-color);
}

html, border-style, #root{
  height: 100%;
  background-color: var(--bg-color-1);
}

#root{
 display: flex;
flex-direction: column;
}

main{
  flex: 1;
}

button{
  font-size: 16px;
  cursor: pointer;
  background-color: var(--primary-color);
  color: white;
  padding: 15px 32px;
  border-radius: 4px;
  transition: background-color 0.5s;
}

button:hover{
background-color: var(--primary-color-hover);
}

button:focus{
background-color: var(--primary-color-hover);
}

main{
  margin-top: 64px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

section{
  margin: 0 7vw 0;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 4px;
}
`;
