import { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  if (process.env.PUBLIC_SITE_LIVE !== 'true') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
      host: SITE_URL,
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/', '/portal/', '/complaints/resume/', '/complaints/submitted/'],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
