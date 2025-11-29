import { f as createAstro, c as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent } from './astro/server_DyuB9JmO.mjs';
import 'piccolore';
import { $ as $$Badge } from './Badge_BLeQNuh5.mjs';
import 'clsx';
/* empty css                         */

const $$Astro$1 = createAstro("https://test-danapfel-digital.de");
const $$CTAButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CTAButton;
  const { label, href, type = "primary", icon, className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`cta-button cta-button-${type} ${className}`, "class")} data-astro-cid-pxxnplno> ${label} ${icon && renderTemplate`<span class="icon" data-astro-cid-pxxnplno>${icon}</span>`} </a> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/CTAButton.astro", void 0);

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$WorkshopCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$WorkshopCard;
  const { workshop } = Astro2.props;
  const availableSpots = workshop.maxParticipants - workshop.currentParticipants;
  const isFull = availableSpots === 0;
  const dateFormatter = new Intl.DateTimeFormat("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
  const formattedDate = dateFormatter.format(new Date(workshop.date));
  return renderTemplate`${maybeRenderHead()}<article class="workshop-card" data-astro-cid-gds5yjra> <div class="workshop-image" data-astro-cid-gds5yjra> <img${addAttribute(workshop.image, "src")}${addAttribute(workshop.title, "alt")} loading="lazy" data-astro-cid-gds5yjra> ${isFull ? renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": "sold", "label": "Ausgebucht", "className": "workshop-badge", "data-astro-cid-gds5yjra": true })}` : renderTemplate`${renderComponent($$result, "Badge", $$Badge, { "variant": "available", "label": `${availableSpots} Pl\xE4tze frei`, "className": "workshop-badge", "data-astro-cid-gds5yjra": true })}`} </div> <div class="workshop-content" data-astro-cid-gds5yjra> <h3 class="workshop-title" data-astro-cid-gds5yjra>${workshop.title}</h3> <div class="workshop-meta" data-astro-cid-gds5yjra> <div class="meta-item" data-astro-cid-gds5yjra> <span class="meta-icon" data-astro-cid-gds5yjra>📅</span> <span data-astro-cid-gds5yjra>${formattedDate}</span> </div> <div class="meta-item" data-astro-cid-gds5yjra> <span class="meta-icon" data-astro-cid-gds5yjra>🕒</span> <span data-astro-cid-gds5yjra>${workshop.time}</span> </div> <div class="meta-item" data-astro-cid-gds5yjra> <span class="meta-icon" data-astro-cid-gds5yjra>📍</span> <span data-astro-cid-gds5yjra>${workshop.location}</span> </div> </div> <p class="workshop-description" data-astro-cid-gds5yjra>${workshop.description}</p> <div class="workshop-footer" data-astro-cid-gds5yjra> <div class="workshop-price" data-astro-cid-gds5yjra>${workshop.price}€</div> ${workshop.bookingEnabled && !isFull && renderTemplate`${renderComponent($$result, "CTAButton", $$CTAButton, { "label": "Jetzt buchen", "href": "/workshops#booking", "type": "primary", "data-astro-cid-gds5yjra": true })}`} </div> </div> </article> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/WorkshopCard.astro", void 0);

export { $$WorkshopCard as $, $$CTAButton as a };
