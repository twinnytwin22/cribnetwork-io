'use client'
import React from 'react'
import { useAuthProvider } from '../context/auth'

function Portal() {
    const { user, profile } = useAuthProvider()
    return (
        <section className='relative place-items-center min-h-full mx-auto w-full p-8'>
            {profile &&
                <div className='text-black dark:text-white'>
                    <p className='font-bold text-xl text-center'>{`Hello, ${profile.full_name}`}</p>
                    <p className='text-xs text-center'>{user.email}&nbsp;|&nbsp;{profile.username}</p>
                </div>}
        </section>
    )
}

export default Portal