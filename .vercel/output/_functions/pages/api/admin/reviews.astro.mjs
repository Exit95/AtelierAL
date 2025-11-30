import { a as getItems, b as approveReview, r as rejectReview } from '../../../chunks/storage_DpN-KgD-.mjs';
import { g as getSessionFromCookies } from '../../../chunks/auth_DMMMreQm.mjs';
export { renderers } from '../../../renderers.mjs';

function isAuthenticated(request) {
  const cookieHeader = request.headers.get("cookie");
  return !!getSessionFromCookies(cookieHeader);
}
const GET = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "Nicht autorisiert" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const allReviews = await getItems("reviews");
    const sortedReviews = allReviews.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return new Response(JSON.stringify(sortedReviews), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Laden der Bewertungen" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const POST = async ({ request }) => {
  if (!isAuthenticated(request)) {
    return new Response(JSON.stringify({ error: "Nicht autorisiert" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }
  try {
    const data = await request.json();
    const { reviewId, action } = data;
    if (!reviewId || !action) {
      return new Response(JSON.stringify({ error: "Review-ID und Aktion erforderlich" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (action === "approve") {
      await approveReview(reviewId);
    } else if (action === "reject") {
      await rejectReview(reviewId);
    } else {
      return new Response(JSON.stringify({ error: "Ungültige Aktion" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Error updating review:", error);
    return new Response(JSON.stringify({ error: "Fehler beim Aktualisieren der Bewertung" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    GET,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
