import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "FoodExpress - Vos plats préférés livrés en un clic" },
    { name: "description", content: "Commandez en ligne auprès des meilleurs restaurants locaux. Livraison rapide, large choix de menus et promotions exclusives." },
  ];
};

export default function Index() {
  const [device, setDevice] = useState("desktop");

  // Détection du type d'appareil au chargement
  useEffect(() => {
    if (typeof window !== "undefined") {
      setDevice(window.innerWidth <= 768 ? "mobile" : "desktop");
      window.addEventListener("resize", () => {
        setDevice(window.innerWidth <= 768 ? "mobile" : "desktop");
      });
    }
  }, []);

  return (
    <div className="text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-orange-50 to-amber-100 dark:from-orange-900 dark:to-amber-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-bold text-orange-600 dark:text-orange-400 mb-4 text-center">Savourez l&apos;instant, sans attendre</h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-200 mb-8 text-center max-w-3xl mx-auto">Des plats délicieux de vos restaurants préférés, livrés en 30 minutes ou moins</h2>
          
          <div className="flex justify-center mt-8">
            {device === "mobile" ? (
              <Link to="/restaurants" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-center">Commander maintenant</Link>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto">
                <input type="text" placeholder="Entrez votre adresse..." className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 flex-grow shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-800" />
                <Link to="/restaurants" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-center">Trouver des restaurants</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Why Order Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Pourquoi commander chez nous ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Livraison ultra-rapide</h3>
              <p className="text-gray-600 dark:text-gray-300">Vos plats chauds et savoureux livrés en moins de 30 minutes, directement à votre porte.</p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">🍽️</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Choix gourmand</h3>
              <p className="text-gray-600 dark:text-gray-300">Plus de 200 restaurants partenaires pour satisfaire toutes vos envies, des classiques aux découvertes.</p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Offres exclusives</h3>
              <p className="text-gray-600 dark:text-gray-300">Des promotions quotidiennes et un programme de fidélité qui récompense chaque commande.</p>
            </div>
            <div className="bg-orange-50 dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Options pour tous</h3>
              <p className="text-gray-600 dark:text-gray-300">Large sélection de menus végétariens, végans, sans gluten et adaptés à tous les régimes alimentaires.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Restaurants */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Nos restaurants partenaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-5xl mb-4 mx-auto">🍕</div>
              <h3 className="text-xl font-semibold mb-2">Pizzeria Napoli</h3>
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐ (342)</div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;Les meilleures pizzas de la ville, livrées encore fumantes !&quot;</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-5xl mb-4 mx-auto">🍣</div>
              <h3 className="text-xl font-semibold mb-2">Sushi Master</h3>
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐ (187)</div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;Fraîcheur et saveurs authentiques à chaque bouchée.&quot;</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-5xl mb-4 mx-auto">🍔</div>
              <h3 className="text-xl font-semibold mb-2">Burger Gourmet</h3>
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐ (256)</div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;Des burgers juteux qui vous feront saliver d&apos;envie !&quot;</p>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 text-center">
              <div className="text-5xl mb-4 mx-auto">🥗</div>
              <h3 className="text-xl font-semibold mb-2">Green & Fresh</h3>
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐ (129)</div>
              <p className="text-gray-600 dark:text-gray-300 italic">&quot;Des salades créatives et des bowls nutritifs pour se faire plaisir.&quot;</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Comment ça marche ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative p-6 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold rounded-full mb-4">1</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Entrez votre adresse</h3>
              <p className="text-gray-600 dark:text-gray-300">Indiquez où vous souhaitez être livré pour découvrir tous les restaurants disponibles près de chez vous.</p>
            </div>
            <div className="relative p-6 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold rounded-full mb-4">2</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Choisissez vos plats</h3>
              <p className="text-gray-600 dark:text-gray-300">Parcourez les menus, lisez les avis et composez votre festin idéal en quelques clics.</p>
            </div>
            <div className="relative p-6 rounded-xl">
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white text-2xl font-bold rounded-full mb-4">3</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-600 dark:text-orange-400">Savourez</h3>
              <p className="text-gray-600 dark:text-gray-300">Suivez votre commande en temps réel et préparez-vous à déguster des plats délicieux sans bouger de chez vous.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 dark:text-gray-100">Ce que nos clients disent</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">&quot;Commande livrée en 22 minutes chrono ! Les plats étaient encore chauds et délicieux. Service impeccable !&quot;</p>
              <div className="text-gray-800 dark:text-gray-200 font-medium">- Marie L.</div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">&quot;J&apos;adore la variété des restaurants disponibles. Parfait quand toute la famille veut manger différemment.&quot;</p>
              <div className="text-gray-800 dark:text-gray-200 font-medium">- Thomas D.</div>
            </div>
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-amber-400 mb-3">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 dark:text-gray-300 italic mb-4">&quot;Les offres exclusives sont géniales ! J&apos;ai économisé plus de 50€ le mois dernier grâce aux promotions.&quot;</p>
              <div className="text-gray-800 dark:text-gray-200 font-medium">- Sophie M.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-700 dark:to-amber-700 text-white text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-2">Prêt à vous régaler ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Des milliers de plats délicieux vous attendent à quelques clics</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="auth/login" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 text-lg rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-center">Commander maintenant</Link>
            <Link to="/restaurants/popular" className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-orange-500 dark:text-orange-400 font-semibold py-3 px-6 rounded-lg shadow-md border border-orange-200 dark:border-orange-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 text-center">Voir les plats populaires</Link>
          </div>
        </div>
      </section>

      {/* Footer with trust signals */}
      <footer className="py-8 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-center gap-8 text-center">
            <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-xl text-orange-500">🔒</span> Paiement 100% sécurisé
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-xl text-orange-500">⏱️</span> Livraison garantie en 30 min ou remboursée
            </div>
            <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
              <span className="text-xl text-orange-500">💬</span> Support client 7j/7
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
