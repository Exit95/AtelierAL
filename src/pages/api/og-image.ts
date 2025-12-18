import type { APIRoute } from 'astro';

/**
 * Generate Open Graph image dynamically
 * This is a placeholder - for production, use a service like @vercel/og or similar
 */
export const GET: APIRoute = async ({ url }) => {
    const searchParams = url.searchParams;
    const title = searchParams.get('title') || 'ATELIER KL';
    const subtitle = searchParams.get('subtitle') || 'Abstrakte Kunst & Workshops';
    
    // For now, redirect to default OG image
    // In production, generate dynamic image with canvas or use @vercel/og
    
    const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
                <stop offset="100%" style="stop-color:#3a3230;stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="630" fill="url(#grad)"/>
        <text x="600" y="280" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="#e8ddd0" text-anchor="middle">
            ${escapeXml(title)}
        </text>
        <text x="600" y="360" font-family="Arial, sans-serif" font-size="36" fill="#d4c4b0" text-anchor="middle">
            ${escapeXml(subtitle)}
        </text>
        <text x="600" y="550" font-family="Arial, sans-serif" font-size="24" fill="#e8ddd0" text-anchor="middle">
            atelierkl.de
        </text>
    </svg>
    `;
    
    return new Response(svg, {
        status: 200,
        headers: {
            'Content-Type': 'image/svg+xml',
            'Cache-Control': 'public, max-age=31536000, immutable'
        }
    });
};

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
            default: return c;
        }
    });
}

