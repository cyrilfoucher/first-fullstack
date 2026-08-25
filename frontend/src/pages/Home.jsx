import PageHeader from "../components/common/header/PageHeader.jsx";
import HeroImage from "../assets/images/carte.jpeg";

function Home() {
  return (
    <>
      <PageHeader title="Autour du monde" />

      <p className="mx-auto mt-8 max-w-2xl px-4 text-center text-base sm:text-lg text-amber-800 pb-8">
        Explorez le monde, trouvez l'inspiration et préparez votre prochain voyage.
      </p>
      <img
        src={HeroImage}
        alt="image principale du site"
        className="mx-auto w-full max-w-5xl rounded-xl shadow-lg h-auto mb-6 sm:mb-10"
      />
    </>
  );
}

export default Home;
