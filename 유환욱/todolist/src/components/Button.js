import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: inline-flex;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.3rem;

  height: 2.25rem;
  font-size: 1rem;

  background: green;
  &:hover {
    background: red;
  }
  &:active {
    background: blue;
  }

  & + & {
    margin-left: 0.5rem;
  }
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
