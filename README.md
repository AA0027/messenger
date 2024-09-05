# ✉️사내 메신저 프로젝트

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white)  ![Java](https://img.shields.io/badge/JAVA-000?style=for-the-badge&logo=java&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-000?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-000?style=for-the-badge&logo=javascript&logoColor=white) ![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge) ![Mysql Database 8](https://img.shields.io/badge/MySql-F80000?style=for-the-badge) ![mongodb](https://img.shields.io/badge/mongodb-47A248?style=for-the-badge&logo=mongodb&logoColor=white)  
<br>


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
