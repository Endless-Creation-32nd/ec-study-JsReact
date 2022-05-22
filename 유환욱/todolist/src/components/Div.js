import React from 'react';
import styled from 'styled-components';

const StyledDiv = styled.div`
  font-weight: bold;
  font-size: 20px;
  color: black;
`;

function Div({ children, ...rest }) {
  return <StyledDiv {...rest}>{children}</StyledDiv>;
}

export default Div;
