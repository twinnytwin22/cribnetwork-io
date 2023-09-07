import { NextResponse } from 'next/server'
import { validateRequest } from '@/lib/hooks/validateRequest';

// Create a function for the validation check


export async function POST(req: Request) {
  try {
    if (req.method === 'POST') {
      const validationResponse = await validateRequest(req);

      if (validationResponse) {
        return validationResponse;
      }

      return NextResponse.json({
        success: 'Sanity Webhook is working',
        status: 200
      });
    } else {
      return NextResponse.json({
        error: 'Method not allowed, or working, please update and try again',
        status: 405
      });
    }
  } catch (error) {
    // Handle any unexpected errors here
    console.error('Error in webhook processing:', error);
    return NextResponse.json({
      error: 'Internal server error',
      status: 500
    });
  }
}
