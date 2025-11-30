import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BEzeNKqC.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CVBRVa7f.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Create = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Neues Werk erstellen", "data-astro-cid-hksi6dxm": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="artworkForm" class="admin-form" data-astro-cid-hksi6dxm> <div class="form-group" data-astro-cid-hksi6dxm> <label for="title" data-astro-cid-hksi6dxm>Titel*</label> <input type="text" id="title" name="title" required data-astro-cid-hksi6dxm> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="description" data-astro-cid-hksi6dxm>Beschreibung*</label> <textarea id="description" name="description" required rows="4" data-astro-cid-hksi6dxm></textarea> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="technique" data-astro-cid-hksi6dxm>Technik*</label> <input type="text" id="technique" name="technique" required placeholder="z.B. Acryl auf Leinwand" data-astro-cid-hksi6dxm> </div> <div class="form-row" data-astro-cid-hksi6dxm> <div class="form-group" data-astro-cid-hksi6dxm> <label for="width" data-astro-cid-hksi6dxm>Breite*</label> <input type="number" id="width" name="width" required data-astro-cid-hksi6dxm> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="height" data-astro-cid-hksi6dxm>Höhe*</label> <input type="number" id="height" name="height" required data-astro-cid-hksi6dxm> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="unit" data-astro-cid-hksi6dxm>Einheit*</label> <select id="unit" name="unit" data-astro-cid-hksi6dxm> <option value="cm" data-astro-cid-hksi6dxm>cm</option> <option value="mm" data-astro-cid-hksi6dxm>mm</option> </select> </div> </div> <div class="form-row" data-astro-cid-hksi6dxm> <div class="form-group" data-astro-cid-hksi6dxm> <label for="availability" data-astro-cid-hksi6dxm>Verfügbarkeit*</label> <select id="availability" name="availability" required data-astro-cid-hksi6dxm> <option value="available" data-astro-cid-hksi6dxm>Verfügbar</option> <option value="reserved" data-astro-cid-hksi6dxm>Reserviert</option> <option value="sold" data-astro-cid-hksi6dxm>Verkauft</option> </select> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="price" data-astro-cid-hksi6dxm>Preis*</label> <input type="text" id="price" name="price" required placeholder="z.B. auf Anfrage oder 500€" data-astro-cid-hksi6dxm> </div> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="images" data-astro-cid-hksi6dxm>Bild-URL*</label> <input type="text" id="images" name="images" required placeholder="/uploads/..." data-astro-cid-hksi6dxm> <small data-astro-cid-hksi6dxm>Tipp: <a href="/admin/images" target="_blank" data-astro-cid-hksi6dxm>Bild hochladen</a></small> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label for="tags" data-astro-cid-hksi6dxm>Tags (komma-getrennt)*</label> <input type="text" id="tags" name="tags" required placeholder="abstrakt, erdtöne, natur" data-astro-cid-hksi6dxm> </div> <div class="form-group" data-astro-cid-hksi6dxm> <label data-astro-cid-hksi6dxm> <input type="checkbox" id="featured" name="featured" data-astro-cid-hksi6dxm>
Als Featured markieren
</label> </div> <div class="form-actions" data-astro-cid-hksi6dxm> <a href="/admin/artworks" class="btn btn-secondary" data-astro-cid-hksi6dxm>Abbrechen</a> <button type="submit" class="btn btn-primary" data-astro-cid-hksi6dxm>Werk erstellen</button> </div> <div id="message" class="message" data-astro-cid-hksi6dxm></div> </form> ` })} ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/artworks/create.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/artworks/create.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/artworks/create.astro";
const $$url = "/admin/artworks/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
