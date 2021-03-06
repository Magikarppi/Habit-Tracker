import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
  min-height: 100%;
  max-width: 100%;
  overflow-x: none;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    max-width: 100%;
    background: linear-gradient(teal, purple);
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #fafafa;
    text-align: center;
  }
  a:link {
    &:hover {
    background: #fffba8;
  }
  text-align: center;
  text-decoration: none;
  vertical-align: center;
  font-size: 1em;
  }
  button {
    background: #fafafa;
  &:hover {
    background: #fffba8;
  }
  font-size: 0.9em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #8f8d64;
  border-radius: 3px;
  text-align: center;
  }
  input {
  padding: 0.5em;
  margin: 0.5em;
  color: black;
  background: #fffba8;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  font-size: 17px;
  }
  h1 {
    font-size: 20px;
    @media (min-width: 767px) {
    font-size: 200%;
    }
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 30px;
  }
  .loading {
    font-size: 40px;
    margin-bottom: 20px;
  }
  .checkDelIcon {
    font-size: 20px;
  }
`;

export default GlobalStyle;
