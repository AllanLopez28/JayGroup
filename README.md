# The Jay Group — Web

Sitio web corporativo de **The Jay Group** (desarrolladora inmobiliaria en Nueva York).

## Stack

- **Next.js** 16.2.9 (App Router, Turbopack)
- **React / React DOM** 19.2.4
- **TypeScript** 5 (`strict: true`)
- **Tailwind CSS** v4 (`@tailwindcss/postcss`, configuración en CSS con `@theme`)
- **ESLint** (`eslint-config-next`)

## Requisitos

- **Node.js** 20.9 o superior (`.nvmrc` fijado en `20`)

## Variables de entorno

Copia `.env.example` a `.env.local` antes de iniciar el servidor:

| Variable | Valores | Descripción |
| --- | --- | --- |
| `AUTH_MODE` | `mock` | Selecciona el adaptador de autenticación del Resident Portal (`src/lib/auth/provider.ts`). En modo `mock` (demo) cualquier email válido y contraseña no vacía inician sesión. Si falta o tiene un valor no reconocido, la app lanza un error de configuración en lugar de caer en modo demo en silencio. |

## Scripts

```bash
npm run dev        # Servidor de desarrollo (http://localhost:3000)
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # ESLint
npm run typecheck  # Verificación de tipos TypeScript (tsc --noEmit)
```

## Estructura de carpetas

```text
JayGroup/
├─ public/
│  ├─ brand/          # logos (fase 1)
│  ├─ images/         # renders y fotos (fase 1)
│  └─ videos/         # clips del hero (fase 1)
├─ reference/         # HTML de vista previa (ignorado por git)
├─ src/
│  ├─ app/
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  ├─ not-found.tsx
│  │  └─ globals.css
│  ├─ components/
│  │  ├─ layout/      # Header.tsx, Footer.tsx
│  │  ├─ sections/    # Hero, Story, Portfolio, Approach, InDevelopment,
│  │  │               # Directory, FindHome, AmenitySpotlight, Retail,
│  │  │               # Locations, Residents
│  │  └─ ui/          # Container, Eyebrow, Button, ArrowIcon, Section
│  └─ lib/
│     ├─ fonts.ts
│     ├─ types.ts
│     └─ data/        # site.ts, buildings.ts, directory.ts, retail.ts
├─ next.config.ts
├─ postcss.config.mjs
├─ eslint.config.mjs
├─ tsconfig.json
└─ README.md
```
