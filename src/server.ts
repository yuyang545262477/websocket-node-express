import * as express from "express";
import * as http from "http";
import {AddressInfo} from "net";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
        console.log(message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    ws.send("Hi there, I am a WebSocket server");
});

server.listen(process.env.PORT || 8888, () => {
    const address = server.address() as AddressInfo;
    console.log(`Server started on port ${address?.port} :)`);
});


