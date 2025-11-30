import { f as createComponent, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BEzeNKqC.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CVBRVa7f.mjs';
export { renderers } from '../../renderers.mjs';

const $$Images = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Bilder deaktiviert" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<p>
Die Bildverwaltung wurde aus dem Admin-Bereich entfernt.
        Bitte verwende stattdessen direkt Bild‑URLs in den Formularen für
        Werke und Workshops.
</p> ` })}`;
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
