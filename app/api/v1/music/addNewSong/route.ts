import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/providers/supabase/supabase-lib-admin";

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}
export const dynamic = 'force-dynamic'
export const revalidate = 0;
//export const dynamic = 'force-dynamic'
export async function POST(request: Request) {
const {updates} = await request.json()
try {
 if(request.method === 'POST') {
    const { data: song, error } = await supabaseAdmin
    .from('songs')
    .insert(updates)
    .select()
    .single()
    //.eq('student_id', userId)
   // .limit(5)
    console.log(song)

    if (error) {
      throw new Error("Error adding song:"+ JSON.stringify(error));
    }    
          const response = {
             song
          };
          await new Promise((resolve) => setTimeout(resolve, 500));
          return  NextResponse.json(response, {headers, status: 200});
        }
        } catch (error) {
          console.error("Error adding song:", error);
          return NextResponse.json("Error: adding song",{headers, status:400});
        }

        return NextResponse.json('Error: Method not found', {headers, status:400})
      }


