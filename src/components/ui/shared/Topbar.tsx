import {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react';
import { Button } from '../button'
import { useSignOutAccount } from '@/lib/react-query/queriesAndMutations'
import { useUserContext } from '@/context/AuthContext'

const Topbar = () => {
    const {mutate:signOut,isSuccess}= useSignOutAccount();
    const navigate = useNavigate()
    const {user } = useUserContext();

    useEffect(() => {
      if(isSuccess) navigate(0)

    }, [isSuccess])
    
  return (
    <section className='topbar'>
      <div className='flex justify-between items-center py-4 px-5'>
      <Link to='/' className='inline'>
      <h2 className="inline text-xl font-bold">OnWo</h2>
      </Link>
      <div className='flex gap-4'>
        <Button variant="ghost" className='shad-button_ghost' onClick={()=>signOut()}>
        <LogOut />
        </Button>
        <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
            <img src={user.imageUrl || ''} alt='profile' className='h-8 w-8 rounded-full'/>
        </Link>
      </div>

      </div>
    </section>
  )
}

export default Topbar
