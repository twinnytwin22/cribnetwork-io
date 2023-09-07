import { NextResponse } from "next/server"
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook"   
import { revalidateTag } from "next/cache"

export async function POST(req: Request) {
  try {
    // Get signature header (send with webhook request)
    const signatureHeader = req.headers.get(SIGNATURE_HEADER_NAME) || ""
    const signature = Array.isArray(signatureHeader)
      ? signatureHeader[0]
      : signatureHeader
    const secret = process.env.SANITY_WEBHOOK_SECRET?.trim()

    // Parse body stream, which we'll eventually JSON parse.
    const body = req.body && (await streamToString(req.body))
    if (!body) return new NextResponse("Bad Input", { status: 400 })


    // Validate signature
    if (!isValidSignature(body, signature, secret!)) return new NextResponse("Unauthorized", { status: 401 })

    // Add your own custom logic to choose what tags to invalidate
    const { _id, _type, slug, operation } = JSON.parse(body);
    const tagsToInvalidate = new Set<string>()
		
    // ...

    // Revalidate all of the appropriate tags
    tagsToInvalidate.forEach(tag => {
      try { revalidateTag(tag) } catch {}
    })

    // And send back a 🤙 response
    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({
      success: false,
      message: err instanceof Error ? err.message : "Unknown error",
    })
  }
}

// util to parse stream to a string
async function streamToString(stream: ReadableStream<Uint8Array>) {
  const chunks: any = [], reader = stream.getReader()

  let { done, value } = await reader.read()
  do {
    if (value !== undefined) chunks.push(value)
    ;({ done, value } = await reader.read())
  } while (!done)

  return Buffer.concat(chunks).toString("utf8")
}