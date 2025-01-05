/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  changefreq: 'daily',
  priority: 0.8,
  exclude: ['/server-sitemap.xml', '/admin', '/admin/*'],
  generateIndexSitemap: true,
  autoLastmod: true,
  additionalPaths: async (config) => [
    await config.transform(config, '/about-us'),
    await config.transform(config, '/customers-review'),
    await config.transform(config, '/faq'),
    await config.transform(config, '/tour-listing'),
    await config.transform(config, '/visa'),
    await config.transform(config, '/articles'),
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'black-listed-bot',
        disallow: ['/admin', '/admin/*'],
      },
    ],
    additionalSitemaps: [process.env.NEXT_PUBLIC_URL + '/server-sitemap.xml'],
  },
}
