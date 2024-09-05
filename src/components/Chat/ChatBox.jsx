import React, { useContext, useEffect, useRef, useState } from 'react';
import Message from './Message';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { LoginContext } from '../../contexts/LoginContextProvider';
const ChatBox = (prop) => {
    const { scrollRef, }  = prop;
    const { userInfo , messages} = useContext(LoginContext);
    
    let groupedMessages;
   
    useEffect(()=>{
        console.log("3. ChatBox.jsx");
        console.log(messages);

        console.log(groupedMessages);
        console.log(" test: " + messages);
    }, [messages]);
    
    const groupMessagesByDate = (messages) => {
        
        if(!messages || messages.length === 0)
            return;
        return  messages.reduce((groups, message) => {
            const date = message.regdate.split(" ")[0];
          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(message);
          return groups;
        }, {});
    };

    if(messages.length === 0){
        return (
            
        <div className='chat-box' ref={scrollRef} style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
            <div className='no-msg'>
                <EmailOutlinedIcon sx={{width: "100px", height: "100px", color: "primary"}} />
                <span>No Messages</span>
            </div>
        </div>  
        );
    }
    else {

        return (
            
            <div className='chat-box' ref={scrollRef}>
                
                {
                    
                    (groupedMessages = groupMessagesByDate(messages)) && Object.keys(groupedMessages).map((date) => (
                    <div key={date} className='date-box'>
                        <div className='date-header'>
                            {date}
                        </div>
                        {groupedMessages[date].map((m) => (
                           m.sender && <Message key={m.id} m={m} my_name={userInfo.name} />
                        ))}
                    </div>
                ))}
            </div>  
        );
    }
       
};

export default ChatBox;

