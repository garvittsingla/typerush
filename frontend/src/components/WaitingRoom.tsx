import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'





const WaitingRoom = ({ connected = false }) => {
  const [copied, setCopied] = useState(false);
  const gameLink = window.location.href; 

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(gameLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err)
    }
  };

  if (connected === false) {
    return (
      <div className='bg-[var(--color-primary)] w-full h-screen p-4 flex items-center justify-center'>
        <div className='bg rounded-2xl  p-8 max-w-md w-full mx-4'>
          
         
          <div className='text-center mb-8'>
            <h1 className='text-2xl font-bold text-[var(--color-secondary)] mb-2'>Game Room</h1>
            <div className='flex items-center justify-center gap-3 text- mb-4'>
             <Ring2
              size="40"
              stroke="5"
              strokeLength="0.25"
              bgOpacity="0.1"
              speed="0.8"
              color="white" 
            />

              <span className='text-lg font-medium text-white'>Waiting for player to join...</span>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <label className='block text-sm font-medium text-neutral-300 mb-2'>
                Share this link with your friend:
              </label>
              <div className='flex gap-2'>
                <input
                  type='text'
                  value={gameLink}
                  readOnly
                  className='flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />
                <button
                  onClick={copyToClipboard}
                  className='px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 flex items-center gap-2 min-w-[100px] justify-center'
                >
                  {copied ? (
                    <>
                      <Check size={16} />
                      <span className='text-sm'>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span className='text-sm'>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className='text-center mt-3'>
              <div className='inline-flex items-center px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium'>
                <div className='w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse'></div>
                Room is ready for another player
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  
  return null;
};

export default WaitingRoom;