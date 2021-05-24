import React, { Component } from "react";
import styled from "styled-components";

const Button = styled.h1`
  background-color: ${(props) => props.theme.background};
`;

export default class Main extends Component {
  render() {
    return (
      <div>
        <Button>test2</Button>
      </div>
    );
  }
}
