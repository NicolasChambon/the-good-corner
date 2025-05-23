import {
  useCreateTagMutation,
  useDeleteTagMutation,
  useGetAllTagsQuery,
} from "../../../generated/graphql-types";
import { useState } from "react";
import { toast } from "react-toastify";

const TagBo = () => {
  const [tagInput, setTagInput] = useState<string>("");

  const {
    data: dataTags,
    loading: loadingTags,
    error: errorTags,
    refetch: refetchTags,
  } = useGetAllTagsQuery();
  const tags = dataTags?.getAllTags;

  const [createTag] = useCreateTagMutation();
  const [deleteTag] = useDeleteTagMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagInput) {
      toast.error("Veuillez entrer un nom de tag");
      return;
    }
    try {
      await createTag({
        variables: {
          data: {
            label: tagInput,
          },
        },
      });
      setTagInput("");
      refetchTags();
    } catch (error) {
      console.error("Error creating tag:", error);
      toast.error("Erreur lors de la création du tag");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTag({
        variables: {
          deleteTagId: id,
        },
      });
      refetchTags();
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Erreur lors de la suppression du tag");
    }
  };

  if (loadingTags) return <p>Loading...</p>;
  if (errorTags) return <p>Error loading data</p>;
  return (
    <div className="TagBo">
      <h2>Liste des tags</h2>
      <ul className="TagBo-list">
        {tags?.map((tag) => (
          <li key={tag.id}>
            <p>{tag.label}</p>
            <button className="button" onClick={() => handleDelete(tag.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          className="text-field"
          type="text"
          placeholder="Nom du nouveau tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
        />
        <button className="button" type="submit">
          Créer un tag
        </button>
      </form>
    </div>
  );
};

export default TagBo;
