import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, l as renderScript, al as Fragment } from '../chunks/astro/server_BEzeNKqC.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_j3a86qGr.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$WorkshopCard } from '../chunks/WorkshopCard_C3bzyZDx.mjs';
import { $ as $$Badge } from '../chunks/Badge_B8qNpxPG.mjs';
import { a as getItems } from '../chunks/storage_DpN-KgD-.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$3 = createAstro("https://test-danapfel-digital.de");
const $$CTAButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CTAButton;
  const { label, href, type = "primary", icon, className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`cta-button cta-button-${type} ${className}`, "class")} data-astro-cid-pxxnplno> ${label} ${icon && renderTemplate`<span class="icon" data-astro-cid-pxxnplno>${icon}</span>`} </a> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/CTAButton.astro", void 0);

const $$Astro$2 = createAstro("https://test-danapfel-digital.de");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { title, subtitle, backgroundImage, primaryCTA, secondaryCTA } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero"${addAttribute(backgroundImage ? `background-image: url(${backgroundImage})` : "", "style")} data-astro-cid-nlow4r3u> <div class="hero-overlay" data-astro-cid-nlow4r3u></div> <div class="hero-content container" data-astro-cid-nlow4r3u> <img src="/logo-clean.png?v=5" alt="ATELIER KL Logo" class="hero-logo" data-astro-cid-nlow4r3u> <h1 class="hero-title" data-astro-cid-nlow4r3u>${title}</h1> ${subtitle && renderTemplate`<p class="hero-subtitle" data-astro-cid-nlow4r3u>${subtitle}</p>`} ${(primaryCTA || secondaryCTA) && renderTemplate`<div class="hero-ctas" data-astro-cid-nlow4r3u> ${primaryCTA && renderTemplate`${renderComponent($$result, "CTAButton", $$CTAButton, { "label": primaryCTA.label, "href": primaryCTA.href, "type": "primary", "data-astro-cid-nlow4r3u": true })}`} ${secondaryCTA && renderTemplate`${renderComponent($$result, "CTAButton", $$CTAButton, { "label": secondaryCTA.label, "href": secondaryCTA.href, "type": "secondary", "data-astro-cid-nlow4r3u": true })}`} </div>`} </div> </section> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/HeroSection.astro", void 0);

const $$Astro$1 = createAstro("https://test-danapfel-digital.de");
const $$ReviewsDisplay = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ReviewsDisplay;
  const { ttitle = "Kundenbewertungen" } = Astro2.props;
  let reviews = [];
  try {
    const allReviews = await getItems("reviews");
    reviews = allReviews.filter((review) => review.status === "approved").sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
  return renderTemplate`${maybeRenderHead()}<div class="reviews-section" data-astro-cid-k2lel6uh> <div class="section-header text-center" data-astro-cid-k2lel6uh> <h2 data-astro-cid-k2lel6uh>${ttitle}</h2> ${reviews.length > 0 && renderTemplate`<p class="text-secondary" data-astro-cid-k2lel6uh>Das sagen unsere Kunden über uns</p>`} </div> ${reviews.length > 0 ? renderTemplate`<div class="reviews-grid" data-astro-cid-k2lel6uh> ${reviews.map((review) => renderTemplate`<div class="review-card" data-astro-cid-k2lel6uh> <div class="review-header" data-astro-cid-k2lel6uh> <div class="review-stars" data-astro-cid-k2lel6uh> ${Array.from({ length: review.rating }).map(
    () => renderTemplate`<span class="star filled" data-astro-cid-k2lel6uh>★</span>`
  )} ${Array.from({ length: 5 - review.rating }).map(
    () => renderTemplate`<span class="star empty" data-astro-cid-k2lel6uh>★</span>`
  )} </div> <div class="review-date" data-astro-cid-k2lel6uh> ${new Date(review.date).toLocaleDateString(
    "de-DE",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
  )} </div> </div> <p class="review-text" data-astro-cid-k2lel6uh>${review.text}</p> <div class="review-author" data-astro-cid-k2lel6uh> <strong data-astro-cid-k2lel6uh>${review.name}</strong> </div> </div>`)} </div>` : renderTemplate`<p class="no-reviews text-center text-secondary" data-astro-cid-k2lel6uh>
Noch keine Bewertungen vorhanden. Seien Sie der Erste, der eine
                Bewertung abgibt!
</p>`} </div> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/ReviewsDisplay.astro", void 0);

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$ReviewForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReviewForm;
  const { title = "Ihre Bewertung" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="review-form-wrapper" data-astro-cid-3rdxlqbm> <h3 data-astro-cid-3rdxlqbm>${title}</h3> <form id="review-form" class="review-form" data-astro-cid-3rdxlqbm> <div class="form-group" data-astro-cid-3rdxlqbm> <label for="name" data-astro-cid-3rdxlqbm>Name <span class="required" data-astro-cid-3rdxlqbm>*</span></label> <input type="text" id="name" name="name" required minlength="2" maxlength="100" placeholder="Ihr Name" data-astro-cid-3rdxlqbm> </div> <div class="form-group" data-astro-cid-3rdxlqbm> <label for="email" data-astro-cid-3rdxlqbm>E-Mail (optional)</label> <input type="email" id="email" name="email" placeholder="ihre@email.de" data-astro-cid-3rdxlqbm> </div> <div class="form-group" data-astro-cid-3rdxlqbm> <label data-astro-cid-3rdxlqbm>Bewertung <span class="required" data-astro-cid-3rdxlqbm>*</span></label> <div class="star-rating" data-astro-cid-3rdxlqbm> ${[5, 4, 3, 2, 1].map((star) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-3rdxlqbm": true }, { "default": async ($$result2) => renderTemplate` <input type="radio"${addAttribute(`star-${star}`, "id")} name="rating"${addAttribute(star, "value")} required data-astro-cid-3rdxlqbm> <label${addAttribute(`star-${star}`, "for")} class="star" data-astro-cid-3rdxlqbm>
★
</label> ` })}`)} </div> </div> <div class="form-group" data-astro-cid-3rdxlqbm> <label for="text" data-astro-cid-3rdxlqbm>Ihre Bewertung <span class="required" data-astro-cid-3rdxlqbm>*</span></label> <textarea id="text" name="text" required minlength="10" maxlength="1000" rows="5" placeholder="Teilen Sie Ihre Erfahrung mit uns..." data-astro-cid-3rdxlqbm></textarea> <div class="char-count" data-astro-cid-3rdxlqbm> <span id="char-count" data-astro-cid-3rdxlqbm>0</span>/1000
</div> </div> <div id="form-message" class="form-message" data-astro-cid-3rdxlqbm></div> <button type="submit" class="submit-btn" data-astro-cid-3rdxlqbm> Bewertung abgeben </button> </form> </div>  ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/components/ReviewForm.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/exit/Musik/AtelierKL/project/src/components/ReviewForm.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allArtworks = await getItems("artworks");
  const featuredArtworks = allArtworks.filter((artwork) => artwork.featured).slice(0, 6);
  const allWorkshops = await getItems("workshops");
  const upcomingWorkshops = allWorkshops.filter((workshop) => new Date(workshop.date) > /* @__PURE__ */ new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home", "description": "ATELIER KL - Abstrakte Kunst von Katharina Lanvermann. Entdecken Sie einzigartige Kunstwerke und kreative Workshops in Heek.", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": "Kunst, die R\xE4ume verwandelt", "subtitle": "Abstrakte Kunstwerke und inspirierende Workshops von Katharina Lanvermann", "primaryCTA": { label: "Werke entdecken", href: "/werke" }, "secondaryCTA": { label: "Workshop buchen", href: "/workshops" }, "data-astro-cid-j7pv25f6": true })}  ${maybeRenderHead()}<section class="section py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="intro-grid" data-astro-cid-j7pv25f6> <div class="intro-text" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Über das Atelier</h2> <p class="lead-text" data-astro-cid-j7pv25f6>
Willkommen im ATELIER KL – einem Ort, an dem abstrakte
						Kunst entsteht, die Räume mit Farbe, Struktur und
						Emotion zum Leben erweckt.
</p> <p data-astro-cid-j7pv25f6>
Seit über 10 Jahren erschaffe ich im Herzen von Heek
						einzigartige Kunstwerke, die von natürlichen Elementen,
						mediterranen Landschaften und der Schönheit des
						Einfachen inspiriert sind. Jedes Werk ist ein Unikat,
						geschaffen mit Acrylfarben, Pigmenten und viel
						Leidenschaft.
</p> <p data-astro-cid-j7pv25f6>
Neben meinen eigenen Werken biete ich auch
						Auftragsarbeiten an, die individuell auf Ihre Räume und
						Wünsche abgestimmt werden. In meinen Workshops können
						Sie selbst zur Künstlerin oder zum Künstler werden und
						Ihre kreative Seite entdecken.
</p> <div class="intro-ctas" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Mehr \xFCber mich", "href": "/team", "type": "secondary", "data-astro-cid-j7pv25f6": true })} </div> </div> <div class="intro-image" data-astro-cid-j7pv25f6> <img src="/katharina-profile.jpg" alt="Katharina Lanvermann, Künstlerin von ATELIER KL" class="profile-image" loading="lazy" data-astro-cid-j7pv25f6> </div> </div> </div> </section>  <section class="section py-16" style="background-color: var(--color-surface);" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Ausgewählte Werke</h2> <p class="text-secondary" data-astro-cid-j7pv25f6>
Eine Auswahl meiner neuesten abstrakten Kunstwerke
</p> </div> ${featuredArtworks.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-1 grid-cols-md-2 grid-cols-lg-3" data-astro-cid-j7pv25f6> ${featuredArtworks.map((artwork) => renderTemplate`<a${addAttribute(`/werke/${artwork.id}`, "href")} class="artwork-preview" data-astro-cid-j7pv25f6> <div class="artwork-preview-image" data-astro-cid-j7pv25f6> <img${addAttribute(artwork.images[0], "src")}${addAttribute(artwork.title, "alt")} loading="lazy" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "Badge", $$Badge, { "variant": artwork.availability, "label": artwork.availability === "available" ? "Verf\xFCgbar" : artwork.availability === "reserved" ? "Reserviert" : "Verkauft", "data-astro-cid-j7pv25f6": true })} </div> <h3 class="artwork-preview-title" data-astro-cid-j7pv25f6> ${artwork.title} </h3> <p class="artwork-preview-meta" data-astro-cid-j7pv25f6> ${artwork.size.width} ×${" "} ${artwork.size.height}${" "} ${artwork.size.unit} </p> </a>`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "CTAButton", $$CTAButton, { "label": "Alle Werke ansehen", "href": "/werke", "type": "primary", "data-astro-cid-j7pv25f6": true })} </div> ` })}` : renderTemplate`<p class="text-center text-secondary" data-astro-cid-j7pv25f6>
Demnächst finden Sie hier ausgewählte Kunstwerke.
</p>`} </div> </section>  <section class="section py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Workshops, die Kreativität wecken</h2> <p class="text-secondary" data-astro-cid-j7pv25f6>
Entdecken Sie Ihre künstlerische Seite in kleinen Gruppen
</p> </div> ${upcomingWorkshops.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-1 grid-cols-md-3" data-astro-cid-j7pv25f6> ${upcomingWorkshops.map((workshop) => renderTemplate`${renderComponent($$result3, "WorkshopCard", $$WorkshopCard, { "workshop": workshop, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "CTAButton", $$CTAButton, { "label": "Alle Workshops", "href": "/workshops", "type": "primary", "data-astro-cid-j7pv25f6": true })} </div> ` })}` : renderTemplate`<p class="text-center text-secondary" data-astro-cid-j7pv25f6>
Neue Workshops werden in Kürze angekündigt. Schauen Sie
						bald wieder vorbei!
</p>`} </div> </section>  <section class="section py-16" style="background-color: var(--color-surface);" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header text-center" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Ihr persönliches Kunstwerk</h2> <p class="text-secondary" data-astro-cid-j7pv25f6>
Von der Idee bis zum fertigen Werk in drei Schritten
</p> </div> <div class="process-steps" data-astro-cid-j7pv25f6> <div class="process-step" data-astro-cid-j7pv25f6> <div class="step-number" data-astro-cid-j7pv25f6>01</div> <h3 data-astro-cid-j7pv25f6>Anfrage & Beratung</h3> <p data-astro-cid-j7pv25f6>
Teilen Sie mir Ihre Vorstellungen, Farbwünsche und
						Raummaße mit. Gemeinsam entwickeln wir ein Konzept für
						Ihr individuelles Kunstwerk.
</p> </div> <div class="process-step" data-astro-cid-j7pv25f6> <div class="step-number" data-astro-cid-j7pv25f6>02</div> <h3 data-astro-cid-j7pv25f6>Konzept & Entwurf</h3> <p data-astro-cid-j7pv25f6>
Ich erstelle einen ersten Entwurf und stimme ihn mit
						Ihnen ab. So stellen wir sicher, dass das Werk perfekt
						zu Ihren Wünschen passt.
</p> </div> <div class="process-step" data-astro-cid-j7pv25f6> <div class="step-number" data-astro-cid-j7pv25f6>03</div> <h3 data-astro-cid-j7pv25f6>Umsetzung & Übergabe</h3> <p data-astro-cid-j7pv25f6>
Ich erschaffe Ihr Kunstwerk mit großer Sorgfalt. Nach
						Fertigstellung können Sie es abholen oder es wird zu
						Ihnen geliefert.
</p> </div> </div> <div class="section-cta" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Jetzt Werk anfragen", "href": "/auftragsarbeiten", "type": "primary", "data-astro-cid-j7pv25f6": true })} </div> </div> </section>   <section class="section py-16" style="background-color: var(--color-surface);" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ReviewsDisplay", $$ReviewsDisplay, { "data-astro-cid-j7pv25f6": true })} </div> </section>  <section class="section py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "ReviewForm", $$ReviewForm, { "title": "Teilen Sie Ihre Erfahrung", "data-astro-cid-j7pv25f6": true })} </div> </section>  <section class="section py-16" style="background: linear-gradient(135deg, var(--color-brand-beige), var(--color-brand-beige-dark));" data-astro-cid-j7pv25f6> <div class="container text-center" data-astro-cid-j7pv25f6> <h2 style="color: var(--color-white);" data-astro-cid-j7pv25f6>
Bereit für Ihr eigenes Kunstwerk?
</h2> <p style="color: var(--color-white); opacity: 0.9; max-width: 600px; margin: var(--space-4) auto var(--space-8);" data-astro-cid-j7pv25f6>
Kontaktieren Sie mich für eine unverbindliche Beratung oder
				buchen Sie einen Workshop.
</p> <div class="flex gap-4 justify-center" style="flex-wrap: wrap;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Kontakt aufnehmen", "href": "/kontakt", "type": "primary", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Workshops ansehen", "href": "/workshops", "type": "secondary", "data-astro-cid-j7pv25f6": true })} </div> </div> </section> ` })} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/index.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
