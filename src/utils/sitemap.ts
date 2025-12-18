// Sitemap utilities for dynamic content

export interface SitemapEntry {
    url: string;
    lastmod?: Date;
    changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
    priority?: number;
}

/**
 * Generate sitemap entries for artworks
 */
export function generateArtworkSitemapEntries(artworks: Array<{ id: string; createdDate?: Date }>): SitemapEntry[] {
    return artworks.map(artwork => ({
        url: `/werke/${artwork.id}`,
        lastmod: artwork.createdDate || new Date(),
        changefreq: 'monthly' as const,
        priority: 0.8
    }));
}

/**
 * Generate sitemap entries for workshops
 */
export function generateWorkshopSitemapEntries(workshops: Array<{ slug: string; date: Date }>): SitemapEntry[] {
    return workshops.map(workshop => ({
        url: `/workshops/${workshop.slug}`,
        lastmod: new Date(),
        changefreq: 'weekly' as const,
        priority: 0.9
    }));
}

/**
 * Static pages with their priorities
 */
export const staticPages: SitemapEntry[] = [
    {
        url: '/',
        changefreq: 'daily',
        priority: 1.0
    },
    {
        url: '/werke',
        changefreq: 'daily',
        priority: 0.9
    },
    {
        url: '/workshops',
        changefreq: 'weekly',
        priority: 0.9
    },
    {
        url: '/auftragsarbeiten',
        changefreq: 'monthly',
        priority: 0.8
    },
    {
        url: '/team',
        changefreq: 'monthly',
        priority: 0.7
    },
    {
        url: '/ueber-mich',
        changefreq: 'monthly',
        priority: 0.7
    },
    {
        url: '/kontakt',
        changefreq: 'monthly',
        priority: 0.8
    }
];

