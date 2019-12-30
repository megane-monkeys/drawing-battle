import React from "react";
import styled, { CSSObject } from "styled-components";

export type ButtonProps = {
    children?: React.ReactChild;
    onClick?: () => void;
    style?: CSSObject;
};



const StyledBaseButton = styled.button<ButtonProps>`
  position: absolute;
  z-index: 1;
  top: 30vh;
  left: 25%;
  cursor: pointer;
  border-width: 0;
  padding: 10px;
  font-family: "NotoSansCJKjp", monospace;
  font-size: 36px;
  border-radius: 5px;
  width: 50%;
  margin: 10px;
  color: white;
  background: deeppink;
  transition: background 0.5s;
  ${props => props.style};
`;

export const Button: React.FC<ButtonProps> = ({ ...props }) => (
    <StyledBaseButton {...props} />
);

export default Button;
