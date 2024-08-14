import {TextareaAutosize } from '@mui/material';
import './Chat.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBox from './ChatBox';
import { LoginContext } from '../../contexts/LoginContextProvider';
const ChatRoom = (prop) => {
    const {code, messages, setMessages} = prop;
    const {userInfo, stompClient} = useContext(LoginContext);
    const [message, setMessage] = useState("");
    const scrollRef = useRef();
    

    useEffect(()=>{
        if(scrollRef){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            console.log("===========" + scrollRef.current.scrollTop);
        }
    },[messages]);

    const keyDownEvent = (e) => {
        if(e.nativeEvent.isComposing){
            return
        }

        if (e.key === 'Enter' && e.shiftKey) { 
            return;
          } else if (e.key === 'Enter') { 	   
            e.preventDefault();
            const date = new Date();

            let year = date.getFullYear(); // 년도
            let month = date.getMonth() + 1;  // 월
            let day = date.getDate();  // 날짜
            // let day = date.getDay();  

            let hours = ('0' + date.getHours()).slice(-2);
            let minutes = ('0' + date.getMinutes()).slice(-2);
            let seconds = ('0' + date.getSeconds()).slice(-2); 

            let timeString =  year   + "-" + month + "-" + day +" " + hours + ':' + minutes  + ':' + seconds;

            const msg = {
                code: code,
                sender: {
                    name: userInfo.name,
                    username: userInfo.username,
                },
                username: userInfo.username,
                content: message,
                regdate: timeString
            }
            stompClient.current.send(`/pub/${code}`, {}, JSON.stringify(msg));
            setMessages([...messages, msg]);
            e.target.value = "";
          }

    }

    const change = (e) => {
        setMessage(e.target.value);
    }

    return (
        <div className='chat-room'>
            <ChatBox messages={messages} setMessages={setMessages} code={code} scrollRef={scrollRef}/>
            <div className='input-box'>
                <TextareaAutosize  onKeyDown={keyDownEvent}  className="input"  placeholder="write message..." onChange={change} style={{height: "24px"}}/>
            </div>
        </div>
    );
};

export default ChatRoom;