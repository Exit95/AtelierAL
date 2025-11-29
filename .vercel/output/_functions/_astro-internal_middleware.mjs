import { g as getSessionFromCookies } from './chunks/auth_mxHGmgbS.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_Bx3WHqM8.mjs';
import 'piccolore';
import './chunks/astro/server_DD7gXx_F.mjs';
import 'clsx';
import { s as sequence } from './chunks/index_vDwxshV5.mjs';

async function onRequest$1(context, next) {
  const { url, cookies, redirect } = context;
  if (url.pathname.startsWith("/admin")) {
    if (url.pathname === "/admin/login") {
      return next();
    }
    const cookieHeader = context.request.headers.get("cookie");
    const session = getSessionFromCookies(cookieHeader);
    if (!session) {
      return redirect("/admin/login");
    }
  }
  return next();
}

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
