import type { APIRoute } from 'astro';
import { getItems, type Artwork, type Workshop } from '../lib/storage';

export const GET: APIRoute = async ({ site }) => {
    const siteUrl = site?.toString() || 'https://atelierkl.de';

    // Get dynamic content
    const artworks = await getItems<Artwork>('artworks');
    const workshops = await getItems<Workshop>('workshops');

    // Static pages with priorities
    const staticPages = [
        { url: '', changefreq: 'daily', priority: 1.0, lastmod: new Date() },
        { url: 'werke', changefreq: 'daily', priority: 0.9, lastmod: new Date() },
        { url: 'workshops', changefreq: 'weekly', priority: 0.9, lastmod: new Date() },
        { url: 'auftragsarbeiten', changefreq: 'monthly', priority: 0.8, lastmod: new Date() },
        { url: 'team', changefreq: 'monthly', priority: 0.7, lastmod: new Date() },
        { url: 'ueber-mich', changefreq: 'monthly', priority: 0.7, lastmod: new Date() },
        { url: 'kontakt', changefreq: 'monthly', priority: 0.8, lastmod: new Date() }
    ];

    // Generate artwork URLs
    const artworkUrls = artworks.map(artwork => ({
        url: `werke/${artwork.id}`,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: artwork.createdDate ? new Date(artwork.createdDate) : new Date()
    }));

    // Generate workshop URLs
    const workshopUrls = workshops.map(workshop => ({
        url: `workshops/${workshop.slug}`,
        changefreq: 'weekly',
        priority: 0.9,
        lastmod: new Date()
    }));

    // Combine all URLs
    const allUrls = [...staticPages, ...artworkUrls, ...workshopUrls];

    // Generate XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${allUrls.map(page => `    <url>
        <loc>${siteUrl}${page.url ? '/' + page.url : ''}</loc>
        <lastmod>${page.lastmod.toISOString()}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`).join('\n')}
</urlset>`;

    return new Response(xml, {
        status: 200,
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600'
        }
    });
};

