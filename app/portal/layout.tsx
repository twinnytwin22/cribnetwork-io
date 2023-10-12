import DashboardSidebar from '@/ui/Navigation/DashboardSidebar';
import React  from 'react';

export const dynamic = 'force-dynamic'

async function PortalLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className='relative flex h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-950 '>
            <DashboardSidebar  />
            <div className='flex-1 overflow-x-hidden overflow-y-auto'>

                <div className=' md:ml-24 lg:ml-64 mx-auto min-h-screen h-full mt-24 transition-transform z-0 flex items-center relative'>

                    {children}
                </div>
            </div>
        </div>
    );
}

export default PortalLayout;
