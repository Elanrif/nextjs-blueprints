# Installation du projet

Étapes à suivre dans l'ordre pour initialiser le projet from scratch.

```bash
# Git bash -- prod
npm install \
  react-hook-form @hookform/resolvers zod \
  @tanstack/react-query axios \
  react-toastify \
  cloudinary next-cloudinary \
  nodemailer \
  pino \
  server-only rimraf \
  moment \
  babel-plugin-react-compiler

# Git bash -- Dev
npm install -D \
  @types/nodemailer \
  pino-pretty \
  prettier eslint-config-prettier eslint-plugin-prettier prettier-plugin-classnames prettier-plugin-merge prettier-plugin-tailwindcss \
  @eslint/css eslint-plugin-import eslint-plugin-unicorn eslint-plugin-unused-imports @tanstack/eslint-plugin-query \
  husky lint-staged @commitlint/cli @commitlint/config-conventional \
  shx tailwind-csstree
```

## Nouveau projet — ce qu’il faut copier

Quand tu démarres un nouveau projet basé sur ce blueprint, tu peux partir uniquement des dossiers et fichiers partagés suivants :

- `src/config`
- `src/lib`
- `src/utils`
- `src/types`
- `env` à la racine

> Le reste peut être recréé ou adapté selon le besoin du projet. L’idée est de garder une base commune légère et de ne dupliquer que ce qui sert vraiment.

### Architecture minimale à reprendre

```txt
env/                                 # Variables d’environnement locales et configuration sensible
.husky/                              # husky, lancer `npm run prepare` et copier les 2 dossiers
├── __/
├── commit-msg
├── pre-commit

src/
├── config/                          # Configuration partagée du projet
├── lib/                             # Logique métier, API, helpers métier
├── utils/                           # Fonctions utilitaires réutilisables
└── types/                           # Types et contrats TypeScript partagés
commitlint.config.tsc                # À ajouté
eslint.config.mjs                    # À ajouté, l'implementation dépends aussi du projet
tsconfig.json                        # À modifié
```

Et dans `tsconfig.json`, il faut aussi ajouter ces `paths` :
├── tsconfig.json

```json
"paths": {
  "@/*": ["./src/*"],
  "@lib/*": ["./src/lib/*"],
  "@utils/*": ["./src/utils/*"],
  "@components/*": ["./src/components/*"],
  "@config/*": ["./src/config/*"],
  "@hooks/*": ["./src/hooks/*"],
  "@context/*": ["./src/context/*"],
  "@app/*": ["./src/app/*"],
  "~/*": ["./public/*"]
}
```

Cette structure permet de repartir vite sur un nouveau projet sans embarquer toute l’application d’origine. Tu gardes seulement la base commune, puis tu reconstruis les pages et composants spécifiques au besoin.
