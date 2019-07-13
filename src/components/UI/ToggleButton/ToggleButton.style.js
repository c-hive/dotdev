import { css } from "styled-components";

export const toggleButtonStyle = css`
  margin: 0px 25px 0px auto;

  .switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .sun {
    height: 28px;
    width: 30px;
    position: relative;
    margin: 6px 5px;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.45s ease 0s;
  }

  input:checked + .slider .sun {
    opacity: 1;
  }

  .moon {
    height: 28px;
    width: 30px;
    position: absolute;
    opacity: 1;
    right: -3px;
    top: 6px;
    pointer-events: none;
    transition: opacity 0.45s ease 0s;
  }

  input:checked + .slider .moon {
    opacity: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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

  /* 
  Second toggle button
  */

  .divider {
    height: 10px;
  }

  .switch2 {
    position: relative;
    display: inline-block;
    width: 100px;
    height: 34px;
  }

  .switch2 input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .moon2 {
    height: 28px;
    width: 30px;
    position: relative;
    margin: 6px -30px;
    opacity: 1;
    pointer-events: none;
    transition: opacity 0.45s ease 0s;
  }

  .moon2 svg {
    transition: stroke 0.45s ease 0s;
    stroke: ${props => props.theme.color};
  }

  .sun2 {
    height: 28px;
    width: 30px;
    position: absolute;
    opacity: 1;
    right: -3px;
    top: 6px;
    pointer-events: none;
    transition: opacity 0.45s ease 0s;
  }

  .sun2 svg {
    transition: stroke 0.45s ease 0s;
    stroke: ${props => props.theme.color};
  }

  .slider2 {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 60px;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider2:before {
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

  input + .slider2 {
    background-color: #00acee;
  }

  input:checked + .slider2 {
    background-color: #3f3f3f;
  }

  input:checked + .slider2:after {
    content: "";
  }

  input:focus + .slider2 {
    box-shadow: 0 0 1px #424242;
  }

  input:checked + .slider2:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  .slider2.round {
    border-radius: 34px;
  }

  .slider2.round:before {
    border-radius: 50%;
  }
`;
