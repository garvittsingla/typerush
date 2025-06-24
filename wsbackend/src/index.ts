import { WebSocketServer } from "ws";
import { generateRandomString } from "./lib/generatetext";
import { RoomManager } from "./RoomManager";

const wss = new WebSocketServer({port:8080})
const roomManager = new RoomManager();
wss.on("connection",async(ws)=>{
    console.log("User joined")
    roomManager.addUser(ws)
})
