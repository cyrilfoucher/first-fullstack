import PageHeader from "../components/common/header/PageHeader.jsx";

function APropos() {
  return (
    <>
      <PageHeader title="À propos" />

      <section className="mx-auto max-w-5xl px-4 py-10 pb-16">
        <h2 className="mt-10 text-center text-3xl font-bold text-amber-800">Le projet</h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Autour du Monde est une application Full-Stack développée comme premier projet de mon
          portfolio.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Elle m'a permis de concevoir une application complète, de la création de l'interface
          utilisateur au développement du backend, en passant par la gestion d'une base de données,
          l'authentification des utilisateurs, les paiements en ligne et l'intégration d'API
          externes.
        </p>

        <h2 className="mt-16 text-center text-3xl font-bold text-amber-800">Objectif</h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          L'objectif de ce projet était de concevoir une application Full-Stack complète afin de
          mettre en pratique les compétences acquises en développement web.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Il m'a permis d'approfondir React, Node.js, Express et MongoDB tout en découvrant
          l'intégration de services externes comme Stripe, Cloudinary et OpenWeather.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          J'ai également travaillé sur la création d'une interface responsive, la sécurisation des
          routes avec JWT, la gestion des appels API et l'organisation d'un projet structuré.
        </p>

        <h2 className="mt-16 mb-8 text-center text-3xl font-bold text-amber-800">Technologies</h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Ce projet m'a permis de découvrir et de mettre en pratique plusieurs technologies
          utilisées dans le développement Full-Stack.
        </p>

        <div className="mx-auto mt-10 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-amber-800 p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold text-amber-800">Frontend</h3>

            <ul className="list-disc space-y-2 pl-5 text-amber-800">
              <li>React</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
              <li>React Router</li>
              <li>Axios</li>
              <li>React Hook Form</li>
              <li>Zod</li>
              <li>React Toastify</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-800 p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold text-amber-800">Backend</h3>

            <ul className="list-disc space-y-2 pl-5 text-amber-800">
              <li>Node.js</li>
              <li>Express</li>
              <li>MongoDB</li>
              <li>Mongoose</li>
              <li>JSON Web Token (JWT)</li>
              <li>bcrypt</li>
              <li>Multer</li>
              <li>Cloudinary</li>
              <li>Stripe</li>
              <li>Nodemailer</li>
              <li>dotenv</li>
              <li>CORS</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-amber-800 p-6 text-center shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
            <h3 className="mb-4 text-2xl font-semibold text-amber-800">API externe</h3>

            <p className="font-medium text-amber-800">OpenWeather API</p>
            <p className="mt-2 text-sm text-amber-700">Données météorologiques en temps réel.</p>
          </div>
        </div>

        <h2 className="mt-16 mb-8 text-center text-3xl font-bold text-amber-800">
          Fonctionnalités
        </h2>

        <div className="mx-auto mt-6 max-w-4xl rounded-2xl border border-amber-800 p-6 shadow-md">
          <ul className="list-disc space-y-4 pl-6 text-amber-800">
            <li>Inscription, connexion et authentification des utilisateurs.</li>
            <li>Gestion des rôles utilisateur et administrateur.</li>
            <li>Protection des routes côté frontend et backend.</li>
            <li>Espace personnel utilisateur.</li>
            <li>Catalogue de guides de voyage.</li>
            <li>Recherche, tri et pagination des produits.</li>
            <li>Ajout, modification et suppression des produits (CRUD administrateur).</li>
            <li>Upload et gestion des images avec Cloudinary.</li>
            <li>Gestion du panier (ajout, suppression et modification des quantités).</li>
            <li>Paiement sécurisé avec Stripe.</li>
            <li>Historique des commandes utilisateur.</li>
            <li>Gestion des commandes côté administrateur.</li>
            <li>Consultation des destinations avec météo en temps réel.</li>
            <li>Interface responsive adaptée aux mobiles, tablettes et ordinateurs.</li>
            <li>Validation des formulaires avec React Hook Form et Zod.</li>
            <li>Notifications utilisateur avec React Toastify.</li>
          </ul>
        </div>

        <h2 className="mt-16 mb-8 text-center text-3xl font-bold text-amber-800">
          Perspectives d'évolution
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Ce projet constitue une première étape de mon parcours en développement Full-Stack.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          La suite de mon apprentissage portera notamment sur TypeScript, PostgreSQL et Docker afin
          d'élargir mes compétences et d'approfondir mes connaissances des technologies utilisées
          dans le développement Full-Stack.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Je souhaite également réaliser de nouveaux projets selon deux approches complémentaires :
          développer certaines fonctionnalités de manière autonome et utiliser des assistants IA
          comme partenaires de développement lorsque ces outils apportent une réelle valeur au
          développement.
        </p>

        <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-8 text-amber-800">
          Mon objectif est de comprendre les choix techniques, de conserver la maîtrise du code
          produit et d'être capable d'adapter ma méthode de travail selon les besoins du projet.
        </p>
      </section>
    </>
  );
}

export default APropos;
