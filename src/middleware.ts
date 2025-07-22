import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!_next|favicon.ico|api|.*\\.svg$|.*\\.png$|.*\\.jpg$).*)']
}

// import { NextRequest, NextResponse } from 'next/server'

// export function middleware(req: NextRequest) {
// 	const { pathname } = req.nextUrl
// 	const token = req.cookies.get('token')?.value

// 	if (!token && pathname !== '/welcome') {
// 		const onboarded = req.cookies.get('onboarded')?.value

// 		if (!onboarded) {
// 			return NextResponse.redirect(new URL('/welcome', req.url))
// 		}
// 	}

// 	return NextResponse.next()
// }

// export const config = {
// 	matcher: ['/((?!_next|favicon.ico|api|.*\\.svg$|.*\\.png$|.*\\.jpg$).*)']
// }
