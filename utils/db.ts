
export const getAllArtists = async () => {
    try {
        const res = await fetch(`/api/v1/music/getAllArtists/`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
               // "Access-Control-Allow-Origin": "*"
             },
             
           //  mode: 'no-cors', 
        
  
        })
        
        if (res) {
            const artists = await res.json()
        
        //const data = songs.json()
        return artists
    }} catch (error) {
        throw error
    }
  }

  export const getAllSongs = async () => {
    try {
        const res = await fetch(`/api/v1/music/getAllArtists/`, {
            method: 'GET',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
               // "Access-Control-Allow-Origin": "*"
             },
             
           //  mode: 'no-cors', 
        
  
        })
        
        if (res) {
            const artists = await res.json()
        
        //const data = songs.json()
        return artists
    }} catch (error) {
        throw error
    }
  }


  export const addMewArtist = async (updates: any) => {
    try {
        const res = await fetch(`/api/v1/music/addNewArtist`, {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                "Content-Type": "application/json",
               // "Access-Control-Allow-Origin": "*"
             },
             body: JSON.stringify( updates )
             
           //  mode: 'no-cors', 
        
  
        })
        
        if (res.ok) {
            const artist = await res.json()
        
        //const data = songs.json()
        return artist
    }} catch (error) {
        throw error
    }
  }