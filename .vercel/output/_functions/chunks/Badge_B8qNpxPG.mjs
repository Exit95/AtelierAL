import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_BEzeNKqC.mjs';
import 'piccolore';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Badge;
  const { variant, label, className = "" } = Astro2.props;
  const variantStyles = {
    available: "badge-available",
    reserved: "badge-reserved",
    sold: "badge-sold"
  };
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(`badge ${variantStyles[variant]} ${className}`, "class")} data-astro-cid-w254wjdn> ${label} </span> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/Badge.astro", void 0);

export { $$Badge as $ };
