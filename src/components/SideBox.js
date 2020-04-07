import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

const StyledH4 = styled.h5`
  padding: 5px;
`;

const StyledMainBox = styled.div`
  border-bottom: 0.1px solid #d3d3d3;
  displa: flex;
  flex-direction: column;
`;
const StyledOuterBox = styled.div`
  display: flex;
  justify-content: space-around;
`;

const StyledInnerBox = styled.div`
  display: flex;
  align-items: center;
`;

class SideBox extends Component {
  render() {
    const { truckNumber } = this.props;
    return (
      <StyledMainBox>
        <StyledOuterBox>
          <StyledInnerBox>
            <StyledH4>{truckNumber}</StyledH4>
            <FontAwesomeIcon
              icon={faTruck}
              size={"xs"}
              flip={"horizontal"}
              color={"grey"}
            />
          </StyledInnerBox>
          <p style={{ fontSize: "10px" }}>22sec</p>
        </StyledOuterBox>
        <p style={{ fontSize: "10px", marginLeft: "10px" }}>
          Stopped since last 8 hours
        </p>
      </StyledMainBox>
    );
  }
}
export default SideBox;
