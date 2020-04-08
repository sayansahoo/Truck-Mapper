import React, { Component } from "react";
import Map from "./Map";
import styled from "styled-components";
import Header from "./Header";
import SideBox from "./SideBox";
import { fetchTrucks } from "../utils/api";
import { commonHandler, statusCheck, headerFilters } from "../utils/helper";
import moment from "moment";

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
  flex: 4;
`;

class MapPage extends Component {
  state = {
    data: [],
    inputValue: "",
    color: "",
    newArray: [],
    selectedData: [],
    fieldName: "",
    rightSearchTerm: "",
  };

  componentDidMount() {
    fetchTrucks().then((response) =>
      this.setState(
        {
          newArray: response.data.map((a) => ({
            ...a,
            color: statusCheck(a).color,
            status: statusCheck(a).status,
          })),
        },
        () =>
          this.setState({
            data: response.data.map((a) => ({
              ...a,
              color: statusCheck(a).color,
              status: statusCheck(a).status,
            })),
          })
      )
    );
  }

  handleClick = (e, a, b, show) => {
    const { newArray } = this.state;
    if (show) {
      return;
    }
    if (b) {
      if (b === "empty") {
        this.setState({ data: newArray, selected: true });
      } else {
        this.setState({ data: b });
        // this.setState({ selected: true });
      }
    }
    if (a === "Total Trucks") {
      this.setState({
        data: newArray,
        selected: false,
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
    } else if (a === "Error Trucks") {
      const val = commonHandler.errorTrucks(newArray).data;
      this.setState({ data: val, selected: false });
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

  onClickTruck = (a, flag) => {
    if (flag) {
      this.setState({ selectedData: [] });
      this.handleClick(null, null, flag);
      return;
    }
    const { selectedData } = this.state;
    this.setState({ selectedData: [...selectedData, a] }, () => {
      this.handleClick(null, null, this.state.selectedData);
      this.setState({ rightSearchTerm: "" });
    });
  };

  removeTrucks = (r) => {
    const { selectedData, newArray } = this.state;
    const val = selectedData.filter((s) => s.truckNumber !== r.truckNumber);
    this.setState({ selectedData: val, data: val });
    if (selectedData.length - 1 === 0) {
      this.setState({ data: newArray });
    }
  };

  onRightSearch = (e) => {
    this.setState({ rightSearchTerm: e.target.value });
  };

  dataToBeRendered = () => {
    const { selectedData, newArray, rightSearchTerm } = this.state;
    let val = [];
    let result = newArray.filter((a) => !selectedData.includes(a));
    if (rightSearchTerm) {
      val = result.filter((a) => a.truckNumber.includes(rightSearchTerm));
      return val;
    }
    return result;
  };

  render() {
    const {
      data,
      inputValue,
      color,
      newArray,
      selected,
      selectedData,
      rightSearchTerm
    } = this.state;
    return (
      <StyledTopContainer>
        <Header
          handleClick={this.handleClick}
          newArray={newArray}
          data={data}
          selected={selected}
          onClickTruck={this.onClickTruck}
          dataToBeRendered={this.dataToBeRendered}
          selectedData={selectedData}
          removeTrucks={this.removeTrucks}
          onSearch={this.onRightSearch}
          rightSearchTerm={rightSearchTerm}
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
                // console.log(data.lastWaypoint.createTime, moment(data.lastWaypoint.createTime).fromNow())

                return (
                  <SideBox
                    key={idx}
                    truckNumber={data.truckNumber}
                    lastCreateTime={data.lastWaypoint.createTime}
                    color={data.color}
                    status={data.status}
                    speed={data.status === "Running" && data.lastWaypoint.speed}
                    stopStartTime={data.lastRunningState.stopStartTime}
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
