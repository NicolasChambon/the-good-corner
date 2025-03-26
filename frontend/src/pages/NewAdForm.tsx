import { useEffect, useState } from "react";
import { Category } from "../../../interfaces/entities";
import axios from "axios";

const NewAdForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    const response = await axios.get<Category[]>(
      "http://localhost:3000/categories"
    );
    setCategories(response.data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = e.target;
    const data = new FormData(formData as HTMLFormElement);
    const formJson = Object.fromEntries(data.entries());
    await axios.post("http://localhost:3000/ads", formJson);
    console.log(formJson);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <h1>New Ad Form</h1>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label>
          Titre de l'annonce <br />
          <input type="text-field" name="title" />
        </label>
        <br />
        <label>
          Description de l'annonce <br />
          <input type="text-field" name="description" />
        </label>
        <br />
        <label>
          Auteur de l'annonce <br />
          <input type="text-field" name="author" />
        </label>
        <br />
        <label>
          Prix <br />
          <input type="text-field" name="price" />
        </label>
        <br />
        <label>
          URL de l'image <br />
          <input type="text-field" name="pictureUrl" />
        </label>
        <br />
        <label>
          Ville <br />
          <input type="text-field" name="city" />
        </label>
        <br />
        <label>
          Catégorie <br />
          <select name="category">
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label}
              </option>
            ))}
          </select>
        </label>
        <br />
        <button className="button">Submit</button>
      </form>
    </>
  );
};

export default NewAdForm;
