// Performance Monitoring Utilities

/**
 * Report Web Vitals to console (can be extended to send to analytics)
 */
export function reportWebVitals() {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    if ('PerformanceObserver' in window) {
        try {
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        } catch (e) {
            // LCP not supported
        }

        // First Input Delay (FID)
        try {
            const fidObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach((entry: any) => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        } catch (e) {
            // FID not supported
        }

        // Cumulative Layout Shift (CLS)
        try {
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries() as any[]) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                        console.log('CLS:', clsValue);
                    }
                }
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });
        } catch (e) {
            // CLS not supported
        }
    }

    // Page Load Time
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page Load Time:', pageLoadTime + 'ms');
    });
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages() {
    if (typeof window === 'undefined') return;
    if (!('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target as HTMLImageElement;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
    if (typeof window === 'undefined') return;

    const criticalImages = [
        '/hintergrund.webp',
        '/atelier5.png'
    ];

    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
}

/**
 * Defer non-critical CSS
 */
export function deferNonCriticalCSS() {
    if (typeof window === 'undefined') return;

    const links = document.querySelectorAll('link[rel="stylesheet"][media="print"]');
    links.forEach(link => {
        link.addEventListener('load', function() {
            (this as HTMLLinkElement).media = 'all';
        });
    });
}

/**
 * Initialize all performance optimizations
 */
export function initPerformanceOptimizations() {
    if (typeof window === 'undefined') return;

    // Report Web Vitals in development
    if (import.meta.env.DEV) {
        reportWebVitals();
    }

    // Lazy load images
    lazyLoadImages();

    // Defer non-critical CSS
    deferNonCriticalCSS();
}

