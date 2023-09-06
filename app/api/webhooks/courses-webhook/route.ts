import { NextResponse } from "next/server"

export async function POST(req: Request) {
if(req.method === 'POST') {
    const payload = req?.json()
    
    NextResponse.json({ 'success': 'Sanity Webhook is working', 'status': 200})
} else {
    NextResponse.json({'error': 'Not a POST, or working, please update and try again', 'status': 405})
}
}