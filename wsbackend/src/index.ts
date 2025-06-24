import { WebSocketServer } from "ws";
import { generateRandomString } from "./lib/generatetext";
import { RoomManager } from "./RoomManager";
const port = process.env.PORT 
const wss = new WebSocketServer({port:port as unknown as number})
const roomManager = new RoomManager();
wss.on("connection",async(ws)=>{
    console.log("User joined")
    roomManager.addUser(ws)
})
