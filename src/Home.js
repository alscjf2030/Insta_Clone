import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Suggest from "./Suggest";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaEllipsisH } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegGrinBeam } from "react-icons/fa";
import { useSelector } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import { actionCreators3 } from "./redux/modules/comment";
import { actionCreators2 } from "./redux/modules/post";
import SimpleSlider from "./Slider";
import Scroll from "./shared/Scroll";

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const login_user = useSelector((state) => state.user?.user);
  const is_login = useSelector((state) => state.user?.is_login);
  const post_list = useSelector((state) => state.post?.list);
  const is_loading = useSelector((state) => state.post?.is_loading);
  const paging = useSelector((state) => state.post.paging);
  const lastPage = useSelector((state) => state.post.paging.lastPage);
  const [inputValue, setInputValue] = useState("");
  const commentBtnClick = (postId) => {
    dispatch(actionCreators3.MaddCommentDB(postId, inputValue));
    setInputValue("");
  };
  const onchangeInput = (e) => {
    setInputValue(e.target.value);
  };

  function displayedAt(createdAt) {
    const milliSeconds = new Date() - createdAt;
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }
  const likeClick = (postId) => {
    dispatch(actionCreators2.postLikeDB(postId));
  };

  useEffect(() => {
    if (login_user) {
      dispatch(actionCreators2.getFirstPostDB(login_user?.nickName));
    }
  }, [login_user]);

  if (is_login && paging.start !== null) {
    return (
        <Container>
          <PostContainer>
            <Scroll
                callNext={() => {
                  dispatch(
                      actionCreators2.getNextPostDB(login_user.nickName, paging.start)
                  );
                }}
                is_next={lastPage ? false : true}
                loading={is_loading}
            >
              {post_list?.map((v) => {
                const startTime = new Date(v.createAt).getTime();
                const postId = v.postId;
                return (
                    <Post key={v.postId}>
                      <Posttitle>
                        <div>
                          <img src={v.profileImg}></img>
                          <div>
                            <span>{v.nickName}</span>
                            <small>Seoul, South Korea</small>
                          </div>
                        </div>
                        <FaEllipsisH style={{ width: "40px", height: "18px" }} />
                      </Posttitle>
                      <Postimgdiv>
                        <SimpleSlider img_list={v.contentImg} />
                      </Postimgdiv>
                      <Icondiv>
                        <div>
                          {v.clicked ? (
                              <FaHeart
                                  style={{ marginRight: "15px", color: "red" }}
                                  onClick={() => {
                                    likeClick(postId);
                                  }}
                              />
                          ) : (
                              <FaRegHeart
                                  style={{ marginRight: "15px" }}
                                  onClick={() => {
                                    likeClick(postId);
                                  }}
                              />
                          )}

                          <FaRegComment style={{ marginRight: "15px" }} />
                          <FaRegPaperPlane />
                        </div>
                        <div>
                          <FaRegBookmark />
                        </div>
                      </Icondiv>
                      <Textdiv>
                        <span>좋아요 {v.likeCnt}개</span>
                        <div>
                          <span>{v.nickName}</span>
                          <p>{v.content}</p>
                        </div>
                        <span
                            onClick={() => {
                              history.push(`/detail/${postId}`);
                            }}
                            style={{ cursor: "pointer" }}
                        >
                      댓글 {v.commnetCnt}개 모두 보기
                    </span>
                        <small>{displayedAt(startTime)}</small>
                      </Textdiv>
                      <Inputdiv>
                        <div>
                          <FaRegGrinBeam
                              style={{ height: "20px", width: "20px" }}
                          />
                        </div>
                        <div>
                          <input
                              placeholder="댓글 달기..."
                              type="text"
                              onChange={onchangeInput}
                              value={inputValue}
                          ></input>
                          <button onClick={() => commentBtnClick(postId)}>
                            게시
                          </button>
                        </div>
                      </Inputdiv>
                    </Post>
                );
              })}
            </Scroll>
          </PostContainer>
          <SuggestContainer>
            <Suggest></Suggest>
          </SuggestContainer>
        </Container>
    );
  } else {
    return (
        <Notlogindiv>
          <span>로그인이 필요한 서비스입니다.</span>
          <button
              onClick={() => {
                history.push("/");
              }}
          >
            로그인 하러가기
          </button>
        </Notlogindiv>
    );
  }
};
const Notlogindiv = styled.div`
  padding-top: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 22px;
    font-weight: 550;
  }
  button {
    background-color: #2e95f6;
    border: none;
    padding: 10px 20px;
    border-radius: 12px;
    margin-top: 10px;
    color: white;
    font-weight: 700;
  }
`;

const Inputdiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 5px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  div {
    position: relative;
    &:first-child {
      margin-right: 30px;
    }
    &:nth-child(2) {
      width: 100%;
      input {
        width: 80%;
        height: 20px;
        border: none;
        font-size: 15px;
        &:focus {
          outline: none;
        }
      }
    }
  }
  button {
    background-color: white;
    border: none;
    color: skyblue;
    font-weight: 500;
    &:hover {
      font-weight: 700;
      color: blue;
    }
  }
`;
const Textdiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  padding: 5px 5px;
  span {
    &:first-child {
      font-weight: 700;
    }
  }
  div {
    display: flex;
    margin: 5px 0px;
    p {
      margin: 0px 10px;
    }
    span {
      font-weight: 700;
    }
  }
  small {
    margin: 5px 0px;
    color: rgba(0, 0, 0, 0.6);
  }
`;

const Container = styled.div`
  display: flex;
`;
const PostContainer = styled.div`
  width: 55%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 58px;
  background-color: #fafafa;
`;
const SuggestContainer = styled.div`
  width: 45%;
  height: 100vh;
  position: fixed;
  right: 10px;
  margin-top: 60px;
  background-color: #fafafa;
`;

const Post = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  margin-bottom: 18px;
  background-color: white;
`;

const Posttitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px;
  div {
    display: flex;
    align-items: center;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      margin-right: 10px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      span {
        font-size: 14px;
      }
    }
  }
`;

const Postimgdiv = styled.div`
  margin-bottom: 20px;
  img {
    width: 100%;
  }
`;

const Icondiv = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  padding: 3px 10px;
`;
export default Home;
