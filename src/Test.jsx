import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
const Test = () => {
    const [ files, setFiles ] = useState([]);


    const handleFileChange = (e) => {
        setFiles(Array.from(e.target.files));
    }

    const uploadFiles = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("files", file);
        });
        console.log(formData);

        axios.post(
            'http://localhost:8080/api/chat/file', formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
        .then((res) => {
            console.log(res.status);
        })

    } 

    
    return (
        <div>
            <form>
                <input className='file-input' type='file' multiple
                    onChange={handleFileChange}/>
                <button onClick={uploadFiles}>upload</button>
            </form>  
        </div>
    );
};

export default Test;