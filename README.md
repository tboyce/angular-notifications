In the *server* directory run:
```
npm install
npm start
```

In the *client* directory run:
```
npm install
npm start
```

Send notification events to the API:
```
curl -H "Content-Type: application/json" -d '{"message": "hello"}' http://localhost:3000/api
```