# Internacionalización (i18n) — Español + Portugués

**Fecha:** 2026-04-29  
**Estado:** Aprobado

## Resumen

Agregar soporte multi-idioma al sitio EggPertise (Next.js 14 App Router) para español y portugués brasileño, con arquitectura preparada para agregar inglés en el futuro. La solución combina `next-intl` para textos de UI y locales nativos de Contentful para contenido dinámico.

---

## 1. Routing y estructura de archivos

Se mueve todo el contenido de `app/` a `app/[locale]/`, creando rutas dinámicas por idioma.

```
app/
  [locale]/
    layout.tsx                      ← layout con provider de next-intl
    page.tsx                        ← home
    distribuidoras/[slug]/page.tsx
    productos/[slug]/page.tsx
  api/                              ← sin cambios
middleware.ts                       ← detección de idioma y redirección
messages/
  es.json                           ← textos UI en español
  pt.json                           ← textos UI en portugués
```

**URLs resultantes:**
- `eggpertise.com/es` y `eggpertise.com/pt`
- `eggpertise.com/es/productos/sistema-de-alimentacion`
- `eggpertise.com/pt/produtos/sistema-de-alimentacao`

El locale `es` es el default. El middleware redirige `/` al locale correcto según el browser.

---

## 2. Textos de UI con next-intl

Se instala `next-intl`. Todos los textos hardcodeados en componentes se extraen a archivos JSON por idioma.

**Estructura de mensajes:**
```json
{
  "hero": { "title": "...", "description": "...", "cta_fabricantes": "...", "cta_contacto": "..." },
  "nav": { "fabricantes": "...", "productos": "...", "contacto": "..." },
  "about": { ... },
  "cta": { ... },
  "contact": { ... },
  "footer": { ... },
  "distributors": { ... },
  "products": { ... },
  "modals": { ... }
}
```

En los componentes:
```tsx
const t = useTranslations('hero');
<h1>{t('title')}</h1>
```

El metadata de `layout.tsx` (title, description, og:locale) también se parametriza por locale.

---

## 3. Contentful — Locales

**Setup en Contentful (vía MCP):**
- Locale default: `en-US` (se mantiene — contiene todo el contenido en español)
- Locale nuevo: `pt-BR` — se crea con MCP `create_locale`

**Mapeo en el código:**
```
locale URL "es"  →  Contentful locale "en-US"
locale URL "pt"  →  Contentful locale "pt-BR"
```

**Cambio en queries GraphQL** — se agrega el parámetro `locale` a todas las queries:
```graphql
query GetAllProductosComplete($locale: String!) {
  productoCollection(limit: 50, locale: $locale) { ... }
}
```

**Cambio en `lib/contentful.ts`** — todas las funciones públicas reciben `locale: string` como parámetro:
```ts
export async function getProductosPrincipales(locale: string): Promise<Producto[]>
export async function getFabricantes(locale: string): Promise<Distributor[]>
// etc.
```

**Fallback:** Si un campo no tiene traducción en `pt-BR`, Contentful devuelve el valor de `en-US` automáticamente (configurado en el locale).

**Traducción del contenido:** Las entradas de Contentful se completan manualmente en portugués campo por campo desde el panel, una vez activado el locale `pt-BR`.

---

## 4. Flujo de datos

```
URL /pt/productos/[slug]
  → middleware.ts detecta locale "pt"
  → app/[locale]/productos/[slug]/page.tsx recibe params.locale = "pt"
  → llama getProductoBySlug(slug, "pt-BR")
  → GraphQL query con locale: "pt-BR"
  → Contentful devuelve contenido en portugués
  → next-intl provee textos UI en portugués vía useTranslations()
```

---

## 5. Selector de idioma

Toggle ES / PT en el header. Preserva la ruta actual al cambiar de idioma:

```tsx
// /es/productos/slug → /pt/productos/slug
const switchLocale = (newLocale: string) => {
  const newPath = pathname.replace(/^\/(es|pt)/, `/${newLocale}`);
  router.push(newPath);
};
```

**Auto-detección** en `middleware.ts`:
- Lee header `Accept-Language`
- Si el usuario llega a `/` sin locale: redirige a `/pt` si browser es PT, sino a `/es`
- Si el usuario ya tiene un locale en la URL: no interfiere

---

## 6. SEO

- `hreflang` tags en el `<head>` apuntando a las versiones ES y PT de cada página
- `og:locale` parametrizado: `es_AR` para ES, `pt_BR` para PT
- Metadata `title` y `description` traducidos por locale
- URLs indexables: `/es/...` y `/pt/...`

---

## 7. Extensibilidad a inglés

Para agregar inglés en el futuro:
1. Agregar `messages/en.json`
2. Activar locale `en-US` en Contentful (requiere upgrade de plan)
3. Agregar `"en"` al array de locales en la config de `next-intl`
4. Mapeo: `locale "en"` → Contentful locale `"en-US"` (nueva entrada, no el default actual)

> Nota: el plan actual de Contentful permite 2 locales. Para inglés se necesitará upgrade.

---

## 8. Decisiones tomadas

| Decisión | Razón |
|---|---|
| No cambiar `en-US` default en Contentful | Evita pérdida de contenido existente |
| `next-intl` sobre solución manual | Estándar de industria para Next.js App Router, mantenible |
| Auto-detección + toggle manual | Cubre el caso automático y permite probar ambos idiomas |
| `es` como locale default | El mercado principal es Latinoamérica |
| No usar Google Translate widget | Incompatible con React hydration, no indexable por SEO |
