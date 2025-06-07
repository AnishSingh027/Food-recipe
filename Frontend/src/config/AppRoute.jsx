import Navbar from "../components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { addRecipe } from "../utils/recipeSlice";

const Approute = () => {
  const [isLoading, setILoading] = useState(true);
  const [filterInput, setFilterInput] = useState("");
  const selector = useSelector((store) => store.user);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const getUser = async () => {
    try {
      let res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      if (res?.data?.user) {
        dispatch(addUser(res?.data?.user));
      }
    } catch (error) {
      // console.log(error);
      console.warn(error.response.data);
    } finally {
      setILoading(false);
    }
  };

  const getRecipe = async () => {
    try {
      const res = await axios.get(BASE_URL + "/recipe/all", {
        withCredentials: true,
      });
      dispatch(addRecipe(res?.data?.allRecipe));
    } catch (error) {}
  };

  useEffect(() => {
    if (Object.keys(selector).length <= 0) {
      getUser();
      getRecipe();
    } else {
      setILoading(false);
    }
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      <Navbar filterInput={filterInput} setFilterInput={setFilterInput} />
      <Outlet context={{ filterInput }} />
    </>
  );
};

export default Approute;
