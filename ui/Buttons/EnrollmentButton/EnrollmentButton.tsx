'use client'
import { useAuthProvider } from '@/app/context/auth'
import React, { useState } from 'react'
import { FaRegBookmark } from 'react-icons/fa6'
import { supabase } from '@/lib/site/constants'
import { useQuery } from '@tanstack/react-query'
function EnrollmentButton({ course }) {
    const [enrolled, setEnrolled] = useState(false)
    const { profile, user, isLoading: userLoading } = useAuthProvider()
    // console.log(course)
    //console.log(user, course)
    const getEnrollmentStatus = async ({ user }) => {
        if (user!! && course!!) {
            const { data } = await supabase
                .from('student_enrollments')
                .select('*')
                .eq('student_id', user?.id)
                .eq('course_id', course?._id)
                .single()
            //console.log(data)
            if (!data) {
                return { enrollment: 'not_enrolled' }
            } else {

                return { enrollment: data }
            }
        }
    }



    const handleButtonAction = async () => {//const data = await getEnrollmentStatus({user})
        try {
            if (data?.enrollment === "not_enrolled") {
                const { data, error } = await supabase
                    .from('student_enrollments')
                    .insert({
                        'student_id': user?.id,
                        'course_id': course?._id,
                        'enrollment_status': 'enrolled'
                    })
                    .select()
                    .single()
                // .select()
                if (error) {
                    throw new Error('Error inserting user')
                } else {
                    setEnrolled(true)
                }
            }

            if (data?.enrollment?.enrollment_status === "enrolled") {
               
              console.log('Pop Course Window')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { data, isLoading } = useQuery({
        queryKey: ["enrollment", user, enrolled],
        queryFn: ({ queryKey }) => getEnrollmentStatus({ user: queryKey[1] }),
        enabled: !!user ,
        refetchOnMount: false

    })
    console.log(data)
    return user && (
        <div className='space-x-2 flex justify-center w-fit mx-auto'>
            <button onClick={handleButtonAction} className=' w-max min-w-[125px] lg:min-w-[170px] text-black font-semibold bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100 rounded-md text-sm px-5 py-2.5 text-center mx-auto justify-center flex'>
                {data?.enrollment === 'not_enrolled' ? 'Enroll' : 'Start Course'}
                
            </button>
            <button className='min-w-[40px] w-fit text-black font-semibold bg-red-300 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-red-100 rounded-md text-sm px-2.5 py-2.5 text-center mx-auto justify-center flex'>
                <FaRegBookmark className='fill-black stroke-black accent-black black' />
            </button>
        </div>)
}

export default EnrollmentButton