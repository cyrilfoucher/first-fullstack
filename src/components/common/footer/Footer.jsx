import logosite from "../../../assets/images/logosite.png";

function Footer() {
  return (
    <footer className="border-t bg-[#DEB887] text-amber-900 py-8">
      <div className="max-w-6xl mx-auto px-8">
        {" "}
        <img src={logosite} alt="logo du site" className="w-20 h-auto rounded-md block mx-auto " />
        <div className="grid grid-cols-3 items-start gap-8 px-8 py-6 mt-10">
          <div className="justify-self-center flex flex-col gap-2 items-center">
            <h2 className="font-semibold">Description</h2>
            <p>Projet Full Stack de voyage.</p>
          </div>
          <div className="justify-self-center flex flex-col gap-2 items-center">
            <h2 className="font-semibold">Contact</h2>
            <a href="mailto:macylcyril@hotmail.fr" className="hover:underline transition-colors">
              M'envoyer un mail
            </a>
            <a href="tel:+33681058680" className="hover:underline transition-colors">
              Me téléphoner
            </a>
          </div>
          <div className="justify-self-center flex flex-col gap-2 items-center">
            <h2 className="font-semibold">Réseaux</h2>
            <a
              href="https://www.linkedin.com/in/cyril-foucher-a06a19236"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/cyrilfoucher"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
      <div className="border-t mt-6 pt-6 text-center text-sm text-amber-700 opacity-80">
        <p>© 2026 Mon premier projet • Réalisé avec React & Tailwind CSS</p>
      </div>
    </footer>
  );
}

export default Footer;
