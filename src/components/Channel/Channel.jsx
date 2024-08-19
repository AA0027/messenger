import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContextProvider';
import * as data from '../../apis/data'
const Channel = (prop) => {
    const { name, code} = prop;
   
    const navigate = useNavigate();

     

    return (
        <div className='channel'>
            <div className = 'chatting-index'>
                {`${name} 채팅방`}
            </div>
            <div className='channel-btn'>
                <Button variant="contained" size="small" 
                     onClick={async () => {
                            navigate("/chat", {state: {name: name, code: code}});
                        }}>
                        입장
                </Button>
            </div>
        </div>
    );
};

export default Channel;