import { d as createAstro, c as createComponent, m as maybeRenderHead, f as addAttribute, b as renderTemplate, r as renderComponent, A as AstroError, al as UnknownContentCollectionError, am as RenderUndefinedEntryError, ak as unescapeHTML, an as renderUniqueStylesheet, ao as renderScriptElement, ap as createHeadAndContent, aq as Fragment } from '../chunks/astro/server_BSfH3IVW.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_CcN-sGaN.mjs';
import 'clsx';
/* empty css                                 */
import { $ as $$WorkshopCard } from '../chunks/WorkshopCard_YDjNRJkq.mjs';
import { $ as $$Badge } from '../chunks/Badge_DZ7cx3Em.mjs';
import { a as getItems } from '../chunks/storage_BxzIridr.mjs';
import { escape } from 'html-escaper';
import { Traverse } from 'neotraverse/modern';
import pLimit from 'p-limit';
import { z } from 'zod';
import { b as removeBase, i as isRemotePath, p as prependForwardSlash } from '../chunks/path_V_7lih57.mjs';
import { b as VALID_INPUT_FORMATS } from '../chunks/consts_C6ST87xC.mjs';
import * as devalue from 'devalue';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro("https://test-danapfel-digital.de");
const $$CTAButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CTAButton;
  const { label, href, type = "primary", icon, className = "" } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")}${addAttribute(`cta-button cta-button-${type} ${className}`, "class")} data-astro-cid-pxxnplno> ${label} ${icon && renderTemplate`<span class="icon" data-astro-cid-pxxnplno>${icon}</span>`} </a> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/CTAButton.astro", void 0);

const $$Astro = createAstro("https://test-danapfel-digital.de");
const $$HeroSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$HeroSection;
  const { title, subtitle, backgroundImage, primaryCTA, secondaryCTA } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="hero"${addAttribute(backgroundImage ? `background-image: url(${backgroundImage})` : "", "style")} data-astro-cid-nlow4r3u> <div class="hero-overlay" data-astro-cid-nlow4r3u></div> <div class="hero-content container" data-astro-cid-nlow4r3u> <img src="/logo-clean.png?v=5" alt="ATELIER KL Logo" class="hero-logo" data-astro-cid-nlow4r3u> <h1 class="hero-title" data-astro-cid-nlow4r3u>${title}</h1> ${subtitle && renderTemplate`<p class="hero-subtitle" data-astro-cid-nlow4r3u>${subtitle}</p>`} ${(primaryCTA || secondaryCTA) && renderTemplate`<div class="hero-ctas" data-astro-cid-nlow4r3u> ${primaryCTA && renderTemplate`${renderComponent($$result, "CTAButton", $$CTAButton, { "label": primaryCTA.label, "href": primaryCTA.href, "type": "primary", "data-astro-cid-nlow4r3u": true })}`} ${secondaryCTA && renderTemplate`${renderComponent($$result, "CTAButton", $$CTAButton, { "label": secondaryCTA.label, "href": secondaryCTA.href, "type": "secondary", "data-astro-cid-nlow4r3u": true })}`} </div>`} </div> </section> `;
}, "/home/exit/Musik/AtelierKL/project/src/components/HeroSection.astro", void 0);

const CONTENT_IMAGE_FLAG = "astroContentImageFlag";
const IMAGE_IMPORT_PREFIX = "__ASTRO_IMAGE_";

function imageSrcToImportId(imageSrc, filePath) {
  imageSrc = removeBase(imageSrc, IMAGE_IMPORT_PREFIX);
  if (isRemotePath(imageSrc)) {
    return;
  }
  const ext = imageSrc.split(".").at(-1)?.toLowerCase();
  if (!ext || !VALID_INPUT_FORMATS.includes(ext)) {
    return;
  }
  const params = new URLSearchParams(CONTENT_IMAGE_FLAG);
  if (filePath) {
    params.set("importer", filePath);
  }
  return `${imageSrc}?${params.toString()}`;
}

class ImmutableDataStore {
  _collections = /* @__PURE__ */ new Map();
  constructor() {
    this._collections = /* @__PURE__ */ new Map();
  }
  get(collectionName, key) {
    return this._collections.get(collectionName)?.get(String(key));
  }
  entries(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.entries()];
  }
  values(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.values()];
  }
  keys(collectionName) {
    const collection = this._collections.get(collectionName) ?? /* @__PURE__ */ new Map();
    return [...collection.keys()];
  }
  has(collectionName, key) {
    const collection = this._collections.get(collectionName);
    if (collection) {
      return collection.has(String(key));
    }
    return false;
  }
  hasCollection(collectionName) {
    return this._collections.has(collectionName);
  }
  collections() {
    return this._collections;
  }
  /**
   * Attempts to load a DataStore from the virtual module.
   * This only works in Vite.
   */
  static async fromModule() {
    try {
      const data = await import('../chunks/_astro_data-layer-content_Bu3qcpmn.mjs');
      if (data.default instanceof Map) {
        return ImmutableDataStore.fromMap(data.default);
      }
      const map = devalue.unflatten(data.default);
      return ImmutableDataStore.fromMap(map);
    } catch {
    }
    return new ImmutableDataStore();
  }
  static async fromMap(data) {
    const store = new ImmutableDataStore();
    store._collections = data;
    return store;
  }
}
function dataStoreSingleton() {
  let instance = void 0;
  return {
    get: async () => {
      if (!instance) {
        instance = ImmutableDataStore.fromModule();
      }
      return instance;
    },
    set: (store) => {
      instance = store;
    }
  };
}
const globalDataStore = dataStoreSingleton();

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": "https://test-danapfel-digital.de", "SSR": true};
function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1) continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
z.object({
  tags: z.array(z.string()).optional(),
  lastModified: z.date().optional()
});
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport,
  cacheEntriesByCollection,
  liveCollections
}) {
  return async function getCollection(collection, filter) {
    if (collection in liveCollections) {
      throw new AstroError({
        ...UnknownContentCollectionError,
        message: `Collection "${collection}" is a live collection. Use getLiveCollection() instead of getCollection().`
      });
    }
    const hasFilter = typeof filter === "function";
    const store = await globalDataStore.get();
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else if (store.hasCollection(collection)) {
      const { default: imageAssetMap } = await import('../chunks/content-assets_DleWbedO.mjs');
      const result = [];
      for (const rawEntry of store.values(collection)) {
        const data = updateImageReferencesInData(rawEntry.data, rawEntry.filePath, imageAssetMap);
        let entry = {
          ...rawEntry,
          data,
          collection
        };
        if (entry.legacyId) {
          entry = emulateLegacyEntry(entry);
        }
        if (hasFilter && !filter(entry)) {
          continue;
        }
        result.push(entry);
      }
      return result;
    } else {
      console.warn(
        `The collection ${JSON.stringify(
          collection
        )} does not exist or is empty. Please check your content config file for errors.`
      );
      return [];
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (!Object.assign(__vite_import_meta_env__, { _: process.env._ })?.DEV && cacheEntriesByCollection.has(collection)) {
      entries = cacheEntriesByCollection.get(collection);
    } else {
      const limit = pLimit(10);
      entries = await Promise.all(
        lazyImports.map(
          (lazyImport) => limit(async () => {
            const entry = await lazyImport();
            return type === "content" ? {
              id: entry.id,
              slug: entry.slug,
              body: entry.body,
              collection: entry.collection,
              data: entry.data,
              async render() {
                return render({
                  collection: entry.collection,
                  id: entry.id,
                  renderEntryImport: await getRenderEntryImport(collection, entry.slug)
                });
              }
            } : {
              id: entry.id,
              collection: entry.collection,
              data: entry.data
            };
          })
        )
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (hasFilter) {
      return entries.filter(filter);
    } else {
      return entries.slice();
    }
  };
}
function emulateLegacyEntry({ legacyId, ...entry }) {
  const legacyEntry = {
    ...entry,
    id: legacyId,
    slug: entry.id
  };
  return {
    ...legacyEntry,
    // Define separately so the render function isn't included in the object passed to `renderEntry()`
    render: () => renderEntry(legacyEntry)
  };
}
const CONTENT_LAYER_IMAGE_REGEX = /__ASTRO_IMAGE_="([^"]+)"/g;
async function updateImageReferencesInBody(html, fileName) {
  const { default: imageAssetMap } = await import('../chunks/content-assets_DleWbedO.mjs');
  const imageObjects = /* @__PURE__ */ new Map();
  const { getImage } = await import('../chunks/_astro_assets_DchCphmN.mjs').then(n => n._);
  for (const [_full, imagePath] of html.matchAll(CONTENT_LAYER_IMAGE_REGEX)) {
    try {
      const decodedImagePath = JSON.parse(imagePath.replaceAll("&#x22;", '"'));
      let image;
      if (URL.canParse(decodedImagePath.src)) {
        image = await getImage(decodedImagePath);
      } else {
        const id = imageSrcToImportId(decodedImagePath.src, fileName);
        const imported = imageAssetMap.get(id);
        if (!id || imageObjects.has(id) || !imported) {
          continue;
        }
        image = await getImage({ ...decodedImagePath, src: imported });
      }
      imageObjects.set(imagePath, image);
    } catch {
      throw new Error(`Failed to parse image reference: ${imagePath}`);
    }
  }
  return html.replaceAll(CONTENT_LAYER_IMAGE_REGEX, (full, imagePath) => {
    const image = imageObjects.get(imagePath);
    if (!image) {
      return full;
    }
    const { index, ...attributes } = image.attributes;
    return Object.entries({
      ...attributes,
      src: image.src,
      srcset: image.srcSet.attribute,
      // This attribute is used by the toolbar audit
      ...Object.assign(__vite_import_meta_env__, { _: process.env._ }).DEV ? { "data-image-component": "true" } : {}
    }).map(([key, value]) => value ? `${key}="${escape(value)}"` : "").join(" ");
  });
}
function updateImageReferencesInData(data, fileName, imageAssetMap) {
  return new Traverse(data).map(function(ctx, val) {
    if (typeof val === "string" && val.startsWith(IMAGE_IMPORT_PREFIX)) {
      const src = val.replace(IMAGE_IMPORT_PREFIX, "");
      const id = imageSrcToImportId(src, fileName);
      if (!id) {
        ctx.update(src);
        return;
      }
      const imported = imageAssetMap?.get(id);
      if (imported) {
        ctx.update(imported);
      } else {
        ctx.update(src);
      }
    }
  });
}
async function renderEntry(entry) {
  if (!entry) {
    throw new AstroError(RenderUndefinedEntryError);
  }
  if ("render" in entry && !("legacyId" in entry)) {
    return entry.render();
  }
  if (entry.deferredRender) {
    try {
      const { default: contentModules } = await import('../chunks/content-modules_Dz-S_Wwv.mjs');
      const renderEntryImport = contentModules.get(entry.filePath);
      return render({
        collection: "",
        id: entry.id,
        renderEntryImport
      });
    } catch (e) {
      console.error(e);
    }
  }
  const html = entry?.rendered?.metadata?.imagePaths?.length && entry.filePath ? await updateImageReferencesInBody(entry.rendered.html, entry.filePath) : entry?.rendered?.html;
  const Content = createComponent(() => renderTemplate`${unescapeHTML(html)}`);
  return {
    Content,
    headings: entry?.rendered?.metadata?.headings ?? [],
    remarkPluginFrontmatter: entry?.rendered?.metadata?.frontmatter ?? {}
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} → ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function") throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object") throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function") throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object") throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const liveCollections = {};

const contentDir = '/src/content/';

const contentEntryGlob = "";
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = "";
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {};

new Set(Object.keys(lookupMap));

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = "";
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const cacheEntriesByCollection = new Map();
const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
	cacheEntriesByCollection,
	liveCollections,
});

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allArtworks = await getItems("artworks");
  const featuredArtworks = allArtworks.filter((artwork) => artwork.featured).slice(0, 6);
  const allWorkshops = await getItems("workshops");
  const upcomingWorkshops = allWorkshops.filter((workshop) => new Date(workshop.date) > /* @__PURE__ */ new Date()).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 3);
  const allTestimonials = await getCollection("testimonials");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Home", "description": "ATELIER KL - Abstrakte Kunst von Katharina Lanvermann. Entdecken Sie einzigartige Kunstwerke und kreative Workshops in Heek.", "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "HeroSection", $$HeroSection, { "title": "Kunst, die R\xE4ume verwandelt", "subtitle": "Abstrakte Kunstwerke und inspirierende Workshops von Katharina Lanvermann", "primaryCTA": { label: "Werke entdecken", href: "/werke" }, "secondaryCTA": { label: "Workshop buchen", href: "/workshops" }, "data-astro-cid-j7pv25f6": true })}  ${maybeRenderHead()}<section class="section py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="intro-grid" data-astro-cid-j7pv25f6> <div class="intro-text" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Über das Atelier</h2> <p class="lead-text" data-astro-cid-j7pv25f6>
Willkommen im ATELIER KL – einem Ort, an dem abstrakte
						Kunst entsteht, die Räume mit Farbe, Struktur und
						Emotion zum Leben erweckt.
</p> <p data-astro-cid-j7pv25f6>
Seit über 10 Jahren erschaffe ich im Herzen von Heek
						einzigartige Kunstwerke, die von natürlichen Elementen,
						mediterranen Landschaften und der Schönheit des
						Einfachen inspiriert sind. Jedes Werk ist ein Unikat,
						geschaffen mit Acrylfarben, Pigmenten und viel
						Leidenschaft.
</p> <p data-astro-cid-j7pv25f6>
Neben meinen eigenen Werken biete ich auch
						Auftragsarbeiten an, die individuell auf Ihre Räume und
						Wünsche abgestimmt werden. In meinen Workshops können
						Sie selbst zur Künstlerin oder zum Künstler werden und
						Ihre kreative Seite entdecken.
</p> <div class="intro-ctas" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Mehr \xFCber mich", "href": "/team", "type": "secondary", "data-astro-cid-j7pv25f6": true })} </div> </div> <div class="intro-image" data-astro-cid-j7pv25f6> <img src="/katharina-profile.jpg" alt="Katharina Lanvermann, Künstlerin von ATELIER KL" class="profile-image" loading="lazy" data-astro-cid-j7pv25f6> </div> </div> </div> </section>  <section class="section py-16" style="background-color: var(--color-surface);" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Ausgewählte Werke</h2> <p class="text-secondary" data-astro-cid-j7pv25f6>
Eine Auswahl meiner neuesten abstrakten Kunstwerke
</p> </div> ${featuredArtworks.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-1 grid-cols-md-2 grid-cols-lg-3" data-astro-cid-j7pv25f6> ${featuredArtworks.map((artwork) => renderTemplate`<a${addAttribute(`/werke/${artwork.id}`, "href")} class="artwork-preview" data-astro-cid-j7pv25f6> <div class="artwork-preview-image" data-astro-cid-j7pv25f6> <img${addAttribute(artwork.images[0], "src")}${addAttribute(artwork.title, "alt")} loading="lazy" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "Badge", $$Badge, { "variant": artwork.availability, "label": artwork.availability === "available" ? "Verf\xFCgbar" : artwork.availability === "reserved" ? "Reserviert" : "Verkauft", "data-astro-cid-j7pv25f6": true })} </div> <h3 class="artwork-preview-title" data-astro-cid-j7pv25f6> ${artwork.title} </h3> <p class="artwork-preview-meta" data-astro-cid-j7pv25f6> ${artwork.size.width} ×${" "} ${artwork.size.height}${" "} ${artwork.size.unit} </p> </a>`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "CTAButton", $$CTAButton, { "label": "Alle Werke ansehen", "href": "/werke", "type": "primary", "data-astro-cid-j7pv25f6": true })} </div> ` })}` : renderTemplate`<p class="text-center text-secondary" data-astro-cid-j7pv25f6>
Demnächst finden Sie hier ausgewählte Kunstwerke.
</p>`} </div> </section>  <section class="section py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Workshops, die Kreativität wecken</h2> <p class="text-secondary" data-astro-cid-j7pv25f6>
Entdecken Sie Ihre künstlerische Seite in kleinen Gruppen
</p> </div> ${upcomingWorkshops.length > 0 ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result3) => renderTemplate` <div class="grid grid-cols-1 grid-cols-md-3" data-astro-cid-j7pv25f6> ${upcomingWorkshops.map((workshop) => renderTemplate`${renderComponent($$result3, "WorkshopCard", $$WorkshopCard, { "workshop": workshop, "data-astro-cid-j7pv25f6": true })}`)} </div> <div class="section-cta" data-astro-cid-j7pv25f6> ${renderComponent($$result3, "CTAButton", $$CTAButton, { "label": "Alle Workshops", "href": "/workshops", "type": "primary", "data-astro-cid-j7pv25f6": true })} </div> ` })}` : renderTemplate`<p class="text-center text-secondary" data-astro-cid-j7pv25f6>
Neue Workshops werden in Kürze angekündigt. Schauen Sie
						bald wieder vorbei!
</p>`} </div> </section>  <section class="section py-16" style="background-color: var(--color-surface);" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header text-center" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Ihr persönliches Kunstwerk</h2> <p class="text-secondary" data-astro-cid-j7pv25f6>
Von der Idee bis zum fertigen Werk in drei Schritten
</p> </div> <div class="process-steps" data-astro-cid-j7pv25f6> <div class="process-step" data-astro-cid-j7pv25f6> <div class="step-number" data-astro-cid-j7pv25f6>01</div> <h3 data-astro-cid-j7pv25f6>Anfrage & Beratung</h3> <p data-astro-cid-j7pv25f6>
Teilen Sie mir Ihre Vorstellungen, Farbwünsche und
						Raummaße mit. Gemeinsam entwickeln wir ein Konzept für
						Ihr individuelles Kunstwerk.
</p> </div> <div class="process-step" data-astro-cid-j7pv25f6> <div class="step-number" data-astro-cid-j7pv25f6>02</div> <h3 data-astro-cid-j7pv25f6>Konzept & Entwurf</h3> <p data-astro-cid-j7pv25f6>
Ich erstelle einen ersten Entwurf und stimme ihn mit
						Ihnen ab. So stellen wir sicher, dass das Werk perfekt
						zu Ihren Wünschen passt.
</p> </div> <div class="process-step" data-astro-cid-j7pv25f6> <div class="step-number" data-astro-cid-j7pv25f6>03</div> <h3 data-astro-cid-j7pv25f6>Umsetzung & Übergabe</h3> <p data-astro-cid-j7pv25f6>
Ich erschaffe Ihr Kunstwerk mit großer Sorgfalt. Nach
						Fertigstellung können Sie es abholen oder es wird zu
						Ihnen geliefert.
</p> </div> </div> <div class="section-cta" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Jetzt Werk anfragen", "href": "/auftragsarbeiten", "type": "primary", "data-astro-cid-j7pv25f6": true })} </div> </div> </section>  ${allTestimonials.length > 0 && renderTemplate`<section class="section py-16" data-astro-cid-j7pv25f6> <div class="container" data-astro-cid-j7pv25f6> <div class="section-header text-center" data-astro-cid-j7pv25f6> <h2 data-astro-cid-j7pv25f6>Das sagen Kunden</h2> </div> <div class="testimonials-grid" data-astro-cid-j7pv25f6> ${allTestimonials.slice(0, 3).map((testimonial) => renderTemplate`<div class="testimonial-card" data-astro-cid-j7pv25f6> <div class="testimonial-stars" data-astro-cid-j7pv25f6> ${Array.from({
    length: testimonial.data.rating
  }).map(() => "\u2B50").join("")} </div> <p class="testimonial-text" data-astro-cid-j7pv25f6>
"${testimonial.data.text}"
</p> <div class="testimonial-author" data-astro-cid-j7pv25f6> <strong data-astro-cid-j7pv25f6>${testimonial.data.author}</strong> ${testimonial.data.role && renderTemplate`<span data-astro-cid-j7pv25f6>${testimonial.data.role}</span>`} </div> </div>`)} </div> </div> </section>`} <section class="section py-16" style="background: linear-gradient(135deg, var(--color-brand-beige), var(--color-brand-beige-dark));" data-astro-cid-j7pv25f6> <div class="container text-center" data-astro-cid-j7pv25f6> <h2 style="color: var(--color-white);" data-astro-cid-j7pv25f6>
Bereit für Ihr eigenes Kunstwerk?
</h2> <p style="color: var(--color-white); opacity: 0.9; max-width: 600px; margin: var(--space-4) auto var(--space-8);" data-astro-cid-j7pv25f6>
Kontaktieren Sie mich für eine unverbindliche Beratung oder
				buchen Sie einen Workshop.
</p> <div class="flex gap-4 justify-center" style="flex-wrap: wrap;" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Kontakt aufnehmen", "href": "/kontakt", "type": "primary", "data-astro-cid-j7pv25f6": true })} ${renderComponent($$result2, "CTAButton", $$CTAButton, { "label": "Workshops ansehen", "href": "/workshops", "type": "secondary", "data-astro-cid-j7pv25f6": true })} </div> </div> </section> ` })} `;
}, "/home/exit/Musik/AtelierKL/project/src/pages/index.astro", void 0);

const $$file = "/home/exit/Musik/AtelierKL/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
