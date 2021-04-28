import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
  min-height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    background: linear-gradient(teal, purple);
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #fafafa
  }
  a:link {
    background: #fafafa;
    &:hover {
    background: #fffba8;
  }
  text-align: center;
  vertical-align: center;
  font-size: 1em;
  margin: 1em;
  padding: 1em 1em;
  border: 2px solid rgba(255, 255, 220, 0.5);
  border-radius: 3px;
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
  h1 {
    font-size: 60px;
  }
  h2 {
    font-size: 40px;
  }
  h3 {
    font-size: 30px;
  }
`;

export default GlobalStyle;