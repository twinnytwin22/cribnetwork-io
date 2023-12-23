"use client";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";
import { getSession } from "@/lib/providers/supabase/supabase-server";
import { supabase } from "@/lib/site/constants";
import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { createContext, useCallback, useContext, useMemo, useTransition } from "react";
import { toast } from "react-toastify";
import { AuthState, useAuthStore } from "./store";

const refresh = () => {
  window.location.reload();
};

export const AuthContext = createContext<AuthState>(useAuthStore.getState());
const fetchProfile = async (id: string, setProfile: (profile) => void) => {
try {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();
   // console.log(data, error)
  //console.log(data)
  setProfile(data)

  return data;
} catch (err){
  console.log(err)
  setProfile(null)
  throw new Error('Error fetching profile:')
} 
};

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    signInWithGoogle,
    signInWithSpotify,
    signOut,
    signInWithEmail,
    unsubscribeAuthListener,
    user,
    profile,
    setUserRole,
    userRole,
  } = useAuthStore();
  const setProfileState = (profile: any) => useAuthStore.setState({ profile })

  const setProfile = useCallback((profile) => {
    setProfileState(profile)
  },[setProfileState])
  //console.log(userRole)
  const router = useRouter();
  const pathname = usePathname();
  const [startTransition, isPending] = useTransition()
   const {data:session} = useQuery({
     queryKey: ['session'],
     queryFn: () => getSession()
  
  })
 // const standInId = '77b9b52e-65f4-46cd-be3f-07f26829ad5b'
  // console.log(session, 'context session')
  const {data:userProfile } = useQuery({
    queryKey:['userProfile', session],
    queryFn: () => 
      fetchProfile(session?.user.id!, setProfile),
    enabled: !!session })

 // console.log(userProfile, 'user profile')
  const onAuthStateChange = async () => {
    try {
    const [
      { data: userSessionData },
      {
        data: { subscription: subscriptionData },
      },
    ] = await Promise.all([
      supabase.auth.getSession(),
      supabaseAdmin.auth.onAuthStateChange(
        async (event: AuthChangeEvent, currentSession: Session | null) => {

          if (event === "SIGNED_IN" || currentSession) {
            useAuthStore.setState({ user: currentSession?.user });
         //   router.refresh();
          }
          
           if (event === "SIGNED_OUT") {

          }
          if (event === "PASSWORD_RECOVERY") {
            const newPassword = prompt(
              "What would you like your new password to be?",
            );
            const { data, error } = await supabaseAdmin.auth.updateUser({
              password: newPassword!,
            });

            if (data) toast.success("Password updated successfully!");
            if (error)
              toast.error("There was an error updating your password.");
            console.log(error);
          }
        },
      ),
    ]);

    if (userSessionData && userSessionData.session) {
      const { data: authUser } = await supabase.auth.getUser();

      if (authUser?.user) {
        const profile = await fetchProfile(authUser.user.id, setProfile);
        useAuthStore.setState({ profile });
        useAuthStore.setState({userRole: profile.user_role})
        useAuthStore.setState({ user: authUser.user });
        subscriptionData?.unsubscribe();

        return { user: authUser.user, profile };
      }
    }
    subscriptionData?.unsubscribe();

    return { subscription: subscriptionData };

  }catch (error){
    console.log(error)
    throw new Error('Error completed auth')


  }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["user", "subscription", "subscriptionData", "authListener"],
    queryFn: () => onAuthStateChange(),
  });

 // console.log(data, "QUERY DATA")

  const value = useMemo(
    () => ({
      user: user || data?.user || null,
      profile: profile || data?.profile || null,
      isLoading,
      signInWithGoogle,
      signInWithSpotify,
      signInWithEmail,
      signOut,
      unsubscribeAuthListener,
      userRole,
      setUserRole,
    }),
    [
      data,
      userRole,
      setUserRole,
      user,
      profile,
      isLoading,
      signInWithEmail,
      signInWithGoogle,
      signInWithSpotify,
      signOut,
      unsubscribeAuthListener,
    ],
  );
  // console.log(pathname)
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthProvider = () => {
  return useContext(AuthContext);
};
