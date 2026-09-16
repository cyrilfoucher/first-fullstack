# Autour du Monde 🌍

**Autour du Monde** est mon premier projet full stack. C'est une application web autour du voyage qui permet de découvrir des destinations et d'acheter des guides de voyage.

J'ai réalisé ce projet pour apprendre à construire une application complète : une interface React, une API Express, une base de données MongoDB, une authentification et un parcours de paiement.

## Démo

Le projet est disponible en ligne : [voir Autour du Monde](https://autour-du-monde.onrender.com/).

## Ce que l'on peut faire

- Parcourir des destinations et consulter leur météo
- Découvrir une boutique de guides de voyage
- Rechercher, trier et parcourir les produits par pages
- Créer un compte et se connecter
- Modifier ses informations personnelles
- Ajouter ou retirer des produits du panier
- Payer une commande avec Stripe
- Consulter ses commandes et leur statut
- Annuler une commande en attente de traitement et obtenir un remboursement
- Recevoir des e-mails de confirmation et de suivi de commande

Un espace administrateur permet également de gérer les produits et les commandes.

## Technologies utilisées

- **Frontend :** React, Vite, React Router, Tailwind CSS
- **Backend :** Node.js, Express
- **Base de données :** MongoDB et Mongoose
- **Authentification :** JWT et bcrypt
- **Formulaires et validation :** React Hook Form et Zod
- **Paiement :** Stripe Checkout
- **Images :** Cloudinary et Multer
- **E-mails :** Brevo
- **Météo :** OpenWeather

## Structure du projet


first-fullstack/
```
├── frontend/    # Application React
└── backend/     # API Express et modèles MongoDB
```

Le frontend communique avec l'API via Axios. Le backend gère l'authentification, les produits, les commandes, les paiements et les e-mails.

## Installation

```bash
git clone https://github.com/cyrilfoucher/first-fullstack.git
cd first-fullstack
```

Installe les dépendances dans les deux dossiers :

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Variables d'environnement

Crée un fichier `.env` dans chacun des dossiers concernés. Ne publie jamais ces fichiers ni tes clés API.

### `backend/.env`

```env
PORT=5001
MONGO_URI=mongodb+srv://<utilisateur>:<mot-de-passe>@<cluster>/<base-de-donnees>
JWT_SECRET=une-cle-longue-et-aleatoire
FRONTEND_URL=http://localhost:5173

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret

BREVO_API_KEY=xsmtpsib-...
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:5001/api
VITE_OPENWEATHER_API_KEY=votre-cle-openweather
```

## Lancer le projet en local

Dans un premier terminal :

```bash
cd backend
npm run dev
```

Dans un second terminal :

```bash
cd frontend
npm run dev
```

Le backend démarre par défaut sur `http://localhost:5001` et le frontend est généralement disponible sur `http://localhost:5173`.

## Scripts

| Dossier | Commande | Rôle |
| --- | --- | --- |
| `backend` | `npm run dev` | Lance l'API avec Nodemon. |
| `backend` | `npm start` | Lance l'API avec Node.js. |
| `frontend` | `npm run dev` | Lance le frontend en développement. |
| `frontend` | `npm run build` | Génère le build de production. |
| `frontend` | `npm run lint` | Vérifie le code avec ESLint. |

## Déploiement

L'application est déployée sur [Render](https://autour-du-monde.onrender.com/).

## Et ensuite ?

Ce projet représente une première application full stack terminée. Pour la suite, je continue mon apprentissage avec TypeScript et je prévois de l'utiliser dès le départ sur mon prochain projet.

## Auteur

**Cyril Foucher**

- [GitHub](https://github.com/cyrilfoucher)
- [LinkedIn](https://www.linkedin.com/in/cyril-foucher-a06a19236)
