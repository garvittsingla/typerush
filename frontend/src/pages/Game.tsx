import Navbar from '../components/Navbar'
import TextArea from '../components/TextArea'
import { useRoomId } from '../context/RoomIdContext'
import { useParams} from "react-router-dom";
import { useCallback, useEffect } from 'react';
import { useSocket } from '../hooks/useSocket';
import { useotherplayer } from '../context/OtherPlayerContext';
import PlayerCard from '../components/PlayerCard';
import WaitingRoom from '../components/WaitingRoom';
import WinnerCard from '../components/WinnerCard';


const Game = () => {
  const {connectionStatus,socket} = useSocket()
  const {connected,isgameover} = useotherplayer()
    const {setCurrentRoomId} = useRoomId();
     const { roomId } = useParams();
    
      useEffect(() => {
        if (roomId) {
            setCurrentRoomId(roomId);
        }
    }, [roomId, setCurrentRoomId]);


     const sendMessage = useCallback((message: any) => {
        if (socket.current?.readyState === WebSocket.OPEN) {
            socket.current.send(JSON.stringify(message));
        } else {
            console.log("error sending message")
        }
    }, []);

    if (connectionStatus === false){
     return <div className='bg-[var(--color-primary)] w-full h-screen p-4 '>
      
      <Navbar></Navbar>
    
      <div className='w-full h-3/4 flex items-center justify-center text-white font-mono text-2xl'>Loading...</div>
    </div>
    }


    if ( connected === false){
      return < WaitingRoom/>
    }

    
  return (
    <div className='bg-[var(--color-primary)] w-full h-screen p-4 '>
      {isgameover && <WinnerCard/>}
      <Navbar></Navbar>
      <PlayerCard/>
      <TextArea sendmessage={sendMessage}/>
    </div>
  )
}

export default Game