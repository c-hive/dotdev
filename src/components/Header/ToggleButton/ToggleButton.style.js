import { css } from "styled-components";

export const toggleButtonStyle = css`
  margin: 0px 25px 0px auto;

  .switch {
    position: relative;
    display: inline-block;
    width: 120px;
    height: 34px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .moon {
    height: 22px;
    width: 22px;
    opacity: 1;
    pointer-events: none;
    transition: opacity 0.45s ease 0s;
  }

  .moon svg {
    transition: stroke 0.45s ease 0s;
    stroke: ${props => props.theme.color};
  }

  .sun {
    height: 22px;
    width: 22px;
    opacity: 1;
    pointer-events: none;
    transition: opacity 0.45s ease 0s;
  }

  .sun svg {
    transition: stroke 0.45s ease 0s;
    stroke: ${props => props.theme.color};
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 60px;
    margin-left: 30px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: #ffffff;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input + .slider {
    background-color: #00acee;
  }

  input:checked + .slider {
    background-color: #3f3f3f;
  }

  input:checked + .slider:after {
    content: "";
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #424242;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
`;
