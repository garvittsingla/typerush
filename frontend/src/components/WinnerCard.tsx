import { useNavigate } from 'react-router-dom';
import { useotherplayer } from '../context/OtherPlayerContext';
import { useMyState } from '../context/OurContext';

const WinnerCard = () => {
  const navigate = useNavigate();
  const { gameResult ,wpm} = useotherplayer();
  const { mywpm } = useMyState();

  const isWinner = gameResult ; 
  console.log("game result" , gameResult)
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[var(--color-primary)] rounded-xl shadow-lg p-8 max-w-md w-full">
        <h2 className="text-4xl font-bold text-center mb-6 text-white">
          {isWinner ? "🎉 You Won! 🎉" : "Better luck next time!"}
        </h2>
        
        <div className="space-y-6 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-neutral-300">Your WPM:</span>
              <span className="text-2xl font-bold text-white">{mywpm}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-neutral-300">Opponent WPM:</span>
              <span className="text-2xl font-bold text-white">{wpm || 0}</span>
            </div>
            
            <div className="h-px bg-gray-700 my-4"></div>
            
            <div className="flex justify-between items-center">
              <span className="text-neutral-300">Winner:</span>
              <span className="text-2xl font-bold text-white">
                {isWinner ? "You" : "Opponent"}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="flex-1 py-3 bg-[var(--color-secondary)] cursor-pointer hover:bg-purple-700 text-white rounded-lg transition-colors"
          >
            Play Again
          </button>
          <button 
            onClick={() => navigate('/')}
            className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            Return Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default WinnerCard;