# Autour du Monde 🌍

**Autour du Monde** est mon premier projet full stack. C'est une application web autour du voyage qui permet de découvrir des destinations et d'acheter des guides de voyage.

J'ai réalisé ce projet pour apprendre à construire une application complète : une interface React, une API Express, une base de données MongoDB, une authentification, un parcours de paiement, des tests, Docker et une chaîne CI/CD.

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
├── .github/workflows/ci.yml  # Tests, vérifications et déploiement Render
├── backend/                  # API Express, modèles et tests
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env.example
├── frontend/                 # Application React
│   ├── Dockerfile
│   ├── .dockerignore
│   └── .env.example
├── docker-compose.yml
└── README.md
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

Des fichiers `.env.example` indiquent les variables nécessaires. Crée un fichier `.env` dans chacun des dossiers concernés à partir de ces exemples. Ne publie jamais ces fichiers ni tes clés API.

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
| `backend` | `npm test` | Lance les tests Vitest avec Supertest. |

## Lancer le projet avec Docker

À la racine du projet, après avoir créé les fichiers `.env` du backend et du frontend :

```bash
docker compose up --build
```

Le frontend est disponible sur `http://localhost:5173` et l'API sur `http://localhost:5001`. Docker Compose utilise les fichiers `.env` des deux dossiers et MongoDB reste hébergé sur MongoDB Atlas. Pour arrêter les conteneurs :

```bash
docker compose down
```

## Tests et intégration continue

Le workflow GitHub Actions `.github/workflows/ci.yml` s'exécute à chaque push et pull request. Il lance les tests backend (Vitest et Supertest), vérifie le frontend avec ESLint et construit le frontend.

Après la réussite de ces étapes, le workflow déclenche le déploiement du backend et du frontend sur Render. Les hooks de déploiement Render sont stockés dans les secrets GitHub `RENDER_BACKEND_DEPLOY_HOOK` et `RENDER_FRONTEND_DEPLOY_HOOK`. Le workflow utilise également le secret `STRIPE_SECRET_KEY` pour les tests backend, le secret `VITE_OPENWEATHER_API_KEY` et la variable `VITE_API_URL` pour le build frontend. Configure ces valeurs dans les paramètres **Secrets and variables** du dépôt GitHub ; ne les ajoute pas au dépôt.

## Déploiement

L'application est déployée sur [Render](https://autour-du-monde.onrender.com/). Les déploiements du backend et du frontend sont déclenchés automatiquement par GitHub Actions après réussite des vérifications CI.

## Et ensuite ?

Ce projet représente une première application full stack terminée. Pour la suite, je continue mon apprentissage avec TypeScript et je prévois de l'utiliser dès le départ sur mon prochain projet.

## Auteur

**Cyril Foucher**

- [GitHub](https://github.com/cyrilfoucher)
- [LinkedIn](https://www.linkedin.com/in/cyril-foucher-a06a19236)
