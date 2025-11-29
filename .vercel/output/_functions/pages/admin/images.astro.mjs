import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_DD7gXx_F.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CXfHe3il.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Images = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Bilderverwaltung", "data-astro-cid-pfpbcmfq": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="upload-section" data-astro-cid-pfpbcmfq> <h3 data-astro-cid-pfpbcmfq>📤 Bild hochladen</h3> <p class="upload-hint" data-astro-cid-pfpbcmfq>
Laden Sie Bilder hoch, um sie in Workshops und Werken zu verwenden
</p> <form id="uploadForm" class="upload-form" data-astro-cid-pfpbcmfq> <div class="file-input-wrapper" data-astro-cid-pfpbcmfq> <label for="fileInput" class="file-input-label" data-astro-cid-pfpbcmfq> <span class="file-icon" data-astro-cid-pfpbcmfq>🖼️</span> <span class="file-text" data-astro-cid-pfpbcmfq>Bild auswählen oder hier ablegen</span> <span class="file-formats" data-astro-cid-pfpbcmfq>JPG, PNG, WebP (max. 25MB)</span> </label> <input type="file" id="fileInput" accept="image/*" data-astro-cid-pfpbcmfq> </div> <button type="button" id="uploadBtn" class="btn btn-upload" data-astro-cid-pfpbcmfq> <span data-astro-cid-pfpbcmfq>⬆️</span> Jetzt hochladen
</button> </form> <div id="uploadMessage" class="message" data-astro-cid-pfpbcmfq></div> <div id="lastUpload" class="last-upload" data-astro-cid-pfpbcmfq></div> </div> <div class="images-info" data-astro-cid-pfpbcmfq> <h4 data-astro-cid-pfpbcmfq>💡 Hinweise</h4> <ul data-astro-cid-pfpbcmfq> <li data-astro-cid-pfpbcmfq>
Hochgeladene Bilder werden im Verzeichnis <code data-astro-cid-pfpbcmfq>/uploads/</code>
gespeichert
</li> <li data-astro-cid-pfpbcmfq>
Nach dem Upload erhalten Sie eine URL, die Sie kopieren können
</li> <li data-astro-cid-pfpbcmfq>Verwenden Sie diese URL in Workshop- und Werk-Formularen</li> </ul> </div> ` })} ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/images.astro?astro&type=script&index=0&lang.ts")} `;
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
