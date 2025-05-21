import { json } from '@remix-run/node';
import type { LoaderFunction, MetaFunction } from '@remix-run/node';
import { Form, Link } from '@remix-run/react';
import { useState } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Connexion | StackFood' },
    { name: 'description', content: 'Connectez-vous à votre compte StackFood pour gérer votre application et site web facilement' }
  ];
};

export const loader: LoaderFunction = async () => {
  // Ici, vous pouvez ajouter la logique pour vérifier si l'utilisateur est déjà connecté
  return json({
    message: 'Page de connexion'
  });
};

export default function Login() {
  const [email, setEmail] = useState('admin@admin.com');
  const [password, setPassword] = useState('12345678');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Partie gauche avec image de fond et overlay orange */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url(/images/food-background.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-orange-500 bg-opacity-80 flex flex-col justify-center px-12 z-10">
          <h1 className="text-4xl font-bold text-white mb-4">BIENVENUE SUR<br />STACKFOOD</h1>
          <p className="text-white text-xl">Gérez votre application & site web facilement</p>
        </div>
      </div>

      {/* Partie droite avec formulaire de connexion */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img 
              src="/images/stackfood-logo.png" 
              alt="StackFood Logo" 
              className="h-12 mx-auto mb-6" 
            />
            <h2 className="text-2xl font-semibold text-gray-700">Connexion à votre panneau</h2>
          </div>

          <Form method="post" className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Votre Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200"
              >
                Se connecter
              </button>
            </div>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous n&apos;avez pas de compte ?{' '}
              <Link to="/auth/register" className="text-orange-600 hover:text-orange-700 font-medium">
                S&apos;inscrire
              </Link>
            </p>
          </div>
          <div className="mt-6 text-center">
            <Link to="/auth/forgot-password" className="text-sm text-orange-600 hover:text-orange-700">
              Mot de passe oublié ?
            </Link>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-md">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-orange-100 p-2 rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-700">Email : <span className="font-medium">admin@admin.com</span></p>
                <p className="text-sm text-gray-700">Mot de passe : <span className="font-medium">12345678</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}