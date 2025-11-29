import { f as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, b as renderTemplate } from './astro/server_DD7gXx_F.mjs';
import 'piccolore';
import { $ as $$Badge } from './Badge_CwACIffN.mjs';
/* empty css                         */

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$WorkshopCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WorkshopCard;
  const { workshop } = Astro2.props;
  const isFull = workshop.currentParticipants >= workshop.maxParticipants;
  const availableSpots = workshop.maxParticipants - workshop.currentParticipants;
  new Date(workshop.date).toLocaleDateString("de-DE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  return renderTemplate`${maybeRenderHead()}<article class="workshop-card" data-astro-cid-gds5yjra> <a${addAttribute(`/workshops/${workshop.id}`, "href")} class="card-link" data-astro-cid-gds5yjra> <div class="card-image" data-astro-cid-gds5yjra> <img${addAttribute(workshop.image, "src")}${addAttribute(workshop.title, "alt")} loading="lazy" data-astro-cid-gds5yjra> ${isFull ? renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": "sold", "label": "Ausgebucht", "className": "workshop-badge", "data-astro-cid-gds5yjra": true })}` : renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": "available", "label": `${availableSpots} Pl\xE4tze frei`, "className": "workshop-badge", "data-astro-cid-gds5yjra": true })}`} <div class="card-date" data-astro-cid-gds5yjra> <span class="day" data-astro-cid-gds5yjra>${new Date(workshop.date).getDate()}</span> <span class="month" data-astro-cid-gds5yjra> ${new Date(workshop.date).toLocaleDateString("de-DE", {
    month: "short"
  })} </span> </div> </div> <div class="card-content" data-astro-cid-gds5yjra> <h3 data-astro-cid-gds5yjra>${workshop.title}</h3> <div class="card-meta" data-astro-cid-gds5yjra> <span data-astro-cid-gds5yjra>⏰ ${workshop.time}</span> <span data-astro-cid-gds5yjra>📍 ${workshop.location}</span> </div> <p class="description" data-astro-cid-gds5yjra>${workshop.description}</p> <div class="card-footer" data-astro-cid-gds5yjra> <span class="price" data-astro-cid-gds5yjra>${workshop.price} €</span> <span class="btn-text" data-astro-cid-gds5yjra>Details & Buchung →</span> </div> </div> </a> </article> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/WorkshopCard.astro", void 0);

export { $$WorkshopCard as $ };
