import React, { Component } from "react";
import styled from "styled-components";

const StyledMainContainer = styled.div`
  z-index: 9;
  position: absolute;
  top: 80px;
  width: 132px;
  background: white;
  max-height: 100vh;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    width: 6px;
    background: white;
  }
  ::-webkit-scrollbar-thumb {
    background: #393812;
    -webkit-border-radius: 1ex;
    -webkit-box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
  }
  ::-webkit-scrollbar-corner {
    background: #000;
  }
`;

const StyledTopContainer = styled.div`
  background: ${(props) => (props.selectedData ? "blue" : "white")};
  color: white;
  padding: 1px 1px;
`;

const StyledP = styled.p`
  font-size: 12px;
`;

const StyledBottomContainer = styled.div``;

const StyledInput = styled.input`
  border: none;
  border-bottom: 0.1px solid #d3d3d3;
  padding: 5px;
  margin-top: 5px;
  outline: none;
  color: grey;
`;

class DropDown extends Component {
  state = {
    selectedData: [],
    data: this.props.data,
  };

  onClickTruck = (a) => {
    const { selectedData } = this.state;
    this.setState({ selectedData: [...selectedData, a] }, () => {
        // console.log(this.state.selectedData, 'selected data')
        this.props.setData(this.state.selectedData);
    });
  };

  dataToBeRendered = () => {
    const { selectedData } = this.state;
    const { data } = this.props;
    let result = data.filter((a) => !selectedData.includes(a.truckNumber));
    return result;
  };

  render() {
    let { data } = this.state;
    const { selectedData } = this.state;
    return (
      <StyledMainContainer>
        <StyledTopContainer
          selectedData={selectedData.length > 0 ? true : false}
        >
          {selectedData.length > 0 &&
            selectedData.map((a, idx) => {
              return (
                <div
                  style={{
                    cursor: "pointer",
                    borderBottom: "0.1px solid #d3d3d3",
                  }}
                  key={idx}
                >
                  <StyledP>{a.truckNumber}</StyledP>
                </div>
              );
            })}
        </StyledTopContainer>
        <StyledInput placeholder="Search here... " />
        <StyledBottomContainer>
          {this.dataToBeRendered().map((a, idx) => {
            return (
              <div
                style={{
                  cursor: "pointer",
                  borderBottom: "0.1px solid #d3d3d3",
                }}
                key={idx}
                onClick={() => this.onClickTruck(a)}
              >
                <StyledP>{a.truckNumber}</StyledP>
              </div>
            );
          })}
        </StyledBottomContainer>
      </StyledMainContainer>
    );
  }
}

export default DropDown;
