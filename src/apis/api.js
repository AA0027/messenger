import axios from 'axios'

// 자주 사용하게 되는 axios는 인스턴스를 만들어 export 해둡니다.
// https://axios-http.com/kr/docs/instance
//  axios.create({사용자 지정 config})

const api = axios.create();

export const SERVER_HOST = `http://54.180.104.144:8080`;
export const HOST = `ws://54.180.104.144:8080/channel`;

export default api;