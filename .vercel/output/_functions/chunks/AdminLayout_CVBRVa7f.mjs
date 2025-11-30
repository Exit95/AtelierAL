import { e as createAstro, f as createComponent, o as renderHead, p as renderSlot, l as renderScript, r as renderTemplate } from './astro/server_BEzeNKqC.mjs';
import 'piccolore';
import 'clsx';
/* empty css                        */
/* empty css                        */

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="de" data-astro-cid-2kanml4j> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Admin | ATELIER KL</title>${renderHead()}</head> <body data-astro-cid-2kanml4j> <div class="admin-container" data-astro-cid-2kanml4j> <div id="menuOverlay" class="menu-overlay" data-astro-cid-2kanml4j></div> <nav id="adminNav" class="admin-nav" data-astro-cid-2kanml4j> <div class="admin-nav-header" data-astro-cid-2kanml4j> <h1 data-astro-cid-2kanml4j>ATELIER KL Admin</h1> <button id="closeMenuBtn" class="close-menu-btn" data-astro-cid-2kanml4j>×</button> </div> <ul class="admin-nav-menu" data-astro-cid-2kanml4j> <li data-astro-cid-2kanml4j><a href="/admin" data-astro-cid-2kanml4j>📊 Dashboard</a></li> <li data-astro-cid-2kanml4j><a href="/admin/workshops" data-astro-cid-2kanml4j>🎨 Workshops</a></li> <li data-astro-cid-2kanml4j><a href="/admin/artworks" data-astro-cid-2kanml4j>🖼️ Werke</a></li> <li data-astro-cid-2kanml4j><a href="/admin/reviews" data-astro-cid-2kanml4j>⭐ Bewertungen</a></li> </ul> <div class="admin-nav-footer" data-astro-cid-2kanml4j> <a href="/" target="_blank" data-astro-cid-2kanml4j>↗ Zur Website</a> <button id="logoutBtn" class="logout-btn" data-astro-cid-2kanml4j>🚪 Abmelden</button> </div> </nav> <main class="admin-main" data-astro-cid-2kanml4j> <div class="admin-header" data-astro-cid-2kanml4j> <button id="menuToggleBtn" class="menu-toggle-btn" data-astro-cid-2kanml4j>☰</button> <h2 data-astro-cid-2kanml4j>${title}</h2> </div> <div class="admin-content" data-astro-cid-2kanml4j> ${renderSlot($$result, $$slots["default"])} </div> </main> </div> ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")}  </body> </html>`;
}, "/home/exit/Musik/AtelierKL/project/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };
