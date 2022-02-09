# ble gateway
ble gateway that sends ble data from sensors to cloud watch

# credentials
```
touch src/credentials.ts
```
write the following content
```
export default {
    accessKeyId: 'xxx',
    secretAccessKey : 'yyy'
}
```

# dev mode
```
git clone https://github.com/jsotogaviard/ble-gateway
cd ble-gateway
npm install
npm run main
```
note: it works on mac and raspberry pi 4

# docker mode
```
git clone https://github.com/jsotogaviard/ble-gateway
cd ble-gateway
docker-compose down -v --remove-orphans && docker-compose up --build -d && docker-compose logs -f
```
note : works on raspberry pi 4 but on mac it throws a 'EAFNOSUPPORT, Address family not supported by protocol' 