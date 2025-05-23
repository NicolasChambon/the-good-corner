import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "../../../generated/graphql-types";
import { useState } from "react";
import { toast } from "react-toastify";

const CategoryBo = () => {
  const [categoryInput, setCategoryInput] = useState<string>("");

  const {
    data: dataCategories,
    loading: loadingCategories,
    error: errorCategories,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();
  const categories = dataCategories?.getAllCategories;

  const [createCategory] = useCreateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryInput) {
      toast.error("Veuillez entrer un nom de catégorie");
      return;
    }
    try {
      await createCategory({
        variables: {
          data: {
            label: categoryInput,
          },
        },
      });
      setCategoryInput("");
      refetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Erreur lors de la création de la catégorie");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteCategory({
        variables: {
          deleteCategoryId: id,
        },
      });
      refetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Erreur lors de la suppression de la catégorie");
    }
  };

  if (loadingCategories) return <p>Loading...</p>;
  if (errorCategories) return <p>Error loading data</p>;
  return (
    <div className="CategoryBo">
      <h2>Liste des catégories</h2>
      <ul className="CategoryBo-list">
        {categories?.map((category) => (
          <li key={category.id}>
            <p>{category.label}</p>
            <button
              className="button"
              onClick={() => handleDelete(category.id)}
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className="text-field"
          type="text"
          placeholder="Nom de la nouvelle catégorie"
          value={categoryInput}
          onChange={(e) => setCategoryInput(e.target.value)}
        />
        <button className="button" type="submit">
          Créer une catégorie
        </button>
      </form>
    </div>
  );
};

export default CategoryBo;
