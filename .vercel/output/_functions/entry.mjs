import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvIH-qrO.mjs';
import { manifest } from './manifest_9cvvgTCr.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/artworks/create.astro.mjs');
const _page2 = () => import('./pages/admin/artworks.astro.mjs');
const _page3 = () => import('./pages/admin/images.astro.mjs');
const _page4 = () => import('./pages/admin/login.astro.mjs');
const _page5 = () => import('./pages/admin/workshops/create.astro.mjs');
const _page6 = () => import('./pages/admin/workshops/_id_.astro.mjs');
const _page7 = () => import('./pages/admin/workshops.astro.mjs');
const _page8 = () => import('./pages/admin.astro.mjs');
const _page9 = () => import('./pages/api/artworks/create.astro.mjs');
const _page10 = () => import('./pages/api/artworks/_id_.astro.mjs');
const _page11 = () => import('./pages/api/auth/login.astro.mjs');
const _page12 = () => import('./pages/api/auth/logout.astro.mjs');
const _page13 = () => import('./pages/api/images.astro.mjs');
const _page14 = () => import('./pages/api/upload.astro.mjs');
const _page15 = () => import('./pages/api/workshops/book.astro.mjs');
const _page16 = () => import('./pages/api/workshops/create.astro.mjs');
const _page17 = () => import('./pages/api/workshops/_id_/delete.astro.mjs');
const _page18 = () => import('./pages/api/workshops/_id_/update.astro.mjs');
const _page19 = () => import('./pages/auftragsarbeiten.astro.mjs');
const _page20 = () => import('./pages/datenschutz.astro.mjs');
const _page21 = () => import('./pages/impressum.astro.mjs');
const _page22 = () => import('./pages/kontakt.astro.mjs');
const _page23 = () => import('./pages/rechtliches.astro.mjs');
const _page24 = () => import('./pages/team.astro.mjs');
const _page25 = () => import('./pages/werke.astro.mjs');
const _page26 = () => import('./pages/workshops/_slug_.astro.mjs');
const _page27 = () => import('./pages/workshops.astro.mjs');
const _page28 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/artworks/create.astro", _page1],
    ["src/pages/admin/artworks/index.astro", _page2],
    ["src/pages/admin/images.astro", _page3],
    ["src/pages/admin/login.astro", _page4],
    ["src/pages/admin/workshops/create.astro", _page5],
    ["src/pages/admin/workshops/[id].astro", _page6],
    ["src/pages/admin/workshops/index.astro", _page7],
    ["src/pages/admin/index.astro", _page8],
    ["src/pages/api/artworks/create.ts", _page9],
    ["src/pages/api/artworks/[id].ts", _page10],
    ["src/pages/api/auth/login.ts", _page11],
    ["src/pages/api/auth/logout.ts", _page12],
    ["src/pages/api/images.ts", _page13],
    ["src/pages/api/upload.ts", _page14],
    ["src/pages/api/workshops/book.ts", _page15],
    ["src/pages/api/workshops/create.ts", _page16],
    ["src/pages/api/workshops/[id]/delete.ts", _page17],
    ["src/pages/api/workshops/[id]/update.ts", _page18],
    ["src/pages/auftragsarbeiten.astro", _page19],
    ["src/pages/datenschutz.astro", _page20],
    ["src/pages/impressum.astro", _page21],
    ["src/pages/kontakt.astro", _page22],
    ["src/pages/rechtliches.astro", _page23],
    ["src/pages/team.astro", _page24],
    ["src/pages/werke/index.astro", _page25],
    ["src/pages/workshops/[slug].astro", _page26],
    ["src/pages/workshops.astro", _page27],
    ["src/pages/index.astro", _page28]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = {
    "middlewareSecret": "91f0d0c4-8774-4bbf-baac-dcff8bc72cd7",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
