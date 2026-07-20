import PageHeader from "./../components/common/header/PageHeader.jsx";
import HeroImage from "../assets/images/carte.jpeg";

function Home() {
  return (
    <>
      <PageHeader title="Autour du monde" />
      <img src={HeroImage} alt="image principale du site" />
      <p>Bienvenue sur mon premier site !</p>
    </>
  );
}

export default Home;
