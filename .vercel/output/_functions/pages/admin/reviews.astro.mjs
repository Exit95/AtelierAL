import { f as createComponent, k as renderComponent, l as renderScript, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_BEzeNKqC.mjs';
import 'piccolore';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_CVBRVa7f.mjs';
import { a as getItems } from '../../chunks/storage_DpN-KgD-.mjs';
/* empty css                                      */
export { renderers } from '../../renderers.mjs';

const $$Reviews = createComponent(async ($$result, $$props, $$slots) => {
  const reviews = await getItems("reviews");
  const pendingCount = reviews.filter((r) => r.status === "pending").length;
  const approvedCount = reviews.filter((r) => r.status === "approved").length;
  const rejectedCount = reviews.filter((r) => r.status === "rejected").length;
  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Bewertungen verwalten", "data-astro-cid-b66bpwoi": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="reviews-header" data-astro-cid-b66bpwoi> <h2 data-astro-cid-b66bpwoi>Kundenbewertungen</h2> <div class="stats" data-astro-cid-b66bpwoi> <div class="stat" data-astro-cid-b66bpwoi> <span class="stat-number pending" data-astro-cid-b66bpwoi>${pendingCount}</span> <span class="stat-label" data-astro-cid-b66bpwoi>Ausstehend</span> </div> <div class="stat" data-astro-cid-b66bpwoi> <span class="stat-number approved" data-astro-cid-b66bpwoi>${approvedCount}</span> <span class="stat-label" data-astro-cid-b66bpwoi>Genehmigt</span> </div> <div class="stat" data-astro-cid-b66bpwoi> <span class="stat-number rejected" data-astro-cid-b66bpwoi>${rejectedCount}</span> <span class="stat-label" data-astro-cid-b66bpwoi>Abgelehnt</span> </div> </div> </div> <div id="message" class="message" data-astro-cid-b66bpwoi></div> ${sortedReviews.length > 0 ? renderTemplate`<div class="reviews-list" data-astro-cid-b66bpwoi> ${sortedReviews.map((review) => renderTemplate`<div class="review-item"${addAttribute(review.id, "data-review-id")}${addAttribute(review.status, "data-status")} data-astro-cid-b66bpwoi> <div class="review-header-row" data-astro-cid-b66bpwoi> <div class="review-meta" data-astro-cid-b66bpwoi> <strong data-astro-cid-b66bpwoi>${review.name}</strong> ${review.email && renderTemplate`<span class="email" data-astro-cid-b66bpwoi>(${review.email})</span>`} <span class="date" data-astro-cid-b66bpwoi> ${new Date(review.date).toLocaleDateString(
    "de-DE",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }
  )} </span> </div> <div${addAttribute(`status-badge ${review.status}`, "class")} data-astro-cid-b66bpwoi> ${review.status === "pending" ? "Ausstehend" : review.status === "approved" ? "Genehmigt" : "Abgelehnt"} </div> </div> <div class="review-rating" data-astro-cid-b66bpwoi> ${Array.from({ length: review.rating }).map(() => renderTemplate`<span class="star filled" data-astro-cid-b66bpwoi>★</span>`)} ${Array.from({ length: 5 - review.rating }).map(
    () => renderTemplate`<span class="star empty" data-astro-cid-b66bpwoi>★</span>`
  )} </div> <p class="review-text" data-astro-cid-b66bpwoi>${review.text}</p> <div class="review-actions" data-astro-cid-b66bpwoi> ${review.status !== "approved" && renderTemplate`<button class="action-btn approve" data-action="approve"${addAttribute(review.id, "data-review-id")} data-astro-cid-b66bpwoi>
✓ Genehmigen
</button>`} ${review.status !== "rejected" && renderTemplate`<button class="action-btn reject" data-action="reject"${addAttribute(review.id, "data-review-id")} data-astro-cid-b66bpwoi>
✗ Ablehnen
</button>`} </div> </div>`)} </div>` : renderTemplate`<p class="no-reviews" data-astro-cid-b66bpwoi>Noch keine Bewertungen vorhanden.</p>`}` })}  ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/reviews.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/reviews.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/reviews.astro";
const $$url = "/admin/reviews";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Reviews,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
