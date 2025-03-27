import { useEffect, useState } from "react";
import { Category } from "../../../interfaces/entities";
import { Tag } from "../../../interfaces/entities";
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
  category: number;
  tags: number[];
};

const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);

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
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    try {
      const dataWithTags = {
        ...data,
        tags: data.tags.map((tagId) => ({ id: tagId })),
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/ads`, dataWithTags);
      toast.success("Annonce créée avec succès!");
    } catch (error) {
      console.error(error);
      toast.error("Une erreur est survenue lors de la création de l'annonce");
    }
  };

  return (
    <div className="NewAdForm">
      <h2>Création d'une nouvelle annonce</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          className="text-field"
          type="text"
          placeholder="Titre de l'anonce"
          {...register("title", { required: true })}
        />
        {errors.title && <span>This field is required</span>}
        <input
          className="text-field"
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        {errors.description && <span>This field is required</span>}
        <input
          className="text-field"
          type="text"
          placeholder="Auteur"
          {...register("author", { required: true })}
        />
        {errors.author && <span>This field is required</span>}
        <input
          className="text-field"
          type="number"
          placeholder="Prix"
          {...register("price", { required: true })}
        />
        {errors.price && <span>This field is required</span>}
        <input
          className="text-field"
          type="text"
          placeholder="Lien vers une image"
          {...register("pictureUrl", { required: true })}
        />
        {errors.pictureUrl && <span>This field is required</span>}
        <input
          className="text-field"
          type="text"
          placeholder="Ville"
          {...register("city", { required: true })}
        />
        {errors.city && <span>This field is required</span>}
        <select
          {...register("category", { required: true })}
          className="text-field"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
          <option value="">Choisissez une catégorie</option>
        </select>
        {errors.category && <span>This field is required</span>}

        {
          // une annonce peut avoir plusieurs tags on va les représenter sous forme de checkbox
        }
        {tags.map((tag) => (
          <label key={tag.id}>
            <input type="checkbox" value={tag.id} {...register(`tags`)} />
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
