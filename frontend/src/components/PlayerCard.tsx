import React from 'react'
import Card from './Card'
import { useCounter } from '../hooks/useCounter'
import { useMyState } from '../context/OurContext'
import { useotherplayer } from '../context/OtherPlayerContext'

const PlayerCard = () => {
    const { mywpm, myprogress } = useMyState();
    const {wpm,progress} = useotherplayer()
    console.log(mywpm)
    const counter = useCounter();
  return (
    <div className='w-full h-32 bg-red900 flex items-center justify-center gap-30'>
        <Card color='mine' wpm={mywpm} progress={myprogress} isPlayer={true}/>
        <div className='text-white font-6xl font-[mono]'>{counter}</div>
        <Card color='other' wpm={wpm} progress={progress} isPlayer={false}/>
    </div>
  )
}

export default PlayerCard