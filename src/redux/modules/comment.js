import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import { RESP } from "../../response";
import { actionCreators2 } from "./post";

//action
const GETCOMMENT = "getComment";
const ADDCOMMENT = "addComment";
const DELETECOMMENT = "deleteComment";
//init
const init = {
    list: [],
};

//action creators
const getComment = createAction(GETCOMMENT, (comment_list) => ({
    comment_list,
}));
const addComment = createAction(ADDCOMMENT, (comment) => ({ comment }));
const deleteComment = createAction(DELETECOMMENT, () => ({}));

//middleware
const getCommentDB = (postId) => {
    return async function (dispatch, getState, { history }) {
        try {
            const response = await axiosInstance.get(`/api/comment/${postId}`);
            // const response = RESP.COMMENTPOSTIDGET;
            console.log(response);
            dispatch(getComment(response.data));
        } catch (err) {
            console.log(err);
        }
    };
};
const MaddCommentDB = (postId, comment) => {
    return async function (dispatch, getState, { history }) {
        console.log(postId, comment);
        try {
            const response = await axiosInstance.post(`/api/comment/${postId}`, {
                comment,
            });
            // const response = RESP.COMMENTPOSTIDPOST;
            console.log(response);

            if (response.status === 200) {
                dispatch(actionCreators2.commentMaintoPost({ postId, comment }));
            }
        } catch (err) {
            console.log(err);
        }
    };
};
const addCommentDB = (postId, comment) => {
    return async function (dispatch, getState, { history }) {
        try {
            const response = await axiosInstance.post(`/api/comment/${postId}`, {
                comment,
            });
            // const response = RESP.COMMENTPOSTIDPOST;

            if (response.status === 200) {
                dispatch(getCommentDB(postId));
            }
        } catch (err) {
            console.log(err);
        }
    };
};
const deleteCommentDB = (commentId, postId) => {
    return async function (dispatch, getState, { history }) {
        const response = await axiosInstance.delete(`/api/comment/${commentId}`);
        // const response = RESP.COMMENTCOMMENTIDDELETE;
        if ((response.status = 200)) {
            window.alert("댓글이 삭제되었습니다.");
            dispatch(getCommentDB(postId));
        }
    };
};

//reducer
export default handleActions(
    {
        [GETCOMMENT]: (state, action) =>
            produce(state, (draft) => {
                draft.list = action.payload.comment_list;
            }),
        [ADDCOMMENT]: (state, action) =>
            produce(state, (draft) => {
                draft.list.push(action.payload.comment);
            }),
    },
    init
);

const actionCreators3 = {
    getComment,
    getCommentDB,
    MaddCommentDB,
    addCommentDB,
    deleteCommentDB,
};
export { actionCreators3 };
