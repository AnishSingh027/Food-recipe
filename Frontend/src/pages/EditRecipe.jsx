import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { useNavigate, useParams } from "react-router-dom";

const EditRecipe = () => {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const recipeSelector = useSelector((store) => store.recipe);
  const recipe = recipeSelector.filter((item) => item._id === recipeId);

  const defaultFormData = {
    title: recipe[0]?.title || "",
    description: recipe[0]?.description || "",
    ingredients: recipe[0]?.ingredients || [""],
    instructions: recipe[0]?.instructions || [""],
    cookingTime: recipe[0]?.cookingTime || "",
    cuisine: recipe[0]?.cuisine || "Indian",
    category: recipe[0]?.category || "veg",
    image:
      recipe[0]?.image ||
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQRQMKHs5qBBmBwVN6e7UTPlt3PpK2c6T8XA&s",
  };

  const [formData, setFormData] = useState(defaultFormData);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (e, name, index) => {
    const updatedArray = [...formData[name]];
    updatedArray[index] = e.target.value;
    setFormData({ ...formData, [name]: updatedArray });
  };

  const addFields = (e, name) => {
    e.preventDefault();
    setFormData({ ...formData, [name]: [...formData[name], ""] });
  };

  const removeFields = (e, name, index) => {
    e.preventDefault();
    if (formData[name].length <= 1) return;
    const removedField = formData[name].filter((_, id) => id != index);
    setFormData({ ...formData, [name]: removedField });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        BASE_URL + `/recipe/${recipe[0]._id}`,
        {
          title: formData.title,
          description: formData.description,
          ingredients: formData.ingredients,
          instructions: formData.instructions,
          cookingTime: formData.cookingTime,
          cuisine: formData.cuisine,
          category: formData.category,
          image: formData.image,
        },
        { withCredentials: true }
      );
      if (res.status === 200) {
        alert(res.data);
        setIsUpdated(true);
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  return (
    <div className="px-15 py-8">
      <h1 className="font-bold text-white text-3xl mb-5">Edit Recipe</h1>
      <form>
        <div className="flex justify-between">
          <div className="flex w-1/2 flex-col gap-4">
            <div className="flex justify-start flex-col gap-3 ">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter title"
                className="px-3 py-4 text-xl bg-gray-500 text-white rounded outline-none"
                value={formData.title}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex justify-start flex-col gap-3">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Description
              </label>
              <textarea
                type="textarea"
                name="description"
                placeholder="Enter description"
                className="px-3 py-4 text-xl bg-gray-500 text-white rounded outline-none"
                value={formData.description}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className="flex justify-start flex-col gap-3">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Ingredients
              </label>
              {formData.ingredients.map((_, index) => (
                <div className="flex gap-5 items-center" key={index}>
                  <input
                    type="text"
                    name="ingredients"
                    placeholder="Enter ingredients"
                    value={formData.ingredients[index]}
                    onChange={(e) => handleArrayChange(e, "ingredients", index)}
                    className="px-3 py-4 w-full text-xl bg-gray-500 text-white rounded outline-none"
                  />
                  <button
                    onClick={(e) => removeFields(e, "ingredients", index)}
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={(e) => addFields(e, "ingredients")}
                className="w-1/3 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"
              >
                Add more
              </button>
            </div>
            <div className="flex justify-start flex-col gap-3">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Instructions
              </label>
              {formData.instructions.map((_, index) => (
                <div className="flex gap-5 items-center" key={index}>
                  <input
                    type="text"
                    name="instructions"
                    placeholder="Enter instructions"
                    value={formData.instructions[index]}
                    onChange={(e) =>
                      handleArrayChange(e, "instructions", index)
                    }
                    className="px-3 py-4 w-full text-xl bg-gray-500 text-white rounded outline-none"
                  />
                  <button
                    onClick={(e) => removeFields(e, "instructions", index)}
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"
                  >
                    X
                  </button>
                </div>
              ))}
              <button
                onClick={(e) => addFields(e, "instructions")}
                className="w-1/3 btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"
              >
                Add more
              </button>
            </div>
            <div className="flex justify-start flex-col gap-3">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Cooking Time
              </label>
              <input
                type="number"
                name="cookingTime"
                className="px-3 py-4 text-xl bg-gray-500 text-white rounded outline-none"
                value={formData.cookingTime}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="flex justify-start flex-col gap-3">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Cuisine
              </label>
              <select
                name="cuisine"
                className="bg-gray-500 py-2 px-3 text-center font-bold text-black outline-none mb-3 border-none rounded w-1/6"
                value={formData.cuisine}
                onChange={(e) => handleChange(e)}
              >
                <option
                  value="Indian"
                  className="font-bold text-black outline-none  border-none"
                >
                  Indian
                </option>
                <option
                  value="Italian"
                  className="font-bold text-black outline-none  border-none"
                >
                  Italian
                </option>
                <option
                  value="Chinese"
                  className="font-bold text-black outline-none  border-none"
                >
                  Chinese
                </option>
                <option
                  value="American"
                  className="font-bold text-black outline-none border-none"
                >
                  American
                </option>
              </select>
            </div>
            <div className="flex justify-start flex-col gap-3">
              <label htmlFor="title" className="text-xl font-bold text-white">
                Category
              </label>
              <select
                name="category"
                className="bg-gray-500 py-2 px-3 text-center font-bold text-black outline-none mb-3 border-none rounded w-1/6"
                value={formData.category}
                onChange={(e) => handleChange(e)}
              >
                <option
                  value="veg"
                  className="font-bold text-black outline-none  border-none"
                >
                  Veg
                </option>
                <option
                  value="non veg"
                  className="font-bold text-black outline-none  border-none"
                >
                  Non veg
                </option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-5 w-1/3">
            <label htmlFor="image" className="text-xl font-bold text-white">
              Image
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter image URL"
              className="px-3 py-4 text-xl bg-gray-500 text-white rounded outline-none"
              value={formData.image}
              onChange={(e) => handleChange(e)}
            />
            <div>
              <img
                src={formData.image}
                alt="Recipe image"
                className="w-full h-80 rounded"
              />
            </div>
          </div>
        </div>
        <button
          onClick={(e) => handleOnSubmit(e)}
          className="mt-5 w-full btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary"
        >
          Edit Recipe
        </button>
      </form>
    </div>
  );
};

export default EditRecipe;
