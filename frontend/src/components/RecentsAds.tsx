import AdCard from "./AdCard";
import { Ad } from "../../interfaces/entities";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router";

const RecentsAds = () => {
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category");

  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<Ad[]>([]);

  const fetchAds = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/ads?category=${categoryId}`
      );
      setAds(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, [categoryId]);

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
              link={`${import.meta.env.VITE_FRONT_URL}/ad/${ad.id}`}
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
