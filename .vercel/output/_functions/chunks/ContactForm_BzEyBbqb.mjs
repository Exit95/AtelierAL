import { f as createAstro, c as createComponent, m as maybeRenderHead, a as renderScript, b as renderTemplate } from './astro/server_DyuB9JmO.mjs';
import 'piccolore';
import 'clsx';
/* empty css                                    */

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$ContactForm = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ContactForm;
  const { formTitle = "Kontaktformular", showPreferredDate = false } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="contact-form-container" data-astro-cid-svshx33u> <h2 data-astro-cid-svshx33u>${formTitle}</h2> <form class="contact-form" data-contact-form data-astro-cid-svshx33u> <div class="form-group" data-astro-cid-svshx33u> <label for="name" data-astro-cid-svshx33u>Name *</label> <input type="text" id="name" name="name" required aria-required="true" placeholder="Ihr vollständiger Name" data-astro-cid-svshx33u> <span class="form-error" data-error="name" data-astro-cid-svshx33u></span> </div> <div class="form-group" data-astro-cid-svshx33u> <label for="email" data-astro-cid-svshx33u>E-Mail *</label> <input type="email" id="email" name="email" required aria-required="true" placeholder="ihre.email@beispiel.de" data-astro-cid-svshx33u> <span class="form-error" data-error="email" data-astro-cid-svshx33u></span> </div> <div class="form-group" data-astro-cid-svshx33u> <label for="phone" data-astro-cid-svshx33u>Telefon (optional)</label> <input type="tel" id="phone" name="phone" placeholder="+49 123 456789" data-astro-cid-svshx33u> </div> ${showPreferredDate && renderTemplate`<div class="form-group" data-astro-cid-svshx33u> <label for="preferredDate" data-astro-cid-svshx33u>Wunschtermin (optional)</label> <input type="date" id="preferredDate" name="preferredDate" data-astro-cid-svshx33u> </div>`} <div class="form-group" data-astro-cid-svshx33u> <label for="message" data-astro-cid-svshx33u>Nachricht *</label> <textarea id="message" name="message" rows="6" required aria-required="true" placeholder="Beschreiben Sie Ihr Anliegen..." data-astro-cid-svshx33u></textarea> <span class="form-error" data-error="message" data-astro-cid-svshx33u></span> </div> <div class="form-group checkbox-group" data-astro-cid-svshx33u> <label class="checkbox-label" data-astro-cid-svshx33u> <input type="checkbox" name="privacy" required aria-required="true" data-astro-cid-svshx33u> <span data-astro-cid-svshx33u>
Ich habe die <a href="/datenschutz" target="_blank" data-astro-cid-svshx33u>Datenschutzerklärung</a>
zur Kenntnis genommen und bin damit einverstanden, dass die von
                    mir angegebenen Daten elektronisch erhoben und gespeichert werden.
                    *
</span> </label> <span class="form-error" data-error="privacy" data-astro-cid-svshx33u></span> </div> <div class="form-alert" data-form-alert hidden data-astro-cid-svshx33u></div> <button type="submit" class="submit-button" data-submit-button data-astro-cid-svshx33u> <span class="button-text" data-astro-cid-svshx33u>Nachricht senden</span> <span class="button-loader" hidden data-astro-cid-svshx33u>Wird gesendet...</span> </button> </form> </div> ${renderScript($$result, "/home/exit/Musik/AtelierKL/project/src/components/ContactForm.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/exit/Musik/AtelierKL/project/src/components/ContactForm.astro", void 0);

export { $$ContactForm as $ };
