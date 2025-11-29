import { c as createComponent, g as renderHead, a as renderScript, b as renderTemplate } from '../../chunks/astro/server_BSfH3IVW.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                   */
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="de" data-astro-cid-rf56lckb> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Admin Login - ATELIER KL</title>${renderHead()}</head> <body data-astro-cid-rf56lckb> <div class="login-container" data-astro-cid-rf56lckb> <div class="login-box" data-astro-cid-rf56lckb> <div class="login-header" data-astro-cid-rf56lckb> <h1 data-astro-cid-rf56lckb>ATELIER KL</h1> <p data-astro-cid-rf56lckb>Admin-Bereich</p> </div> <form id="loginForm" class="login-form" data-astro-cid-rf56lckb> <div class="form-group" data-astro-cid-rf56lckb> <label for="username" data-astro-cid-rf56lckb>Benutzername</label> <input type="text" id="username" name="username" required autocomplete="username" data-astro-cid-rf56lckb> </div> <div class="form-group" data-astro-cid-rf56lckb> <label for="password" data-astro-cid-rf56lckb>Passwort</label> <input type="password" id="password" name="password" required autocomplete="current-password" data-astro-cid-rf56lckb> </div> <div id="errorMessage" class="error-message" data-astro-cid-rf56lckb></div> <button type="submit" class="login-btn" data-astro-cid-rf56lckb>Anmelden</button> </form> <div class="login-footer" data-astro-cid-rf56lckb> <a href="/" data-astro-cid-rf56lckb>← Zurück zur Website</a> </div> </div> </div> ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/pages/admin/login.astro?astro&type=script&index=0&lang.ts")}  </body> </html>`;
}, "/home/exit/Musik/AtelierKL/project/src/pages/admin/login.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Login,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
