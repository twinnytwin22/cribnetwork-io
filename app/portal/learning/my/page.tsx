import React from 'react'
import { getSession } from '@/lib/providers/supabase/supabase-server';
import { fetchUserEnrollments } from '@/utils/use-server';
import CourseTable from '@/ui/Sections/Courses/CoursesTable';
import PageTitle from '@/ui/Components/PageTitle/PageTitle';
async function page() {
    const session = await getSession();

    if (session) {
        const userCourses = await fetchUserEnrollments({ userId: session?.user?.id })

        if (userCourses) {
            return  (
                <section className='w-full mx-auto h-full'>
<PageTitle title='Your Courses'/>
<div className='px-10 w-full mx-auto h-full mt-8'>

            <CourseTable courses={userCourses.courses} />
            </div>
            </section>
            );

        }
    } else {
        return <p>You have no courses.</p>
    }



}


export default page

