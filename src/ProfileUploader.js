import React, { useState } from "react";
import axios from "axios";

const ProfileUploader = () => {
  const [imageUrl, setImageUrl] = useState(
      "https://t1.daumcdn.net/cfile/tistory/2513B53E55DB206927"
  );
  const onImgChange = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
  };
  return (
      <div>
        <label>내 프로필</label>
        <input type="file" accept="image/*" onChange={onImgChange}></input>
      </div>
  );
};

export default ProfileUploader;
