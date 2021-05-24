import React, { Component } from 'react';
import styled from 'styled-components';

export default class Main extends Component {
  render() {
    return (
      <div>
        <Button>
          test2
          <span className="span">test3</span>
        </Button>
      </div>
    );
  }
}

const Button = styled.div`
  background-color: ${props => props.theme.background};
  span {
    color: blue;
    background-color: blue;
  }
`;
