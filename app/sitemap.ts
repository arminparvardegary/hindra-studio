import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://hindra.studio'
  
  // Static pages
  const staticPages = [
    { url: '', priority: 1, changeFreq: 'weekly' as const },
    { url: '/about', priority: 0.8, changeFreq: 'monthly' as const },
    { url: '/works', priority: 0.9, changeFreq: 'weekly' as const },
    { url: '/contact', priority: 0.7, changeFreq: 'monthly' as const },
    { url: '/careers', priority: 0.6, changeFreq: 'monthly' as const },
    { url: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { url: '/terms', priority: 0.3, changeFreq: 'yearly' as const },
  ]

  // Project pages (our portfolio)
  const projects = [
    { slug: 'scriptra', priority: 0.9 },
    { slug: 'rush-photos', priority: 0.9 },
    { slug: 'rush-video', priority: 0.9 },
    { slug: 'rush-boxes', priority: 0.9 },
  ]

  const staticRoutes = staticPages.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changeFreq,
    priority: page.priority,
  }))

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/works/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: project.priority,
  }))

  return [...staticRoutes, ...projectRoutes]
}

