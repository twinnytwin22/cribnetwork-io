'use client'
import { useCallback, useEffect, useState } from 'react'
import { supabase } from '@/lib/site/constants'
import { useAuthProvider } from '@/app/context/auth'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
import { postData } from '@/lib/hooks/helpers'
import Button from '../Subscriptions/Button'
export default function AccountForm({subscription, session}) {
    const [loading, setLoading] = useState(true)
    const [fullname, setFullname] = useState<string | null>(null)
    const [username, setUsername] = useState<string | null>(null)
    const [website, setWebsite] = useState<string | null>(null)
    const [avatar_url, setAvatarUrl] = useState<string | null>(null)
    const { user } = useAuthProvider()
    const router = useRouter();
    const redirectToCustomerPortal = async () => {
      try {
        const { url } = await postData({
          url: '/api/create-portal-link'
        });
        router.push(url);
      } catch (error) {
        if (error) return alert((error as Error).message);
      }
    };
    const subscriptionPrice =
    subscription &&
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: subscription?.prices?.currency!,
      minimumFractionDigits: 0
    }).format((subscription?.prices?.unit_amount || 0) / 100);

    // console.log(user, "USER")

    const getProfile = useCallback(async () => {
        if (user) {
            try {
                setLoading(true)

                let { data, error, status } = await supabase
                    .from('users')
                    .select(`full_name, username, website, avatar_url`)
                    .eq('id', user?.id)
                    .single()

                if (error && status !== 406) {
                    throw error
                }

                if (data) {
                    setFullname(data.full_name)
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                }
            } catch (error) {
                console.log(error)
                alert(JSON.stringify(error))
            } finally {
                setLoading(false)
            }
        }
    }, [user, supabase])

    useEffect(() => {
        getProfile()
    }, [user, getProfile])

    async function updateProfile({
        username,
        website,
        avatar_url,
    }: {
        username: string | null
        fullname: string | null
        website: string | null
        avatar_url: string | null
    }) {
        try {
            setLoading(true)

            let { error } = await supabase
            .from('users')
            .update({
                id: user?.id as string,
                full_name: fullname,
                username,
                website,
                avatar_url,
            })
            .eq('id', user?.id);
            if (error) throw error
            toast('Profile updated!')
        } catch (error) {
            toast.error(JSON.stringify(error))
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const renderSubscriptionButton = () => {
        return (
            <div className="flex flex-col items-start justify-between sm:flex-row sm:items-center my-2">
              <p className="pb-4 sm:pb-0 text-sm text-center">Manage your subscription on Stripe.</p>
              <button
                    className="button primary bg-zinc-700 rounded-small border border-zinc-600 hover:bg-zinc-900 hover:border-zinc-700 block w-36 text-white ease-in-out duration-300 text-sm p-1.5"
                    disabled={!session}
                onClick={redirectToCustomerPortal}
              >
                Manage
              </button>
            </div>
          );
    }
 
    return user && (
        <div className="w-full bg-white mx-auto rounded-md shadow dark:border md:mt-0 sm:max-w-md  dark:bg-black dark:border-zinc-800 p-4 text-black dark:text-zinc-200">
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    value={user?.email}
                    disabled
                    className="mt-1 px-2 py-1 w-full rounded-md border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            <div className="mb-4">
                <label htmlFor="fullName" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Full Name
                </label>
                <input
                    id="fullName"
                    type="text"
                    value={fullname || ''}
                    onChange={(e) => setFullname(e.target.value)}
                    className="mt-1 px-2 py-1 w-full border rounded-md focus:ring focus:ring-red-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 px-2 py-1 w-full border rounded-md focus:ring focus:ring-red-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            <div className="mb-4">
                <label htmlFor="website" className="block text-sm font-medium text-zinc-700 dark:text-zinc-200">
                    Website
                </label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="mt-1 px-2 py-1 w-full border rounded-md focus:ring focus:ring-red-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900  text-black dark:text-white "
                />
            </div>
            {renderSubscriptionButton()}
            <div className="mb-4">
                <button
                    className="button primary bg-zinc-700 rounded-small border border-zinc-600 hover:bg-zinc-900 hover:border-zinc-700 block w-full text-white ease-in-out duration-300 text-sm p-1.5"
                    onClick={() => updateProfile({ fullname, username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <form action="/auth/signout" method="post">
                    <button className="button block w-full" type="submit">
                        Sign out
                    </button>
                </form>
            </div>
        </div>

    )
}