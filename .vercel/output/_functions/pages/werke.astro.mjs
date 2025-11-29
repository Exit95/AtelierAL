import { f as createAstro, c as createComponent, m as maybeRenderHead, a as renderScript, d as addAttribute, b as renderTemplate, r as renderComponent } from '../chunks/astro/server_DD7gXx_F.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_BDMwxAWC.mjs';
import { $ as $$Badge } from '../chunks/Badge_CwACIffN.mjs';
/* empty css                                 */
import { g as getItems } from '../chunks/storage_Coa8lX9P.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$GalleryGrid = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$GalleryGrid;
  const { artworks } = Astro2.props;
  [...new Set(artworks.flatMap((artwork) => artwork.tags || []))];
  const techniques = [...new Set(artworks.map((artwork) => artwork.technique))];
  return renderTemplate`${maybeRenderHead()}<div class="gallery-container" data-astro-cid-u5hpd7j5> <div class="gallery-filters" data-gallery-filters data-astro-cid-u5hpd7j5> <div class="filter-group" data-astro-cid-u5hpd7j5> <label for="filter-availability" data-astro-cid-u5hpd7j5>Status:</label> <select id="filter-availability" class="filter-select" data-filter-type="availability" data-astro-cid-u5hpd7j5> <option value="all" data-astro-cid-u5hpd7j5>Alle</option> <option value="available" data-astro-cid-u5hpd7j5>Verfügbar</option> <option value="reserved" data-astro-cid-u5hpd7j5>Reserviert</option> <option value="sold" data-astro-cid-u5hpd7j5>Verkauft</option> </select> </div> <div class="filter-group" data-astro-cid-u5hpd7j5> <label for="filter-technique" data-astro-cid-u5hpd7j5>Technik:</label> <select id="filter-technique" class="filter-select" data-filter-type="technique" data-astro-cid-u5hpd7j5> <option value="all" data-astro-cid-u5hpd7j5>Alle</option> ${techniques.map((technique) => renderTemplate`<option${addAttribute(technique, "value")} data-astro-cid-u5hpd7j5>${technique}</option>`)} </select> </div> <button class="filter-reset" data-filter-reset data-astro-cid-u5hpd7j5>Filter zurücksetzen</button> </div> <div class="gallery-grid masonry" data-gallery-grid data-astro-cid-u5hpd7j5> ${artworks.length === 0 ? renderTemplate`<div class="gallery-empty" data-astro-cid-u5hpd7j5> <p data-astro-cid-u5hpd7j5>Keine Werke gefunden.</p> </div>` : artworks.map((artwork, index) => renderTemplate`<div class="masonry-item gallery-item"${addAttribute(artwork.availability, "data-availability")}${addAttribute(artwork.technique, "data-technique")}${addAttribute(index, "data-artwork-index")} data-astro-cid-u5hpd7j5> <a${addAttribute(`/werke/${artwork.id}`, "href")} class="artwork-link" data-lightbox-trigger${addAttribute(artwork.images[0], "data-image-url")} data-astro-cid-u5hpd7j5> <div class="artwork-image" data-astro-cid-u5hpd7j5> <img${addAttribute(artwork.images[0], "src")}${addAttribute(artwork.title, "alt")} loading="lazy" data-astro-cid-u5hpd7j5> <div class="artwork-overlay" data-astro-cid-u5hpd7j5> <span class="view-icon" data-astro-cid-u5hpd7j5>👁️</span> </div> </div> <div class="artwork-info" data-astro-cid-u5hpd7j5> <h3 class="artwork-title" data-astro-cid-u5hpd7j5>${artwork.title}</h3> <p class="artwork-meta" data-astro-cid-u5hpd7j5> ${artwork.technique} <br data-astro-cid-u5hpd7j5> ${artwork.size.width} × ${artwork.size.height}${" "} ${artwork.size.unit} </p> ${renderComponent($$result, "Badge", $$Badge, { "variant": artwork.availability, "label": artwork.availability === "available" ? "Verf\xFCgbar" : artwork.availability === "reserved" ? "Reserviert" : "Verkauft", "data-astro-cid-u5hpd7j5": true })} </div> </a> </div>`)} </div> <div class="gallery-no-results" hidden data-no-results data-astro-cid-u5hpd7j5> <p data-astro-cid-u5hpd7j5>Keine Werke entsprechen den ausgewählten Filtern.</p> </div> </div> ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/components/GalleryGrid.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/components/GalleryGrid.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allArtworks = await getItems("artworks");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Werke", "description": "Entdecken Sie abstrakte Kunstwerke von Katharina Lanvermann. Einzigartige Acrylbilder in warmen Erdt\xF6nen und mediterranen Farben.", "data-astro-cid-lrnhjp3x": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-hero" data-astro-cid-lrnhjp3x> <div class="container" data-astro-cid-lrnhjp3x> <h1 data-astro-cid-lrnhjp3x>Werke</h1> <p class="hero-subtitle" data-astro-cid-lrnhjp3x>
Einzigartige abstrakte Kunstwerke, die Räume verwandeln
</p> </div> </section> <section class="section py-12" data-astro-cid-lrnhjp3x> <div class="container" data-astro-cid-lrnhjp3x> ${renderComponent($$result2, "GalleryGrid", $$GalleryGrid, { "artworks": allArtworks, "data-astro-cid-lrnhjp3x": true })} </div> </section> ` })} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/werke/index.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/werke/index.astro";
const $$url = "/werke";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
