import { useGetAllAdsQuery } from "../generated/graphql-types";
import AdCard from "./AdCard";
import { useState } from "react";

const RecentsAds = () => {
  // const [searchParams] = useSearchParams();
  // const categoryId = searchParams.get("category");

  const [total, setTotal] = useState(0);
  // const [ads, setAds] = useState<Ad[]>([]);

  // const fetchAds = async () => {
  //   try {
  //     const result = await axios.get(
  //       `${import.meta.env.VITE_API_URL}/ads?category=${categoryId}`
  //     );
  //     setAds(result.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchAds();
  // }, [categoryId]);

  const { data, loading, error } = useGetAllAdsQuery();

  if (loading) return <p>Ça charge !</p>;
  if (error) return <p>Oups ! On a tout cassé</p>;
  return (
    <>
      <h2>Annonces récentes</h2>
      <h3>Total: {total} €</h3>

      <section className="recent-ads">
        {data?.getAllAds.map((ad) => (
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
