/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['nyjwscuqqrgvxpajhreu.supabase.co', 'nextui-docs-v2.vercel.app', 'flagcdn.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
