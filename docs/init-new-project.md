# 🎨 Design System - Copie Express

> Copie intégrale de ton design system

---

## 📋 Étape 1 : Copier les dossiers et fichiers

```bash
cp -r env config lib hooks types utils eslint.config.mjs tsconfig.json ../ton-projet-destination/
```

---

## ⚙️ Étape 2 : Modifier `src/app/layout.tsx`

```tsx
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/lib/_/components/ui/sonner";
import QueryProvider from "@/lib/_/components/layout/query-provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body>
        <NuqsAdapter>
          <QueryProvider>
            <Toaster />
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
```

---

## 📦 Étape 3 : Installer toutes les dépendances

```bash
npm install @tanstack/react-query @tanstack/react-table @tanstack/react-query-devtools \
  react-hook-form @hookform/resolvers zod nuqs react-day-picker \
  radix-ui @radix-ui/react-scroll-area @radix-ui/react-slider @radix-ui/react-icons \ 
  lucide-react @tabler/icons-react cmdk sonner axios rimraf pino nodemailer \
  cloudinary next-cloudinary moment 
  
&& npm install -D husky lint-staged \
  pino-pretty shx @tanstack/eslint-plugin-query @types/nodemailer
```

---

## 🎨 Étape 4 : Configurer TailwindCSS

### 4.1 Dans `tailwind.config.ts` - ajouter les couleurs :

```ts
colors: {
  background: "rgb(var(--background) / <alpha-value>)",
  foreground: "rgb(var(--foreground) / <alpha-value>)",
  card: "rgb(var(--card) / <alpha-value>)",
  "card-foreground": "rgb(var(--card-foreground) / <alpha-value>)",
  popover: "rgb(var(--popover) / <alpha-value>)",
  "popover-foreground": "rgb(var(--popover-foreground) / <alpha-value>)",
  primary: "rgb(var(--primary) / <alpha-value>)",
  "primary-foreground": "rgb(var(--primary-foreground) / <alpha-value>)",
  secondary: "rgb(var(--secondary) / <alpha-value>)",
  "secondary-foreground": "rgb(var(--secondary-foreground) / <alpha-value>)",
  muted: "rgb(var(--muted) / <alpha-value>)",
  "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
  accent: "rgb(var(--accent) / <alpha-value>)",
  "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
  destructive: "rgb(var(--destructive) / <alpha-value>)",
  "destructive-foreground": "rgb(var(--destructive-foreground) / <alpha-value>)",
  border: "rgb(var(--border) / <alpha-value>)",
  input: "rgb(var(--input) / <alpha-value>)",
  ring: "rgb(var(--ring) / <alpha-value>)",
}
```

---

### 4.2 Dans `globals.css` ou `styles.css` selon le projet - ajouter les variables CSS :
là où on a :

````css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
--------------------------------------------

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 243 244 246;
    --foreground: 17 24 40;
    --card: 255 255 255;
    --card-foreground: 17 24 40;
    --popover: 255 255 255;
    --popover-foreground: 17 24 40;
    --primary: 60 80 224;
    --primary-foreground: 255 255 255;
    --secondary: 229 231 235;
    --secondary-foreground: 17 24 40;
    --muted: 243 244 246;
    --muted-foreground: 107 114 128;
    --accent: 239 244 251;
    --accent-foreground: 17 24 40;
    --destructive: 242 48 48;
    --destructive-foreground: 255 255 255;
    --border: 230 235 241;
    --input: 229 231 235;
    --ring: 60 80 224;
    --radius: 0.75rem;
    --radius-md: 0.625rem;
  }

  .dark {
    --background: 2 13 26;
    --foreground: 229 231 235;
    --card: 18 32 49;
    --card-foreground: 229 231 235;
    --popover: 18 32 49;
    --popover-foreground: 229 231 235;
    --primary: 84 117 229;
    --primary-foreground: 255 255 255;
    --secondary: 31 42 55;
    --secondary-foreground: 229 231 235;
    --muted: 31 42 55;
    --muted-foreground: 156 163 175;
    --accent: 31 42 55;
    --accent-foreground: 229 231 235;
    --destructive: 245 96 96;
    --destructive-foreground: 255 255 255;
    --border: 39 48 62;
    --input: 39 48 62;
    --ring: 84 117 229;
  }
}
```

---

## ✅ Checklist

* Dossiers copiés (`env`, `config`, `lib`, `hooks`, `types`, `utils`, `eslint.config.mjs`, `tsconfig.json`)
* `layout.tsx` modifié
* Dépendances installées
* Couleurs ajoutées dans `tailwind.config.ts`
* Variables CSS ajoutées dans `globals.css`
