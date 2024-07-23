import { createGlobalStyle, css } from "styled-components";
import reset from "styled-reset";
import "./font.css";

const GlobalStyle = createGlobalStyle`${css`
  ${reset};

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.bgColor};
    color: ${({ theme }) => theme.textColor};
    font-family: "Rowdies", sans-serif;
    font-size: 1rem;
    overflow-y: overlay;
    margin-top: -70px;
  }

  ::-webkit-scrollbar {
    width: 14px;
    height: 14px;
  }

  ::-webkit-scrollbar-thumb {
    outline: none;
    border-radius: 10px;
    border: 4px solid transparent;
    box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.15);
  }

  ::-webkit-scrollbar-thumb:hover {
    border: 4px solid transparent;
    box-shadow: inset 6px 6px 0 rgba(34, 34, 34, 0.3);
  }

  ::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }

  input,
  button,
  select {
    border: none;
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    background-color: transparent;
  }

  button {
    padding: 0;
    cursor: pointer;
  }

  input {
    min-width: 0;
    outline: none;
  }

  input::placeholder {
    color: inherit;
  }

  input:focus::-webkit-input-placeholder {
    opacity: 0;
  }
`}
`;

export default GlobalStyle;
