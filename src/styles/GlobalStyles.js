import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset'; // style-reset 패키지

const GlobalStyles = createGlobalStyle` 
${reset}
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
button,
input {
  background-color: transparent;
  outline: none;
  border: none;
  font-size: inherit;
}
ul,li {
  list-style: none;
  
}
a {
  color: inherit;
  text-decoration: none;
}

`;

export default GlobalStyles;
