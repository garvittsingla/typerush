import  { useState } from 'react';
import { Users, Plus, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';



export default function LandingPage() {
  const [roomId, setRoomId] = useState('');

  const handleJoinRoom = (e:any) => {
    e.preventDefault();
    if (roomId.trim()) {
      window.location.href = `/game/${roomId.trim()}`;
    }
  };

  const handleCreateRoom = () => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    window.location.href = `/game/${newRoomId}`;
  };

  return (
    <div className='bg-[var(--color-primary)] w-full h-screen'>
      <Navbar/>
      <div className='max-w-screen-lg h-3/4 mx-auto py-4 space-y-4'>
          <div className='text-[var(--color-secondary)] text-4xl flex items-center justify-center gap-2 h-20 w-full font-semibold font-[oswald]'>
          <Users className="w-10 h-10" />
          Welcome to typeRush
        </div>
        
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
            
            <div className="p-8 space-y-6 border-r border-white/10">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[var(--color-secondary)]/20 rounded-full flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>
                <h2 className="text-2xl font-bold text-white font-[oswald]">
                  Join Existing Room
                </h2>
                <p className="text-white">
                  Enter a room code to join your friends
                </p>
              </div>
              
              <div className="space-y-4">
                <input
                  type="text"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                  placeholder="Enter Room Code"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent backdrop-blur-sm text-center text-lg font-mono tracking-wider"
                  maxLength={10}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinRoom(e)}
                />
                
                <button
                  onClick={handleJoinRoom}
                  disabled={!roomId.trim()}
                  className="w-full bg-[var(--color-secondary)] cursor-pointer disabled:bg-white/5 disabled:cursor-not-allowed text-white disabled:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 border border-[var(--color-secondary)]/30 hover:border-[var(--color-secondary)]/50"
                >
                  <span>Join Room</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Side - Create Room */}
            <div className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[var(--color-secondary)]/20 rounded-full flex items-center justify-center mx-auto">
                  <Plus className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>
                <h2 className="text-2xl font-bold text-white font-[oswald]">
                  Create New Room
                </h2>
                <p className="text-white">
                  Start a new game and invite others
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <p className="text-white text-sm">
                    A unique room code will be generated
                  </p>
                  <div className="text-white font-mono text-lg bg-white/5 py-2 px-4 rounded border border-white/10">
                    {Math.random().toString(36).substring(2, 8).toUpperCase()}
                  </div>
                </div>
                
                <button
                  onClick={handleCreateRoom}
                  className="w-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/90 text-white cursor-pointer font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create Room</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}