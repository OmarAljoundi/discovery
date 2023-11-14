/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    ppr: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'nyjwscuqqrgvxpajhreu.supabase.co',
      },
      {
        hostname: 'nextui-docs-v2.vercel.app',
      },
      {
        hostname: 'flagcdn.com',
      },
    ],
  },
}

module.exports = nextConfig
