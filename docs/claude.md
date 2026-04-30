# CLAUDE.md — Next.js Blueprints

Guide court pour comprendre rapidement la structure du projet et travailler dans le bon sens.

## Stack

- Next.js 16 + App Router
- React 19
- TypeScript strict
- Tailwind CSS v4
- shadcn/ui
- React Hook Form + Zod
- React Query + Axios
- Lucide React, Toastify, Cloudinary, Nodemailer, Pino

## Structure actuelle

```txt
src/app/
├── (full-width-pages)/
│   ├── (auth)/signin
│   ├── (auth)/signup
│   └── (error-pages)/error-404
├── api/
│   ├── auth/
│   ├── users/[id]/
│   ├── posts/[id]/
│   └── comments/[id]/
├── layout.tsx
├── page.tsx
└── not-found.tsx

src/lib/
├── auth/
├── users/
├── posts/
├── comments/
├── _/                # helpers partagés
├── auth.utils.ts
└── mail.ts
```

## Règles simples à suivre

- Les composants React sont en `PascalCase`
- Les fichiers restent en `kebab-case`
- Les API routes utilisent `route.ts`
- Les routes dynamiques Next utilisent `Promise<{ id: string }>` pour `params`
- Garder les composants de liste / détail / formulaire séparés par entité

## Pattern par entité

Chaque domaine suit la même logique :

```txt
src/lib/{entity}/
├── models/
├── services/
└── components/
```

Exemples d’entités : `auth`, `users`, `posts`, `comments`.

## Conventions utiles

- Les pages sont fines : elles orchestrent, elles ne contiennent pas toute la logique
- Les services restent séparés entre serveur et client quand nécessaire
- Les blocs partagés vont dans `src/components`
- Quand tu démarres un nouveau projet, garde seulement la base commune utile : `src/config`, `src/lib`, `src/utils`, `src/types`, `env`

## Commandes courantes

```bash
npm run dev
npm run build
npx tsc --noEmit
```
