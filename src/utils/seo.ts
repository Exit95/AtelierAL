// SEO Utilities for ATELIER KL

/**
 * Generate FAQ Schema for rich snippets
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

/**
 * Generate Product Schema for artworks
 */
export function generateProductSchema(artwork: {
    title: string;
    description: string;
    image: string;
    price?: string;
    availability: 'available' | 'reserved' | 'sold';
    url: string;
}) {
    const availabilityMap = {
        'available': 'https://schema.org/InStock',
        'reserved': 'https://schema.org/PreOrder',
        'sold': 'https://schema.org/OutOfStock'
    };

    return {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": artwork.title,
        "description": artwork.description,
        "image": artwork.image,
        "url": artwork.url,
        "brand": {
            "@type": "Brand",
            "name": "ATELIER KL"
        },
        "offers": {
            "@type": "Offer",
            "availability": availabilityMap[artwork.availability],
            "price": artwork.price || "0",
            "priceCurrency": "EUR",
            "priceSpecification": artwork.price ? undefined : {
                "@type": "PriceSpecification",
                "price": "0",
                "priceCurrency": "EUR",
                "valueAddedTaxIncluded": true
            },
            "seller": {
                "@type": "Organization",
                "name": "ATELIER KL"
            }
        },
        "category": "Abstrakte Kunst"
    };
}

/**
 * Generate Event Schema for workshops
 */
export function generateEventSchema(workshop: {
    title: string;
    description: string;
    date: Date;
    time: string;
    location: string;
    price: number;
    maxParticipants: number;
    currentParticipants: number;
    image?: string;
    url: string;
}) {
    const isFullyBooked = workshop.currentParticipants >= workshop.maxParticipants;
    
    return {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": workshop.title,
        "description": workshop.description,
        "startDate": workshop.date.toISOString(),
        "endDate": workshop.date.toISOString(),
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "location": {
            "@type": "Place",
            "name": "ATELIER KL",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bockhorn 68",
                "addressLocality": "Ahaus",
                "postalCode": "48683",
                "addressCountry": "DE"
            }
        },
        "image": workshop.image || "https://atelierkl.de/logo-kl.png",
        "organizer": {
            "@type": "Organization",
            "name": "ATELIER KL",
            "url": "https://atelierkl.de"
        },
        "offers": {
            "@type": "Offer",
            "url": workshop.url,
            "price": workshop.price,
            "priceCurrency": "EUR",
            "availability": isFullyBooked ? "https://schema.org/SoldOut" : "https://schema.org/InStock",
            "validFrom": new Date().toISOString()
        },
        "performer": {
            "@type": "Person",
            "name": "Katharina Lanvermann"
        }
    };
}

/**
 * Generate Person Schema for artist
 */
export function generatePersonSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Katharina Lanvermann",
        "jobTitle": "Künstlerin",
        "description": "Abstrakte Künstlerin spezialisiert auf Acrylmalerei und kreative Workshops",
        "url": "https://atelierkl.de/team",
        "image": "https://atelierkl.de/kuenstlerfoto.jpg",
        "worksFor": {
            "@type": "Organization",
            "name": "ATELIER KL"
        },
        "sameAs": []
    };
}

/**
 * Generate Local Business Schema
 */
export function generateLocalBusinessSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": "https://atelierkl.de/#localbusiness",
        "name": "ATELIER KL",
        "image": "https://atelierkl.de/logo-kl.png",
        "description": "Abstraktes Kunst-Atelier für einzigartige Kunstwerke und kreative Workshops in Ahaus",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Bockhorn 68",
            "addressLocality": "Ahaus",
            "postalCode": "48683",
            "addressCountry": "DE"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "51.9944",
            "longitude": "7.0144"
        },
        "url": "https://atelierkl.de",
        "telephone": "+49-XXX-XXXXXXX",
        "email": "studio@atelierkl.de",
        "priceRange": "€€",
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "10:00",
                "closes": "18:00"
            }
        ]
    };
}

