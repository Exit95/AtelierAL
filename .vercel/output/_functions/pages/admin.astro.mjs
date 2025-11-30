import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BEzeNKqC.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_CVBRVa7f.mjs';
import { a as getItems } from '../chunks/storage_DpN-KgD-.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const workshops = await getItems("workshops");
  const artworks = await getItems("artworks");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard", "data-astro-cid-u2h3djql": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="dashboard-grid" data-astro-cid-u2h3djql> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-icon" data-astro-cid-u2h3djql>🎨</div> <div class="stat-content" data-astro-cid-u2h3djql> <div class="stat-number" data-astro-cid-u2h3djql>${workshops.length}</div> <div class="stat-label" data-astro-cid-u2h3djql>Workshops</div> </div> <a href="/admin/workshops" class="stat-link" data-astro-cid-u2h3djql>Verwalten →</a> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-icon" data-astro-cid-u2h3djql>🖼️</div> <div class="stat-content" data-astro-cid-u2h3djql> <div class="stat-number" data-astro-cid-u2h3djql>${artworks.length}</div> <div class="stat-label" data-astro-cid-u2h3djql>Werke</div> </div> <a href="/admin/artworks" class="stat-link" data-astro-cid-u2h3djql>Verwalten →</a> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-icon" data-astro-cid-u2h3djql>📁</div> <div class="stat-content" data-astro-cid-u2h3djql> <div class="stat-number" data-astro-cid-u2h3djql>-</div> <div class="stat-label" data-astro-cid-u2h3djql>Bilder</div> </div> <a href="/admin/images" class="stat-link" data-astro-cid-u2h3djql>Verwalten →</a> </div> <div class="stat-card" data-astro-cid-u2h3djql> <div class="stat-icon" data-astro-cid-u2h3djql>⭐</div> <div class="stat-content" data-astro-cid-u2h3djql> <div class="stat-number" data-astro-cid-u2h3djql>-</div> <div class="stat-label" data-astro-cid-u2h3djql>Bewertungen</div> </div> <a href="/admin/reviews" class="stat-link" data-astro-cid-u2h3djql>Verwalten →</a> </div> </div> <div class="quick-actions" data-astro-cid-u2h3djql> <h3 data-astro-cid-u2h3djql>Schnellzugriff</h3> <div class="action-buttons" data-astro-cid-u2h3djql> <a href="/admin/workshops/create" class="action-btn primary" data-astro-cid-u2h3djql>+ Neuer Workshop</a> <a href="/admin/artworks/create" class="action-btn primary" data-astro-cid-u2h3djql>+ Neues Werk</a> <a href="/admin/images" class="action-btn secondary" data-astro-cid-u2h3djql>📤 Bilder hochladen</a> <a href="/admin/reviews" class="action-btn secondary" data-astro-cid-u2h3djql>⭐ Bewertungen</a> </div> </div> ` })} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/index.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
