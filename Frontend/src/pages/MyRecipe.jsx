import { useDispatch, useSelector } from "react-redux";
import RecipeCard from "../components/RecipeCard";
import { addRecipe } from "../utils/recipeSlice";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const MyRecipe = () => {
  const recipeSelector = useSelector((store) => store.recipe);
  const userSelector = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const getRecipe = async () => {
    try {
      const res = await axios.get(BASE_URL + "/recipe/all", {
        withCredentials: true,
      });
      dispatch(addRecipe(res?.data?.allRecipe));
    } catch (error) {}
  };

  useEffect(() => {
    getRecipe();
  }, []);

  return (
    <div className="px-15 py-8 flex gap-5 flex-col">
      <div>
        <Link to={"/add-recipe"}>
          <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg btn-primary">
            Add Recipe
          </button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-5">
        {recipeSelector.length > 0 &&
          recipeSelector.map(
            (item) =>
              userSelector?._id == item?.createdBy?._id && (
                <Link key={item?._id} to={`/recipe/${item._id}`}>
                  <RecipeCard item={item} />
                </Link>
              )
          )}
      </div>
    </div>
  );
};

export default MyRecipe;
