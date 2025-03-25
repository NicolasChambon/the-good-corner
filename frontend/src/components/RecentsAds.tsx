import AdCard from "./AdCard";
import { Ad } from "../../../interfaces/entities";

const ads: Ad[] = [
  {
    id: 1,
    title: "Dame-jeanne",
    imgUrl: "/images/dame-jeanne.webp",
    price: 75,
    link: "/ads/dame-jeanne",
  },
  {
    id: 2,
    title: "Vide-poche",
    imgUrl: "/images/vide-poche.webp",
    price: 4,
    link: "/ads/vide-poche",
  },
  {
    id: 3,
    title: "Vaisselier",
    imgUrl: "/images/vaisselier.webp",
    price: 900,
    link: "/ads/vaisselier",
  },
  {
    id: 4,
    title: "Bougie",
    imgUrl: "/images/bougie.webp",
    price: 8,
    link: "/ads/bougie",
  },
  {
    id: 5,
    title: "Porte-magazine",
    imgUrl: "/images/porte-magazine.webp",
    price: 45,
    link: "/ads/porte-magazine",
  },
  {
    id: 6,
    title: "Table",
    imgUrl: "/images/table.webp",
    price: 120,
    link: "/ads/table",
  },
];

const RecentsAds = () => {
  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            title={ad.title}
            imgUrl={ad.imgUrl}
            price={ad.price}
            link={ad.link}
          />
        ))}
      </section>
    </>
  );
};

export default RecentsAds;
