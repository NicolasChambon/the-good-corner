import { useEffect } from "react";
import { Category } from "../../../interfaces/entities";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import "./BackOffice.scss";
import {
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
} from "../../generated/graphql-types";

type Input = {
  label: string;
};

const BackOffice = () => {
  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
  } = useGetAllCategoriesQuery();
  // const {
  //   data: dataTags,
  //   loading: loadingTags,
  //   error: errorTags,
  // } = useGetAllTagsQuery();

  const categories = dataCategories?.getAllCategories;
  // const tags = dataTags?.getAllTags;

  const loading = loadingCategories; // || loadingTags;
  const error = errorCategories; // || errorTags;

  const { register, handleSubmit } = useForm<Input>();

  const onSubmit = async (data: Input) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/categories`, data);
      toast.success("Catégories créée avec succès!");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la création de la catégorie");
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`);
      toast.success("Catégories supprimée avec succès!");
      fetchCategories();
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la suppression de la catégorie");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;
  return (
    <div className="BackOffice">
      <div className="CategoryBo">
        <h2>Liste des catégories</h2>
        <ul className="CategoryBo-list">
          {categories?.map((category) => (
            <li key={category.id}>
              <p>{category.label}</p>
              <button
                className="button"
                onClick={() => deleteCategory(category.id)}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-field"
            type="text"
            placeholder="Nom de la nouvelle catégorie"
            {...register("label", { required: true })}
          />
          <button className="button" type="submit">
            Créer une catégorie
          </button>
        </form>
      </div>
      {/* <div className="TagBo">
        <h2>Liste des tags</h2>
        <ul className="TagBo-list">
          {tags?.map((tag) => (
            <li key={tag.id}>
              <p>{tag.label}</p>
              <button className="button" onClick={() => deleteTag(tag.id)}>
                Supprimer
              </button>
            </li>
          ))}
        </ul>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="text-field"
            type="text"
            placeholder="Nom du nouveau tag"
            {...register("label", { required: true })}
          />
          <button className="button" type="submit">
            Créer un tag
          </button>
        </form>
      </div> */}
    </div>
  );
};

export default BackOffice;
