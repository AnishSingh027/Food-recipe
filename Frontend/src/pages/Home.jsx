import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRecipe } from "../utils/recipeSlice";
import { Link } from "react-router";
import RecipeCard from "../components/RecipeCard";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const selector = useSelector((store) => store.recipe);
  const [filterRecipe, setFilterRecipe] = useState([]);
  const [filterOption, setFilterOption] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const { filterInput } = useOutletContext();
  const dispatch = useDispatch();
  const getRecipe = async () => {
    try {
      const res = await axios.get(BASE_URL + "/recipe/all", {
        withCredentials: true,
      });
      dispatch(addRecipe(res?.data?.allRecipe));
    } catch (error) {}
  };

  const filterData = () => {
    const filterData = selector.filter((recipe) =>
      recipe?.title?.toLowerCase().includes(filterInput.toLowerCase())
    );
    setFilterRecipe(filterData);
  };

  const filterDropdownOptions = () => {
    const filterDropdown = selector.filter(
      (recipe) => recipe?.cuisine === filterOption
    );
    if (filterOption === "demo" || filterDropdown.length === 0)
      return setFilterRecipe(selector);
    setFilterRecipe(filterDropdown);
  };

  useEffect(() => {
    getRecipe();
  }, []);

  useEffect(() => {
    filterData();
  }, [filterInput, selector]);

  useEffect(() => {
    filterDropdownOptions();
  }, [filterOption]);

  if (filterRecipe.length === 0) {
    return (
      <div className="px-15 py-10">
        <h1>No data found</h1>
      </div>
    );
  }

  return (
    <div className="px-15 py-10">
      <select
        className="bg-gray-500 py-2 px-3 text-center font-bold text-black outline-none mb-3 border-none rounded"
        name="filter"
        value={filterOption}
        onChange={(e) => setFilterOption(e.target.value)}
      >
        <option
          className="font-bold text-black outline-none  border-none"
          value="demo"
        >
          All
        </option>
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
      <div className="flex flex-wrap gap-5">
        {filterRecipe.length > 0 &&
          filterRecipe.map((item) => (
            <Link key={item._id} to={`/recipe/${item._id}`}>
              <RecipeCard item={item} />
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Home;
