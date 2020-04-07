import React, { Component } from "react";
import Map from "./Map";
import styled from "styled-components";
import Header from "./Header";
import SideBox from "./SideBox";
import { fetchTrucks } from "../utils/api";
import { commonHandler, statusCheck } from "../utils/helper";
const StyledTopContainer = styled.div`
  width: 100%;
`;

const StyledBottomContainer = styled.div`
  display: flex;
  flex: 1;
`;

const StyledLeftContainer = styled.div`
  flex: 1;
  max-height: 100vh;
  overflow-x: auto;
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
  input {
    border: none;
    border-bottom: 0.1px solid #d3d3d3;
    padding: 5px;
    margin-top: 5px;
    outline: none;
    color: grey;
  }
`;

const StyledRightContainer = styled.div`
  height: 100vh;
  flex: 5;
`;

class MapPage extends Component {
  state = {
    data: [],
    inputValue: "",
    color: "",
    newArray: [],
  };

  componentDidMount() {
    fetchTrucks().then((response) =>
      this.setState(
        {
          newArray: response.data.map((a) => ({
            ...a,
            color: statusCheck(a).color,
          })),
        },
        () =>
          this.setState({
            data: response.data.map((a) => ({
              ...a,
              color: statusCheck(a).color,
            })),
          })
      )
    );
  }

  handleClick = (e, a, b) => {
    const { newArray } = this.state;
    console.log(b, 'b')
    if(b) {
      this.setState({data: b})
      this.setState({selected: true})
    }
    if (a === "Total Trucks") {
        console.log('no')
        this.setState({
          data: newArray,
          selected: false
        });
    } else if (a === "Running Trucks") {
      const val = commonHandler.runningTrucks(newArray).data;
      this.setState({ data: val, selected: false });
    } else if (a === "Stopped Trucks") {
      const val = commonHandler.stoppedTrucks(newArray).data;
      this.setState({ data: val, selected: false });
    } else if (a === "Idle Trucks") {
      const val = commonHandler.idleTrucks(newArray).data;
      this.setState({ data: val, selected: false });
    } else if (a === "Running Trucks") {
    }
  };

  handleOnChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  searchData = () => {
    const { inputValue, data } = this.state;
    let val = [];
    if (inputValue) {
      val = data.filter((a) => a.truckNumber.includes(inputValue));
      return val;
    } else {
      return this.state.data;
    }
  };

  setData = (e) => {
    this.handleClick(null, null, e);
  };

  render() {
    const { data, inputValue, color, newArray, selected } = this.state;
    console.log(selected, 'data')
    return (
      <StyledTopContainer>
        <Header
          setData={this.setData}
          handleClick={this.handleClick}
          newArray={newArray}
        />
        <StyledBottomContainer>
          <StyledLeftContainer>
            <div>
              <div>
                <input
                  value={inputValue}
                  onChange={(e) => this.handleOnChange(e)}
                  placeholder="Search Trucks"
                ></input>
              </div>
              {this.searchData().map((data, idx) => {
                return (
                  <SideBox
                    key={idx}
                    truckNumber={data.truckNumber}
                    lastCreateTime={data.lastWaypoint.createTime}
                    truckRunningState={
                      data.lastRunningState.truckRunningState === 1
                        ? true
                        : false
                    }
                  />
                );
              })}
            </div>
          </StyledLeftContainer>
          <StyledRightContainer>
            <Map data={data} color={color} />
          </StyledRightContainer>
        </StyledBottomContainer>
      </StyledTopContainer>
    );
  }
}

export default MapPage;
