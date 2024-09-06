# ✉️사내 메신저 프로젝트

- [x] [프로젝트를 시작한 이유](#프로젝트를-시작한-이유)
- [x] [Getting Started](#Getting-Started)
- [x] [시연영상](#시연영상)
- [x] [Troubleshooting](#Troubleshooting)
- [x] [앞으로의 계획](#앞으로의-계획)    

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)  ![Java](https://img.shields.io/badge/JAVA-000?style=for-the-badge&logo=java&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-000?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-000?style=for-the-badge&logo=javascript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge) ![Mysql Database 8](https://img.shields.io/badge/MySql-F80000?style=for-the-badge) ![mongodb](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  
<br>

## 프로젝트를 시작한 이유   
지난 실시간 채팅에서 ID, Password 기반 인증을 사용하였으나, 서버에서 세션관리 부담을 줄여주는    
JWT 인증방식을 사용하고 싶었다.  
파일 업로드 및 다운로드, 채팅방 사용자 초대기능, 실시간으로 초대메시지 받기 등을 추가하였다.    
## 아키텍쳐 구성도
<img src="https://github.com/user-attachments/assets/d61d1444-a6fb-4272-8143-8d1f63da047a" width="650" height="400" />
<br/>

## Getting Started 


### Prerequisites(Nginx 설치 및 설정)
```
sudo apt-get -y install openjdk-17-jdk 1>/dev/null
sudo apt install nginx
sudo rm /etc/nginx/sites-available/default
sudo rm /etc/nginx/sites-enabled/default
sudo vim /etc/nginx/sites-available/messenger.conf
sudo ln -s /etc/nginx/sites-available/messenger.conf /etc/nginx/sites-enabled/messenger.conf
sudo systemctl stop nginx
sudo systemctl start nginx
```



### /etc/nginx/sites-available/messenger.conf 설정



```
server {
  listen 80;
  location / {
          root /home/ubuntu/react/build;
          index index.html;
          try_files $uri $uri/ /index.html;
  }

  location /channel {
         proxy_pass http://localhost:8080;
         proxy_http_version 1.1;
         proxy_set_header Upgrade $http_upgrade;
         proxy_set_header Connection "upgrade";
         proxy_set_header Host $host;
   }

  location /api {
         proxy_pass http://localhost:8080;
         proxy_set_header X-Real-IP $remote_addr;
         proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
         proxy_set_header Host $http_host;
    }
}
```


### Installing (리액트, 스프링 따로 clone)

```
git clone https://github.com/AA0027/react.git
git clone https://github.com/AA0027/spring.git
```

   
## 시연영상
[![이미지 텍스트](https://github.com/user-attachments/assets/b0866eaf-91c2-43e3-89e9-32c8f45a27aa)](https://youtu.be/099MvhsOCbQ)   


## Troubleshooting    
### 채팅방 삭제시 에러 발생
- [JPA] No EntityManager with actual transaction available for current thread - cannot reliably process 'remove' call 에러 확인
- 찾아보니 이 오류는 스프링 트랜잭션 관련 문제로, 현재 스레드에 실제 트랜잭션이 없기 때문에 'remove' 호출을 신뢰할 수 없다는 것을 의미한 것이었다.   
- 채팅방 삭제 서비스 메소드에 @Transaction 추가후 해결   
```
  // 채팅 방삭제
    @Transactional
    public void deleteChatRoom(String code){
        ChatRoom chatRoom = chatRoomRepository.findByCode(code)
                .orElseThrow(() -> new NoSuchDataException("해당데이터가 존재하지 않습니다."));
        chatRoomRepository.delete(chatRoom);

    }
```

### 리버스 프록시로 인한 로그인 처리 API 경로 변경 문제
- 로그인 처리 경로 변경으로 인하여 해당 Controller를 만들지 않고 LoginFilter 처리 경로를 변경함으로 해결
```
@Slf4j
public class LoginFilter extends UsernamePasswordAuthenticationFilter {

   ...

    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        setFilterProcessesUrl("/api/login");
        this.jwtUtil = jwtUtil;
    }
   ...
}
```
## 앞으로의 계획   
- 현재 프로젝트를 더 확장시켜서 조직도를 만들고 EC2 서버 4대를 사용하여 2개는 스프링 서버
  다른 2개는 리액트 서버를 사용하여 K6를 활용하여 성능테스트 및 개선을 할것이다.
