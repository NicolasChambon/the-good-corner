import { useParams } from "react-router";

const AdDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>AdDetails</h1>
      <p>This is the ad details page for ad with id: {id}</p>
    </div>
  );
};

export default AdDetails;
