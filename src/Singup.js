import React, { useRef, useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import styled from "styled-components";
import { Reset } from "styled-reset";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./redux/modules/user";

const Singup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRegExp =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  const emailref = useRef();
  const usernameref = useRef();
  const nicknameref = useRef();
  const passwordref = useRef();
  const preview = useSelector((state) => state.user?.preview);

  const [files, setFiles] = useState([
    new File([], "", { type: "text/plane" }),
  ]);

  const onImgChange = (e) => {
    const file = e.target.files;
    setFiles(file);

    const reader = new FileReader();
    const imgFile = file[0];
    reader.readAsDataURL(imgFile);
    reader.onloadend = () => {
      dispatch(actionCreators.setPreview(reader.result));
    };
  };

  const signupBtnClick = () => {
    const email = emailref.current.value;
    const username = usernameref.current.value;
    const nickname = nicknameref.current.value;
    const password = passwordref.current.value;

    if (email.match(emailRegExp) === null) {
      window.alert("이메일 형식을 확인해주세요");
      return;
    }
    if (username.length < 2 || username.length > 7) {
      window.alert("성명은 최소 2자리입니다.");
      return;
    }
    if (nickname.length < 4 || nickname.length > 10) {
      window.alert("닉네임은 4~10자리 입니다.");
      return;
    }
    if (password.length < 4 || password.length > 16) {
      window.alert("비밀번호는 4~16자리 입니다.");
      return;
    }
    console.log(files[0]);
    const formdata = new FormData();
    formdata.append("profileImg", files[0]);
    formdata.append("userEmail", email);
    formdata.append("userName", username);
    formdata.append("nickName", nickname);
    formdata.append("password", password);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    dispatch(actionCreators.singUpDB(formdata, config));
  };
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <Container>
        <SignupDiv>
          <div>
            <img src="https://fontmeme.com/images/instagram-new-logo.png"></img>
            <p>친구들의 사진과 동영상을 보려면 가입하세요.</p>
            <button>
              <FaFacebookSquare style={{ width: "14px", height: "14px" }} />
              Facebook으로 로그인
            </button>
          </div>
          <div>
            <span>또는</span>
            <input placeholder="이메일 주소" ref={emailref}></input>
            <input placeholder="성명" ref={usernameref}></input>
            <input placeholder="닉네임(4~10자)" ref={nicknameref}></input>
            <input
              type="password"
              placeholder="비밀번호(4~16자)"
              ref={passwordref}
            ></input>
            <p>내 프로필 사진</p>
            <img
              src={
                preview
                  ? preview
                  : "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"
              }
            ></img>
            <input type="file" accept="image/*" onChange={onImgChange}></input>
            <button onClick={signupBtnClick}>가입</button>
          </div>
        </SignupDiv>
        <Tologindiv>
          <span>계정이 있으신가요?</span>
          <span
            onClick={() => {
              history.push("/");
            }}
          >
            로그인
          </span>
        </Tologindiv>
        <TodownloadDiv>
          <div>
            <span>앱을 다운로드 받으세요</span>
          </div>
          <div>
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"></img>
            <img src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"></img>
          </div>
        </TodownloadDiv>
      </Container>
    </div>
  );
};

const SignupDiv = styled.div`
  border: 1px solid #dbdbdb;
  div {
    &:first-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 55%;
      }
      p {
        color: #919191;
        font-size: 15px;
        font-weight: 600;
      }
      button {
        background-color: #2e95f6;
        border: none;
        border: 1px solid #dbdbdb;
        color: white;
        height: 30px;
        border-radius: 4px;
        width: 82%;
        font-weight: 700;
      }
    }
    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      border-top: 1px solid #dbdbdb;
      margin-top: 20px;
      padding: 10px 0px;

      span {
        position: relative;
        bottom: 18px;
        background-color: white;
        padding: 2px 10px;
      }
      input {
        width: 80%;
        height: 30px;
        background-color: #fafafa;
        border: 1px solid #dbdbdb;
        margin-bottom: 10px;
        border-radius: 4px;
        &:focus {
          outline: none;
        }
      }
      button {
        border: 1px solid #dbdbdb;
        color: white;
        height: 30px;
        border-radius: 4px;
        background-color: #b2dffc;
        width: 82%;
        font-weight: 700;
        margin-bottom: 25px;
        &:hover {
          background-color: #2e95f6;
        }
      }
      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin-top: -10px;
        margin-bottom: 5px;
      }
      p {
        margin-top: -8px;
      }
    }
  }
`;

const TodownloadDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 130px;
  }
  div {
    &:first-child {
      margin: 15px 0px;
    }
    &:last-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
    }
  }
`;

const Tologindiv = styled.div`
  border: 1px solid #dbdbdb;
  margin: 10px 0px;
  padding: 17px 10px;
  display: flex;
  justify-content: space-around;
  span {
    font-size: 13px;
    &:last-child {
      margin-left: -90px;
      color: #2e97f6;
      cursor: pointer;
      font-weight: 600;
    }
  }
`;

const Container = styled.div`
  width: 23%;
  margin: 30px auto;
  background-color: white;
`;
export default Singup;
