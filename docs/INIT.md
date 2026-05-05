-- tout d'abord copier ces dossier

- env
- config
- lib
- hooks
- types
- utils
- fichier [esling.config.mjs]
- modifié [tsconfig.json]

## ⚠️⚠️ Ajout des modifs manuels

- ajouté <Toaster> sur layout.tsx
- Dans providers.tsx ou layout.tsx : <QueryProvider>{children}</QueryProvider>
- layout.tsx ajouté :
<body>
    <NuqsAdapter> # import { NuqsAdapter } from "nuqs/adapters/next/app";
     <QueryProvider> # ou bien mettre QueryProvider dans un providers.tsx et importé providers sur layout.tsx

```bash
# src/app/layout.tsx  ---> Recaputulatif de layout.tsx
import QueryProvider from "@/lib/_/components/layout/query-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@/lib/_/components/ui/sonner";

    <body>
        <NuqsAdapter>
            <QueryProvider> # ou bien mettre QueryProvider dans un <Providers> si il existe
                <Toaster />
                    {children}
            </QueryProvider>
        </NuqsAdapter>
      </body>
```

## pour les dépendances a installée (sur un projet tailwindcss)

```bash

# tanstack & forms
npm install @tanstack/react-query @tanstack/react-table @tanstack/react-query-devtools \
react-hook-form @hookform/resolvers zod \
nuqs \
react-day-picker

# ui & icônes

npm install @radix-ui/react-scroll-area \
@radix-ui/react-slider \
@radix-ui/react-icons \
lucide-react \
@tabler/icons-react \
cmdk \
sonner

# autres
npm install axios \
zod \
rimraf \
pino \
nodemailer \
cloudinary \
next-cloudinary
moment 

# dev dependencies
npm install -D husky \
lint-staged \
pino-pretty \
shx \
@tanstack/eslint-plugin-query \
@types/nodemailer

```
### ⚠️Tailwind.config.ts add colors if missing

```bash
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
        "secondary-foreground":
          "rgb(var(--secondary-foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        "muted-foreground": "rgb(var(--muted-foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-foreground": "rgb(var(--accent-foreground) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
        "destructive-foreground":
          "rgb(var(--destructive-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        ....
        }
```