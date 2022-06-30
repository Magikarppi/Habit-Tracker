import { createGlobalStyle } from 'styled-components';

export const colors = {
  greenish: '#eaff75',
  cWhite: '#f9ffd9',
  cBlack: '#242424',
  cGrey: '#6b6b6a',
};

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
    background: linear-gradient(#242424, #6b6b6a);
    font-family: Open-Sans, Helvetica, Sans-Serif;
    color: #f9ffd9;
    text-align: center;
  }
  a:link {
    color: #242424;
    background: #f9ffd9;
    &:hover {
    background: #eaff75;
    color: #242424;
    }
    &:visited {
    color: #242424;
    }
  text-align: center;
  text-decoration: none;
  vertical-align: center;
  font-size: 1em;
  }
  button {
    background: #f9ffd9;
  &:hover {
    background: #eaff75;
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
  background: #f9ffd9;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  text-align: center;
  font-size: 17px;
  }
  h1 {
    color: #eaff75;
    font-size: 20px;
    @media (min-width: 767px) {
    font-size: 200%;
    }
  }
  h2 {
    color: #eaff75;
    font-size: 40px;
  }
  h3 {
    color: #eaff75;
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
