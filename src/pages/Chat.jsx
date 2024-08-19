import React, { useContext, useEffect, useRef, useState } from 'react';
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
    const [messages, setMessages] = useState([]);
    const { isLogin} = useContext(LoginContext);
    const location = useLocation();
    const { name, code} = location.state;
    const [open, setOpen] = useState(false);
    const [attendee, setAttendee] = useState([]);
    const [chatFiles, setChatFiles] = useState([]);
    const [list, setList] = useState([0]);
    const [addData, setAddData] = useState(true);
    useEffect(()=>{

        getChatDatas();
    }, [addData]);

   const getChatDatas = async () => {
        const response1 = await data.attendeeList(code);
        const response2 = await data.getFiles(code);
        setAttendee(response1.data);
        setChatFiles(response2.data);
   }

    const toggleDrawer = (newOpen) => () => {
        
        setOpen(newOpen);
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
                        <ChatRoom messages={messages} setMessages={setMessages} code={code} addData={addData} setAddData={setAddData}/>
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
                                attendee.map((e) => (<div>{e.name}</div>))
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
                            <AccordionDetails sx={{maxHeight: "200px", overflow: "scroll", overflowX: "hidden"}}>
                            {
                                chatFiles && 
                                chatFiles.map((f) => (<div>{f.sourcename}</div>))
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

