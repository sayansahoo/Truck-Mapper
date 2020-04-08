import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faBatteryFull } from "@fortawesome/free-solid-svg-icons";
import { timeElapsed } from "../utils/helper";

const StyledH4 = styled.h5`
  padding: 5px;
`;

const StyledMainBox = styled.div`
  border-bottom: 0.1px solid #d3d3d3;
  displa: flex;
  flex-direction: column;
  background: ${(props) => (props.color === "red" ? "red" : "null")};
`;
const StyledOuterBox = styled.div`
  display: flex;
  justify-content: space-around;
  color: ${(props) => (props.color === "red" ? "white" : "black")};
  height: 30px;
`;

const StyledInnerBox = styled.div`
  display: flex;
  align-items: center;
`;

const StyledP = styled.p`
  font-size: 10px;
  margin-left: ${(props) => (props.status !== "Running" ? "36px" : "19px")};
  color: ${(props) => (props.color === "red" ? "white" : "black")};
`;

const StyledLastContainer = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.status === "Running" ? "space-around" : "flex-start"};
  align-items: center;
`;

class SideBox extends Component {
  render() {
    const {
      truckNumber,
      lastCreateTime,
      color,
      status,
      speed,
      stopStartTime,
    } = this.props;
    return (
      <StyledMainBox color={color}>
        <StyledOuterBox color={color}>
          <StyledInnerBox>
            <StyledH4>{truckNumber}</StyledH4>
            <FontAwesomeIcon
              icon={color === "red" ? faBatteryFull : faTruck}
              size={"xs"}
              flip={"horizontal"}
              color={color === "red" ? "white" : "grey"}
            />
          </StyledInnerBox>
          <p style={{ fontSize: "10px" }}>{timeElapsed(lastCreateTime)}</p>
        </StyledOuterBox>
        <StyledLastContainer status={status}>
          <StyledP color={color} status={status}>
            {status === "Error" ? "Stopped" : status} since{" "}
            {timeElapsed(stopStartTime)}
          </StyledP>
          {speed > 0 && <StyledP>{speed} k/h</StyledP>}
        </StyledLastContainer>
      </StyledMainBox>
    );
  }
}
export default SideBox;
