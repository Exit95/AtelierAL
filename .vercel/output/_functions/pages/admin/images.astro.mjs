import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BEzeNKqC.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CVBRVa7f.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Images = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Bildverwaltung", "data-astro-cid-pfpbcmfq": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="images-manager" data-astro-cid-pfpbcmfq> <div class="upload-section" data-astro-cid-pfpbcmfq> <h2 data-astro-cid-pfpbcmfq>Bild hochladen</h2> <form id="uploadForm" class="upload-form" data-astro-cid-pfpbcmfq> <div class="upload-area" id="uploadArea" data-astro-cid-pfpbcmfq> <div class="upload-icon" data-astro-cid-pfpbcmfq>📤</div> <p class="upload-text" data-astro-cid-pfpbcmfq>
Klicken oder Datei hierher ziehen
</p> <p class="upload-hint" data-astro-cid-pfpbcmfq>Max. 100MB | JPG, PNG, GIF, WebP</p> <input type="file" id="fileInput" name="file" accept="image/*" hidden data-astro-cid-pfpbcmfq> </div> <div id="uploadStatus" class="upload-status" data-astro-cid-pfpbcmfq></div> </form> </div> <div class="gallery-section" data-astro-cid-pfpbcmfq> <h2 data-astro-cid-pfpbcmfq>Hochgeladene Bilder</h2> <div id="gallery" class="gallery-grid" data-astro-cid-pfpbcmfq> <div class="loading" data-astro-cid-pfpbcmfq>Lade Bilder...</div> </div> </div> </div> ` })}  ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/images.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/images.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/images.astro";
const $$url = "/admin/images";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Images,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
