import bcrypt from 'bcrypt';
import { parse, serialize } from 'cookie';

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD_HASH = await bcrypt.hash("admin123", 10);
const sessions = /* @__PURE__ */ new Map();
async function verifyCredentials(username, password) {
  if (username !== ADMIN_USERNAME) {
    return false;
  }
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}
function createSession(username) {
  const sessionId = generateSessionId();
  sessions.set(sessionId, {
    username,
    createdAt: Date.now()
  });
  return sessionId;
}
function getSession(sessionId) {
  return sessions.get(sessionId);
}
function deleteSession(sessionId) {
  sessions.delete(sessionId);
}
function generateSessionId() {
  return Array.from(
    { length: 32 },
    () => Math.floor(Math.random() * 16).toString(16)
  ).join("");
}
function createSessionCookie(sessionId) {
  return serialize("session", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    // 7 days
    path: "/"
  });
}
function getSessionFromCookies(cookieHeader) {
  if (!cookieHeader) return void 0;
  const cookies = parse(cookieHeader);
  const sessionId = cookies.session;
  if (!sessionId) return void 0;
  return getSession(sessionId);
}
function deleteSessionCookie() {
  return serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/"
  });
}

export { createSessionCookie as a, deleteSessionCookie as b, createSession as c, deleteSession as d, getSessionFromCookies as g, verifyCredentials as v };
