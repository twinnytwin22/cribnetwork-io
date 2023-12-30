import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') ?? '/';
  const requestUrl = new URL(req.url);

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${requestUrl.origin}/portal`, {
        status: 301,
      });
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(new URL('/auth/auth-code-error', req.url));
}
