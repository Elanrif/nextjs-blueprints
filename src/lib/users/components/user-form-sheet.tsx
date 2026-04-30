export function UserFormSheet() {
  return (
    <div className="shadow-theme-xs dark:bg-white/3 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        User Form Sheet
      </h1>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
        Ici, tu peux afficher un formulaire pour créer ou éditer un utilisateur,
        avec des champs pour le nom, l&apos;email et d&apos;autres informations
        pertinentes.
      </p>
      <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
        Cette vue servira de base pour connecter tes données plus tard et
        transformer ce simple bloc en vrai formulaire fonctionnel.
      </p>
    </div>
  );
}
