import axios from 'axios';
import api from './api'

import { SERVER_HOST } from './api';

// 채널 시작
    // 내 채팅 목록 가져오기
    export const channelList = async (username) => await api.post(`${SERVER_HOST}/channel/list`, {username: username, code: ""})
    // 채팅방 생성
    export const createChannel = (data) => api.post(`${SERVER_HOST}/channel/newChannel`, data);
    // 채팅방 초대
    export const invite = (data) => api.post(`${SERVER_HOST}/channel/invite`, data);
    // 채팅방 나가기
    export const exit = (data) => api.post(`${SERVER_HOST}/channel/exit`, data);
    // 채팅방 삭제
    export const del = async (data) => await api.post(`${SERVER_HOST}/channel/delete`, data);
    // 채팅방 사용자들 불러오기
    export const attendeeList = (code) => api.post(`${SERVER_HOST}/channel/attendee`, {username: "", code: code})
// 채널 끝


// 특정 채널 메세지 가져오기
    export const getMessageList = async (data) => await api.post(`${SERVER_HOST}/messages/list`, data);

// 끝


// 직원 정보 가져오기
    export const allEmpt = async () => api.get(`${SERVER_HOST}/employee/all`);
// 끝

// 구독

    // 모든 구독조회하기
    export const getAllSub = async (data) => api.post(`${SERVER_HOST}/channel/sub/all`, data)

    // 구독하기
    export const sub = async (data) => api.post(`${SERVER_HOST}/channel/sub`, data);
    
    // 구독번호 조회하기
    export const getSubId = async (data) => api.post(`${SERVER_HOST}/channel/sub/id`, data);

    // 구독 해제하기
    export const unSub = async (subId) => api.get(`${SERVER_HOST}/channel/unsub/${subId}`);

// 끝

    // 채팅방의 모든 파일 가져오기
    export const getFiles = async (code) => api.get(`${SERVER_HOST}/file/list?code=${code}`);

    // 시간 변환 메소드
    export const getTime = () => {
        const date = new Date();

        let year = date.getFullYear(); // 년도   
        let month = date.getMonth() + 1;  // 월
        let day = date.getDate();  // 날짜
       
        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let seconds = ('0' + date.getSeconds()).slice(-2); 
        let timeString =  year   + "-" + month + "-" + day +" " + hours + ':' + minutes  + ':' + seconds;
        return timeString;
    }

// 초대 관련 메소드

    // 나의 초대장 조회
    export const getMyInvite = async (data) => api.post(`${SERVER_HOST}/channel/my-invite`, data);

    // 초대 수락
    export const accept = async (data) => api.post(`${SERVER_HOST}/channel/accept`, data);

    // 초대 거절
    export const reject = async (data) => api.post(`${SERVER_HOST}/channel/reject`, data);
// 끝

   

// 파일 다운로드
    export const downloadFile = async (f) => {
        await axios({
            method: 'GET',
            url: `${SERVER_HOST}/file/download?id=${f.id}`,
            responseType: 'blob',
        })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            console.log(response.data.type);
            link.href = url;
            link.setAttribute('download', f.sourcename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => {
            console.error('Error downloading file:', error);
        });
    }

    // export const downloadFile = async () => {
    //     await axios({
    //         method: 'GET',
    //         url: `${SERVER_HOST}/file/download?id=2`,
    //         responseType: 'blob',
    //     })
    //     .then((response) => {
    //         const url = window.URL.createObjectURL(new Blob([response.data]));
    //         const link = document.createElement('a');
    //         console.log(response.data.type);
    //         link.href = url;
    //         link.setAttribute('download', '정보보안_취업처_240408.docx');
    //         document.body.appendChild(link);
    //         link.click();
    //         document.body.removeChild(link);
    //     })
    //     .catch((error) => {
    //         console.error('Error downloading file:', error);
    //     });
    // }

// 끝