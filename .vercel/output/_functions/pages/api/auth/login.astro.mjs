import { v as verifyCredentials, c as createSession, a as createSessionCookie } from '../../../chunks/auth_mxHGmgbS.mjs';
export { renderers } from '../../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const data = await request.formData();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();
    if (!username || !password) {
      return new Response(JSON.stringify({
        error: "Benutzername und Passwort erforderlich"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const isValid = await verifyCredentials(username, password);
    if (!isValid) {
      return new Response(JSON.stringify({
        error: "Ungültige Anmeldedaten"
      }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const sessionId = createSession(username);
    const sessionCookie = createSessionCookie(sessionId);
    return new Response(JSON.stringify({
      success: true,
      redirect: "/admin"
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Set-Cookie": sessionCookie
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    console.error("Login error:", error);
    return new Response(JSON.stringify({
      error: `Fehler: ${error instanceof Error ? error.message : String(error)}`
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
