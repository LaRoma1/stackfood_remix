import { json, redirect } from '@remix-run/node';
import type { ActionFunction, LoaderFunction, MetaFunction } from '@remix-run/node';
import { Form, Link, useActionData, useNavigation } from '@remix-run/react';
import { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { z } from 'zod';
import { createUser, getUserByEmail } from '~/models/user.server';

export const meta: MetaFunction = () => {
  return [
    { title: 'Inscription | StackFood' },
    { name: 'description', content: 'Inscrivez-vous sur StackFood pour gérer votre application et site web facilement' }
  ];
};

// Schéma de validation Zod pour le formulaire d'inscription
const registerSchema = z.object({
  name: z.string().min(2, { message: "Le nom doit contenir au moins 2 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" }),
  confirmPassword: z.string(),
  terms: z.literal("on", { message: "Vous devez accepter les conditions d'utilisation" })
}).refine(data => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"]
});

type RegisterForm = z.infer<typeof registerSchema>;

export const loader: LoaderFunction = async () => {
  // Ici, vous pouvez ajouter la logique pour vérifier si l'utilisateur est déjà connecté
  return json({
    message: 'Page d&apos;inscription'
  });
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const formValues = Object.fromEntries(formData);
  
  // Validation avec Zod
  const result = registerSchema.safeParse(formValues);
  
  if (!result.success) {
    return json({ errors: result.error.format() }, { status: 400 });
  }
  
  const { name, email, password, phone } = result.data;
  
  // Vérifier si l'email existe déjà
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json({ 
      errors: { 
        email: { _errors: ["Cette adresse email est déjà utilisée"] } 
      } 
    }, { status: 400 });
  }
  
  // Extraire le prénom et le nom
  const nameParts = name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';
  
  // Créer l'utilisateur
  await createUser(email, password, firstName, lastName);
  
  // Rediriger vers la page de connexion
  return redirect("/auth/login");
};

export default function Register() {
  const actionData = useActionData<{ errors?: z.ZodFormattedError<RegisterForm> }>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Partie gauche avec image de fond et overlay orange */}
      <div className="hidden md:flex md:w-1/2 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center" 
          style={{ backgroundImage: 'url(/images/food-background.jpg)' }}
        ></div>
        <div className="absolute inset-0 bg-orange-500 bg-opacity-80 flex flex-col justify-center px-12 z-10">
          <h1 className="text-4xl font-bold text-white mb-4">REJOIGNEZ<br />STACKFOOD</h1>
          <p className="text-white text-xl">Créez votre compte pour gérer votre application & site web</p>
        </div>
      </div>

      {/* Partie droite avec formulaire d'inscription */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-8 bg-white dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <img 
              src="/images/stackfood-logo.png" 
              alt="StackFood Logo" 
              className="h-12 mx-auto mb-6" 
            />
            <h2 className="text-2xl font-semibold text-gray-700">Créer un compte</h2>
          </div>

          <Form method="post" className="space-y-6" noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Votre Nom</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className={`w-full px-4 py-3 border ${actionData?.errors?.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  placeholder="Votre nom complet"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={Boolean(actionData?.errors?.name)}
                />
                {actionData?.errors?.name && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.name._errors.join(', ')}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Votre Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`w-full px-4 py-3 border ${actionData?.errors?.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                  placeholder="Votre adresse email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={Boolean(actionData?.errors?.email)}
                />
                {actionData?.errors?.email && (
                  <p className="mt-1 text-sm text-red-600">{actionData.errors.email._errors.join(', ')}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Votre numéro de téléphone</label>
                <div className="relative w-full">
                  <PhoneInput
                    international
                    defaultCountry="CM"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(value) => setPhone(value || '')}
                    required
                    className={`w-full px-4 py-3 border ${actionData?.errors?.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="Votre numéro de téléphone"
                  />
                  {actionData?.errors?.phone && (
                    <p className="mt-1 text-sm text-red-600">{actionData.errors.phone._errors.join(', ')}</p>
                  )}
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-3 border ${actionData?.errors?.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="Créez un mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-invalid={Boolean(actionData?.errors?.password)}
                  />
                  {actionData?.errors?.password && (
                    <p className="mt-1 text-sm text-red-600">{actionData.errors.password._errors.join(', ')}</p>
                  )}
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
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete="new-password"
                    required
                    className={`w-full px-4 py-3 border ${actionData?.errors?.confirmPassword ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500`}
                    placeholder="Confirmez votre mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    aria-invalid={Boolean(actionData?.errors?.confirmPassword)}
                  />
                  {actionData?.errors?.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{actionData.errors.confirmPassword._errors.join(', ')}</p>
                  )}
                  <button 
                    type="button" 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
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
                id="terms"
                name="terms"
                type="checkbox"
                required
                className={`h-4 w-4 text-orange-600 focus:ring-orange-500 ${actionData?.errors?.terms ? 'border-red-500' : 'border-gray-300'} rounded`}
              />
              {actionData?.errors?.terms && (
                <p className="mt-1 text-sm text-red-600">{actionData.errors.terms._errors.join(', ')}</p>
              )}
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
              </button>
            </div>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Vous avez déjà un compte ?{' '}
              <Link to="/auth/login" className="text-orange-600 hover:text-orange-700 font-medium">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}