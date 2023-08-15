'use client'
import React from 'react'
import { useAuthProvider } from '../context/auth'

function page() {
    const { user, profile } = useAuthProvider()
    return profile && (
        <div className='relative place-items-center min-h-full mx-auto w-full p-8'>
            <p className='font-bold text-xl text-center'>{`Hello, ${profile.full_name}`}</p>
            <p className='text-xs text-center'>{user.email}&nbsp;|&nbsp;{profile.username}</p>
        </div>
    )
}

export default page