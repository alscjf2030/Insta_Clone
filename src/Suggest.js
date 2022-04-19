import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Permit from "./elements/Permit";

const Suggest = () => {
  const login_user = useSelector((state) => state.user.user);
  return (
    <div>
      <Container>
        <LoginUserdiv>
          <Permit>
            <Loginuser>
              <img src={login_user?.profileImg}></img>
              <div>
                <span>{login_user?.userName}</span>
                <span>{login_user?.nickName}</span>
              </div>
              <button>Switch</button>
            </Loginuser>
          </Permit>
        </LoginUserdiv>
        <Textdiv>
          <span>Suggestions For You</span>
          <span>See All</span>
        </Textdiv>
        <div>
          <div>
            <SuggestUserdiv>
              <img src="https://yt3.ggpht.com/ytc/AKedOLQnoQzbgg4cE_7AhlpOoZq4UD9bfXSWgnFhpsFC=s900-c-k-c0x00ffffff-no-rj"></img>
              <div>
                <span>quanhaha79</span>
                <span>ha dong hoon</span>
              </div>
              <button>Follow</button>
            </SuggestUserdiv>
          </div>
          <div>
            <SuggestUserdiv>
              <img src="https://img.huffingtonpost.com/asset/620cbd78270000fa45458481.jpg?ops=scalefit_630_noupscale"></img>
              <div>
                <span>junha0465</span>
                <span>정준하</span>
              </div>
              <button>Follow</button>
            </SuggestUserdiv>
          </div>
          <SuggestUserdiv>
            <img src="http://www.jemin.com/news/photo/202012/708880_307701_3136.jpg"></img>
            <div>
              <span>kkachi99</span>
              <span>유세윤</span>
            </div>
            <button>Follow</button>
          </SuggestUserdiv>
          <SuggestUserdiv>
            <img src="https://cdn.daily.hankooki.com/news/photo/202005/20200502_1_bodyFimg_654768.jpg"></img>
            <div>
              <span>soobinms</span>
              <span>채수빈</span>
            </div>
            <button>Follow</button>
          </SuggestUserdiv>
        </div>
        <InfoTextdiv>
          <span>
            About · Help · Press · API · Jobs · Privacy · Terms · Locations ·
            Top · Accounts · Hashtags · Language · English
          </span>
          <span>© 2022 INSTAGRAM FROM META</span>
        </InfoTextdiv>
      </Container>
    </div>
  );
};
const InfoTextdiv = styled.div`
  width: 82%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  span {
    color: #cccccc;
    &:first-child {
      font-size: 11px;
    }
    &:last-child {
      margin-top: 10px;
      font-size: 13px;
    }
  }
`;

const SuggestUserdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 10px;
  img {
    width: 38px;
    height: 38px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: -60px;
    width: 30%;
    span {
      font-size: 13px;

      &:first-child {
        font-weight: 600;
      }
    }
  }
  button {
    background-color: white;
    border: none;
    font-weight: 500;
    color: #2e95f6;
    cursor: pointer;
  }
`;

const Textdiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 20px 0px;
  span {
    font-size: 15px;
    font-weight: 600;
    &:first-child {
      color: gray;
    }
  }
`;
const LoginUserdiv = styled.div``;
const Container = styled.div`
  width: 60%;
  margin-top: 50px;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding-top: 15px;
`;
const Loginuser = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: -60px;
    span {
      font-size: 15px;
      &:first-child {
        font-weight: 700;
      }
    }
  }
  button {
    background-color: white;
    border: none;
    font-weight: 600;
    color: #2e95f6;
    cursor: pointer;
  }
`;

export default Suggest;
