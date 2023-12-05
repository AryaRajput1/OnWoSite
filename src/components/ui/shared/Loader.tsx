import { Loader2 } from 'lucide-react'
import React from 'react'

function Loader() {
  return (
    <div className='flex-center w-full'>
        <Loader2 className='duration-800 animate-spin'/>
    </div>
  )
}

export default Loader