import { Link } from "react-router-dom";

function DestinationCard({ image, nom, lien }) {
  return (
    <Link to={lien} className="group w-full max-w-64">
      <div className="relative aspect-4/5 overflow-hidden rounded-full shadow-lg transition duration-300 group-hover:shadow-2xl">
        <img
          src={image}
          alt={nom}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition duration-500 group-hover:opacity-100">
          <p className="text-center text-2xl font-bold text-white">{nom}</p>
        </div>
      </div>
    </Link>
  );
}

export default DestinationCard;
