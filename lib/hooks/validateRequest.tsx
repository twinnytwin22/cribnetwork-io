import { SIGNATURE_HEADER_NAME, isValidSignature } from "@sanity/webhook";
import { NextResponse } from "next/server";

export async function validateRequest(req: Request) {
  const payload = await req?.text();
  if (!payload) {
    return NextResponse.json({ error: "Payload is empty", status: 406 });
  }

  const headersList = req.headers;
  const signatureHeader =
    headersList.get(SIGNATURE_HEADER_NAME) || ("" as string);
  const signature = Array.isArray(signatureHeader)
    ? signatureHeader[0]
    : signatureHeader;

  if (!signature) {
    return NextResponse.json({
      error: "No Signature",
      status: 401,
      headers: JSON.stringify(headersList),
    });
  }

  const secret = process.env.SANITY_WEBHOOK_SECRET?.trim();
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not set", status: 401 });
  }

  if (!isValidSignature(payload, signature, secret)) {
    return NextResponse.json({ error: "Invalid Signature", status: 401 });
  }

  return null; // Validation passed
}
