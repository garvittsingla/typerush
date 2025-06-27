import React from 'react';

interface CardProps {
  color: string;
  wpm: number;
  progress: number;
  isPlayer?: boolean;
}

const colors: { [key: string]: string } = {
  "mine": "bg-purple-700",
  "other": "bg-green-600",
  "purple": "bg-purple-700",
  "green": "bg-green-600"
};

const Card = (props: CardProps) => {
  return (
    <div className="relative inline-block">
      <div className={`w-48 h-32 ${colors[props.color]} rounded-lg absolute top-1 left-1 opacity-60`}></div>
      
      <div className={`w-48 h-32 ${colors[props.color]} rounded-lg relative z-10 border-2 border-gray-300 flex flex-col overflow-hidden`}>
        
        <div className="bg-black bg-opacity-20 px-3 py-1 border-b border-gray-300">
          <div className="text-pink-300 text-sm font-mono font-bold tracking-wider">
            {props.isPlayer !== false ? "YOU" : "PLAYER"}
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center items-center px-2">
          <div className="text-pink-300 text-4xl font-mono font-bold leading-none mb-1">
            {props.wpm}
          </div>
          <div className="text-pink-300 text-xs font-mono font-bold tracking-widest">
            WPM
          </div>
        </div>
        
        <div className="bg-black bg-opacity-20 px-3 py-1 border-t border-gray-300">
          <div className="flex justify-between items-center">
            <span className="text-pink-300 text-xs font-mono font-bold tracking-wider">
              HISTORY
            </span>
            <span className="text-pink-300 text-xs font-mono font-bold">
              {props.progress}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;