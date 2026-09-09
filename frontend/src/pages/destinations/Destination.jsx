import { useParams } from "react-router-dom";
import PageHeader from "../../components/common/header/PageHeader.jsx";
import destinations from "../../data/destinations.js";
import axios from "axios";
import { useState, useEffect } from "react";

function Destination() {
  const { nom } = useParams();
  const destination = destinations.find((destination) => destination.slug === nom);
  const [meteo, setMeteo] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function callMeteo() {
      if (!destination) {
        return;
      }
      try {
        setLoading(true);
        setError("");
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${destination.nom}&appid=${apiKey}&units=metric&lang=fr`
        );
        setMeteo(response.data);
      } catch (error) {
        console.error(error);
        setError("Impossible d'afficher la météo");
      } finally {
        setLoading(false);
      }
    }
    callMeteo();
  }, [destination]);
  const ventKmH = meteo ? (meteo.wind.speed * 3.6).toFixed(1) : null;
  if (!destination) {
    return <p>Destination introuvable.</p>;
  }
  return (
    <>
      <PageHeader title={destination.nom} />
      <section className="mx-auto max-w-6xl px-4 py-10">
        <img
          src={destination.image}
          alt={destination.nom}
          className="mx-auto mt-8 h-auto w-full max-w-4xl rounded-2xl shadow-xl"
        />
        <h2 className="text-amber-800 text-3xl text-center py-4">Description</h2>
        <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-amber-800">
          {destination.description}
        </p>
        <h2 className="text-amber-800 text-3xl text-center py-6">Méteo</h2>

        {loading && <p className="text-center text-amber-800">Chargement de la météo...</p>}

        {error && <p className="text-center text-red-500">{error}</p>}

        {meteo && (
          <div className="border border-amber-800 rounded-2xl mx-auto max-w-md text-center text-amber-800 m-6 p-4 ">
            <p>
              <span className="font-semibold">Température :</span> {meteo.main.temp.toFixed(1)} °C
            </p>
            <p>
              <span className="font-semibold">Ressenti :</span> {meteo.main.feels_like.toFixed(1)}{" "}
              °C
            </p>
            <p>
              <span className="font-semibold">Humidité :</span> {meteo.main.humidity} %
            </p>
            <p>
              <span className="font-semibold">Vent :</span> {ventKmH} km/h
            </p>
            <p>
              <span className="font-semibold">Description :</span> {meteo.weather[0].description}
            </p>
          </div>
        )}
      </section>
    </>
  );
}
export default Destination;
