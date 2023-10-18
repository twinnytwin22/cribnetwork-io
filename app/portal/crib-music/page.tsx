
import FormGroup from '@/ui/Forms/MusicForms/FormGroup'
import { getAllArtists, getAllSongs } from '@/utils/use-server'
import React from 'react'
export const dynamic = 'force-dynamic'
async function page() {
  const [artists, songs] = await Promise.all([
    getAllArtists(), 
    getAllSongs()
  ])

  const props = {
    artists: artists?.artists, 
    songs: songs?.songs
  }

  if (!props) {
    return null
  }
  return  (
    <div className='w-screen relative mx-auto h-full '>
            <FormGroup {...props}/>  
    </div>
  )
}

export default page