# 배포 가이드
## MobaXterm
### Mobaxterm Download
> https://mobaxterm.mobatek.net/

### SSH 접속정보 입력
1. SSH 타입 선택
2. 서버 주소 입력
3. Specify username 체크
4. 계정명 입력 (deafault : ubuntu)
5. Use private key 체크
6. 디렉토리에서 *.pem 키 선택

## 우분투 서버 기본 설정
### 서버 시간 한국기준으로 변경
```bash
sudo timedatectl set-timezone Asia/Seoul
```

### 패키지 업데이트
```bash
sudo apt-get -y update && sudo apt-get -y upgrade
```

### Swap 영역 할당
```bash
free -h
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
sudo echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```
**※ 메모리 스와핑이 필요한 이유**
1. 시스템에서 특정 어플리케이션이나 프로세스가 현재 가용한 피지컬 메모리보다 많은 양의 메모리를 요청할 경우, 커널은 적은 빈도율로 사용되는 메모리 페이지를 스왑아웃해서 가용 메모리 공간을 확보한 뒤 이를 해당 프로세스에 할당해 줌으로써 프로세스 실행이 가능하게된다.
2. 특정 어플리케이션이 실행되기 시작할 때 초기화를 위해서만 필요하고 이후에는 사용되지 않는 메모리 페이지들은 시스템에 의해 스왑아웃되며, 이로인해 가용해진 메모리 공간은 다른 어플리케이션이나 디스크캐쉬 용도로 활용된다.

## Docker 설치
### 설치전 필요한 패키지 설치
```bash
sudo apt-get -y install apt-transport-https ca-certificates curl gnupg-agent software-properties-common
```

### Docker GPC 인증 확인
```bash
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
```
OK가 나오면 정상

### Docker Repo 등록
```bash
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
```

### 패키지 리스트 갱신
```bash
sudo apt-get -y update
```

### Docker 설치 및 권한부여
```bash
sudo apt-get -y install docker-ce docker-ce-cli containerd.io 
sudo usermod -aG docker ubuntu 
sudo service docker restart
```

## Jenkins

### Jenkins 설치
```bash
docker pull jenkins/jenkins:jdk17 
docker run -d --restart always --env JENKINS_OPTS=--httpPort=8080 -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 8080:8080 -v /jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose --name jenkins -u root jenkins/jenkins:jdk17 
```

### Jenkins 플러그인 미러서버 변경
```bash
sudo docker stop jenkins 
sudo mkdir /jenkins/update-center-rootCAs 
sudo wget https://cdn.jsdelivr.net/gh/lework/jenkins-update-center/rootCA/update-center.crt -O /jenkins/update-center-rootCAs/update-center.crt 
sudo sed -i 's#https://updates.jenkins.io/update-center.json#https://raw.githubusercontent.com/lework/jenkins-update-center/master/updates/tencent/update-center.json#' /jenkins/hudson.model.UpdateCenter.xml 
sudo docker restart jenkins 
```

### initialAdminPassword 가져오기
```bash
docker exec -it jenkins /bin/bash 
cd /var/jenkins_home/secrets 
cat initialAdminPassword 
```
젠킨스 포트로 최초 접속하면 initialAdminPassword 비밀번호를 입력해야함

### Jenkins 내부에 Docker 설치
```bash
docker exec -it jenkins /bin/bash 
apt-get update && apt-get -y install apt-transport-https ca-certificates curl gnupg2 software-properties-common && curl -fsSL https://download.docker.com/linux/$(. /etc/os-release; echo "$ID")/gpg > /tmp/dkey; apt-key add /tmp/dkey && add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/$(. /etc/os-release; echo "$ID") $(lsb_release -cs) stable" && apt-get update && apt-get -y install docker-ce 
groupadd -f docker 
usermod -aG docker jenkins 
chown root:docker /var/run/docker.sock 
```

### Jenkins 플러그인 설치
- SSH Agent 
- Docker 
- Docker Commons 
- Docker Pipeline 
- Docker API 
- Generic Webhook Trigger 
- GitLab 
- GitLab API 
- GitLab Authentication 
- GitHub Authentication 
- NodeJS



### Gitlab Credentials 등록 (Username with password)
- Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials 
- 아래 정보 입력
    -  Kind : Username with password 선택 
    -  Username : Gitlab 계정 아이디 입력 
    -  Password : Gitlab 계정 비밀번호 입력 **(토큰 발행시, API 토큰 입력)** 
    -  ID : Credential에 대한 별칭 (ex : gitlab-wlgjs0458)
- **Create** 클릭

### Gitlab Credentials 등록 (API Token)
- Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials 
- 아래 정보 입력
    - Kind : Gitlab API token 선택 
    - API tokens : Gitlab 계정 토큰 입력 
    - ID : Credential에 대한 별칭 (ex : wlgjs0458-gitlab)
- **Create** 클릭

### Gitlab 커넥션 추가
- Jenkins 관리 - System Configuration - System 
- Gitlab의 **Enable authentication for ‘/project’ end-point** 체크
- 아래 정보 입렵
    - Connection name : Gitlab 커넥션 이름 지정
    - Gitlab host URL : Gitlab 시스템의 Host 주소 입력
    - Credentials : 조금 전 등록한 **Jenkins Credential (API Token)**을 선택
    - 이후, **Test Connection**을 눌러 Success가 뜨면 **저장** 클릭
    - 아니라면 입력한 정보를 다시 확인

### Docker Hub Credential 추가
- https://hub.docker.com/ <= 접속 및 로그인 후 Access Token 발급 
- Repositories - Create repository <- Docker hub 레포지토리 생성 
- Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials 
- Credential 정보 입력
    - Kind : Username with password 
    - Username : DockerHub에서 사용하는 계정 아이디 입력 (ex : wlgjs0458)
    - Password : DockerHub에서 사용하는 Access Token 입력 
    - ID : Jenkins 내부에서 사용하는 Credential 별칭 입력 (ex : wlgjs0458-docker)
- **Create** 클릭



### Ubuntu Credential 추가
- Jenkins 관리 - Manage Credentials - Stores scoped to Jenkins - Domains - (global) - Add credentials 
- Kind를 `SSH Username with private key`로 설정
- 아래 정보 입력
    - ID : Jenkins에서 Credential에 지정할 별칭 입력 (ex : ubuntu-a601)
    - Username : SSH 원격 서버 호스트에서 사용하는 계정명 입력 (ex : ubuntu) 
    - Enter directly 체크 - Add 클릭 
    - AWS *.pem 키의 내용을 메모장으로 읽어 복사 후 Key에 붙여넣기 
- **Create** 클릭 

## CI,CD를 위한 Webhook 설정
- Jenkins Item - Pipeline - General - Build Triggers
    - Build when a change is pushed to Gitlab 체크
    - Push Events 체크
    - Opened Merge Request Events 체크
    - Approved Merge Request (EE-only) 체크
    - Comments 체크
    - **발행된 Secret token 복사해두고 저장**
- Gitlab Webhook 지정
    - Gitlab에 특정 브랜치에 merge request가 된 경우 Webhook을 통해 빌드 및 서비스 재배포 이벤트 발동 
    - Gitlab의 배포할 서비스의 Repository 접속 
    - Settings - Webhooks 클릭 
    - URL : Jenkins의 Item URL 입력 (양식 : `http://[Jenkins Host]:[Jenkins Port]/project/[파이프라인 아이템명]`) 
    - Secret token : Jenkins의 Gitlab trigger 고급 설정 중 Secret token Generate 버튼을 이용해 만든 토큰 입력 
    - Trigger : Push events 체크, merge request가 되면 Jenkins 이벤트가 발동하게 할 브랜치 입력 
    - SSL verification의 **Enable SSL verification** 체크 
    - **Add webhook** 클릭 

## SSL 인증서 발급
- Certbot 다운로드
```bash
sudo snap install --classic certbot
sudo apt-add-repository -r ppa:certbot/certbot
sudo apt-get -y install python3-certbot-nginx
sudo certbot --nginx -d k10a508.p.ssafy.io
```
## 인증서 발급 적용(/etc/nginx/sites-enabled/default.conf)
```groovy
##
# You should look at the following URL's in order to grasp a solid understanding
# of Nginx configuration files in order to fully unleash the power of Nginx.
# https://www.nginx.com/resources/wiki/start/
# https://www.nginx.com/resources/wiki/start/topics/tutorials/config_pitfalls/
# https://wiki.debian.org/Nginx/DirectoryStructure
#
# In most cases, administrators will remove this file from sites-enabled/ and
# leave it as reference inside of sites-available where it will continue to be
# updated by the nginx packaging team.
#
# This file will automatically load configuration files provided by other
# applications, such as Drupal or Wordpress. These applications will be made
# available underneath a path with that package name, such as /drupal8.
#
# Please see /usr/share/doc/nginx-doc/examples/ for more detailed examples.
#
##

# Default server configuration
#
server {
        listen 80 default_server;
        listen [::]:80 default_server;

        # SSL configuration
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;

        root /var/www/html;

        # Add index.php to the list if you are using PHP
        index index.html index.htm index.nginx-debian.html;

        server_name _;

        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404.
                try_files $uri $uri/ =404;
        }

        # pass PHP scripts to FastCGI server
        #
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #
        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
}

# Virtual Host configuration for example.com
#
# You can move that to a different file under sites-available/ and symlink that
# to sites-enabled/ to enable it.
#
#server {
#       listen 80;
#       listen [::]:80;
#
#       server_name example.com;
#
#       root /var/www/example.com;
#       index index.html;
#
#       location / {
#               try_files $uri $uri/ =404;
#       }

        #location ~ \.php$ {
        #fdf
        #       include snippets/fastcgi-php.conf;
        #:
        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}
#}

server {

        # SSL configuration
        #
        # listen 443 ssl default_server;
        # listen [::]:443 ssl default_server;
        #
        # Note: You should disable gzip for SSL traffic.
        # See: https://bugs.debian.org/773332
        #
        # Read up on ssl_ciphers to ensure a secure configuration.
        # See: https://bugs.debian.org/765782
        #
        # Self signed certs generated by the ssl-cert package
        # Don't use them in a production server!
        #
        # include snippets/snakeoil.conf;

        server_name k10a508.p.ssafy.io; # managed by Certbot


        location / {
                # First attempt to serve request as file, then
                # as directory, then fall back to displaying a 404
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header X-Forwarded-Proto $scheme;
        }


        # pass PHP scripts to FastCGI server
        #
        #location ~ \.php$ {
        #       include snippets/fastcgi-php.conf;
        #
        #       # With php-fpm (or other unix sockets):
        #       fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
        #       # With php-cgi (or other tcp sockets):
        #       fastcgi_pass 127.0.0.1:9000;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #       deny all;
        #}


    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/k10a508.p.ssafy.io/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/k10a508.p.ssafy.io/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}

server {
    if ($host = k10a508.p.ssafy.io) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


        listen 80 ;
        listen [::]:80 ;
    server_name k10a508.p.ssafy.io;
    return 404; # managed by Certbot


}

server {
    listen 80;
    server_name k10a508.p.ssafy.io;

    location / {
        proxy_pass http://localhost:3000;
    }
}
```

## 리버스 프록시 적용 (port 80 -> 3000)
```bash
iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 3000
```

## BackEnd Pipeline (Gateway Server : 8081)
```groovy
pipeline {
    agent any
    
    environment {
        imageName = "wlgjs0458/boredapple-gateway"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = '8081'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-server-apigateway',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        
        stage('Jar Build') {
            steps {
                dir ('apigateway-service') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar -x test'
                    // sh './gradlew build'
                }
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                dir ('apigateway-service') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name gatewaybuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }

        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter name=bagateway"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop bagateway"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm bagateway"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi wlgjs0458/boredapple-gateway:latest"
                    fi
                    '''
                }
            }
        }

        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri sudo docker pull $imageName:latest"
                }
            }
        }
        
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name bagateway -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}
```

## BackEnd Dockerfile (Gateway Server : 8081)
```docker
FROM docker

COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk

EXPOSE 443
EXPOSE 8081
EXPOSE 80


ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

```

<br><br>
## BackEnd Pipeline(Python Server : 8082)
```groovy
pipeline {
    agent any
    
    environment {
        imageName = "wlgjs0458/boredapple-recommend"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = '8082'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-recommend',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                dir ('recommend') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name mybuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }
        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter name=barecommend"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop barecommend"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm barecommend"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi wlgjs0458/boredapple-recommend:latest"
                    fi
                    '''
                }
            }
        }

        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri sudo docker pull $imageName:latest"
                }
            }
        }
        
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name barecommend -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}

``` 
## BackEnd Dockerfile(Python Server : 8082)
```docker
ARG PYTHON_VERSION=3.10.11
FROM python:${PYTHON_VERSION}-slim as base

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

ARG UID=10001


USER root

RUN apt update
RUN apt install -y gcc pkg-config default-libmysqlclient-dev curl

RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    python -m pip install -r requirements.txt


COPY . .

EXPOSE 8082

CMD python -m recommend.app

``` 

## Python Server requirement.txt
```text
Flask==3.0.2
pymysql==1.1.0
Werkzeug==3.0.1
python-dotenv==1.0.1
apscheduler==3.10.4
numpy==1.26.3
pandas==2.0.3
scikit-learn==1.2.2
fasttext-wheel==0.9.2
mecab-python==1.0.0
mecab-python3==1.0.9
hgtk==0.2.1
mecab-ko
```

<br><br>
## BackEnd Pipeline(Eureka Server : 8083)
```groovy
pipeline {
    agent any
    
    environment {
        imageName = "wlgjs0458/boredapple-server-discovery"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = '8083'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-server-discovery',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        
        stage('Jar Build') {
            steps {
                dir ('discoveryservice') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar -x test'
                    // sh './gradlew build'
                }
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                dir ('discoveryservice') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name discoverybuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }

        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter name=badiscovery"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop badiscovery"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm badiscovery"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi wlgjs0458/boredapple-server-discovery:latest"
                    fi
                    '''
                }
            }
        }

        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri sudo docker pull $imageName:latest"
                }
            }
        }
        
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name badiscovery -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}

``` 
## BackEnd Dockerfile(Eureka Server : 8083)
```docker
FROM docker

COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk

EXPOSE 443
EXPOSE 8083
EXPOSE 80


ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
``` 

<br><br>
## BackEnd Pipeline(User Server : 8084)
```groovy
pipeline {
    agent any
    
    environment {
        imageName = "wlgjs0458/boredapple-server-user"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = '8084'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-server-user',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        
        stage('Jar Build') {
            steps {
                dir ('user-service') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar -x test'
                    // sh './gradlew build'
                }
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                dir ('user-service') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name userbuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }

        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter name=bauser"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop bauser"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm bauser"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi wlgjs0458/boredapple-server-user:latest"
                    fi
                    '''
                }
            }
        }

        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri sudo docker pull $imageName:latest"
                }
            }
        }
        
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name bauser -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}

``` 
## BackEnd Dockerfile(User Server : 8084)
```docker
FROM docker

COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk

EXPOSE 443
EXPOSE 8084
EXPOSE 80


ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
``` 

<br><br>
## BackEnd Pipeline(Game Server : 8085)
```groovy
pipeline {
    agent any
    
    environment {
        imageName = "wlgjs0458/boredapple-server-game"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = '8085'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-server-game',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        
        stage('Jar Build') {
            steps {
                dir ('game-service') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar -x test'
                    // sh './gradlew build'
                }
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                dir ('game-service') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name gamebuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }

        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter name=bagame"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop bagame"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm bagame"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi wlgjs0458/boredapple-server-game:latest"
                    fi
                    '''
                }
            }
        }

        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri sudo docker pull $imageName:latest"
                }
            }
        }
        
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name bagame -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}

``` 
## BackEnd Dockerfile(Game Server : 8085)
```docker
FROM docker

COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk

EXPOSE 443
EXPOSE 8085
EXPOSE 80


ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]
``` 

<br><br>
## BackEnd Pipeline(Study Server : 8086)
```groovy
pipeline {
    agent any
    
    environment {
        imageName = "wlgjs0458/boredapple-server-study"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = '8086'
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-server-study',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        
        stage('Jar Build') {
            steps {
                dir ('study-service') {
                    sh 'chmod +x ./gradlew'
                    sh './gradlew clean bootJar -x test'
                    // sh './gradlew build'
                }
            }
        }
        
        stage('Image Build & DockerHub Push') {
            steps {
                dir ('study-service') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name studybuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }

        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter name=bastudy"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop bastudy"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm bastudy"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi wlgjs0458/boredapple-server-study:latest"
                    fi
                    '''
                }
            }
        }

        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri sudo docker pull $imageName:latest"
                }
            }
        }
        
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul -e "SPRING_PROFILES_ACTIVE=prod" --name bastudy -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}

``` 
## BackEnd Dockerfile(Study Server : 8086)
```docker
FROM docker

COPY --from=docker/buildx-bin:latest /buildx /usr/libexec/docker/cli-plugins/docker-buildx

FROM openjdk:17-jdk

EXPOSE 443
EXPOSE 8086
EXPOSE 80


ADD ./build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "/app.jar"]

``` 

<br><br>
## FrontEnd Pipeline(Next.js Client : 80 -> 3000)
```groovy
pipeline {
    agent any
    tools {nodejs "nodejs"}
    
    environment {
        imageName = "wlgjs0458/boredapple-client"
        registryCredential = 'wlgjs0458-docker'
        dockerImage = ''
        
        releaseServerAccount = 'ubuntu'
        releaseServerUri = 'k10a508.p.ssafy.io'
        releasePort = 3000
    }

    stages {
        stage('Git Clone') {
            steps {
                git branch: 'develop-client',
                    credentialsId: 'gitlab-wlgjs0458',
                    url: 'https://lab.ssafy.com/s10-final/S10P31A508.git'
            }
        }
        stage('Node Build') {
            steps {
                dir ('client') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        stage('Image Build & DockerHub Push') {
            steps {
                dir('client') {
                    script {
                        docker.withRegistry('', registryCredential) {
                            sh "docker buildx create --use --name webbuilder"
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:$BUILD_NUMBER --push ."
                            sh "docker buildx build --platform linux/amd64,linux/arm64 -t $imageName:latest --push ."
                        }
                    }
                }
            }
        }
        
        stage('Before Service Stop') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                    if test "`ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker ps -aq --filter ancestor=$imageName:latest"`"; then
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker stop $(docker ps -aq --filter ancestor=$imageName:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rm -f $(docker ps -aq --filter ancestor=$imageName:latest)"
                    ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "docker rmi $imageName:latest"
                    fi
                    '''
                }
            }
        }
        
        stage('DockerHub Pull') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh "ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri 'sudo docker pull $imageName:latest'"
                }
            }
        }
        stage('Service Start') {
            steps {
                sshagent(credentials: ['ubuntu-a508']) {
                    sh '''
                        ssh -o StrictHostKeyChecking=no $releaseServerAccount@$releaseServerUri "sudo docker run -i -e TZ=Asia/Seoul --name next -p $releasePort:$releasePort -d $imageName:latest"
                    '''
                }
            }
        }
    }
}


``` 
## FrontEnd Dockerfile(Next.js Client : 80 -> 3000)
```docker
# nginx 이미지 사용
FROM node:20-alpine

# root에 /app 폴더 생성
RUN mkdir /app

# work dir 고정
WORKDIR /app

# host pc의 현재 경로의 build 폴더를 work dir의 build 폴더로 복사
COPY . .

# 80 포트 개방
EXPOSE 80

# 443 포트 개방
EXPOSE 443

# container 실행 시 자동으로 실행할 command. nginx 시작함
CMD ["npm", "start"]
```

## FrontEnd Nginx.conf
```groovy
server {
    listen 80;
    server_name k10a508.p.ssafy.io;

    location / {
        proxy_pass http://localhost:3000;
    }

    location /api {
        proxy_pass http://localhost:8081;
    }
}

```

