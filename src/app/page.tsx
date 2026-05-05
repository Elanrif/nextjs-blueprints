import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";

export const metadata: Metadata = {
  title: "Next.js Starter Kit Dashboard",
  description: "A modern landing page for your dashboard starter kit.",
};

const stats = [
  { value: "20+", label: "UI Blocks Premium", icon: "🎨" },
  { value: "12", label: "Pages Dashboard & Auth", icon: "📄" },
  { value: "100%", label: "Responsive & Dark Mode", icon: "🌙" },
];

const features = [
  {
    title: "Design System Moderne",
    description:
      "Une interface élégante avec des composants Atomiques et une typographie raffinée.",
    icon: "✨",
    linear: "from-purple-500 to-pink-500",
  },
  {
    title: "Performance Optimisée",
    description:
      "Turbopack, Server Components et optimisation automatique des images.",
    icon: "⚡",
    linear: "from-blue-500 to-cyan-500",
  },
  {
    title: "Accessibilité Native",
    description:
      "ARIA labels, navigation clavier et contraste respectant les normes WCAG.",
    icon: "♿",
    linear: "from-green-500 to-emerald-500",
  },
];

const steps = [
  {
    number: "01",
    title: "Clone & Install",
    description:
      "Clonez le repository et installez les dépendances en 2 minutes chrono.",
    color: "bg-violet-500",
  },
  {
    number: "02",
    title: "Configurez votre thème",
    description:
      "Personnalisez les couleurs, la typographie et le layout via Tailwind config.",
    color: "bg-indigo-500",
  },
  {
    number: "03",
    title: "Déployez en production",
    description: "Push sur GitHub et déployez automatiquement sur Vercel.",
    color: "bg-blue-500",
  },
];

const testimonials = [
  {
    quote:
      "Le meilleur starter kit que j'ai utilisé. La qualité du code et du design est exceptionnelle.",
    author: "Thomas Dupont",
    role: "Lead Developer @ TechCorp",
    avatar: "/images/avatars/avatar-1.jpg",
  },
  {
    quote:
      "Une base solide qui nous a fait gagner des semaines de développement. Hautement recommandé !",
    author: "Sophie Martin",
    role: "Product Manager @ StartupHub",
    avatar: "/images/avatars/avatar-2.jpg",
  },
];

const footerLinks = [
  { label: "Documentation", href: "/docs" },
  { label: "Composants", href: "/components" },
  { label: "Blog", href: "/blog" },
  { label: "Support", href: "/support" },
  { label: "Twitter", href: "/twitter" },
  { label: "GitHub", href: "/github" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header amélioré */}
      <header className="sticky top-0 z-50 border-b border-slate-200/20 bg-white/95 backdrop-blur-xl supports-backdrop-filter:bg-white/80 dark:border-slate-800/30 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="group relative flex items-center gap-2">
            <div className="from-brand-500 to-brand-600 relative h-8 w-8 overflow-hidden rounded-xl bg-linear-to-br">
              <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white">
                S
              </div>
            </div>
            <span className="bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-xl font-bold text-transparent dark:from-white dark:to-slate-300">
              StarterKit
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {["Fonctionnalités", "Méthode", "Témoignages"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:text-brand-600 dark:hover:text-brand-400 group relative text-sm font-medium text-slate-600 transition-colors dark:text-slate-300"
              >
                {item}
                <span className="bg-brand-500 absolute -bottom-1 left-0 h-0.5 w-0 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggleButton />
            <Link
              href="/signin"
              className="hidden rounded-full px-5 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-100 sm:inline-block dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="group from-brand-600 to-brand-500 relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r px-5 py-2 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <span className="relative z-10">Commencer</span>
              <div className="from-brand-500 to-brand-600 absolute inset-0 -translate-x-full bg-linear-to-r transition-transform duration-300 group-hover:translate-x-0"></div>
            </Link>
          </div>
        </div>
      </header>

      <main className="relative">
        {/* Hero Section améliorée */}
        <section className="relative overflow-hidden">
          {/* Background animé */}
          <div className="absolute inset-0 -z-10">
            <div className="from-brand-500/20 absolute top-0 left-1/2 h-125 w-125 -translate-x-1/2 rounded-full bg-linear-to-r to-purple-500/20 blur-3xl" />
            <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute top-1/3 left-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
          </div>

          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div className="flex flex-col justify-center">
                <div className="animate-in fade-in slide-in-from-bottom-4 mb-6 inline-flex w-fit duration-700">
                  <div className="border-brand-200/30 bg-brand-50/80 text-brand-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300 rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
                    🚀 Launch votre projet en 2024
                  </div>
                </div>

                <h1 className="animate-in fade-in slide-in-from-bottom-5 text-5xl font-bold tracking-tight text-slate-900 duration-700 sm:text-6xl lg:text-7xl dark:text-white">
                  Construisez des{" "}
                  <span className="from-brand-600 bg-linear-to-r to-purple-600 bg-clip-text text-transparent">
                    dashboards
                  </span>{" "}
                  modernes
                </h1>

                <p className="animate-in fade-in slide-in-from-bottom-6 mt-6 text-lg leading-relaxed text-slate-600 delay-100 duration-700 dark:text-slate-300">
                  Un starter kit Next.js 14 avec tout ce dont vous avez besoin :
                  composants réutilisables, dark mode intégré, et performances
                  optimales.
                </p>

                <div className="animate-in fade-in slide-in-from-bottom-7 mt-8 flex flex-col gap-4 delay-200 duration-700 sm:flex-row">
                  <Link
                    href="/signup"
                    className="group from-brand-600 to-brand-500 relative inline-flex items-center justify-center overflow-hidden rounded-full bg-linear-to-r px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                  >
                    <span className="relative z-10">Essayer gratuitement</span>
                    <svg
                      className="relative z-10 ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="#features"
                    className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/50 px-8 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur-sm transition-all hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300 dark:hover:bg-slate-800/50"
                  >
                    Voir la démo
                  </Link>
                </div>

                <div className="mt-12 grid gap-6 sm:grid-cols-3">
                  {stats.map((stat, idx) => (
                    <div
                      key={stat.label}
                      className="group animate-in fade-in slide-in-from-bottom-8 rounded-2xl border border-slate-200 bg-white/50 p-5 text-center backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50"
                      style={{ animationDelay: `${idx * 100}ms` }}
                    >
                      <div className="mb-2 text-3xl">{stat.icon}</div>
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        {stat.value}
                      </div>
                      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="animate-in fade-in slide-in-from-right-8 relative duration-1000 lg:block">
                <div className="relative rounded-3xl bg-linear-to-br from-slate-100 to-slate-200 p-2 shadow-2xl dark:from-slate-800 dark:to-slate-900">
                  <div className="overflow-hidden rounded-2xl bg-white dark:bg-slate-900">
                    <Image
                      src="/images/grid-image/image-01.png"
                      alt="Dashboard Preview"
                      width={600}
                      height={400}
                      className="h-auto w-full object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-brand-600 dark:text-brand-400 text-sm font-medium">
                            Aperçu du Dashboard
                          </div>
                          <div className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
                            Analytics Pro
                          </div>
                        </div>
                        <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-500/20 dark:text-green-400">
                          +32% ce mois
                        </div>
                      </div>
                      <div className="mt-4 h-2 w-full rounded-full bg-slate-100 dark:bg-slate-700">
                        <div className="from-brand-500 to-brand-600 h-2 w-3/4 rounded-full bg-linear-to-r"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Badge flottant */}
                <div className="absolute -bottom-4 -left-4 rounded-xl bg-white px-4 py-2 shadow-lg dark:bg-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      2,847 utilisateurs actifs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section améliorée */}
        <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <div className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
              Pourquoi nous choisir ?
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Des fonctionnalités qui
              <span className="from-brand-600 block bg-linear-to-r to-purple-600 bg-clip-text text-transparent">
                accélèrent votre développement
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Tout ce dont vous avez besoin pour créer des applications
              professionnelles en un temps record.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <div
                key={feature.title}
                className="group animate-in fade-in slide-in-from-bottom-5 relative rounded-2xl border border-slate-200 bg-white/50 p-8 backdrop-blur-sm transition-all duration-700 hover:scale-105 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br opacity-0 transition-opacity group-hover:opacity-5" />
                <div
                  className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-r ${feature.linear}`}
                >
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 leading-relaxed text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Méthode Section */}
        <section
          id="method"
          className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8"
        >
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-300 mb-4 inline-block rounded-full px-4 py-1.5 text-sm font-medium">
                Comment ça marche ?
              </div>
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                Trois étapes pour
                <span className="text-brand-600 block">
                  lancer votre projet
                </span>
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                Une méthode simple et efficace pour passer de l&apos;idée à la
                production.
              </p>

              <div className="mt-8 space-y-6">
                {steps.map((step, idx) => (
                  <div
                    key={idx}
                    className="group flex items-start gap-6 rounded-2xl border border-slate-200 bg-white/50 p-6 transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50"
                  >
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${step.color} text-2xl font-bold text-white`}
                    >
                      {step.number}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mt-2 text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="from-brand-600 rounded-3xl bg-linear-to-br to-purple-600 p-6 text-white shadow-2xl">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="text-sm opacity-80">
                    terminal@starterkit
                  </span>
                </div>
                <div className="space-y-2 font-mono text-sm">
                  <p>$ git clone https://github.com/starterkit/dashboard</p>
                  <p>$ cd dashboard && npm install</p>
                  <p>$ npm run dev</p>
                  <p className="animate-pulse text-green-400">
                    ✓ Application démarrée sur http://localhost:3000
                  </p>
                </div>
              </div>

              {testimonials.map((testimonial, idx) => (
                <div
                  key={idx}
                  className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex items-start gap-4">
                    <div className="from-brand-500 h-12 w-12 overflow-hidden rounded-full bg-linear-to-br to-purple-500">
                      {/* Avatar placeholder */}
                    </div>
                    <div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {testimonial.author}
                      </div>
                      <div className="text-brand-600 dark:text-brand-400 text-sm">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-slate-600 dark:text-slate-400">
                    {testimonial.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer amélioré */}
      <footer className="border-t border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="from-brand-500 to-brand-600 h-8 w-8 rounded-xl bg-linear-to-br"></div>
                <span className="text-lg font-bold text-slate-900 dark:text-white">
                  StarterKit
                </span>
              </Link>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
                Le starter kit moderne pour vos applications Next.js.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Produit
              </h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-brand-600 dark:hover:text-brand-400 text-sm text-slate-600 transition-colors dark:text-slate-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Ressources
              </h4>
              <ul className="mt-4 space-y-2">
                {footerLinks.slice(3, 6).map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="hover:text-brand-600 dark:hover:text-brand-400 text-sm text-slate-600 transition-colors dark:text-slate-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white">
                Légal
              </h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-brand-600 dark:hover:text-brand-400 text-sm text-slate-600 transition-colors dark:text-slate-400"
                  >
                    Confidentialité
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-brand-600 dark:hover:text-brand-400 text-sm text-slate-600 transition-colors dark:text-slate-400"
                  >
                    Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 border-t border-slate-200 pt-8 text-center text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
            <p>© 2024 StarterKit. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
