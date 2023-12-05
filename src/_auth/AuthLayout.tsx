import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AuthLayout = () => {
    const isAuthenticated = false;
  return (<>
        {
            isAuthenticated? (<Navigate to='/'/>):(
                <>
                <section className='flex flex-1 justify-center items-center flex-col py-10'>
                    <Outlet/>
                </section>
                <img
                className='hidden xl:block h-screen w-1/2 object-cover bg-no-repeat'
                src='https://img.freepik.com/premium-photo/hands-are-playing-social-media-interactions-mobile-phone-dark-rooms-various-symbols-opinions-are-accepted-social-media-concept_11304-2601.jpg'/>
                </>
            )
        }
        </>
  )
}

export default AuthLayout
