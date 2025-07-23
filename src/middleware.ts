import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl

	if (
		pathname.startsWith('/_next') ||
		pathname.startsWith('/api') ||
		pathname.startsWith('/.well-known') ||
		pathname.match(/\.(svg|png|jpg|jpeg|webp|ico|css|js)$/)
	) {
		return NextResponse.next()
	}

	const telegramId = req.cookies.get('telegramId')?.value || req.headers.get('x-telegram-id')

	// console.log('[middleware] pathname:', pathname)
	// console.log('[middleware] telegramId:', telegramId)

	if (!telegramId) {
		console.warn('[middleware] No telegramId — redirecting to /welcome')
		if (pathname !== '/welcome') {
			return NextResponse.redirect(new URL('/welcome', req.url))
		}
		return NextResponse.next()
	}

	try {
		const res = await fetch(`${process.env.API_URL}/api/users/verify`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ telegramId })
		})

		const data = await res.json()
		console.log('[middleware] verify response:', data)

		if (!res.ok || !data?.isRegistered) {
			console.warn('[middleware] Not registered — keeping on /welcome')
			if (pathname !== '/welcome') {
				return NextResponse.redirect(new URL('/welcome', req.url))
			}
			return NextResponse.next()
		}

		if (pathname === '/welcome') {
			console.log('[middleware] Registered user on /welcome — redirecting to /')
			return NextResponse.redirect(new URL('/', req.url))
		}

		console.log('[middleware] Registered user — access granted')
		return NextResponse.next()
	} catch (error) {
		console.error('[middleware] verify error:', error)
		return NextResponse.redirect(new URL('/welcome', req.url))
	}
}

export const config = {
	matcher: ['/((?!_next|favicon.ico|api|.*\\.svg$|.*\\.png$|.*\\.jpg$).*)']
}
