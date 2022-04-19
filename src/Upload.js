import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators2 } from "./redux/modules/post";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import UploadSlider from "./UploadSlider";

const Upload = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const imgInput = useRef();
  const contentref = useRef();
  const post_preview = useSelector((state) => state.post.preview);
  const login_user = useSelector((state) => state.user.user);

  const [showImages, setShowimages] = useState([]);
  const [files, setFiles] = useState();
  const inputBtnClick = (e) => {
    e.preventDefault();
    imgInput.current.click();
  };
  const imgChange = (e) => {
    const imageLists = e.target.files;
    setFiles(imageLists);
    let imageUrlLists = [...showImages];

    for (let i = 0; i < imageLists.length; i++) {
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }
    if (imageUrlLists.length > 3) {
      imageUrlLists = imageUrlLists.slice(0, 3);
    }
    setShowimages(imageUrlLists);
    dispatch(actionCreators2.postPreview(imageUrlLists));
    // const reader = new FileReader();
    // const imgFile = file[0];
    // reader.readAsDataURL(imgFile);
    // reader.onloadend = () => {
    //   dispatch(actionCreators2.postPreview(reader.result));
    // };
  };
  const uploadBtnClick = () => {
    const content = contentref.current.value;
    if (content.length === 0) {
      window.alert("내용을 입력해주세요");
      return;
    }

    const formdata = new FormData();
    formdata.append("contentImg", files[0]);
    formdata.append("contentImg", files[1]);
    formdata.append("contentImg", files[2]);
    formdata.append("content", content);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    dispatch(actionCreators2.uploadPostDB(formdata, config));
  };

  if (!post_preview) {
    return (
      <Container>
        <Exitimg
          src="https://cdn.icon-icons.com/icons2/1524/PNG/512/x_106506.png"
          onClick={() => {
            history.push("/home");
          }}
        ></Exitimg>
        <Uploaddiv>
          <div>
            <span>새 게시물 만들기</span>
          </div>
          <div>
            <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FbMzFrB%2FbtrzzqLx4FZ%2Fv5MYYSbQpL6DCPcI6AaZo1%2Fimg.png"></img>
            <span>사진과 동영상을 여기에 놓으세요</span>
            <span>(최대 3장)</span>
            <button onClick={inputBtnClick}>컴퓨터에서 선택</button>
            <input
              type="file"
              multiple
              accept="image/*"
              ref={imgInput}
              onChange={imgChange}
            ></input>
          </div>
        </Uploaddiv>
      </Container>
    );
  } else if (post_preview) {
    return (
      <Container>
        <Whitebox>
          <PostingHeader>
            <img
              src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmHgZI%2FbtrzEAzmJLI%2FkIBgE9GI85myyyd1zt0xA1%2Fimg.png"
              onClick={() => {
                dispatch(actionCreators2.uploadPost());
                history.push("/home");
              }}
            ></img>
            <span>새 게시물 만들기</span>
            <button onClick={uploadBtnClick}>공유하기</button>
          </PostingHeader>
          <Underdiv>
            <UnderLeft>
              <UploadSlider img_list={showImages} />
            </UnderLeft>
            <UnderRigth>
              <Userdiv>
                <img src={login_user.profileImg}></img>
                <span>{login_user.nickName}</span>
              </Userdiv>
              <textarea
                placeholder="문구 입력..."
                ref={contentref}
                maxLength="100"
              ></textarea>
              <Optiondiv>
                <div>
                  <span>위치 추가</span>
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <span>접근성</span>
                  <FaAngleDown />
                </div>
                <div>
                  <span>고급설정</span>
                  <FaAngleDown />
                </div>
              </Optiondiv>
            </UnderRigth>
          </Underdiv>
        </Whitebox>
      </Container>
    );
  }
};

const Optiondiv = styled.div`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
    padding: 10px 6px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
`;

const UnderRigth = styled.div`
  width: 35%;
`;

const UnderLeft = styled.div`
  width: 65%;
  img {
    width: 100%;
    height: 582px;
    border-radius: 0px 0px 0px 20px;
  }
`;

const Underdiv = styled.div`
  display: flex;
  textarea {
    font-size: 16px;
    width: 98%;
    height: 200px;
    border: none;
    &:focus {
      outline: none;
    }
  }
`;

const Userdiv = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
  img {
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin-right: 7px;
  }
  span {
    font-size: 15px;
  }
`;

const PostingHeader = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  img {
    width: 40px;
    cursor: pointer;
  }
  span {
    font-size: 16px;
    font-weight: 550;
  }
  button {
    background-color: white;
    border: none;
    color: #2e95f6;
    font-weight: 700;
    cursor: pointer;
  }
`;

const Whitebox = styled.div`
  background-color: white;
  width: 60%;
  height: 87%;
  border-radius: 20px;
`;

const Exitimg = styled.img`
  position: absolute;
  width: 70px;
  top: 20px;
  right: 15px;
  cursor: pointer;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.85);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Uploaddiv = styled.div`
  background-color: white;
  width: 43%;
  height: 87%;
  border-radius: 15px;
  z-index: 999;
  div {
    &:first-child {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 16px;
        font-weight: 550;
      }
    }
    &:last-child {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        width: 14%;
        margin-top: 180px;
      }
      span {
        font-size: 18px;
        margin-bottom: 15px;
      }
      button {
        background-color: #2e95f6;
        padding: 5px 10px;
        border-radius: 5px;
        border: none;
        color: white;
        font-weight: 700;
      }
      input {
        display: none;
      }
    }
  }
`;

export default Upload;
