import { NextRequest, NextResponse } from "next/server";


export const revalidate = 0;
export const dynamic = 'force-dynamic'
//export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
//  const { searchParams } = new URL(request.url);
//  const userId = searchParams.get("userId");

const { updates } = await request.json()
try {
 if(updates && request.method === 'POST') {
  console.log(updates , "UPDATES")
    const artist = await fetch('https://cribmusic.xyz/api/v1/addNewArtist/', {
        body: JSON.stringify(updates) , 
        method: 'POST', 
        headers: {
        "Content-Type": "application/json",
        "Content-Length": JSON.stringify(updates).length.toString(),
      },


    })
          const response = {
             artist: await artist.json()
          };
          await new Promise((resolve) => setTimeout(resolve, 500));
          return  NextResponse.json(response);
        }
        } catch (error) {
          console.error("Error fetching artists:", error);
          return NextResponse.json("Error: fetching artist");
        }

        return NextResponse.json('Error: Method or updates not found')
      }



      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };
      
      
      export async function OPTIONS(req: NextRequest) {
        return NextResponse.json({}, { headers: corsHeaders });
      }
      