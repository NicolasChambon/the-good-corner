import { useEffect, useState } from "react";
import { Category } from "../../interfaces/entities";
import { Tag } from "../../interfaces/entities";
import { toast } from "react-toastify";
import "./NewAdForm.scss";
import {
  useCreateAdMutation,
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
} from "../../generated/graphql-types";
import { useNavigate } from "react-router";

type Inputs = {
  title: string;
  description: string;
  author: string;
  price: string;
  pictureUrl: string;
  city: string;
  category: string;
  tags: string[];
};

const NewAdForm = ({ type }: { type: "new" | "edit" }) => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  // const [currentAd, setCurrentAd] = useState<Inputs | null>(null); // TODO update

  const [adInputs, setAdInputs] = useState<Inputs>({
    title: "",
    description: "",
    author: "",
    price: "",
    pictureUrl: "",
    city: "",
    category: "",
    tags: [],
  });

  const { data: dataCategories } = useGetAllCategoriesQuery();
  useEffect(() => {
    if (dataCategories) {
      setCategories(dataCategories.getAllCategories);
    }
  }, [dataCategories]);

  const { data: dataTags } = useGetAllTagsQuery();
  useEffect(() => {
    if (dataTags) {
      setTags(dataTags.getAllTags);
    }
  }, [dataTags]);

  let adId: string | undefined;
  if (type === "edit") {
    adId = window.location.pathname.split("/")[2];
  }

  // const fetchCurrentAd = async () => {}; // TODO update

  const [createAd] = useCreateAdMutation();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAd({
        variables: {
          data: {
            title: adInputs.title,
            description: adInputs.description,
            author: adInputs.author,
            price: parseFloat(adInputs.price),
            pictureUrl: adInputs.pictureUrl,
            city: adInputs.city,
            category: adInputs.category,
            tags: adInputs.tags.map((tag) => tag.toString()),
          },
        },
      });
      toast.success("Annonce créée avec succès");
      navigate("/");
    } catch (error) {
      console.error("Error creating ad:", error);
      toast.error("Erreur lors de la création de l'annonce");
    }
  };

  return (
    <div className="NewAdForm">
      <h2>
        {type && type === "edit"
          ? `Modification de l'annonce ${adId}`
          : "Création d'une nouvelle annonce"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          // defaultValue={currentAd?.title} // TODO update
          className="text-field"
          type="text"
          placeholder="Titre de l'anonce"
          value={adInputs.title}
          onChange={(e) => setAdInputs({ ...adInputs, title: e.target.value })}
        />
        <input
          // defaultValue={currentAd?.description} // TODO update
          className="text-field"
          type="text"
          placeholder="Description"
          value={adInputs.description}
          onChange={(e) =>
            setAdInputs({ ...adInputs, description: e.target.value })
          }
        />
        <input
          // defaultValue={currentAd?.author} // TODO update
          className="text-field"
          type="text"
          placeholder="Auteur"
          value={adInputs.author}
          onChange={(e) => setAdInputs({ ...adInputs, author: e.target.value })}
        />
        <input
          // defaultValue={currentAd?.price} // TODO update
          className="text-field"
          type="number"
          placeholder="Prix"
          value={adInputs.price}
          onChange={(e) => setAdInputs({ ...adInputs, price: e.target.value })}
        />
        <input
          // defaultValue={currentAd?.pictureUrl} // TODO update
          className="text-field"
          type="text"
          placeholder="Lien vers une image"
          value={adInputs.pictureUrl}
          onChange={(e) =>
            setAdInputs({ ...adInputs, pictureUrl: e.target.value })
          }
        />
        <input
          // defaultValue={currentAd?.city} // TODO update
          className="text-field"
          type="text"
          placeholder="Ville"
          value={adInputs.city}
          onChange={(e) => setAdInputs({ ...adInputs, city: e.target.value })}
        />

        <select
          className="text-field"
          value={adInputs.category}
          onChange={(e) =>
            setAdInputs({ ...adInputs, category: e.target.value })
          }
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
          {type === "new" && (
            <option value="" selected>
              Choisissez une catégorie
            </option>
          )}
        </select>

        {tags.map((tag) => (
          <label key={tag.id}>
            <input
              type="checkbox"
              value={tag.id}
              onChange={(e) => {
                if (e.target.checked) {
                  setAdInputs({
                    ...adInputs,
                    tags: [...adInputs.tags, tag.id.toString()],
                  });
                } else {
                  setAdInputs({
                    ...adInputs,
                    tags: adInputs.tags.filter((t) => t !== tag.id.toString()),
                  });
                }
              }}
            />
            {tag.label}
          </label>
        ))}

        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewAdForm;
