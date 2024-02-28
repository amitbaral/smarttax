/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/public'
  },
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['media.graphassets.com', 'www.facebook.com']
  }
}

module.exports = nextConfig