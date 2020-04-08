import React, { Component } from "react";
import styled from "styled-components";
import { headerFilters } from "../utils/helper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { isMoment } from "moment";
import DropDown from "./DropwDown";

const StyledMainContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  flex: 9;
  cursor: pointer;
`;

const StyledDropDownContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 150px;
  text-align: center;
`;

const StyledDropDown = styled.button`
  flex: 1;
  margin: 30px 20px 10px 0;
  border: none;
  box-shadow: 2px 2px #d3d3d3;
  padding: 5px 5px;
  outline: none;
`;

const StyledSpan = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-basis: 0;
  flex-grow:1;
  cursor: pointer;
  h5 {
    margin-bottom: 10px;
  }
  p {
    margin-top: 0;
  }
`;
class Header extends Component {
  state = {
    dropdownVisible: false,
  };

  // componentDidMount() {
  //   document.addEventListener("mousedown", this.handleClickDropDown);
  // }

  // componentWillUnmount() {
  //   document.addEventListener("mousedown", this.handleClickDropDown);
  // }

  handleClickDropDown = (event) => {
    if (!this.container.current.contains(event.target)) {
      this.setState(
        {
          dropdownVisible: false,
        },
        () => this.props.onClickTruck(null, "empty")
      );
    }
  };

  onButtonClick = () => {
    this.setState({ dropdownVisible: !this.state.dropdownVisible }, () =>
      this.props.onClickTruck(null, "empty")
    );
  };

  container = React.createRef();

  render() {
    const {
      handleClick,
      newArray,
      setData,
      data,
      selected,
      onClickTruck,
      dataToBeRendered,
      selectedData,
      removeTrucks,
      onSearch,
      rightSearchTerm
    } = this.props;
    const { dropdownVisible } = this.state;
    const values = selected ? data : newArray;
   
    return (
      <StyledMainContainer>
        <StyledHeader>
          {headerFilters(values).map((a, idx) => (
            <StyledSpan
              onClick={(e) => handleClick(e, a.name, null, dropdownVisible)}
              key={idx}
            >
              <h5>{a.name}</h5>
              <p>{a.count}</p>
            </StyledSpan>
          ))}
        </StyledHeader>
        <StyledDropDownContainer ref={this.container}>
          <StyledDropDown onClick={this.onButtonClick}>
            Select{" "}
            <FontAwesomeIcon
              icon={dropdownVisible ? faCaretUp : faCaretDown}
              size={"lg"}
            />
          </StyledDropDown>
          {dropdownVisible && (
            <DropDown
              data={newArray}
              setData={setData}
              dropdownVisible={dropdownVisible}
              onClickTruck={onClickTruck}
              dataToBeRendered={dataToBeRendered}
              selectedData={selectedData}
              removeTrucks={removeTrucks}
              onSearch={onSearch}
              rightSearchTerm={rightSearchTerm}
            />
          )}
        </StyledDropDownContainer>
      </StyledMainContainer>
    );
  }
}

export default Header;
