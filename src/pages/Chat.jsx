import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatRoom from '../components/Chat/ChatRoom';
import { LoginContext } from '../contexts/LoginContextProvider';
import { useLocation } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as data from '../apis/data'
import Emp from '../components/Chat/Emp';

const Chat = () => {
    
    const { isLogin, userInfo, messages, subRoom, getMsg} = useContext(LoginContext);
    const location = useLocation();
    const { name, code } = location.state;
    const [open, setOpen] = useState(false);
    const [attendee, setAttendee] = useState([]);
    const [chatFiles, setChatFiles] = useState([]);
    const [list, setList] = useState([]);
    const [addData, setAddData] = useState(true);
    const [fileM, setFileM] = useState(true);
    
    useEffect(() => {
        console.log("1. Chat.jsx"); 
        getMsg({code: code, username: userInfo.username});
        subRoom(code, {code: code, username: userInfo.username});
        getChatDatas();        
    }, [ fileM ]);
    
    
   const getChatDatas = async () => {
        const response1 = await data.attendeeList(code);
        const response2 = await data.getFiles(code);
        setAttendee(response1.data);
        setChatFiles(response2.data);   
      
   }
  
  

   
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const download = (f) => {
        data.downloadFile(f);
    };

    return (
       
        <>
        
        {
            
            isLogin &&
            <div className="container">
                <Sidebar/>
            
                <div className=' content'>
                    <div className='head jua-regular' style={{width: "70%"}}>
                        {name} 
                        <Button variant="contained" size="small" onClick={toggleDrawer(true)}>
                            초대
                        </Button>
                    </div>
                    <div>
                        <ChatRoom code={code} addData={addData} setAddData={setAddData} fileM={fileM} setFileM={setFileM}/>
                    </div>
                    <div className='chat-data'>
                        <Accordion sx={{width: "150px"}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            사용자
                            </AccordionSummary>
                            <AccordionDetails sx={{maxHeight: "200px", overflow: "scroll", overflowX: "hidden"}}>
                            {
                                attendee && 
                                attendee.map((e) => (<div key={e.id}>{e.name}</div>))
                            }
                            </AccordionDetails>
                        </Accordion>

                        <Accordion sx={{width: "150px"}}>
                            <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                            >
                            파일
                            </AccordionSummary>
                            <AccordionDetails sx={{maxHeight: "200px", overflow: "scroll", overflowX: "hidden", display: "flex",flexDirection: "column", gap: "3px"}}>
                            {
                                chatFiles && 
                                chatFiles.map((f) => (<Button className='chat-file' variant="text" onClick={()=>{download(f)}}>{f.sourcename}</Button>))
                            }
                            </AccordionDetails>
                        </Accordion>

                    </div>
                </div>
                <Drawer open={open} onClose={toggleDrawer(false)} anchor='right'>
                    <Emp code={code} list={list} setList={setList} setOpen={setOpen} attendee={attendee} addData={addData} setAddData={setAddData}/>
                </Drawer>
            
            </div>}
        </> 
    );
};

export default Chat;

