import { useParams, useNavigate, Link } from "react-router";
import { toast } from "react-toastify";
import {
  GetAllAdsDocument,
  useDeleteAdMutation,
  useGetOneAdQuery,
} from "../../generated/graphql-types";

const AdDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  let adId: number;
  if (!id || isNaN(Number(id))) {
    adId = 0;
  } else {
    adId = parseInt(id);
  }

  const { data, loading, error } = useGetOneAdQuery({
    variables: {
      getOneAdId: adId,
    },
  });

  const [deleteAdMutation] = useDeleteAdMutation({
    refetchQueries: [
      {
        query: GetAllAdsDocument,
      },
    ],
  });

  const deleteAd = async (id: number) => {
    try {
      await deleteAdMutation({
        variables: {
          deleteAdId: id,
        },
      });
      toast.success("Annonce supprimée avec succès!");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de l'annonce");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oups ! On a tout cassé</p>;
  if (adId === 0) return <p>Erreur : l'ID de l'annonce est invalide.</p>;

  return (
    <>
      <h2 className="ad-details-title">{data?.getOneAd.title}</h2>
      <section className="ad-details">
        <div className="ad-details-image-container">
          <img
            className="ad-details-image"
            src={data?.getOneAd.pictureUrl}
            alt={data?.getOneAd.title}
          />
        </div>
        <div className="ad-details-info">
          <div className="ad-details-price">{data?.getOneAd.price}€</div>
          <div className="ad-details-description">
            {data?.getOneAd.description}
          </div>
          <div className="ad-tags">
            <h4>Tags :</h4>
            {data?.getOneAd.tags.map((tag) => (
              <div key={tag.id} className="tag">
                {tag.label}
              </div>
            ))}
          </div>
          <div>
            <h4>Catégorie :</h4>
            <p>{data?.getOneAd.category.label}</p>
          </div>
          <hr className="separator" />
          <div className="ad-details-owner">
            Annoncée publiée par <b>{data?.getOneAd.author}</b> le{" "}
            {new Date(data?.getOneAd.createdAt).toLocaleDateString()} à{" "}
            {new Date(data?.getOneAd.createdAt).toLocaleTimeString()}
          </div>
          <Link
            to="mailto:serge@serge.com"
            className="button button-primary link-button"
            target="_blank"
          >
            <svg
              aria-hidden="true"
              width="16"
              height="16"
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              stroke="currentcolor"
              stroke-width="2.5"
              fill="none"
            >
              <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
            </svg>
            Envoyer un email
          </Link>
          <button
            className="button"
            onClick={() => navigate(`/ad/${data?.getOneAd.id}/edit`)}
          >
            Modifier l'annonce
          </button>
          <button className="button" onClick={() => deleteAd(adId)}>
            Supprimer l'annonce
          </button>
        </div>
      </section>
    </>
  );
};

export default AdDetails;
