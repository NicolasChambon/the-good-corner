import { useEffect, useState } from "react";
import { Category } from "../../interfaces/entities";
import { Tag } from "../../interfaces/entities";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./NewAdForm.scss";

type Inputs = {
  title: string;
  description: string;
  author: string;
  price: number;
  pictureUrl: string;
  city: string;
  category: Category;
  tags: Tag[];
};

const NewAdForm = ({ type }: { type: "new" | "edit" }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentAd, setCurrentAd] = useState<Inputs | null>(null);

  let adId: string | undefined;
  if (type === "edit") {
    adId = window.location.pathname.split("/")[2];
  }

  const fetchCurrentAd = async (id: number) => {
    try {
      const response = await axios.get<Inputs>(
        `${import.meta.env.VITE_API_URL}/ads/${id}`
      );
      setCurrentAd(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get<Tag[]>(
        `${import.meta.env.VITE_API_URL}/tags`
      );
      setTags(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (type === "edit") {
      fetchCurrentAd(Number(adId));
    }
  }, []);

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    const dataWithTags = {
      ...data,
      tags: data.tags.map((tagId) => ({ id: tagId })),
    };
    try {
      if (type === "edit") {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/ads/${adId}`,
          dataWithTags
        );
        toast.success("Annonce modifiée avec succès!");
        return;
      }

      await axios.post(`${import.meta.env.VITE_API_URL}/ads`, dataWithTags);
      toast.success("Annonce créée avec succès!");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la création de l'annonce");
    }
  };

  return (
    <div className="NewAdForm">
      <h2>
        {type && type === "edit"
          ? `Modification de l'annonce ${adId}`
          : "Création d'une nouvelle annonce"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue={currentAd?.title}
          className="text-field"
          type="text"
          placeholder="Titre de l'anonce"
          {...register("title")}
        />
        <input
          defaultValue={currentAd?.description}
          className="text-field"
          type="text"
          placeholder="Description"
          {...register("description")}
        />
        <input
          defaultValue={currentAd?.author}
          className="text-field"
          type="text"
          placeholder="Auteur"
          {...register("author")}
        />
        <input
          defaultValue={currentAd?.price}
          className="text-field"
          type="number"
          placeholder="Prix"
          {...register("price")}
        />
        <input
          defaultValue={currentAd?.pictureUrl}
          className="text-field"
          type="text"
          placeholder="Lien vers une image"
          {...register("pictureUrl")}
        />
        <input
          defaultValue={currentAd?.city}
          className="text-field"
          type="text"
          placeholder="Ville"
          {...register("city")}
        />

        <select {...register("category")} className="text-field">
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
              selected={currentAd?.category.id === category.id}
            >
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
              defaultChecked={currentAd?.tags
                .map((tag) => tag.id)
                .includes(tag.id)}
              {...register(`tags`)}
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
