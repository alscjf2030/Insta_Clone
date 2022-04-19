import React, { useRef } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import user, { actionCreators } from "./redux/modules/user";
import { useDispatch } from "react-redux";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRegExp =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailref = useRef();
  const passwordref = useRef();
  const loginBtnClick = () => {
    const email = emailref.current.value;
    const password = passwordref.current.value;
    if (email.match(emailRegExp) === null) {
      window.alert("이메일 형식을 확인해주세요");
      return;
    }
    if (password.length < 4 || password.length > 16) {
      window.alert("비밀번호는 4~16자리 입니다.");
      return;
    }
    dispatch(actionCreators.loginDB(email, password));
  };

  return (
      <div style={{ backgroundColor: "#fafafa", height: "100vh" }}>
        <Container>
          <Leftdiv>
            <img src="https://blog.kakaocdn.net/dn/9JQqt/btrzvy3Bfrl/9qF7TrqsL2ISRpKKKhSbkK/img.png"></img>
          </Leftdiv>
          <Rightdiv>
            <LoginDiv>
              <div>
                <img src="https://fontmeme.com/images/instagram-new-logo.png"></img>
                <input placeholder="이메일 형식" ref={emailref}></input>
                <input
                    type="password"
                    placeholder="비밀번호"
                    ref={passwordref}
                ></input>
                <button onClick={loginBtnClick}>로그인</button>
              </div>
              <div>
                <span>또는</span>
                <span>
                <FaFacebookSquare style={{ width: "14px", height: "14px" }} />
                페이스북으로 로그인
              </span>
                <span>비밀번호를 잊으셨나요?</span>
              </div>
            </LoginDiv>
            <TosignupDiv>
              <span>계정이 없으신가요?</span>
              <span
                  onClick={() => {
                    history.push("/signup");
                  }}
              >
              가입하기
            </span>
            </TosignupDiv>
            <DownloadDiv>
              <span>앱을 다운로드 받으세요</span>
              <div>
                <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"></img>
                <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"></img>
              </div>
            </DownloadDiv>
          </Rightdiv>
        </Container>
      </div>
  );
};
const LoginDiv = styled.div`
  width: 70%;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #dbdbdb;
  margin-bottom: 15px;
  background-color: white;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    &:first-child {
      width: 100%;
      img {
        width: 200px;
      }
      input {
        width: 95%;
        height: 30px;
        background-color: #fafafa;
        border: 1px solid #dbdbdb;
        margin-bottom: 10px;
        border-radius: 4px;
      }
      button {
        border: 1px solid #dbdbdb;
        color: white;
        height: 30px;
        border-radius: 4px;
        background-color: #b2dffc;
        width: 97%;
        font-weight: 700;
        margin-bottom: 25px;
        &:hover {
          background-color: #2e95f6;
        }
      }
    }
    &:last-child {
      width: 80%;
      border-top: 1px solid #dbdbdb;
      span {
        &:nth-child(1) {
          background-color: white;
          padding: 2px 10px;
          position: relative;
          bottom: 11px;
        }
        &:nth-child(2) {
          font-size: 14px;
          color: #385285;
          font-weight: 600;
          margin-bottom: 21px;
          margin-top: 13px;
        }
        &:nth-child(3) {
        }
      }
    }
  }
`;

const TosignupDiv = styled.div`
  width: 70%;
  border: 1px solid #dbdbdb;
  padding: 20px 15px;
  display: flex;
  align-items: center;
  background-color: white;
  span {
    margin: auto;
    font-size: 14px;
    &:last-child {
      color: #2e97f6;
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

const DownloadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  div {
    width: 280px;
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    img {
      width: 130px;
    }
  }
`;
const Rightdiv = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Leftdiv = styled.div`
  width: 50%;
  img {
    width: 98%;
  }
`;
const Container = styled.div`
  width: 50%;
  margin: 20px auto;
  display: flex;
`;
export default Login;
