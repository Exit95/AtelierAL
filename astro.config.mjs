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
        service: {
            entrypoint: 'astro/assets/services/sharp'
        },
        domains: [],
        remotePatterns: []
    },
    vite: {
        build: {
            cssCodeSplit: true,
            minify: 'esbuild',
            rollupOptions: {
                output: {
                    manualChunks: (id) => {
                        // Vendor chunk for node_modules
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    }
                }
            }
        },
        ssr: {
            noExternal: ['@astrojs/node']
        }
    },
    compressHTML: true,
    build: {
        inlineStylesheets: 'auto'
    }
});
