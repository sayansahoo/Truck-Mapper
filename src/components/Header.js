import React, { Component } from "react";
import styled from "styled-components";
import { headerFilters, commonHandler } from "../utils/helper";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

const StyledSpan = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  h5 {
    margin-bottom: 10px;
  }
  p {
    margin-top: 0;
  }
`;

class Header extends Component {
  render() {
    const { handleClick, newArray } = this.props;
    return (
      <StyledHeader>
        {headerFilters(newArray).map((a, idx) => (
          <StyledSpan onClick={(e) => handleClick(e, a.name)} key={idx}>
            <h5>{a.name}</h5>
            <p>{a.count}</p>
          </StyledSpan>
        ))}
      </StyledHeader>
    );
  }
}

export default Header;
