import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_BSfH3IVW.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_D1ZWHdjr.mjs';
import { a as getItems } from '../../chunks/storage_BxzIridr.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const artworks = await getItems("artworks");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Werke", "data-astro-cid-ye2rsuwl": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-actions" data-astro-cid-ye2rsuwl> <a href="/admin/artworks/create" class="btn btn-primary" data-astro-cid-ye2rsuwl>+ Neues Werk</a> </div> <div class="artworks-grid" data-astro-cid-ye2rsuwl> ${artworks.map((artwork) => renderTemplate`<div class="artwork-card" data-astro-cid-ye2rsuwl> ${artwork.images && artwork.images[0] && renderTemplate`<img${addAttribute(artwork.images[0], "src")}${addAttribute(artwork.title, "alt")} class="artwork-image" data-astro-cid-ye2rsuwl>`} <div class="artwork-info" data-astro-cid-ye2rsuwl> <h3 data-astro-cid-ye2rsuwl>${artwork.title}</h3> <p class="artwork-technique" data-astro-cid-ye2rsuwl>${artwork.technique}</p> <p class="artwork-size" data-astro-cid-ye2rsuwl> ${artwork.size.width} × ${artwork.size.height}${" "} ${artwork.size.unit} </p> <span${addAttribute(`status status-${artwork.availability}`, "class")} data-astro-cid-ye2rsuwl> ${artwork.availability === "available" ? "Verf\xFCgbar" : artwork.availability === "sold" ? "Verkauft" : "Reserviert"} </span> </div> <div class="artwork-actions" data-astro-cid-ye2rsuwl> <a${addAttribute(`/admin/artworks/${artwork.id}`, "href")} class="btn btn-sm btn-secondary" data-astro-cid-ye2rsuwl>
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
