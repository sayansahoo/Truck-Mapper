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
  state = {
    dropdownVisible: false,
  };

  onButtonClick = () => {
    this.setState({ dropdownVisible: !this.state.dropdownVisible });
  };
  render() {
    const { handleClick, newArray, setData } = this.props;
    const { dropdownVisible } = this.state;

    return (
      <StyledMainContainer>
        <StyledHeader>
          {headerFilters(newArray).map((a, idx) => (
            <StyledSpan onClick={(e) => handleClick(e, a.name)} key={idx}>
              <h5>{a.name}</h5>
              <p>{a.count}</p>
            </StyledSpan>
          ))}
        </StyledHeader>
        <StyledDropDownContainer>
          <StyledDropDown onClick={this.onButtonClick}>
            Select{" "}
            <FontAwesomeIcon
              icon={dropdownVisible ? faCaretUp : faCaretDown}
              size={"lg"}
            />
          </StyledDropDown>
          {dropdownVisible && <DropDown data={newArray} setData = {setData} />}
        </StyledDropDownContainer>
      </StyledMainContainer>
    );
  }
}

export default Header;
