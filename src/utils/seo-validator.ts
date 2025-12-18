// SEO Validation Utilities

export interface SEOValidationResult {
    valid: boolean;
    warnings: string[];
    errors: string[];
}

/**
 * Validate meta description
 */
export function validateMetaDescription(description: string): SEOValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    if (!description) {
        errors.push('Meta description is missing');
    } else {
        if (description.length < 120) {
            warnings.push(`Meta description is too short (${description.length} chars). Recommended: 120-160 chars`);
        }
        if (description.length > 160) {
            warnings.push(`Meta description is too long (${description.length} chars). Recommended: 120-160 chars`);
        }
    }
    
    return {
        valid: errors.length === 0,
        warnings,
        errors
    };
}

/**
 * Validate page title
 */
export function validateTitle(title: string): SEOValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    if (!title) {
        errors.push('Title is missing');
    } else {
        if (title.length < 30) {
            warnings.push(`Title is too short (${title.length} chars). Recommended: 30-60 chars`);
        }
        if (title.length > 60) {
            warnings.push(`Title is too long (${title.length} chars). Recommended: 30-60 chars`);
        }
    }
    
    return {
        valid: errors.length === 0,
        warnings,
        errors
    };
}

/**
 * Validate image alt text
 */
export function validateImageAlt(alt: string, filename?: string): SEOValidationResult {
    const warnings: string[] = [];
    const errors: string[] = [];
    
    if (!alt) {
        errors.push('Image alt text is missing');
    } else {
        if (alt.length < 5) {
            warnings.push('Alt text is too short. Be more descriptive');
        }
        if (alt.length > 125) {
            warnings.push('Alt text is too long. Keep it concise');
        }
        if (filename && alt.toLowerCase().includes(filename.toLowerCase())) {
            warnings.push('Alt text should not include filename');
        }
    }
    
    return {
        valid: errors.length === 0,
        warnings,
        errors
    };
}

/**
 * Generate optimized alt text for artwork images
 */
export function generateArtworkAlt(artwork: {
    title: string;
    technique?: string;
    size?: { width: number; height: number; unit: string };
}): string {
    const parts = [
        artwork.title,
        artwork.technique ? `${artwork.technique}` : 'Abstrakte Kunst',
        artwork.size ? `${artwork.size.width}x${artwork.size.height}${artwork.size.unit}` : null,
        'von Katharina Lanvermann'
    ].filter(Boolean);
    
    return parts.join(' - ');
}

/**
 * Generate optimized meta description for artwork
 */
export function generateArtworkMetaDescription(artwork: {
    title: string;
    description: string;
    technique?: string;
    availability: string;
}): string {
    const availabilityText = artwork.availability === 'available' 
        ? 'Jetzt verfügbar' 
        : artwork.availability === 'reserved' 
        ? 'Reserviert' 
        : 'Verkauft';
    
    const desc = artwork.description.length > 100 
        ? artwork.description.substring(0, 100) + '...' 
        : artwork.description;
    
    return `${artwork.title} - ${desc} ${availabilityText}. Abstrakte Kunst von Katharina Lanvermann im ATELIER KL.`;
}

/**
 * Generate optimized meta description for workshop
 */
export function generateWorkshopMetaDescription(workshop: {
    title: string;
    description: string;
    date: Date;
    price: number;
}): string {
    const dateStr = workshop.date.toLocaleDateString('de-DE', { 
        day: 'numeric', 
        month: 'long', 
        year: 'numeric' 
    });
    
    const desc = workshop.description.length > 80 
        ? workshop.description.substring(0, 80) + '...' 
        : workshop.description;
    
    return `${workshop.title} - ${desc} Am ${dateStr}. Preis: ${workshop.price}€. Jetzt anmelden bei ATELIER KL.`;
}

/**
 * SEO Best Practices Checklist
 */
export const SEO_CHECKLIST = {
    title: {
        minLength: 30,
        maxLength: 60,
        includeKeyword: true,
        includeBrand: true
    },
    description: {
        minLength: 120,
        maxLength: 160,
        includeKeyword: true,
        includeCallToAction: true
    },
    images: {
        requireAlt: true,
        optimizeSize: true,
        useLazyLoading: true,
        useWebP: true
    },
    structuredData: {
        organization: true,
        localBusiness: true,
        breadcrumbs: true,
        products: true,
        events: true
    }
};

