import { c as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_DyuB9JmO.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_3x2nP2bH.mjs';
import { $ as $$ContactForm } from '../chunks/ContactForm_BzEyBbqb.mjs';
/* empty css                                   */
export { renderers } from '../renderers.mjs';

const $$Kontakt = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Kontakt", "description": "Kontaktieren Sie ATELIER KL f\xFCr Anfragen zu Kunstwerken, Auftragsarbeiten oder Workshop-Buchungen. Ich freue mich auf Ihre Nachricht!", "data-astro-cid-d7zyz6zb": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="page-hero" data-astro-cid-d7zyz6zb> <div class="container" data-astro-cid-d7zyz6zb> <h1 data-astro-cid-d7zyz6zb>Kontakt</h1> <p class="hero-subtitle" data-astro-cid-d7zyz6zb>Ich freue mich auf Ihre Nachricht</p> </div> </section> <section class="section py-16" data-astro-cid-d7zyz6zb> <div class="container" data-astro-cid-d7zyz6zb> <div class="contact-grid" data-astro-cid-d7zyz6zb> <!-- Contact Information --> <div class="contact-info" data-astro-cid-d7zyz6zb> <h2 data-astro-cid-d7zyz6zb>ATELIER KL</h2> <p class="lead-text" data-astro-cid-d7zyz6zb>Katharina Lanvermann</p> <div class="info-blocks" data-astro-cid-d7zyz6zb> <div class="info-block" data-astro-cid-d7zyz6zb> <h3 data-astro-cid-d7zyz6zb>📍 Adresse</h3> <address data-astro-cid-d7zyz6zb>
Hauptstraße 45<br data-astro-cid-d7zyz6zb>
48619 Heek<br data-astro-cid-d7zyz6zb>
Deutschland
</address> </div> <div class="info-block" data-astro-cid-d7zyz6zb> <h3 data-astro-cid-d7zyz6zb>📧 E-Mail</h3> <p data-astro-cid-d7zyz6zb> <a href="mailto:info@atelier-kl.de" data-astro-cid-d7zyz6zb>info@atelier-kl.de</a> </p> </div> <div class="info-block" data-astro-cid-d7zyz6zb> <h3 data-astro-cid-d7zyz6zb>🕐 Besuchszeiten</h3> <p data-astro-cid-d7zyz6zb>
Nach Vereinbarung<br data-astro-cid-d7zyz6zb> <em class="text-sm text-secondary" data-astro-cid-d7zyz6zb>
Bitte vereinbaren Sie vorab einen Termin
</em> </p> </div> <div class="info-block" data-astro-cid-d7zyz6zb> <h3 data-astro-cid-d7zyz6zb>💬 Anliegen</h3> <ul class="contact-list" data-astro-cid-d7zyz6zb> <li data-astro-cid-d7zyz6zb>Kunstwerke & Auftragsarbeiten</li> <li data-astro-cid-d7zyz6zb>Workshop-Buchungen</li> <li data-astro-cid-d7zyz6zb>Atelierbesuche</li> <li data-astro-cid-d7zyz6zb>Allgemeine Anfragen</li> </ul> </div> </div> <div class="response-time" data-astro-cid-d7zyz6zb> <p data-astro-cid-d7zyz6zb> <strong data-astro-cid-d7zyz6zb>Antwortzeit:</strong> Ich antworte in der Regel
                            innerhalb von 24-48 Stunden auf Ihre Anfrage.
</p> </div> </div> <!-- Contact Form --> <div class="contact-form-wrapper" data-astro-cid-d7zyz6zb> ${renderComponent($$result2, "ContactForm", $$ContactForm, { "data-astro-cid-d7zyz6zb": true })} </div> </div> </div> </section>   ` })} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/kontakt.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/kontakt.astro";
const $$url = "/kontakt";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Kontakt,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
