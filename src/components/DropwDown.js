import React, { Component } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

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
  background: ${(props) => (props.selectedData ? "#4863A0" : "white")};
  color: white;
  padding: 1px 1px;
`;

const StyledP = styled.p`
  font-size: 12px;
`;

const StyledBottomContainer = styled.div``;

const StyledInput = styled.input`
  padding: 5px;
  margin: 5px 5px;
  outline: none;
  color: grey;
  width: 95px;
  border: 0.5px solid #d3d3d3;
`;

const StyledSelectedDiv = styled.div`
  cursor: pointer;
  border-bottom: 0.1px solid #d3d3d3;
`;

class DropDown extends Component {
  state = {
    data: this.props.data,
  };

  render() {
    const {
      selectedData,
      dataToBeRendered,
      onClickTruck,
      removeTrucks,
      onSearch,
      rightSearchTerm,
    } = this.props;
    return (
      <StyledMainContainer>
        <StyledTopContainer
          selectedData={selectedData.length > 0 ? true : false}
        >
          {selectedData.length > 0 &&
            selectedData.map((a, idx) => {
              return (
                <StyledSelectedDiv key={idx} onClick={() => removeTrucks(a)}>
                  <StyledP>
                    <FontAwesomeIcon icon={faMinus} /> {a.truckNumber}
                  </StyledP>
                </StyledSelectedDiv>
              );
            })}
        </StyledTopContainer>
        {selectedData.length !== this.props.data.length && (
          // <div>
          //   <hr />
            <div style={{border: '0.1px solid #d3d3d3'}}>
              <StyledInput
                value={rightSearchTerm}
                onChange={(e) => onSearch(e)}
                placeholder="Search here... "
              />
            {/* </div>
            <hr /> */}
          </div>
        )}
        <StyledBottomContainer>
          {dataToBeRendered().map((a, idx) => {
            return (
              <div
                style={{
                  cursor: "pointer",
                  borderBottom: "0.1px solid #d3d3d3",
                }}
                key={idx}
                onClick={() => onClickTruck(a)}
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
