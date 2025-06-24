import { useCallback, useEffect, useRef, useState } from "react";
import { GAMEOVER, INIT, OTHERPLAYERLEFT, PROGRESS, WSURL } from "../lib/conf";
import { useRoomId } from "../context/RoomIdContext";
import { useotherplayer } from "../context/OtherPlayerContext";
import { useMyState } from "../context/OurContext";

export interface WebSocketMessage {
    type: string;
    payload: any;
}

export function useSocket() {
    console.log("inside usesocket");
    const socket = useRef<WebSocket | null>(null);
    const { currentRoomId } = useRoomId();
    const {setText} = useMyState()
    const [connectionStatus, setConnectionStatus] = useState<boolean>(false);
    const {connected,setisconnected,setWpm,setProgress,setCurrentPosition,setGameResult,setisgameover} = useotherplayer()

    //  const sendMessage = useCallback((message: any) => {
    //     if (socket.current?.readyState === WebSocket.OPEN) {
    //         socket.current.send(JSON.stringify(message));
    //     } else {
    //         console.log("error sending message")
    //     }
    // }, []);

    const connect = useCallback(() => {
        if (socket.current) {
            socket.current.close();
        }

        const ws = new WebSocket(WSURL);
        socket.current = ws;

        socket.current.onopen = () => {
            setConnectionStatus(true);
            socket.current?.send(JSON.stringify({
            type: INIT,
                room: currentRoomId
            }));
            console.log("message sent")
        };

        socket.current.onclose = () => {
            setConnectionStatus(false);
            setisconnected(false)
        };

        socket.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            setConnectionStatus(false);
        };

        socket.current.onmessage = (event) => {
    console.log("message received");
    try {
        const message:WebSocketMessage = JSON.parse(event.data);
        console.log("Parsed message:", message);
        
        if (!message || !message.type) {
            console.error("Invalid message format:", message);
            return;
        }
        
        if (message.type === INIT) {
            if (!message.payload || !message.payload.text) {
                console.error("Invalid INIT message format:", message);
                return;
            }
            setisconnected(true);
            setText(message.payload.text);
        } else if (message.type === OTHERPLAYERLEFT) {
            setisconnected(false);
        } else if (message.type === PROGRESS) {
            if (!message.payload) {
                console.error("Invalid PROGRESS message format:", message);
                return;
            }
            console.log("Processing PROGRESS message:", message.payload);
            setProgress(message.payload.opponentProgress);
            setWpm(message.payload.opponentWpm);
            setCurrentPosition(message.payload.currentposition);
        }else if(message.type === GAMEOVER){
            setisgameover(true);
            console.log(message.payload.status)
            if(message.payload.status === "WON"){
                setGameResult(true);

            }
        }
    } catch (error) {
        console.error('Error parsing WebSocket message:', error);
    }
};
    }, [currentRoomId]);

    useEffect(() => {
        connect();

       
        return () => {
            if (socket.current) {
                socket.current.close();
                socket.current = null;
                console.log("component unmounted")
            }
        };
    }, [connect]);

   

    return { 
        connectionStatus, 
        connected,
        socket,
    };
}