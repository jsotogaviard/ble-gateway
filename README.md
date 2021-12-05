# ble gateway
ble gateway that sends ble data from sensors to cloud watch

# dev mode
```
git clone https://github.com/jsotogaviard/ble-gateway
cd ble-gateway
npm install
npm run main
```
note: docker does not work 'EAFNOSUPPORT, Address family not supported by protocol' 

# production mode
nmap -sn 192.168.1.0/24
```
git clone https://github.com/jsotogaviard/ble-gateway
cd ble-gateway
docker-compose down -v --remove-orphans && docker-compose up --build -d && docker-compose logs -f
```
