// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: 'https://atelierkl.de',
    output: 'server',
    security: {
        checkOrigin: false
    },
    adapter: node({
        mode: 'standalone'
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
