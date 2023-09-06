import { NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import { headers } from 'next/headers'

const secret = process.env.SANITY_WEBHOOK_SECRET! as string

export async function POST (req: Request) {
  if (req.method === 'POST') {
    const payload = await req?.text()
    const signature = headers().get(SIGNATURE_HEADER_NAME) as string
    
    if (!isValidSignature(payload, signature, secret)) {
      return NextResponse.json({ error: 'Invalid Signature', status: 401 })
    }

    const Authorization = req.headers
    return NextResponse.json({
      success: 'Sanity Webhook is working',
      status: 200
    })
  } else {
    return NextResponse.json({
      error: 'Method not allowed, or working, please update and try again',
      status: 405
    })
  }
}
