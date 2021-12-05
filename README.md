# ble gateway
ble gateway device that send ble data to cloud watch

# dev mode
## project setup
```
npm install
```
## project start
```
npm run start
```

# production mode
nmap -sn 192.168.0.0/24
```
git clone https://github.com/jsotogaviard/ble-gateway
cd ble-gateway
docker-compose down -v --remove-orphans && docker-compose up --build -d && docker-compose logs -f
```
