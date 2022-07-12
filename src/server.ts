import * as express from "express";
import * as http from "http";
import {AddressInfo} from "net";
import * as WebSocket from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
let intervalId: NodeJS.Timer | null = null;
const sendDataEachTime = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    intervalId = setInterval(() => {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(`${new Date().toISOString()}`);
            }
        });
    }, 500);
};

wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (message: string) => {
        console.log(message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    sendDataEachTime();
    ws.send("Hi there, I am a WebSocket server");
});

server.listen(process.env.PORT || 8888, () => {
    const address = server.address() as AddressInfo;
    console.log(`Server started on port ${address?.port} :)`);
});


