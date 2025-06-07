import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Recipe = () => {
  const { recipeId } = useParams();
  const recipeSelector = useSelector((store) => store.recipe);
  const userSelector = useSelector((store) => store.user);
  const [isLiked, setIsLiked] = useState(false);
  const navigate = useNavigate();

  const recipe = recipeSelector.filter((item) => item._id === recipeId);

  if (recipe.length <= 0) return <h1>No data found</h1>;

  const handleRecipeDelete = async (e) => {
    e.preventDefault();
    try {
      if (recipe[0]?.createdBy?._id != userSelector._id) return;
      const res = await axios.delete(BASE_URL + `/recipe/${recipe[0]._id}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        alert("Recipe removed successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className=" bg-gray-700 px-15 py-3 flex justify-between items-center">
        <h1 className="font-bold text-3xl">
          Chef: {recipe[0]?.createdBy?.firstName}{" "}
          {recipe[0]?.createdBy?.lastName}
        </h1>
        <div>
          <button className="btn btn-active btn-info active:scale-90 transition-all">
            Follow
          </button>
        </div>
      </div>
      <div className="px-15 py-8 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h1 className="font-extrabold text-3xl">{recipe[0]?.title}</h1>
          <div className="flex gap-8 items-center">
            {userSelector?._id == recipe[0]?.createdBy?._id && (
              <>
                <button
                  onClick={() => navigate(`/recipe/edit/${recipe[0]?._id}`)}
                  className="btn btn-active btn-warning active:scale-90 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={(e) => handleRecipeDelete(e)}
                  className="btn btn-active btn-error active:scale-90 transition-all"
                >
                  Remove
                </button>
              </>
            )}
            <button className="btn btn-active btn-info active:scale-90 transition-all">
              Add to Favorites
            </button>
            <h1
              className={`font-extrabold text-xxl ${
                recipe[0]?.category === "veg"
                  ? " text-green-400"
                  : "text-red-400"
              }`}
            >
              {recipe[0]?.category === "veg" ? "Veg 🟢" : "Non veg 🔴"}
            </h1>
            <button
              className={`btn btn-circle transition-all ${
                isLiked ? "bg-red-600" : "bg-gray-800"
              }`}
              onClick={() => setIsLiked((prev) => !prev)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="size-[1.2em]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </button>
          </div>
        </div>

        <h1 className="font-bold text-2xl underline">Description</h1>
        <p className="text-xl">{recipe[0]?.description}</p>
        <div className="flex gap-5">
          <div className="w-1/4">
            <img src={recipe[0]?.image} alt="pp" className="w-full h-auto" />
          </div>
          <div className="w-1/2 flex gap-4 flex-col">
            <h1 className="font-bold text-2xl underline">Ingredients</h1>
            <div className="flex gap-3.5 flex-wrap">
              {recipe[0]?.ingredients?.map((item, index) => (
                <div className="px-3 py-1 bg-purple-700 rounded-xl" key={index}>
                  {item}
                </div>
              ))}
            </div>
            <div className="flex gap-8">
              <div>
                <h1 className="font-bold text-2xl underline mb-2">Cuisine</h1>
                <h1 className="font text-xl">{recipe[0]?.cuisine}</h1>
              </div>
              <div>
                <h1 className="font-bold text-2xl underline mb-2">
                  Cooking Time:
                </h1>
                <h1 className="font text-xl">
                  {recipe[0].cookingTime} minutes
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-2xl underline mb-4">Instructions</h1>
          <ol className="flex flex-col gap-3 list-decimal">
            {recipe[0]?.instructions?.map((item, index) => (
              <li key={index} className="text-xl ml-5">
                {item}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
};

export default Recipe;
