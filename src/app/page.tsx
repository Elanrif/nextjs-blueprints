import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

export const metadata: Metadata = {
  title: "Next.js Starter Kit Dashboard",
  description: "A modern landing page for your dashboard starter kit.",
};

const stats = [
  { value: "20+", label: "ui blocks prêts à l’emploi" },
  { value: "12", label: "pages dashboard & auth" },
  { value: "100%", label: "responsive et dark mode" },
];

const features = [
  {
    title: "Design professionnel",
    description:
      "Une interface claire, élégante et cohérente pour démarrer rapidement un produit SaaS ou un back-office.",
  },
  {
    title: "Composants réutilisables",
    description:
      "Header, cards, tableaux, formulaires et widgets déjà pensés pour être assemblés sans effort.",
  },
  {
    title: "Mode sombre natif",
    description:
      "L’expérience s’adapte automatiquement à la préférence de thème pour garder un rendu premium.",
  },
];

const steps = [
  {
    title: "1. Choisis ton point de départ",
    description:
      "Part du dashboard, des écrans d’authentification ou d’une page vide selon ton besoin.",
  },
  {
    title: "2. Assemble les sections",
    description:
      "Réutilise les composants existants pour créer des pages riches en quelques minutes.",
  },
  {
    title: "3. Branche tes données",
    description:
      "Connecte ton API, tes métriques et tes collections pour transformer le starter kit en vrai produit.",
  },
];

const highlights = [
  "Navigation intuitive",
  "Dashboard prêt à customiser",
  "UI cohérente sur mobile et desktop",
  "Dark mode avec un simple clic",
];

const testimonials = [
  {
    quote:
      "Le starter kit donne un énorme coup d’accélérateur : on passe de l’idée à une base solide en un clin d’œil.",
    author: "Produit & Frontend",
  },
  {
    quote:
      "L’organisation du projet est propre et agréable, idéale pour lancer une application admin moderne.",
    author: "Équipe technique",
  },
];

const footerLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Connexion", href: "/signin" },
  { label: "Inscription", href: "/signup" },
  { label: "Composants", href: "/dashboard/blank" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-100 text-gray-900 dark:from-gray-950 dark:via-gray-950 dark:to-gray-900 dark:text-white">
      <header className="sticky top-0 z-50 border-b border-gray-200/70 bg-white/80 backdrop-blur-xl dark:border-gray-800/70 dark:bg-gray-950/70">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo/logo.svg"
              alt="Starter kit dashboard"
              width={132}
              height={32}
              priority
              className="dark:hidden"
            />
            <Image
              src="/images/logo/logo-dark.svg"
              alt="Starter kit dashboard"
              width={132}
              height={32}
              priority
              className="hidden dark:block"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-gray-600 transition hover:text-brand-500 dark:text-gray-300 dark:hover:text-white">
              Fonctionnalités
            </a>
            <a href="#process" className="text-sm font-medium text-gray-600 transition hover:text-brand-500 dark:text-gray-300 dark:hover:text-white">
              Méthode
            </a>
            <a href="#proof" className="text-sm font-medium text-gray-600 transition hover:text-brand-500 dark:text-gray-300 dark:hover:text-white">
              Preuves
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <Link
              href="/signin"
              className="hidden rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 sm:inline-flex"
            >
              Se connecter
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-theme-sm transition hover:bg-brand-600"
            >
              Ouvrir le dashboard
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="absolute right-0 top-24 h-72 w-72 rounded-full bg-blue-light-400/20 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-orange-400/10 blur-3xl" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
            <div className="flex flex-col justify-center">
              <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-medium text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
                <span className="h-2 w-2 rounded-full bg-success-500" />
                Starter kit dashboard premium
              </div>

              <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl xl:text-6xl">
                Une landing page élégante pour lancer ton dashboard en toute confiance.
              </h1>

              <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                Ce starter kit t’offre une base moderne avec une architecture propre, des composants réutilisables et une expérience visuelle qui donne tout de suite envie de cliquer.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3.5 text-sm font-semibold text-white shadow-theme-sm transition hover:bg-brand-600"
                >
                  Découvrir le dashboard
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                  Créer un compte
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/3"
                  >
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</div>
                    <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-x-8 top-6 h-full rounded-4xl bg-brand-500/10 blur-2xl" />

              <div className="relative overflow-hidden rounded-4xl border border-gray-200 bg-white p-5 shadow-theme-xl dark:border-gray-800 dark:bg-gray-900">
                <div className="rounded-3xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-800 dark:bg-gray-950/70">
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-theme-xs dark:bg-gray-900">
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Vue du produit</p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">Dashboard overview</p>
                    </div>
                    <span className="rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-700 dark:bg-success-500/10 dark:text-success-300">
                      +18% ce mois-ci
                    </span>
                  </div>

                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                      <div className="relative aspect-4/3 w-full">
                        <Image
                          src="/images/grid-image/image-01.png"
                          alt="Aperçu du dashboard"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Analytics</p>
                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">Métriques, graphiques et suivi</p>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Parcours utilisateur</p>
                        <div className="mt-3 flex items-end gap-3">
                          <span className="text-3xl font-semibold text-gray-900 dark:text-white">1,248</span>
                          <span className="pb-1 text-sm font-medium text-success-600 dark:text-success-400">+32%</span>
                        </div>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Un point d’entrée clair pour piloter ton produit.</p>
                      </div>

                      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                        <div className="relative aspect-16/10 w-full">
                          <Image
                            src="/images/grid-image/image-04.png"
                            alt="Interface moderne"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {highlights.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-300">
                          ✓
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500 dark:text-brand-300">
              Fonctionnalités
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
              Tout ce qu’il faut pour construire vite, sans sacrifier le style.
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-white/3"
              >
                <div className="mb-4 h-12 w-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
                <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">{feature.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="process" className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-500 dark:text-brand-300">
                Méthode
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
                Une base pensée pour t’aider à passer de l’idée au produit.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                Les pages sont déjà organisées pour que tu puisses te concentrer sur ton métier : ajoute des données, connecte ton backend et lance ton interface.
              </p>

              <div className="mt-8 space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.title}
                    className="rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs dark:border-gray-800 dark:bg-white/3"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="mt-2 leading-7 text-gray-600 dark:text-gray-300">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div id="proof" className="rounded-4xl border border-gray-200 bg-gray-900 p-6 text-white shadow-theme-xl dark:border-gray-800">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-300">Preuves</p>
              <h3 className="mt-3 text-2xl font-semibold">Le genre de base qui rassure dès la première visite.</h3>

              <div className="mt-6 grid gap-4">
                {testimonials.map((item) => (
                  <div key={item.author} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-sm leading-7 text-gray-200">“{item.quote}”</p>
                    <p className="mt-4 text-sm font-semibold text-white">{item.author}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-brand-500/15 p-5">
                <p className="text-sm font-medium text-brand-200">Tu veux aller plus vite ?</p>
                <p className="mt-2 text-sm leading-7 text-gray-200">
                  Commence par la page dashboard, puis remplace progressivement les blocs par tes propres données.
                </p>
                <Link
                  href="/dashboard"
                  className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-900 transition hover:bg-gray-100"
                >
                  Aller au dashboard
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-200 bg-white/80 dark:border-gray-800 dark:bg-gray-950/80">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <Image src="/images/logo/logo.svg" alt="Starter kit dashboard" width={132} height={32} className="dark:hidden" />
              <Image src="/images/logo/logo-dark.svg" alt="Starter kit dashboard" width={132} height={32} className="hidden dark:block" />
            </Link>
            <p className="mt-4 max-w-xl text-sm leading-7 text-gray-600 dark:text-gray-400">
              Une landing page moderne pour présenter ton starter kit et guider l’utilisateur vers le dashboard, la création de compte ou la connexion.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:justify-items-end">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition hover:text-brand-500 dark:text-gray-400 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
