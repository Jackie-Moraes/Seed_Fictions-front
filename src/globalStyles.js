import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    border: none;
    outline: none;
  }
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #121313;
    color: #ffffff;
  }
  input, textarea, button {
    font-family: 'Lato', sans-serif;
    color: #ffffff;
  }
  button, a {
    cursor: pointer;
  }

  strong {
    font-weight: 700;
  }
`

export default GlobalStyle
