// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
    site: 'https://test-danapfel-digital.de',
    output: 'server',
    adapter: vercel({
        webAnalytics: {
            enabled: true
        },
        imageService: true,
        imagesConfig: {
            sizes: [320, 640, 960, 1280, 1600],
            formats: ['avif', 'webp', 'jpeg'],
            domains: []
        }
    }),
    integrations: [
        sitemap({
            i18n: {
                defaultLocale: 'de',
                locales: {
                    de: 'de-DE'
                }
            }
        })
    ],
    image: {
        domains: [],
        remotePatterns: []
    },
    vite: {
        build: {
            cssCodeSplit: true,
            rollupOptions: {
                output: {
                    manualChunks: undefined
                }
            }
        }
    }
});
