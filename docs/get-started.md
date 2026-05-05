## Démarrage rapide

Les composants dans `src/lib/users/components` utilisent ces librairies runtime. Si tu veux installer uniquement ce dont ces composants ont besoin, exécute :

```bash
# Git bash -- prod (users components)
npm install \
  @tanstack/react-query @tanstack/react-table\
  @tanstack/react-query-devtools react-hook-form\
  @hookform/resolvers zod sonner nuqs
  react-hook-form @hookform/resolvers zod \
  @tanstack/react-query axios \
  cloudinary next-cloudinary \
  nodemailer \
  pino \
  server-only rimraf \
  moment \
  babel-plugin-react-compiler
```

```bash
# Git bash -- Dev
npm install -D \
  @types/nodemailer \
  pino-pretty \
  prettier eslint-config-prettier eslint-plugin-prettier \
  prettier-plugin-classnames prettier-plugin-merge prettier-plugin-tailwindcss \
  @eslint/css eslint-plugin-import eslint-plugin-unicorn \
  eslint-plugin-unused-imports @tanstack/eslint-plugin-query \
  husky lint-staged @commitlint/cli @commitlint/config-conventional \
  shx tailwind-csstree
```

## Fichiers / dossiers à copier pour un nouveau projet

Si tu veux réutiliser ce blueprint sans tout copier, prends au minimum :

- `src/config/` (configuration axios, api, environment, logger)
- `src/lib/` (logique commune, ui components, hooks)
- `src/utils/` (helpers réutilisables)
- `env/` (exemples `.env.*`)

## Commandes utiles

```bash
npm run env:local    # copie .env.local
npm run dev          # démarre next en dev
npm run build        # build
npm run start        # start
npm run lint         # eslint
npm run format       # prettier
```

## Points d’attention

- Assure-toi que `tsconfig.json` contient les `paths` suivants (pratique pour imports absolus) :

```json
"paths": {
  "@/*": ["./src/*"],
  "@lib/*": ["./src/lib/*"],
  "@config/*": ["./src/config/*"],
  "@/components/*": ["./src/lib/_/components/*"]
}
```