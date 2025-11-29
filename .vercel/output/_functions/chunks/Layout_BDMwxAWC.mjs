import { f as createAstro, c as createComponent, m as maybeRenderHead, a as renderScript, d as addAttribute, b as renderTemplate, r as renderComponent, h as renderSlot, e as renderHead, u as unescapeHTML } from './astro/server_DD7gXx_F.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */
/* empty css                          */

const $$Astro$2 = createAstro("https://test-danapfel-digital.de");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Header;
  const currentPath = Astro2.url.pathname;
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Werke", href: "/werke" },
    { label: "Auftragsarbeiten", href: "/auftragsarbeiten" },
    { label: "Workshops", href: "/workshops" },
    { label: "\xDCber mich", href: "/team" },
    { label: "Kontakt", href: "/kontakt" }
  ];
  return renderTemplate`${maybeRenderHead()}<header class="site-header" data-astro-cid-3ef6ksr2> <div class="container header-content" data-astro-cid-3ef6ksr2> <a href="/" class="logo-link" data-astro-cid-3ef6ksr2> <img src="/logo-clean.png?v=5" alt="ATELIER KL" class="logo" data-astro-cid-3ef6ksr2> </a> <button class="mobile-menu-toggle" aria-label="Menü öffnen" aria-expanded="false" aria-controls="main-navigation" data-astro-cid-3ef6ksr2> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> <span class="hamburger-line" data-astro-cid-3ef6ksr2></span> </button> <nav id="main-navigation" aria-label="Hauptnavigation" class="main-nav" data-astro-cid-3ef6ksr2> <ul class="nav-list" data-astro-cid-3ef6ksr2> ${navItems.map((item) => renderTemplate`<li data-astro-cid-3ef6ksr2> <a${addAttribute(item.href, "href")}${addAttribute(
    currentPath === item.href ? "nav-link active" : "nav-link",
    "class"
  )}${addAttribute(
    currentPath === item.href ? "page" : void 0,
    "aria-current"
  )} data-astro-cid-3ef6ksr2> ${item.label} </a> </li>`)} </ul> </nav> </div> </header> ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/components/Header.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer" data-astro-cid-sz7xmlte> <div class="container footer-content" data-astro-cid-sz7xmlte> <div class="footer-section" data-astro-cid-sz7xmlte> <div class="footer-brand" data-astro-cid-sz7xmlte> <img src="/logo.png" alt="ATELIER KL" class="footer-logo" data-astro-cid-sz7xmlte> <h3 data-astro-cid-sz7xmlte>ATELIER KL</h3> <p data-astro-cid-sz7xmlte>Kunst, die Räume verwandelt</p> </div> </div> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Navigation</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/" data-astro-cid-sz7xmlte>Home</a></li> <li data-astro-cid-sz7xmlte><a href="/werke" data-astro-cid-sz7xmlte>Werke</a></li> <li data-astro-cid-sz7xmlte><a href="/auftragsarbeiten" data-astro-cid-sz7xmlte>Auftragsarbeiten</a></li> <li data-astro-cid-sz7xmlte><a href="/workshops" data-astro-cid-sz7xmlte>Workshops</a></li> <li data-astro-cid-sz7xmlte><a href="/team" data-astro-cid-sz7xmlte>Über mich</a></li> <li data-astro-cid-sz7xmlte><a href="/kontakt" data-astro-cid-sz7xmlte>Kontakt</a></li> </ul> </div> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Kontakt</h4> <address class="footer-contact" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>ATELIER KL</p> <p data-astro-cid-sz7xmlte>Katharina Lanvermann</p> <p data-astro-cid-sz7xmlte>Hauptstraße 45</p> <p data-astro-cid-sz7xmlte>48619 Heek</p> <p data-astro-cid-sz7xmlte> <a href="mailto:info@atelier-kl.de" data-astro-cid-sz7xmlte>info@atelier-kl.de</a> </p> </address> </div> <div class="footer-section" data-astro-cid-sz7xmlte> <h4 data-astro-cid-sz7xmlte>Rechtliches</h4> <ul class="footer-links" data-astro-cid-sz7xmlte> <li data-astro-cid-sz7xmlte><a href="/impressum" data-astro-cid-sz7xmlte>Impressum</a></li> <li data-astro-cid-sz7xmlte><a href="/datenschutz" data-astro-cid-sz7xmlte>Datenschutz</a></li> <li data-astro-cid-sz7xmlte><a href="/rechtliches" data-astro-cid-sz7xmlte>AGB</a></li> </ul> </div> </div> <div class="footer-bottom" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>
&copy; ${currentYear} ATELIER KL - Katharina Lanvermann. Alle Rechte
                vorbehalten.
</p> </div> </div> </footer> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/Footer.astro", void 0);

const $$Astro$1 = createAstro("https://test-danapfel-digital.de");
const $$Lightbox = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Lightbox;
  const { images } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="lightbox" data-lightbox hidden data-astro-cid-gixpweiw> <button class="lightbox-close" data-lightbox-close aria-label="Schließen" data-astro-cid-gixpweiw> <span class="close-icon" data-astro-cid-gixpweiw>✕</span> </button> <button class="lightbox-prev" data-lightbox-prev aria-label="Vorheriges Bild" data-astro-cid-gixpweiw> <span class="arrow" data-astro-cid-gixpweiw>‹</span> </button> <button class="lightbox-next" data-lightbox-next aria-label="Nächstes Bild" data-astro-cid-gixpweiw> <span class="arrow" data-astro-cid-gixpweiw>›</span> </button> <div class="lightbox-content" data-astro-cid-gixpweiw> <img class="lightbox-image" data-lightbox-image src="" alt="" loading="eager" data-astro-cid-gixpweiw> </div> <div class="lightbox-counter" data-lightbox-counter data-astro-cid-gixpweiw> <span data-current-index data-astro-cid-gixpweiw>1</span> / <span data-total-images data-astro-cid-gixpweiw>1</span> </div> </div> ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/components/Lightbox.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/components/Lightbox.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title, description, image } = Astro2.props;
  const canonicalURL = new URL(Astro2.url.pathname, Astro2.site);
  const socialImage = image || new URL("/logo.png", Astro2.site).toString();
  return renderTemplate(_a || (_a = __template(['<html lang="de"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/logo.png"><link rel="canonical"', "><!-- SEO Meta Tags --><title>", ' | ATELIER KL</title><meta name="description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:image"', '><meta property="og:locale" content="de_DE"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- JSON-LD Structured Data --><script type="application/ld+json">', '<\/script><meta name="generator"', '><!-- Google Fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">', '</head> <body> <a href="#main-content" class="skip-to-content">Zum Hauptinhalt springen</a> ', ' <main id="main-content"> ', " </main> ", " ", ' <!-- Vercel Web Analytics --> <script>\n			if (window.va) window.va("pageview");\n		<\/script> </body> </html>'])), addAttribute(canonicalURL, "href"), title, addAttribute(description, "content"), addAttribute(canonicalURL, "content"), addAttribute(`${title} | ATELIER KL`, "content"), addAttribute(description, "content"), addAttribute(socialImage, "content"), addAttribute(canonicalURL, "content"), addAttribute(`${title} | ATELIER KL`, "content"), addAttribute(description, "content"), addAttribute(socialImage, "content"), unescapeHTML(JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ATELIER KL",
    alternateName: "Katharina Lanvermann Art Studio",
    url: Astro2.site,
    logo: new URL("/logo.png", Astro2.site),
    description: "Abstraktes Kunst-Atelier f\xFCr einzigartige Kunstwerke und kreative Workshops",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Hauptstra\xDFe 45",
      addressLocality: "Heek",
      postalCode: "48619",
      addressCountry: "DE"
    },
    email: "info@atelier-kl.de"
  })), addAttribute(Astro2.generator, "content"), renderHead(), renderComponent($$result, "Header", $$Header, {}), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}), renderComponent($$result, "Lightbox", $$Lightbox, { "images": [] }));
}, "/home/exit/Musik/AtelierKL/project/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
