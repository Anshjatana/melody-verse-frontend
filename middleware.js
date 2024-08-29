import { NextResponse } from 'next/server';
import { getCookie } from 'cookies-next';

export function middleware(request) {
  const token = getCookie('token', { req: request }); // Get token from cookies

  // Define the path you want to protect
  const protectedPaths = ['/profile'];  // Add more paths as needed

  // Check if the requested path is protected
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path));

  if (isProtectedPath && !token) {
    // Redirect to login or signup page if token is missing
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow access to protected routes if token is present
  return NextResponse.next();
}

// Specify which paths to apply this middleware to
export const config = {
  matcher: ['/profile/:path*'],  // Add more paths as needed
};
