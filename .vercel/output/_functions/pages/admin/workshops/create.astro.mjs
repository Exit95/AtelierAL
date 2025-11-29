import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_DyuB9JmO.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_CY7AUvYi.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Create = createComponent(async ($$result, $$props, $$slots) => {
  const defaultData = {
    title: "",
    description: "",
    date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    time: "10:00 - 16:00",
    duration: "6 Stunden",
    location: "ATELIER KL, Hauptstra\xDFe 45, 48619 Heek",
    maxParticipants: "8",
    currentParticipants: "0",
    materials: "",
    price: "129",
    image: "/placeholders/workshop-1.jpg",
    bookingEnabled: true
  };
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Neuen Workshop erstellen", "data-astro-cid-wara3gar": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<form id="workshopForm" class="admin-form" data-astro-cid-wara3gar> <div class="form-group" data-astro-cid-wara3gar> <label for="title" data-astro-cid-wara3gar>Titel*</label> <input type="text" id="title" name="title" required${addAttribute(defaultData.title, "value")} data-astro-cid-wara3gar> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="description" data-astro-cid-wara3gar>Beschreibung*</label> <textarea id="description" name="description" required rows="5" data-astro-cid-wara3gar>${defaultData.description}</textarea> </div> <div class="form-row" data-astro-cid-wara3gar> <div class="form-group" data-astro-cid-wara3gar> <label for="date" data-astro-cid-wara3gar>Datum*</label> <input type="date" id="date" name="date" required${addAttribute(defaultData.date, "value")} data-astro-cid-wara3gar> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="time" data-astro-cid-wara3gar>Uhrzeit*</label> <input type="text" id="time" name="time" required${addAttribute(defaultData.time, "value")} data-astro-cid-wara3gar> </div> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="duration" data-astro-cid-wara3gar>Dauer*</label> <input type="text" id="duration" name="duration" required${addAttribute(defaultData.duration, "value")} data-astro-cid-wara3gar> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="location" data-astro-cid-wara3gar>Ort*</label> <input type="text" id="location" name="location" required${addAttribute(defaultData.location, "value")} data-astro-cid-wara3gar> </div> <div class="form-row" data-astro-cid-wara3gar> <div class="form-group" data-astro-cid-wara3gar> <label for="maxParticipants" data-astro-cid-wara3gar>Max. Teilnehmer*</label> <input type="number" id="maxParticipants" name="maxParticipants" required${addAttribute(defaultData.maxParticipants, "value")} data-astro-cid-wara3gar> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="currentParticipants" data-astro-cid-wara3gar>Aktuelle Teilnehmer</label> <input type="number" id="currentParticipants" name="currentParticipants"${addAttribute(defaultData.currentParticipants, "value")} data-astro-cid-wara3gar> </div> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="price" data-astro-cid-wara3gar>Preis (€)*</label> <input type="number" id="price" name="price" step="0.01" required${addAttribute(defaultData.price, "value")} data-astro-cid-wara3gar> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="image" data-astro-cid-wara3gar>Bild-URL*</label> <input type="text" id="image" name="image" required${addAttribute(defaultData.image, "value")} data-astro-cid-wara3gar> </div> <div class="form-group" data-astro-cid-wara3gar> <label for="materials" data-astro-cid-wara3gar>Materialien (eine pro Zeile)*</label> <textarea id="materials" name="materials" rows="5" required data-astro-cid-wara3gar>${defaultData.materials}</textarea> </div> <div class="form-group" data-astro-cid-wara3gar> <label data-astro-cid-wara3gar> <input type="checkbox" id="bookingEnabled" name="bookingEnabled"${addAttribute(defaultData.bookingEnabled, "checked")} data-astro-cid-wara3gar>
Buchung aktiviert
</label> </div> <div class="form-actions" data-astro-cid-wara3gar> <a href="/admin/workshops" class="btn btn-secondary" data-astro-cid-wara3gar>Abbrechen</a> <button type="submit" class="btn btn-primary" data-astro-cid-wara3gar>Workshop erstellen</button> </div> <div id="message" class="message" data-astro-cid-wara3gar></div> </form> ` })} ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/workshops/create.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/workshops/create.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/workshops/create.astro";
const $$url = "/admin/workshops/create";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Create,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
