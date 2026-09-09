import { Link } from "react-router-dom";
import PageHeader from "../components/common/header/PageHeader.jsx";
import HeroImage from "../assets/images/carte.jpeg";
import DestinationCard from "../components/common/home/DestinationCard.jsx";
import destinations from "../data/destinations.js";

function Home() {
  return (
    <>
      <PageHeader title="Autour du monde" />
      <section className="mx-auto flex max-w-7xl flex-col items-center gap-10 px-6 py-10 lg:flex-row">
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl font-bold text-amber-800 lg:text-6xl">Explorez le monde</h1>
          <p className="mt-6 text-lg text-amber-800 italic">
            Découvrez des guides numériques conçus pour préparer vos voyages, explorer de nouvelles
            destinations et organiser vos prochaines aventures.
          </p>
          <Link
            to="/boutique"
            className="mt-8 inline-block rounded-lg bg-amber-800 px-8 py-4 text-lg font-semibold text-white transition hover:bg-amber-700"
          >
            Découvrir la boutique
          </Link>
        </div>
        <div className="flex-1">
          <img src={HeroImage} alt="Carte du monde" className="w-full rounded-2xl shadow-xl" />
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold text-amber-800">Nos destinations</h2>
        <div className="grid grid-cols-2 justify-items-center gap-6 lg:grid-cols-3 xl:grid-cols-5">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.slug}
              image={destination.image}
              nom={destination.nom}
              lien={destination.lien}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
