import { f as createAstro, c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DTZ0Lt1g.mjs';
import 'piccolore';
import { $ as $$Layout } from '../../chunks/Layout_DOK6i4VX.mjs';
import { a as getItem } from '../../chunks/storage_ARbyxPSG.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  if (!slug) {
    return Astro2.redirect("/404");
  }
  const workshop = await getItem("workshops", slug);
  if (!workshop) {
    return Astro2.redirect("/404");
  }
  const data = workshop;
  const isFullyBooked = data.currentParticipants >= data.maxParticipants;
  const isPast = new Date(data.date) < /* @__PURE__ */ new Date();
  const canBook = data.bookingEnabled && !isFullyBooked && !isPast;
  const formattedDate = new Date(data.date).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `${data.title} - Workshop`, "description": data.description, "data-astro-cid-ru4er7xe": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="workshop-detail-page" data-astro-cid-ru4er7xe> <div class="container" data-astro-cid-ru4er7xe> <a href="/workshops" class="back-link" data-astro-cid-ru4er7xe>← Zurück zur Übersicht</a> <div class="workshop-grid" data-astro-cid-ru4er7xe> <div class="workshop-content" data-astro-cid-ru4er7xe> <div class="workshop-image-container" data-astro-cid-ru4er7xe> <img${addAttribute(data.image, "src")}${addAttribute(data.title, "alt")} class="workshop-image" data-astro-cid-ru4er7xe> ${isFullyBooked && renderTemplate`<div class="badge badge-sold" data-astro-cid-ru4er7xe>Ausgebucht</div>`} </div> <h1 class="workshop-title" data-astro-cid-ru4er7xe>${data.title}</h1> <div class="workshop-meta" data-astro-cid-ru4er7xe> <div class="meta-item" data-astro-cid-ru4er7xe> <span class="icon" data-astro-cid-ru4er7xe>📅</span> <span class="text" data-astro-cid-ru4er7xe>${formattedDate}</span> </div> <div class="meta-item" data-astro-cid-ru4er7xe> <span class="icon" data-astro-cid-ru4er7xe>⏰</span> <span class="text" data-astro-cid-ru4er7xe>${data.time} (${data.duration})</span> </div> <div class="meta-item" data-astro-cid-ru4er7xe> <span class="icon" data-astro-cid-ru4er7xe>📍</span> <span class="text" data-astro-cid-ru4er7xe>${data.location}</span> </div> <div class="meta-item" data-astro-cid-ru4er7xe> <span class="icon" data-astro-cid-ru4er7xe>👥</span> <span class="text" data-astro-cid-ru4er7xe>${data.currentParticipants} / ${data.maxParticipants} Plätze belegt</span> </div> <div class="meta-item price" data-astro-cid-ru4er7xe> <span class="icon" data-astro-cid-ru4er7xe>💶</span> <span class="text" data-astro-cid-ru4er7xe>${data.price} €</span> </div> </div> <div class="workshop-description" data-astro-cid-ru4er7xe> <h3 data-astro-cid-ru4er7xe>Über den Workshop</h3> <p data-astro-cid-ru4er7xe>${data.description}</p> <h3 data-astro-cid-ru4er7xe>Enthaltene Materialien</h3> <ul data-astro-cid-ru4er7xe> ${data.materials.map((item) => renderTemplate`<li data-astro-cid-ru4er7xe>${item}</li>`)} </ul> </div> </div> <div class="workshop-sidebar" data-astro-cid-ru4er7xe> <div class="booking-card" data-astro-cid-ru4er7xe> <h3 data-astro-cid-ru4er7xe>Workshop buchen</h3> ${canBook ? renderTemplate`<form id="bookingForm" class="booking-form" data-astro-cid-ru4er7xe> <input type="hidden" name="workshopId"${addAttribute(workshop.id, "value")} data-astro-cid-ru4er7xe> <input type="hidden" name="workshopTitle"${addAttribute(data.title, "value")} data-astro-cid-ru4er7xe> <div class="form-group" data-astro-cid-ru4er7xe> <label for="name" data-astro-cid-ru4er7xe>Name *</label> <input type="text" id="name" name="name" required placeholder="Ihr Name" data-astro-cid-ru4er7xe> </div> <div class="form-group" data-astro-cid-ru4er7xe> <label for="email" data-astro-cid-ru4er7xe>E-Mail *</label> <input type="email" id="email" name="email" required placeholder="ihre@email.de" data-astro-cid-ru4er7xe> </div> <div class="form-group" data-astro-cid-ru4er7xe> <label for="phone" data-astro-cid-ru4er7xe>Telefon *</label> <input type="tel" id="phone" name="phone" required placeholder="Ihre Telefonnummer" data-astro-cid-ru4er7xe> </div> <div class="form-group" data-astro-cid-ru4er7xe> <label for="message" data-astro-cid-ru4er7xe>
Nachricht (optional)
</label> <textarea id="message" name="message" rows="3" placeholder="Anmerkungen, Fragen..." data-astro-cid-ru4er7xe></textarea> </div> <div class="form-group" data-astro-cid-ru4er7xe> <label for="participants" data-astro-cid-ru4er7xe>
Anzahl Personen *
</label> <select id="participants" name="participants" required data-astro-cid-ru4er7xe> <option value="1" data-astro-cid-ru4er7xe>1 Person</option> <option value="2" data-astro-cid-ru4er7xe>
2 Personen
</option> <option value="3" data-astro-cid-ru4er7xe>
3 Personen
</option> </select> </div> <button type="submit" class="btn btn-primary btn-block" data-astro-cid-ru4er7xe>
Jetzt verbindlich anfragen
</button> <p class="form-note" data-astro-cid-ru4er7xe>
Sie erhalten zeitnah eine Bestätigung
                                        per E-Mail.
</p> </form>` : renderTemplate`<div class="booking-closed" data-astro-cid-ru4er7xe> ${isPast ? renderTemplate`<p data-astro-cid-ru4er7xe>
Dieser Workshop hat bereits
                                            stattgefunden.
</p>` : isFullyBooked ? renderTemplate`<p data-astro-cid-ru4er7xe>
Leider sind alle Plätze ausgebucht.${" "} <a href="/kontakt" data-astro-cid-ru4er7xe>
Schreiben Sie mir
</a>${" "}
für die Warteliste.
</p>` : renderTemplate`<p data-astro-cid-ru4er7xe>
Buchung ist derzeit nicht möglich.
</p>`} </div>`} <div id="bookingMessage" class="message hidden" data-astro-cid-ru4er7xe></div> </div> </div> </div> </div> </div> ` })} ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/workshops/[slug].astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/workshops/[slug].astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/workshops/[slug].astro";
const $$url = "/workshops/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$slug,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
