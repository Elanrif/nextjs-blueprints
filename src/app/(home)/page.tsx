"use client";

import Link from "next/link";
import {
  ArrowRight,
  Zap,
  Package,
  Code2,
  Palette,
  Cpu,
  GitBranch,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";

export default function HomePage() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(
      "npm install @tanstack/react-query react-hook-form zod axios",
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: Code2,
      title: "TypeScript First",
      description: "Tout est typé. Zod pour la validation client et serveur.",
    },
    {
      icon: Zap,
      title: "Performance",
      description:
        "React Query avec cache intelligent et stratégies optimisées.",
    },
    {
      icon: Palette,
      title: "Design System",
      description: "Componentes réutilisables avec TailwindCSS et Radix UI.",
    },
    {
      icon: Package,
      title: "Pattern Entity",
      description: "Appliquez le même pattern pour chaque entité métier.",
    },
    {
      icon: Cpu,
      title: "Architecture Clean",
      description:
        "Services centralisés, mutations cohérentes, logique métier isolée.",
    },
    {
      icon: GitBranch,
      title: "Production Ready",
      description:
        "Authentification, interceptors, gestion d'erreurs intégrées.",
    },
  ];

  const techs = [
    { name: "React", logo: "⚛️" },
    { name: "Next.js", logo: "▲" },
    { name: "TypeScript", logo: "🔷" },
    { name: "TailwindCSS", logo: "🎨" },
    { name: "React Query", logo: "🔄" },
    { name: "Zod", logo: "✓" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span>
              v1.0 • Production Ready
            </div>

            {/* Title */}
            <h1 className="mb-6 text-5xl md:text-7xl font-black tracking-tight">
              Build your next app with
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                our Design System
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mb-10 max-w-3xl mx-auto text-xl text-gray-600">
              Un template Next.js complet et modulaire. Entièrement typé avec
              TypeScript, performant avec React Query, et prêt pour la
              production. Créez des entités en minutes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
              <button
                onClick={copyToClipboard}
                className="group flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50"
              >
                <span className="font-mono text-sm">
                  npm install -g design-system
                </span>
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
              <Link
                href="/docs/getting-started"
                className="group flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
              >
                Documentation
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-12 pt-8 border-t border-gray-200 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-sm text-gray-600">Composants</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">100%</div>
                <div className="text-sm text-gray-600">TypeScript</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-600">10 min</div>
                <div className="text-sm text-gray-600">Setup</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Code Section */}
      <section className="border-b border-gray-200 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="text-sm font-semibold text-blue-600 mb-4">
                PATTERN ARCHITECTURE
              </div>
              <h2 className="text-4xl font-black mb-4">
                Créez des entités en
                <span className="block text-blue-600">quelques minutes</span>
              </h2>
              <p className="text-gray-600 mb-8">
                Utilisez le pattern {"entity"} pour chaque module. Types, schémas,
                services, hooks, mutations — tout est prêt. Dupliquez, adaptez,
                c'est fait.
              </p>
              <Link
                href="/docs/entity-guide"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                Voir le guide détaillé
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Right - Code */}
            <div className="bg-gray-900 rounded-lg p-6 overflow-hidden">
              <pre className="text-sm text-gray-300 font-mono">
                <code>{`// 1. Types
export interface User {
  id: number
  name: string
  email: string
}

// 2. Schema Zod
export const UserSchema = z.object({
  name: z.string(),
  email: z.string().email()
})

// 3. Service
class UserService {
  async list() { /* ... */ }
  async create(data) { /* ... */ }
}

// 4. Hook React Query
export const useUserList = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.list()
  })
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-gray-200 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">
              Tout ce qu'il faut
            </h2>
            <p className="text-xl text-gray-600">
              Pour construire des applications modernes et performantes
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 p-8 transition-all hover:border-gray-300 hover:shadow-lg hover:bg-gray-50"
                >
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-blue-100 text-blue-600">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="border-b border-gray-200 bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Stack Technologique</h2>
            <p className="text-lg text-gray-600">
              Les meilleures librairies modernes
            </p>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {techs.map((tech) => (
              <div
                key={tech.name}
                className="rounded-lg border border-gray-200 bg-white p-6 text-center transition-all hover:border-blue-300 hover:shadow-md"
              >
                <div className="text-4xl mb-2">{tech.logo}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {tech.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation Links */}
      <section className="border-b border-gray-200 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Documentation</h2>
            <p className="text-lg text-gray-600">
              Guides complets pour bien démarrer
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                title: "Démarrage Rapide",
                description: "Installation et configuration en 4 étapes",
                href: "/docs/getting-started",
              },
              {
                title: "Structure du Projet",
                description: "Explorez l'organisation complète du template",
                href: "/docs/template-structure",
              },
              {
                title: "Guide des Entités",
                description:
                  "Créez une entité complète avec le pattern {entity}",
                href: "/docs/entity-guide",
              },
              {
                title: "Architecture & Patterns",
                description: "Maîtrisez les patterns et best practices",
                href: "/docs/architecture",
              },
            ].map((doc, idx) => (
              <Link
                key={idx}
                href={doc.href}
                className="group rounded-lg border border-gray-200 p-8 transition-all hover:border-blue-300 hover:shadow-lg hover:bg-blue-50"
              >
                <h3 className="mb-2 text-lg font-bold group-hover:text-blue-600 transition-colors">
                  {doc.title}
                </h3>
                <p className="text-gray-600 mb-4">{doc.description}</p>
                <div className="inline-flex items-center gap-2 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  Lire
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Prêt à <span className="text-blue-600">démarrer</span> ?
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Suivez le guide de démarrage rapide et créez votre première entité
            en moins de 10 minutes.
          </p>
          <Link
            href="/docs/getting-started"
            className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-10 py-4 font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg"
          >
            Commencer Maintenant
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
            <p>© 2026 Design System Template. All rights reserved</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                href="/docs"
                className="hover:text-gray-900 transition-colors"
              >
                Documentation
              </Link>
              <a
                href="https://github.com"
                className="hover:text-gray-900 transition-colors"
              >
                GitHub
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-gray-900 transition-colors"
              >
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
