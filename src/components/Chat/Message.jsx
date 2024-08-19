import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import React, { useEffect, useRef } from 'react';
import './Message.css';
const Message = (prop) => {
    const { m, my_name} = prop;

    if(m.sender.name === my_name){
        return (
            <div className='message my'>
                <div className='message-info'>
                    <div className='date'>{(m.regdate.split(" "))[1]}</div>
                    <div className='msg-bowl'>
                        {m.content && <div className='msg'>{m.content}</div>}
                        {m.files && m.files.map((f) => <div key={f.id} className='file-msg'>{f.sourcename}</div>)}
                    </div> 
                    <Avatar sx={{ bgcolor: deepPurple[500], width: "40px"
                        , height: "40px", }}>
                            <div className='name'>{m.sender.name}</div>
                    </Avatar>
                    
                </div>
                
            </div>
         );  
    }
    else {
        return (
            <div className='message you' >
                <div className='message-info'>
                    <div className='avartar'>
                        <Avatar sx={{ bgcolor: deepPurple[500], width: "40px"
                            , height: "40px"}} >
                                <div className='name'>{m.sender.name}</div>
                        </Avatar>
                    </div>
                    <div className='msg-bowl'>
                        {m.content !== "" && <div>{m.content}</div>}
                        {m.files && m.files.map((f) => <div className='file-msg'>{f.sourcename}</div>)}
                    </div> 
                    <div className='date'>
                        {
                            (m.regdate.split(" "))[1]
                        }
                    </div>
                </div>
                
            </div>
         );
    }
    
};

export default Message;
