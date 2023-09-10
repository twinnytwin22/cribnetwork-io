import React from 'react';
import { getActiveProductsWithPrices, getSession, getSubscription } from '@/lib/providers/supabase/supabase-server';
import WelcomePanel from '@/ui/Sections/PortalOverview/Panels/WelcomePanel';
import LearningPanel from '@/ui/Sections/PortalOverview/Panels/LearningPanel';
import NotificationsPanel from '@/ui/Sections/PortalOverview/Panels/NotificationsPanel';
import { supabase } from '@/lib/site/constants';
import Link from 'next/link';
async function Portal() {
    const [session, products, subscription] = await Promise.all([
        getSession(),
        getActiveProductsWithPrices(),
        getSubscription()
    ]);

    const { data: enrollments, error } = await supabase
        .from('student_enrollments')
        .select('*, courses(*)')
        .eq('student_id', session?.user.id)
    console.log(enrollments)

    return (
        <section className='w-screen h-full mx-auto relative'>
            <React.Suspense fallback='loading'>
                <div className='grid grid-cols-6 col-span-6 gap-8 h-1/2 mt-24 w-full px-10'>
                    <WelcomePanel>
                        <p className='text-zinc-800 dark:text-zinc-300 text-center'>
                            {session?.user.email}
                        </p>
                        <p className='text-zinc-800 dark:text-zinc-300 text-center'>
                            {''}
                        </p>
                    </WelcomePanel>
                    <LearningPanel
                        href={'/portal/learning'}>
                        {enrollments && enrollments?.length > 0 ? (
                            <div>
                                <p className='text-center font-semibold'>Your courses</p>
                                {enrollments?.map((course) => (
                                    <div  key={course.id} className='flex items-center space-x-4 mx-auto justify-center'>
                                    <p className='text-zinc-800 dark:text-zinc-300 text-center'>
                                        {course?.courses?.title}
                                    </p>
                                    <Link href={`/portal/learning/course/${course.courses.id}`}>
                                    <button>
                                        Resume
                                    </button>
                                    </Link>
                                    </div>
                                    ))}
                            </div>
                        ) : (
                            <p className='text-zinc-800 dark:text-zinc-300 text-center'>
                                You are not currently enrolled in any courses.
                            </p>)}
                    </LearningPanel>
                    <NotificationsPanel span={6}>
                        <p className='text-zinc-800 dark:text-zinc-300 text-center'>
                            You have no new notifications.
                        </p>
                    </NotificationsPanel>
                </div>
            </React.Suspense>
        </section>
    );
}

export default Portal;
