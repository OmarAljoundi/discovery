/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    webVitalsAttribution: ['CLS', 'FCP', 'TTFB', 'LCP'],
  },
  swcMinify: true,
  images: {
    minimumCacheTTL: 86400,
    deviceSizes: [640, 1080, 1200],
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
      {
        hostname: 'vxvdlhgsekjgjrynhkdt.supabase.co',
      },
    ],
  },
}

export default nextConfig
