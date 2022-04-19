import React, { useState } from "react";
import styled from "styled-components";
import { FaHome } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import { FaPlusSquare } from "react-icons/fa";
import { FaCompass } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import Permit from "./elements/Permit";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const login_user = useSelector((state) => state.user.user);
  const [isOpen, setIsOpen] = useState(false);

  const profileClick = () => {
    setIsOpen((curr) => !curr);
  };
  const logoutBtnClick = () => {
    sessionStorage.removeItem("token");
    dispatch(actionCreators.logOut());
    history.push("/");
  };

  if (login_user === undefined) {
    return <div></div>;
  }
  return (
      <Container>
        <div>
          <img src="https://fontmeme.com/images/instagram-new-logo.png"></img>
        </div>
        <div>
          <input placeholder="Search.."></input>
        </div>
        <div>
          <div>
            <FaHome
                style={{ width: "27px", height: "27px", marginRight: "12px" }}
            />
            <FaPaperPlane
                style={{ width: "27px", height: "27px", marginRight: "12px" }}
            />
            <FaPlusSquare
                onClick={() => {
                  history.push("/upload");
                }}
                style={{
                  width: "27px",
                  height: "27px",
                  marginRight: "12px",
                  cursor: "pointer",
                }}
            />
            <FaCompass
                style={{ width: "27px", height: "27px", marginRight: "12px" }}
            />
            <FaHeart
                style={{ width: "27px", height: "27px", marginRight: "12px" }}
            />
          </div>
          <Permit>
            <img src={login_user?.profileImg} onClick={profileClick}></img>
          </Permit>
          {isOpen ? <Togglediv onClick={logoutBtnClick}>Logout</Togglediv> : null}
        </div>
      </Container>
  );
};
const Togglediv = styled.div`
  position: absolute;
  top: 47px;
  right: 90px;
  border: 1px solid #dbdbdb;
  padding: 5px 10px;
  border-radius: 3px;
  width: 100px;
  height: 20px;
  font-size: 15px;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  div {
    &:first-child {
      img {
        width: 140px;
      }
    }
    &:nth-child(2) {
      input {
        width: 200px;
        margin: 0px -60px 0px -40px;
        height: 27px;
        border-radius: 10px;
        border: none;
        background-color: #efefef;
        &:focus {
          outline: none;
        }
      }
    }
    &:last-child {
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 9999px;
        position: relative;
      }
    }
  }
`;

export default Header;
