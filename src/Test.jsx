import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
const Test = () => {
    const apiUrl = `http://localhost:8080/api/file/download?id=1`;


    const downloadFile = async () => {
        await axios({
            method: 'GET',
            url: apiUrl,
            responseType: 'blob',
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            console.log(response.data.type);
            link.href = url;
            link.setAttribute('download', `test.${response.data.type}`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
        });
    }
    return (
        <div>
            <Button variant='primary' onClick={downloadFile}>
                다운로드
            </Button>
            
        </div>
    );
};

export default Test;