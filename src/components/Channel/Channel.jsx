import { Button } from '@mui/material';
import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as data from '../../apis/data';
const Channel = (prop) => {
    const { name, code} = prop;
    const { stompClient, userInfo, messages, setMessages} = useContext(LoginContext);
    const navigate = useNavigate();

    
     const subscribe = () => {
        const {id} = stompClient.current.subscribe(`/sub/${code}`, () => {
        getMsg();
        });
        console.log("구독 결과 : " + id);
     }

     // 메시지 가져오는 메소드
    const getMsg = async () => {
        const info = {
            code: code,
            username: userInfo.username,
        };
        const response = await data.getMessageList(info);
        if(response.data === undefined)
            return
        
        setMessages(response.data);
    }

    return (
        <div className='channel'>
            <div className = 'chatting-index'>
                {`${name} 채팅방`}
            </div>
            <div className='channel-btn'>
                <Button variant="contained" size="small" 
                     onClick={async () => {
                            subscribe();
                            navigate("/chat", {state: {name: name, code: code}});
                        }}>
                        입장
                </Button>
            </div>
        </div>
    );
};

export default Channel;