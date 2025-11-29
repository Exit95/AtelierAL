import { g as getSessionFromCookies, d as deleteSession, b as deleteSessionCookie } from '../../../chunks/auth_mxHGmgbS.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie");
  const session = getSessionFromCookies(cookieHeader);
  if (session) {
    const cookies = cookieHeader?.split(";").map((c) => c.trim()) || [];
    const sessionCookie = cookies.find((c) => c.startsWith("session="));
    if (sessionCookie) {
      const sessionId = sessionCookie.split("=")[1];
      deleteSession(sessionId);
    }
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": deleteSessionCookie()
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
