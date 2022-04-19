import React, { useRef } from "react";
import styled from "styled-components";
import UploadSlider from "./UploadSlider";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { actionCreators2 } from "./redux/modules/post";
import { actionCreators } from "./redux/modules/user";

const EditPost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const contentref = useRef();
  const params = useParams();
  const login_user = useSelector((state) => state.user?.user);
  const detail_post = useSelector((state) => state.post.detailPost);
  const editBtnClick = () => {
    const content = contentref.current.value;
    dispatch(actionCreators2.editPostDB(params.id, content));
  };

  React.useEffect(() => {
    dispatch(actionCreators.userCheckDB());
    dispatch(actionCreators2.getDetailPostDB(params.id));
  }, []);
  if (!detail_post) {
    return <div></div>;
  }
  return (
      <Container>
        <Whitebox>
          <PostingHeader>
            <img
                src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FmHgZI%2FbtrzEAzmJLI%2FkIBgE9GI85myyyd1zt0xA1%2Fimg.png"
                onClick={() => {
                  history.goBack();
                }}
            ></img>
            <span>내 게시물 수정하기</span>
            <button onClick={editBtnClick}>수정하기</button>
          </PostingHeader>
          <Underdiv>
            <UnderLeft>
              <UploadSlider img_list={detail_post?.contentImg} />
            </UnderLeft>
            <UnderRigth>
              <Userdiv>
                <img src={login_user?.profileImg}></img>
                <span>{login_user?.nickName}</span>
              </Userdiv>
              <textarea
                  placeholder="문구 입력..."
                  ref={contentref}
                  maxLength="100"
                  defaultValue={detail_post.content}
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

export default EditPost;
