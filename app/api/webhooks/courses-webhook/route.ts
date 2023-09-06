import { NextResponse } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'

const secret = process.env.SANITY_WEBHOOK_SECRET! as string

export async function POST (req: Request) {
  if (req.method === 'POST') {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME)
    const payload = await req?.json()
    if (!isValidSignature(payload, signature!, secret)) {
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
