import type { NextConfig } from 'next'

if (process.env.http_proxy) {
  delete process.env.http_proxy
}
if (process.env.HTTP_PROXY) {
  delete process.env.HTTP_PROXY
}
if (process.env.https_proxy) {
  delete process.env.https_proxy
}
if (process.env.HTTPS_PROXY) {
  delete process.env.HTTPS_PROXY
}

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      }
    ],
  },
}

export default nextConfig