import React from "react";
import styled, { CSSObject } from "styled-components";

export type ButtonProps = {
    children?: React.ReactChild;
    onClick?: () => void;
    style?: CSSObject;
    color?: "primary" | "secondary";
};



const StyledBaseButton = styled.button<ButtonProps>`
  left: 25%;
  cursor: pointer;
  border-width: 0;
  padding: 5px;
  margin: 5px;
  font-family: "NotoSansCJKjp", monospace;
  font-size: 20px;
  border-radius: 5px;
  width: 50%;
  color: white;
  background: ${props => (props.color === "secondary" ? "yellowgreen" : "deeppink")};
  transition: background 0.5s;
  ${props => props.style};
`;

export const Button: React.FC<ButtonProps> = ({ ...props }) => (
    <StyledBaseButton {...props} />
);

export default Button;
