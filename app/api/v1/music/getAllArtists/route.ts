import { NextRequest, NextResponse } from "next/server";


export const revalidate = 0;
export const dynamic = 'force-dynamic'
//export const dynamic = 'force-dynamic'
export async function GET(request: Request) {
//  const { searchParams } = new URL(request.url);
//  const userId = searchParams.get("userId");
try {
 if(request.method === 'GET') {
    const artists = await fetch('https://cribmusic.xyz/api/v1/getAllArtists')
          const response = {
             artists: await artists.json()
          };
          await new Promise((resolve) => setTimeout(resolve, 500));
          return  NextResponse.json(response);
        }
        } catch (error) {
          console.error("Error fetching artists:", error);
          return NextResponse.json("Error: fetching artis");
        }

        return NextResponse.json('Error: Method not found')
  }



      const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };
      
      
      export async function OPTIONS(req: NextRequest) {
        return NextResponse.json({}, { headers: corsHeaders });
      }
      