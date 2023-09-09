'use client'
import React, { Suspense } from 'react'
import Panel from './Panel'
import { useAuthProvider } from '@/app/context/auth'

function WelcomePanel({ children }: { children: React.ReactNode }) {
    const { profile } = useAuthProvider()
    return (
        <Suspense fallback='loading...'>
        <Panel
            title={`Welcome back, ${profile ? profile?.full_name : ''}`}>
            <div>
                {children}
                <p className='text-zinc-800 dark:text-zinc-300 text-center'>
                {profile ? profile?.full_name : ''}                
                </p>
            </div>

        </Panel>
        </Suspense>
    )
}

export default WelcomePanel