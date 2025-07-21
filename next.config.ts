// next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'api.sibrik.io'
			}
		]
	}
}

module.exports = nextConfig
