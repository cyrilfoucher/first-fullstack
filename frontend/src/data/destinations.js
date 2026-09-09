import Londres from "../assets/images/towerbridge.jpeg";
import Rome from "../assets/images/coliséeretouche.png";
import NewYork from "../assets/images/liberty.jpeg";
import Louxor from "../assets/images/louxor.jpg";
import Chicago from "../assets/images/thebean.png";

const destinations = [
  {
    nom: "Chicago",
    slug: "chicago",
    image: Chicago,
    description:
      "Chicago, ville emblématique de l'architecture, est située au bord du lac Michigan. Traversée par la Chicago River, son centre est bordé de gratte-ciel impressionnants.",
    lien: "/destinations/chicago",
  },
  {
    nom: "Londres",
    slug: "londres",
    image: Londres,
    description:
      "Ville de la royauté, Londres est la capitale et la plus grande ville du Royaume-Uni. Elle se distingue par son mélange d'architecture historique et moderne.",
    lien: "/destinations/londres",
  },
  {
    nom: "New York",
    slug: "newyork",
    image: NewYork,
    description:
      "Surnommée « The Big Apple » ou « la ville qui ne dort jamais », New York vous plonge dans des décors de cinéma. Découvrez Central Park, Times Square et le Financial District.",
    lien: "/destinations/newyork",
  },
  {
    nom: "Rome",
    slug: "rome",
    image: Rome,
    description:
      "La Ville éternelle, riche d'histoire et de gastronomie, vous invite à remonter le temps en admirant le Colisée.",
    lien: "/destinations/rome",
  },
  {
    nom: "Louxor",
    slug: "louxor",
    image: Louxor,
    description:
      "Face au désert, Louxor, la cité des rois, fascine par la grandeur de ses temples et la richesse de son histoire.",
    lien: "/destinations/louxor",
  },
];
export default destinations;
