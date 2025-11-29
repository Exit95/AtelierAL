import { c as createComponent, r as renderComponent, a as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_DTZ0Lt1g.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_DG_wgjKe.mjs';
import { g as getItems } from '../../chunks/storage_ARbyxPSG.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const workshops = await getItems("workshops");
  const sortedWorkshops = workshops.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Workshops", "data-astro-cid-whyllakd": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="page-actions" data-astro-cid-whyllakd> <a href="/admin/workshops/create" class="btn btn-primary" data-astro-cid-whyllakd>+ Neuer Workshop</a> </div> <div class="workshops-list" data-astro-cid-whyllakd> ${sortedWorkshops.map((workshop) => renderTemplate`<div class="workshop-card" data-astro-cid-whyllakd> <div class="workshop-info" data-astro-cid-whyllakd> <h3 data-astro-cid-whyllakd>${workshop.title}</h3> <p class="workshop-date" data-astro-cid-whyllakd>
📅${" "} ${new Date(workshop.date).toLocaleDateString(
    "de-DE"
  )}${" "}
| ${workshop.time} </p> <p class="workshop-participants" data-astro-cid-whyllakd>
👥 ${workshop.currentParticipants}/
${workshop.maxParticipants} Teilnehmer
</p> </div> <div class="workshop-actions" data-astro-cid-whyllakd> <a${addAttribute(`/admin/workshops/${workshop.id}`, "href")} class="btn btn-secondary" data-astro-cid-whyllakd>
Bearbeiten
</a> <button class="btn btn-danger"${addAttribute(workshop.id, "data-id")} onclick="deleteWorkshop(this)" data-astro-cid-whyllakd>
Löschen
</button> </div> </div>`)} ${workshops.length === 0 && renderTemplate`<p class="empty-state" data-astro-cid-whyllakd>Noch keine Workshops erstellt.</p>`} </div> ` })} ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/workshops/index.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/workshops/index.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/workshops/index.astro";
const $$url = "/admin/workshops";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
