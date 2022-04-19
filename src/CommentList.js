import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import comment, { actionCreators3 } from "./redux/modules/comment";
import { useHistory } from "react-router-dom";

const CommentList = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const comment_list = useSelector((state) => state.comment.list);
  const login_user = useSelector((state) => state.user.user);
  const commentDeleteClick = (commentId) => {
    dispatch(actionCreators3.deleteCommentDB(commentId, props.postId));
  };

  React.useEffect(() => {
    dispatch(actionCreators3.getCommentDB(props.postId));
  }, []);

  return (
      <div>
        <Exitimg
            src="https://cdn.icon-icons.com/icons2/1524/PNG/512/x_106506.png"
            onClick={() => {
              history.push("/home");
            }}
        ></Exitimg>
        {comment_list.map((c) => {
          const commentId = c.commentId;
          return (
              <Commentdiv key={c.commentId}>
                <div>
                  <img src={c.profileImg}></img>
                  <span>{c.nickName}</span>
                  <p>{c.comment}</p>
                </div>
                {c.nickName === login_user.nickName ? (
                    <button
                        onClick={() => {
                          commentDeleteClick(commentId);
                        }}
                    >
                      삭제
                    </button>
                ) : null}
              </Commentdiv>
          );
        })}
      </div>
  );
};
const Commentdiv = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 5px 8px;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    width: 90%;
    img {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      margin-right: 5px;
    }
    span {
      margin-right: 8px;
      font-weight: 600;
    }
  }
  button {
    width: 38px;
    font-size: 12px;
    background-color: white;
    border: none;
    color: tomato;
    font-weight: 600;
  }
`;
const Exitimg = styled.img`
  position: absolute;
  width: 70px;
  top: 20px;
  right: 15px;
  cursor: pointer;
`;

export default CommentList;
