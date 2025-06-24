import React from 'react'
import { FiUser } from 'react-icons/fi';

interface CardProps{
    color:string
    wpm:number;
    progress:number;

}

const colors: { [key: string]: string } = {
  "mine": "bg-[var(--color-secondary)]",
  "other":"bg-green-500"
}
const Card = (props:CardProps) => {

  return (
      <div className="relative">
        <div className={`w-56 h-30 py-2 ${colors[props.color]} rounded-lg border-2 border-white absolute top-2 left-2`}></div>
        
        <div className={`w-55 h-29 ${colors[props.color]}  border-2 border-white rounded-xl relative z-10 shadow-lg flex flex-col `}>
          <div className=" h-[39%] w-full py-2  flex flex-col  border-b-2 border-white">
            <h2 className="text-3xl font-bold text-white font-[vt323] flex"><FiUser/>{props.color == "mine" ? "You" : "Other Player"}
              
            </h2>
          </div>
            <div className='w-full h-[1px] mt-2 bg-white'></div>
            <div className='w-full flex items-center h-2/3 font-medium text-2xl text-white font-[vt323] justify-center gap-3'>
                <div className='ml-2'>WPM: {props.wpm}</div>
                <div className=''>Progress: {props.progress}</div>
            </div>
        </div>
      </div>
    
  )
}

export default Card