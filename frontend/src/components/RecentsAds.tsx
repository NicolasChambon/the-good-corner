import AdCard from "./AdCard";
import { Ad } from "../../../interfaces/entities";
import { useEffect, useState } from "react";
import axios from "axios";

const RecentsAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<Ad[]>([]);

  const fetchAds = async () => {
    const result = await axios.get("http://localhost:3000/ads");
    setAds(result.data);
  };

  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <>
      <h2>Annonces récentes</h2>
      <h3>Total: {total} €</h3>

      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              title={ad.title}
              pictureUrl={ad.pictureUrl}
              price={ad.price}
              link={ad.link}
            />
            <button
              className="button"
              onClick={() => setTotal(total + ad.price)}
            >
              Add price to total
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentsAds;
