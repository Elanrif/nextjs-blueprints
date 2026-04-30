export function Listing() {
  return (
    <div className="shadow-theme-xs dark:bg-white/3 space-y-3 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        User Listing
      </h1>
      <p className="text-sm leading-7 text-gray-600 dark:text-gray-300">
        Ici, tu peux afficher la liste de tous les utilisateurs disponibles,
        avec leurs noms, leurs emails et éventuellement des actions rapides pour
        les consulter ou les modifier.
      </p>
      <p className="text-sm leading-7 text-gray-500 dark:text-gray-400">
        Cette vue servira de base pour connecter tes données plus tard et
        transformer ce simple bloc en vraie liste fonctionnelle.
      </p>
    </div>
  );
}
