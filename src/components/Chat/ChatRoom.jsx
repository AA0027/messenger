import {Button, TextareaAutosize } from '@mui/material';
import './Chat.css';
import React, { useContext, useEffect, useRef, useState } from 'react';
import ChatBox from './ChatBox';
import { LoginContext } from '../../contexts/LoginContextProvider';
import axios from 'axios';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import {SERVER_HOST} from '../../apis/api'
import * as data from '../../apis/data';
const ChatRoom = (prop) => {
    const {code, messages, setMessages, addData, setAddData} = prop;
    const {userInfo, stompClient} = useContext(LoginContext);
    const [message, setMessage] = useState("");
    const [ files, setFiles ] = useState([]);
    const scrollRef = useRef();
    

    useEffect(()=>{
        if(scrollRef){
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            console.log("===========" + scrollRef.current.scrollTop);
        }
    },[messages]);

    // 엔터시 동작 메소드
    const keyDownEvent = (e) => {
        if(e.nativeEvent.isComposing){
            return
        }

        if (e.key === 'Enter' && e.shiftKey) { 
            return;
          } else if (e.key === 'Enter') { 	   
            e.preventDefault();
            if(e.target.value === "")
                return;
            send();
            e.target.value = "";
          }

    }

    const change = (e) => {
        setMessage(e.target.value);
    }
    // 파일 추가시 files 상태변수에 추가
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    // 파일 제거 메소드 files 상태변수에서 제외
    const deleteFile = (e) => {
        files && setFiles([...(files.filter((f)=> f.id !== e.target.key))]);
    }

    const getFiles = () => {
        document.getElementsByClassName("file-input")[0].click();
    }
    

    // 메시지 전송 메소드
    const send = () => {
       
        const msg = {
            code: code,
            sender: {
                name: userInfo.name,
                username: userInfo.username,
            },
            username: userInfo.username,
            type: "",
            content: message,
            files: null,
            regdate: data.getTime()
        }
        stompClient.current.send(`/pub/${code}`, {}, JSON.stringify(msg));
        // setMessages([...messages, msg]);
    }
    // 파일 업로드 메소드
    const uploadFiles = (e) => {
        e.preventDefault();
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        console.log(formData);

        axios.post(
            `${SERVER_HOST}/file/upload`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            const msg = {
                code: code,
                sender: {
                    name: userInfo.name,
                    username: userInfo.username,
                },
                username: userInfo.username,
                content: message,
                type: "file",
                regdate: data.getTime(),
                files: res.data
            }
            stompClient.current.send(`/pub/${code}`, {}, JSON.stringify(msg));
            setFiles([]);
            setMessages([...messages, msg]);
            setAddData(!addData);
        });
    } 

    return (
       
            <div className='chat-room'>
                <ChatBox messages={messages} setMessages={setMessages} code={code} scrollRef={scrollRef}/>
                <div className='input-box'>
                    <Button variant="text" className='file-btn' onClick={getFiles} sx={{minWidth: "40px"}}>
                        <AttachFileIcon sx={{fontSize: "0.8rem"}}/>
                    </Button>
                    <TextareaAutosize  onKeyDown={keyDownEvent} className="input"  placeholder="write message..." onChange={change} style={{height: "24px"}}/>
                    <Button variant="contained" className='file-btn' onClick={uploadFiles}
                        sx={{fontSize: "0.7rem"}} >
                        전송</Button>
                </div>
                <div className='selected-file'>
                    {(files.length > 0) && 
                        files.map(f => <div className='file'>{f.name}<Button key={f.id} onClick={deleteFile} ><CloseIcon sx={{fontSize: 'small'}} /></Button></div>)
                    }
                </div>
                <form>
                    <input className='file-input' type='file' multiple 
                    style={{display: "none"}}
                        onChange={handleFileChange}>
                    </input>
                </form>
            </div>
      
    );
};

export default ChatRoom;