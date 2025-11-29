import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BSfH3IVW.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_fKTd5u-i.mjs';
import { $ as $$WorkshopCard } from '../chunks/WorkshopCard_YDjNRJkq.mjs';
import { a as getItems } from '../chunks/storage_BxzIridr.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Workshops = createComponent(async ($$result, $$props, $$slots) => {
  const allWorkshops = await getItems("workshops");
  const now = /* @__PURE__ */ new Date();
  const upcomingWorkshops = allWorkshops.filter((w) => new Date(w.date) >= now).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const pastWorkshops = allWorkshops.filter((w) => new Date(w.date) < now).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Workshops", "description": "Kreative Mal-Workshops bei ATELIER KL in Heek. Entdecken Sie Ihre k\xFCnstlerische Seite in kleinen Gruppen mit pers\xF6nlicher Betreuung.", "data-astro-cid-hoipuplh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-hero" data-astro-cid-hoipuplh> <div class="container" data-astro-cid-hoipuplh> <h1 data-astro-cid-hoipuplh>Workshops</h1> <p class="hero-subtitle" data-astro-cid-hoipuplh>
Entdecken Sie Ihre Kreativität in inspirierender Atmosphäre
</p> </div> </section>  <section class="section py-12" style="background-color: var(--color-surface);" data-astro-cid-hoipuplh> <div class="container" data-astro-cid-hoipuplh> <div class="benefits-grid" data-astro-cid-hoipuplh> <div class="benefit" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Kleine Gruppen</h3> <p data-astro-cid-hoipuplh>Maximal 8 Teilnehmer für persönliche Betreuung</p> </div> <div class="benefit" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Alle Materialien inkl.</h3> <p data-astro-cid-hoipuplh>Hochwertige Farben, Leinwände und Werkzeuge</p> </div> <div class="benefit" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Für Alle</h3> <p data-astro-cid-hoipuplh>Keine Vorkenntnisse erforderlich</p> </div> <div class="benefit" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Wohlfühlatmosphäre</h3> <p data-astro-cid-hoipuplh>Getränke und Snacks inklusive</p> </div> </div> </div> </section>  <section class="section py-16" data-astro-cid-hoipuplh> <div class="container" data-astro-cid-hoipuplh> <h2 class="section-title" data-astro-cid-hoipuplh>Kommende Workshops</h2> ${upcomingWorkshops.length > 0 ? renderTemplate`<div class="grid grid-cols-1 grid-cols-md-3" data-astro-cid-hoipuplh> ${upcomingWorkshops.map((workshop) => renderTemplate`${renderComponent($$result2, "WorkshopCard", $$WorkshopCard, { "workshop": workshop, "data-astro-cid-hoipuplh": true })}`)} </div>` : renderTemplate`<p class="text-center text-secondary" data-astro-cid-hoipuplh>
Aktuell sind keine Workshops geplant. Schauen Sie bald
                        wieder vorbei oder
<a href="/kontakt" data-astro-cid-hoipuplh>kontaktieren Sie mich</a> für private
                        Workshop-Anfragen.
</p>`} </div> </section>  <section class="section py-16" style="background-color: var(--color-surface);" data-astro-cid-hoipuplh> <div class="container" data-astro-cid-hoipuplh> <div class="content-box" data-astro-cid-hoipuplh> <h2 class="section-title" data-astro-cid-hoipuplh>Was Sie erwartet</h2> <div class="learn-grid" data-astro-cid-hoipuplh> <div class="learn-item" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Intuitive Malweise</h3> <p data-astro-cid-hoipuplh>
Lernen Sie, ohne Vorgaben zu malen und Ihrer
                            Kreativität freien Lauf zu lassen
</p> </div> <div class="learn-item" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Techniken</h3> <p data-astro-cid-hoipuplh>
Entdecken Sie verschiedene Techniken mit
                            Acrylfarben, Spachteln und Pigmenten
</p> </div> <div class="learn-item" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Farbharmonien</h3> <p data-astro-cid-hoipuplh>
Verstehen Sie, wie Farben zusammenwirken und
                            Stimmungen erzeugen
</p> </div> <div class="learn-item" data-astro-cid-hoipuplh> <h3 data-astro-cid-hoipuplh>Ihr Werk</h3> <p data-astro-cid-hoipuplh>
Nehmen Sie Ihr eigenes, fertig gerahmtes Kunstwerk
                            mit nach Hause
</p> </div> </div> </div> </div> </section>  ${pastWorkshops.length > 0 && renderTemplate`<section class="section py-16" data-astro-cid-hoipuplh> <div class="container" data-astro-cid-hoipuplh> <h2 class="section-title" data-astro-cid-hoipuplh>Vergangene Workshops</h2> <div class="grid grid-cols-1 grid-cols-md-3" data-astro-cid-hoipuplh> ${pastWorkshops.slice(0, 3).map((workshop) => renderTemplate`${renderComponent($$result2, "WorkshopCard", $$WorkshopCard, { "workshop": {
    ...workshop,
    bookingEnabled: false
  }, "data-astro-cid-hoipuplh": true })}`)} </div> </div> </section>`}` })} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/workshops.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/workshops.astro";
const $$url = "/workshops";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Workshops,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
