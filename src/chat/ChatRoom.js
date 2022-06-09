import React, {useState} from "react";
import styled from "styled-components";

const ChatRoom = () => {

    const [message, setMessage] = useState("")

    const chatMessage = (e) => {
        setMessage(e.target.value)
    }

    return (
        <MainContainer>
            <ChatRoomList>
                <div style={{
                    display:"flex",
                    textAlign:"center",
                    justifyContent:"center",
                    alignItems:"center",
                    flexDirection:"column",
                    borderBottom:"1px solid #ccc",
                    padding: "20px"
                }}>내 닉네임</div>

                <div style={{margin: "5px 5px"}}>
                    <span>프로필</span> <span>닉네임</span>
               </div>

            </ChatRoomList>

            <Chat>
                <div style={{
                    display:"flex",
                    borderBottom:"1px solid #ccc",
                    padding: "20px"
                }}>채팅 상대방 닉네임</div>
                <ChatList>

                </ChatList>
                <textarea
                    rows={1}
                    width="90%"
                    margin="5px 10px"
                    placeholder="메시지 입력..."
                    onChange={chatMessage}
                />
            </Chat>
        </MainContainer>
    )
}

export default ChatRoom

const MainContainer = styled.div`
  display: flex;
  border: 1px solid #ccc;
  width: 70%;
  height: 80vh;
  margin: 50px auto;
`

const ChatRoomList = styled.div`
  flex: 1;
  border-right: 1px solid #ccc;
`

const Chat = styled.div`
  flex: 2;
`

const ChatList = styled.div`
  flex: 1;
  border-bottom: 1px solid #ccc;
  height: 85%;
`
