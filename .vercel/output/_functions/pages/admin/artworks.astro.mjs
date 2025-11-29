import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DyuB9JmO.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CY7AUvYi.mjs';
import { g as getCollection } from '../../chunks/_astro_content_Bo7bC6JI.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const artworks = await getCollection("artworks");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Werke", "data-astro-cid-ye2rsuwl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-actions" data-astro-cid-ye2rsuwl> <a href="/admin/artworks/create" class="btn btn-primary" data-astro-cid-ye2rsuwl>+ Neues Werk</a> </div> <div class="artworks-grid" data-astro-cid-ye2rsuwl> ${artworks.map((artwork) => renderTemplate`<div class="artwork-card" data-astro-cid-ye2rsuwl> ${artwork.data.images && artwork.data.images[0] && renderTemplate`<img${addAttribute(artwork.data.images[0], "src")}${addAttribute(artwork.data.title, "alt")} class="artwork-image" data-astro-cid-ye2rsuwl>`} <div class="artwork-info" data-astro-cid-ye2rsuwl> <h3 data-astro-cid-ye2rsuwl>${artwork.data.title}</h3> <p class="artwork-technique" data-astro-cid-ye2rsuwl> ${artwork.data.technique} </p> <p class="artwork-size" data-astro-cid-ye2rsuwl> ${artwork.data.size.width} ×${" "} ${artwork.data.size.height} ${artwork.data.size.unit} </p> <span${addAttribute(`status status-${artwork.data.availability}`, "class")} data-astro-cid-ye2rsuwl> ${artwork.data.availability === "available" ? "Verf\xFCgbar" : artwork.data.availability === "sold" ? "Verkauft" : "Reserviert"} </span> </div> <div class="artwork-actions" data-astro-cid-ye2rsuwl> <a${addAttribute(`/admin/artworks/${artwork.id}`, "href")} class="btn btn-sm btn-secondary" data-astro-cid-ye2rsuwl>
Bearbeiten
</a> <button class="btn btn-sm btn-danger"${addAttribute(artwork.id, "data-id")} onclick="deleteArtwork(this)" data-astro-cid-ye2rsuwl>
Löschen
</button> </div> </div>`)} ${artworks.length === 0 && renderTemplate`<p class="empty-state" data-astro-cid-ye2rsuwl>Noch keine Werke erstellt.</p>`} </div> ` })} ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/artworks/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/artworks/index.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/artworks/index.astro";
const $$url = "/admin/artworks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
