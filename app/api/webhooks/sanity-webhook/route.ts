import { validateRequest } from "@/lib/hooks/validateRequest";
import { NextResponse } from "next/server";

// Create a function for the validation check

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response("error: Method Not Allowed", { status: 405 });
  }
  try {
    if (req.method === "POST") {
      const validationResponse = await validateRequest(req);

      if (validationResponse) {
        return validationResponse;
      }

      return NextResponse.json({
        success: "Sanity Webhook is working",
        status: 200,
      });
    } else {
      return NextResponse.json({
        error: "Method not allowed, or working, please update and try again",
        status: 405,
      });
    }
  } catch (error) {
    // Handle any unexpected errors here
    console.error("Error in webhook processing:", error);
    return NextResponse.json({
      error: "Internal server error",
      status: 500,
    });
  }
}
