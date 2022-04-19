import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators } from "./redux/modules/user";
import post, { actionCreators2 } from "./redux/modules/post";
import DetailSlider from "./DetailSlider";
import CommentList from "./CommentList";
import { actionCreators3 } from "./redux/modules/comment";
const Detail = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const params = useParams();
  const postId = parseInt(params.id);
  const detail_post = useSelector((state) => state.post.detailPost);
  const login_user = useSelector((state) => state.user.user);
  const token = sessionStorage.getItem("token");
  const [inputValue, setInputValue] = useState("");
  const inputChange = (e) => {
    setInputValue(e.target.value);
  };
  const commentBtnClick = () => {
    dispatch(actionCreators3.addCommentDB(postId, inputValue));
    setInputValue("");
  };
  const deletePost = () => {
    dispatch(actionCreators2.deletePostDB(postId));
  };

  const detaillikeClick = (postId) => {
    dispatch(actionCreators2.detailPostLikeDB(postId));
  };

  React.useEffect(() => {
    dispatch(actionCreators.loginCheck(token));
    dispatch(actionCreators2.getDetailPostDB(postId));
  }, []);
  if (detail_post) {
    return (
        <Container>
          <Whitediv>
            <Leftdiv>
              <DetailSlider img_list={detail_post.contentImg} />
            </Leftdiv>
            <Rightdiv>
              <Headdiv>
                <img src={detail_post.profileImg}></img>
                <span>{detail_post.nickName}</span>
                <span>·</span>
                <Followspan>Follow</Followspan>
                {login_user.nickName === detail_post.nickName ? (
                    <>
                      <p
                          onClick={() => {
                            history.push(`/edit/${detail_post.postId}`);
                          }}
                      >
                        Edit
                      </p>
                      <p onClick={deletePost}>Delete</p>
                    </>
                ) : null}
              </Headdiv>
              <Contentdiv>
                <img src={detail_post.profileImg}></img>
                <span>{detail_post.nickName}</span>
                <p>{detail_post.content}</p>
              </Contentdiv>
              <Commentdiv>
                <CommentList postId={postId} />
              </Commentdiv>
              <Buttondiv>
                <div>
                  {detail_post.clicked ? (
                      <FaHeart
                          style={{ marginRight: "15px", color: "red" }}
                          onClick={() => {
                            detaillikeClick(detail_post.postId);
                          }}
                      />
                  ) : (
                      <FaRegHeart
                          style={{ marginRight: "15px" }}
                          onClick={() => {
                            detaillikeClick(detail_post.postId);
                          }}
                      />
                  )}

                  <FaRegComment style={{ marginRight: "15px" }} />
                  <FaRegPaperPlane />
                </div>
                <div>
                  <FaRegBookmark />
                </div>
              </Buttondiv>
              <Infodiv>
                <span>{detail_post.likeCnt} likes</span>
                <small>{detail_post.createAt}</small>
              </Infodiv>
              <Inputdiv>
                <input
                    type="text"
                    placeholder="댓글 달기.."
                    onChange={inputChange}
                    value={inputValue}
                ></input>
                <button onClick={commentBtnClick}>Post</button>
              </Inputdiv>
            </Rightdiv>
          </Whitediv>
        </Container>
    );
  }
};
const Followspan = styled.span`
  color: #2e95f6;
`;
const Infodiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -5px;
  padding: 0px 8px;
  span {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
  }
  small {
    color: gray;
  }
`;
const Buttondiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 23px;
  padding: 10px 8px;
`;
const Inputdiv = styled.div`
  height: 53px;
  display: flex;
  align-items: center;
  input {
    width: 85%;
    height: 25px;
    font-size: 16px;
    border: none;
    padding-left: 8px;
    &:focus {
      outline: none;
    }
  }
  button {
    background-color: white;
    border: none;
    color: #2e95f6;
    font-weight: 600;
  }
`;
const Contentdiv = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 8px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  span {
    font-size: 13px;
    font-weight: 600;
    margin-right: 10px;
  }
`;
const Commentdiv = styled.div`
  height: 440px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;
const Headdiv = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 8px;
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
  span {
    font-size: 13px;
    font-weight: 600;
    &:nth-child(3) {
      margin: 0px 10px;
    }
    &:last-child {
      color: #2e95f6;
    }
  }
  p {
    margin-left: 12px;
    color: tomato;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
  }
`;
const Rightdiv = styled.div`
  width: 38%;
  height: 100%;
`;
const Leftdiv = styled.div`
  width: 62%;
  height: 100%;
`;
const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.6);
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Whitediv = styled.div`
  width: 78%;
  height: 700px;
  background-color: white;
  display: flex;
`;

export default Detail;
