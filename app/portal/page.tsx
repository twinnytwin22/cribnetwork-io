'use client'
import React from 'react'
import { useAuthProvider } from '../context/auth'

function Portal() {
    const { user, profile } = useAuthProvider()
    return (
        <div className='relative place-items-center min-h-full mx-auto w-full p-8'>
            {profile &&
                <React.Fragment>
                    <p className='font-bold text-xl text-center'>{`Hello, ${profile.full_name}`}</p>
                    <p className='text-xs text-center'>{user.email}&nbsp;|&nbsp;{profile.username}</p>
                </React.Fragment>}
        </div>
    )
}

export default Portal