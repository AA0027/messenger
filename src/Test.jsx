import {Button, TextareaAutosize } from '@mui/material';
import './components/Chat/Chat.css';
import React, {  useEffect, useRef, useState } from 'react';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import axios from 'axios';
const Test = (prop) => {
    const {code, messages, setMessages} = prop;
    const [message, setMessage] = useState("");
    const [ files, setFiles ] = useState([]);
    


    const change = (e) => {
        setMessage(e.target.value);
    }
    // 파일 추가시 files 상태변수에 추가
    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const getFiles = () => {
        document.getElementsByClassName("file-input")[0].click();
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
            '/api/chat/file', formData
        ,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            const date = new Date();

            let year = date.getFullYear(); // 년도
            let month = date.getMonth() + 1;  // 월
            let day = date.getDate();  // 날짜
           
            let hours = ('0' + date.getHours()).slice(-2);
            let minutes = ('0' + date.getMinutes()).slice(-2);
            let seconds = ('0' + date.getSeconds()).slice(-2); 

            let timeString =  year   + "-" + month + "-" + day +" " + hours + ':' + minutes  + ':' + seconds;
            const fileDto = {
                username: "alice01",
                code: code,
                regdate: timeString,
                fileId: res.data
            }
            if(res.status === 200){
                axios.post("/api/chat/file-info", fileDto);
            }
        })

    } 

    return (
        <div className='chat-room'>
            <div style={{}}>

            </div>
            <div className='input-box'>
                <Button variant="text" className='file-btn' onClick={getFiles}>
                    <AttachFileIcon sx={{fontSize: "0.8rem"}}/>
                </Button>
                <TextareaAutosize   className="input"  placeholder="write message..." onChange={change} style={{height: "24px"}}/>
                <Button variant="contained" className='file-btn' onClick={uploadFiles}
                    sx={{fontSize: "0.7rem"}} >
                    전송</Button>
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

export default Test;