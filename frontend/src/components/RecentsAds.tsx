import AdCard from "./AdCard";

export interface Ad {
  title: string;
  imgUrl: string;
  price: number;
  link: string;
}

const RecentsAds = () => {
  const ads: Ad[] = [
    {
      title: "Dame-jeanne",
      imgUrl: "/images/dame-jeanne.webp",
      price: 75,
      link: "/ads/dame-jeanne",
    },
    {
      title: "Vide-poche",
      imgUrl: "/images/vide-poche.webp",
      price: 4,
      link: "/ads/vide-poche",
    },
    {
      title: "Vaisselier",
      imgUrl: "/images/vaisselier.webp",
      price: 900,
      link: "/ads/vaisselier",
    },
    {
      title: "Bougie",
      imgUrl: "/images/bougie.webp",
      price: 8,
      link: "/ads/bougie",
    },
    {
      title: "Porte-magazine",
      imgUrl: "/images/porte-magazine.webp",
      price: 45,
      link: "/ads/porte-magazine",
    },
    {
      title: "Table",
      imgUrl: "/images/table.webp",
      price: 120,
      link: "/ads/table",
    },
  ];

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad, index) => (
          <AdCard
            key={index}
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
