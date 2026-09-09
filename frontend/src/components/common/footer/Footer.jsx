import logosite from "../../../assets/images/logosite.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t bg-[#DEB887] text-amber-900 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        {" "}
        <img src={logosite} alt="logo du site" className="w-20 h-auto rounded-md block mx-auto " />
        <div className="mt-8 grid grid-cols-1 gap-6 px-4 py-6 sm:px-8 md:grid-cols-3">
          <div className="justify-self-center flex flex-col gap-2 items-center">
            <h2 className="text-lg font-semibold">Description</h2>
            <p>Projet Full Stack de voyage.</p>
            <Link to="/a-propos" className="text-sm sm:text-base hover:underline transition-colors">
              À propos
            </Link>
          </div>
          <div className="justify-self-center flex flex-col gap-2 items-center">
            <h2 className="text-lg font-semibold">Contact</h2>
            <a
              href="mailto:macylcyril@hotmail.fr"
              className="text-sm sm:text-base hover:underline transition-colors"
            >
              M'envoyer un mail
            </a>
            <a
              href="tel:+33681058680"
              className="text-sm sm:text-base hover:underline transition-colors"
            >
              Me téléphoner
            </a>
          </div>
          <div className="justify-self-center flex flex-col gap-2 items-center">
            <h2 className="text-lg font-semibold">Réseaux</h2>
            <a
              href="https://www.linkedin.com/in/cyril-foucher-a06a19236"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base hover:underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cyrilfoucher"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base hover:underline transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t mt-6 pt-6 text-center text-sm text-amber-700 opacity-80">
        <p className="mx-auto max-w-4xl px-4">
          © 2026 Autour du Monde • Projet développé dans le cadre de mon apprentissage du
          développement Full-Stack.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
