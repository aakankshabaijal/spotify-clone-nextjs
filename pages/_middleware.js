import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;

	/**
	Allow the request if the following is true
	1) It is a request for next auth session and provider fetching
	2) Token exists
    */
	if (pathname.includes('/api/auth') || token) {
		return NextResponse.next();
	}

	/**
     * Redirect to login page if they don't have a token
     */
	if (!token && pathname !== '/login') {
		return NextResponse.redirect('/login');
	}
}
