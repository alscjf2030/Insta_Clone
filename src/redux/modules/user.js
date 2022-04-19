import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import axiosInstance from "../../shared/request";
import jwt_decode from "jwt-decode";
import { RESP } from "../../response";

//action
const GETUSER = "GetUser";
const LOGOUT = "Logout";
const SETPREVIEW = "setPreview";
const LOGINCHECK = "loginCheck";

//init
const initialState = {
  user: null,
  is_login: false,
};

//action creators
const getUser = createAction(GETUSER, (user) => ({ user }));
const logOut = createAction(GETUSER, () => ({}));
const setPreview = createAction(SETPREVIEW, (preview) => ({ preview }));
const loginCheck = createAction(LOGINCHECK, (token) => ({ token }));

//middleware
const singUpDB = (formdata, config) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post(
        "/api/user/signup",
        formdata,
        config
      );
      console.log(response);
      // const response = RESP.USERSIGNUPPOST;
      if (response.data.status === 200) {
        window.alert("회원가입 완료, 로그인 해주세요");
        history.push("/");
      } else if (response.data.status === 400) {
        window.alert(response.data.msg);
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const loginDB = (userEmail, password) => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.post("/api/user/login", {
        userEmail,
        password,
      });
      console.log(response);
      // const response = RESP.USERLOGINPOST;
      if (response.data.status === 200) {
        const accessToken = response.headers.authorization;
        let decoded = jwt_decode(accessToken);
        sessionStorage.setItem("token", accessToken);
        console.log(decoded);
        dispatch(
          getUser({
            userName: decoded.USER_NAME,
            nickName: decoded.NICKNAME,
            profileImg: decoded.PROFILEIMG,
            // userName: "변기원",
            // nickName: "Flow",
            // profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
          })
        );
        window.alert("로그인 성공! 환영합니다.");
        history.replace("/home");
      } else if (response.data.status === 400) {
        window.alert(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
  };
};

const userCheckDB = () => {
  return async function (dispatch, getState, { history }) {
    try {
      const response = await axiosInstance.get("/api/user/islogin");
      // const response = RESP.USERISLOGINGET;
      console.log(response);
      if (response.status === 200) {
        dispatch(
          getUser({
            userName: response.data.userName,
            nickName: response.data.nickName,
            profileImg: response.data.profileImg,
          })
        );
      } else {
        return;
      }
    } catch (err) {
      console.log(err.response);
    }
  };
};
//reducer
export default handleActions(
  {
    [GETUSER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOGOUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = null;
        draft.is_login = false;
      }),
    [SETPREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview = action.payload.preview;
      }),
    [LOGINCHECK]: (state, action) =>
      produce(state, (draft) => {
        const token = action.payload.token;
        let decoded = jwt_decode(token);
        draft.user = {
          nickName: decoded.NICKNAME,
          profileImg: decoded.PROFILEIMG,
          userName: decoded.USER_NAME,
        };
        draft.is_login = true;
      }),
  },
  initialState
);

const actionCreators = {
  getUser,
  singUpDB,
  loginDB,
  userCheckDB,
  logOut,
  setPreview,
  loginCheck,
};
export { actionCreators };
