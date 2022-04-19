export const RESP = {
  USERSIGNUPPOST: {
    status: 200,
  },
  USERLOGINPOST: {
    status: 200,
    token: "token",
    userEmail: "bkw9603@naver.com",
    nickName: "Flow",
    profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
  },
  USERISLOGINGET: {
    userName: "변기원",
    nickName: "Flow",
    profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
  },
  POSTPOST: {
    status: 200,
  },
  POSTPOSTIDPUT: {
    status: 200,
  },
  POSTPOSTIDDELETE: {
    status: 200,
  },
  POSTSPOST: [
    {
      postId: 1,
      nickName: "kiwon",
      profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
      contentImg: [
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmPGDZ%2FbtrzvLOGlFd%2FGgk7O1IMUqcvbR4xwOBn9k%2Fimg.jpg",
        "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg",
      ],
      content: "우리 강아지들 사진입니다. 많이봐주세요",
      createAt: "2022-04-10 12:10:30",
      likeCnt: 359,
      commentCnt: 48,
      clicked: true,
    },
    {
      postId: 2,
      nickName: "IU",
      profileImg:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2021/12/24/110942647.2.jpg",
      contentImg: [
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmPGDZ%2FbtrzvLOGlFd%2FGgk7O1IMUqcvbR4xwOBn9k%2Fimg.jpg",
        "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
      ],
      content: "아이유네 강아지 있을까?",
      createAt: "2022-04-12 10:39:20",
      likeCnt: 3488,
      commentCnt: 499,
      clicked: false,
    },
    {
      postId: 3,
      nickName: "IU",
      profileImg:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2021/12/24/110942647.2.jpg",
      contentImg: [
        "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmPGDZ%2FbtrzvLOGlFd%2FGgk7O1IMUqcvbR4xwOBn9k%2Fimg.jpg",
        "https://s3.ap-northeast-2.amazonaws.com/elasticbeanstalk-ap-northeast-2-176213403491/media/magazine_img/magazine_280/5-3-%EC%8D%B8%EB%84%A4%EC%9D%BC.jpg",
      ],
      content: "아이유네 강아지 있을까?",
      createAt: "2022-04-12 10:39:20",
      likeCnt: 3488,
      commentCnt: 499,
      clicked: false,
    },
  ],
  POSTDETAILPOST: {
    postId: 3,
    contentImg: [
      "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmPGDZ%2FbtrzvLOGlFd%2FGgk7O1IMUqcvbR4xwOBn9k%2Fimg.jpg",
      "https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/201901/20/28017477-0365-4a43-b546-008b603da621.jpg",
    ],
    nickName: "Flow",
    profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
    content: "우리강아지들 이쁘죠",
    createAt: "2022-04-12 10:39:20",
    likeCnt: 1923,
    clicked: true,
  },
  LIKEPOSTIDPOST: {
    status: 200,
    clicked: false,
  },
  COMMENTPOSTIDPOST: {
    status: 200,
  },
  COMMENTCOMMENTIDDELETE: {
    status: 200,
  },
  COMMENTPOSTIDGET: [
    {
      commentId: 1,
      profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
      nickName: "악플러",
      comment: "나는 악플러다!!",
    },
    {
      commentId: 2,
      profileImg:
        "https://yt3.ggpht.com/ytc/AKedOLQnoQzbgg4cE_7AhlpOoZq4UD9bfXSWgnFhpsFC=s900-c-k-c0x00ffffff-no-rj",
      nickName: "quanhaha79",
      comment:
        "안녕하세요 저는 하하입니다.안녕하세요 저는 하하입니다.안녕하세요 저는 하하입니다.안녕하세요 저는 하하입니다.",
    },
    {
      commentId: 3,
      profileImg: "https://avatars.githubusercontent.com/u/91737252?v=4",
      nickName: "Flow",
      comment: "이 댓글은 삭제되어야만 합니다",
    },
  ],
};
